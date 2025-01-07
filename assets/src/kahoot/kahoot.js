import { EventEmitter } from "events";
import { createHandshake, secondHandshake, joinGame, ping, afterJoinGame, changeCostumeTemplate, answerTemplate } from "./template";
import { delay } from "./other";

export class Kahoot extends EventEmitter {
    constructor() {
        super();
        this.ws = null;
        this.ack = 0;
        this.msgid = 1;
        this.isAnswerable = false;
        this.clientData = { pin: null, nickname: null, clientId: null, cid: null, score: 0,rank:0};
        this.gameData = { gameData: null, gameBlockType: null, questionIndex: null,getReadyTime:0,answerTime:0 };
    }

    // Fetch game data
    async getGameData(gamePin) {
        try {
            const response = await fetch(`/api/getGameToken/?pin=${gamePin}`);
            if (response.ok) {
                const data = await response.json();
                this.gameData.gameData = data;
                return data;
            }
            return false;
        } catch {
            return false;
        }
    }

    // Validate game PIN
    async checkPin(gamePin) {
        const data = await this.getGameData(gamePin);
        return data.status == 200?true:false;
    }

    // Join the game
    async join(gamePin, nickname) {
        this.clientData.nickname = nickname;
        const gameData = await this.getGameData(gamePin);   
        if (!gameData || gameData.status !== 200) {
            this.ws.close();
            return this.emit("error", new Error("Invalid game pin"));
        }
        this.clientData.pin = gamePin;
        this.initWebSocket(gamePin, gameData.gameToken);
    }

    // Answer the question
    async answer(choice) {
        if (!this.isAnswerable) return console.error("Not answerable");
        this.msgid++;
        const choiceValue = this.gameData.gameBlockType === "quiz"|| this.gameData.gameBlockType === 'true_false' ? parseInt(choice.join()) : choice;
        this.sendMessage("answer", answerTemplate(choiceValue, this.gameData.gameBlockType, this.gameData.questionIndex, this.msgid));
        this.isAnswerable = false;
    }

    // Change costume
    async changeCostume(cos1, cos2) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.msgid++;
            this.sendMessage("changeCostume", changeCostumeTemplate(cos1, cos2, this.msgid));
        } else {
            this.emit("wserror", new Error("WebSocket is not open"));
        }
    }

    // Initialize WebSocket connection
    initWebSocket(gamePin, gameToken) {
        try {
            this.ws = new WebSocket(`wss://kahoot.it/cometd/${gamePin}/${gameToken}`);
            this.ws.onopen = () => this.sendMessage("handshake", createHandshake());
            this.ws.onerror = (error) => this.emit("wserror", error);
            this.ws.onmessage = (message) => this.handleWebSocketMessage(message);
            this.ws.onclose = () => this.emit("wsdisconnect");
        } catch (error) {
            this.emit("error", error);
        }
    }

    // Send messages via WebSocket
    sendMessage(action, data) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            try {
                this.ws.send(JSON.stringify(data));
            } catch (error) {
                this.emit("wserror", `${action}, ${error}`);
            }
        } else {
            this.emit("wserror", new Error("WebSocket is not open"));
        }
    }

    // Process incoming WebSocket messages
    async handleWebSocketMessage(message) {
        const response = JSON.parse(message.data)[0];
        const [channelType, channelName] = response.channel.substring(1).split("/");

        if (response.ext?.ack !== undefined) this.ack = response.ext.ack;

        switch (channelType) {
            case "meta":
                await this.handleMetaChannel(channelName, response);
                break;
            case "service":
                await this.handleServiceChannel(channelName, response);
                break;
            default:
                this.emit("wserror", new Error("Unknown channel"));
        }
    }

    // Handle meta channels
    async handleMetaChannel(channelName, response) {
        if (channelName === "connect") {
            this.msgid++;
            this.sendMessage("ping", ping(this.msgid, this.ack));
            return;
        }

        if (this.msgid === 1) {
            this.msgid++;
            this.clientData.clientId = response.clientId;
            this.sendMessage("secondhandshake", secondHandshake(response.ext.timesync, this.clientData.clientId, this.msgid));
            await delay(750);
            this.msgid++;
            this.sendMessage("joinGame", joinGame(this.clientData.pin, this.clientData.nickname, this.msgid));
        }
    }

    // Handle service channels
    async handleServiceChannel(channelName, response) {
        if (channelName === "controller" && response.data?.type === "loginResponse") {
            if (response.data.cid) {
                this.msgid++;
                this.sendMessage("afterJoinGame", afterJoinGame(this.msgid));
                this.emit("joined");
            } else if (response.data.error) {
                this.emit("error", { error: response.data.error, message: response.data.description });
            }
        } else if (channelName === "player") {
            await this.handlePlayerActions(response);
        }
    }

    // Handle player actions
    async handlePlayerActions(response) {
        const content = JSON.parse(response.data.content);

        switch (response.data.id) {
            case 1:
                this.gameData = { ...this.gameData, gameBlockType: content.layout == "true_false"?"true_false":content.type, questionIndex: content.questionIndex ,getReadyTime: content.getReadyTimeRemaining};
                
                this.emit("questionReady", response);
                console.log("questionReady");
                console.log(response);
                break;
            case 2:
                this.isAnswerable = true;
                this.emit("questionStart", response);
                console.log("questionStart");
                console.log(response);
                break;
            case 8:
                this.isAnswerable = false;
                this.emit("questionEnd", response);
                console.log("questionEnd");
                console.log(response);
                break;
            case 9:
                this.emit("quizStart", response);
                console.log("quizStart");
                console.log(response);
                break;
            case 17:
                this.emit("clientMetaData", response);
                console.log("clientMetaData");
                console.log(response);
                break;
            default:
                console.log("Unhandled player action:", response.data.id);
                console.log(response);
                break;
        }
    }
}
