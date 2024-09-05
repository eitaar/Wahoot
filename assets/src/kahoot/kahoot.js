import { EventEmitter } from "events";
import { createHandshake, secondHandshake, joinGame, ping, afterJoinGame, changeCostumeTemplate } from "./template";
import { delay } from "./other";

export class Client extends EventEmitter {
    constructor() {
        super();
        this.ws = null;
        this.ack = 0;
        this.msgid = 1;
        this.clientData = {
            pin: undefined,
            nickname: undefined,
            clientId: undefined,
            cid: undefined
        };
        this.gameData = undefined;
    }

    // Fetch game data
    async getGameData(gamePin) {
        try {
            const response = await fetch(`/api/getGameToken/?pin=${gamePin}`);
            if (!response.ok) throw new Error(`Failed to fetch game data: ${response.statusText}`);
            const data = await response.json();
            this.gameData = data;
            return data;
        } catch (error) {
            this.emit('error', error);
            throw error;
        }
    }

    // Check if the game PIN is valid
    async checkPin(gamePin) {
        try {
            const data = await this.getGameData(gamePin);
            return data.status === 200;
        } catch (error) {
            return false;
        }
    }

    // Join the game
    async join(gamePin, nickname) {
        this.clientData.nickname = nickname;
        try {
            const gameData = await this.getGameData(gamePin);
            if (gameData.status !== 200) {
                this.emit('error', new Error("Invalid game pin"));
                return;
            }
            this.clientData.pin = gamePin;
            this.defineWebSocket(gamePin, gameData.gameToken);
        } catch (error) {
            this.emit('error', error);
        }
    }

    // Change costume
    async changeCostume(cos1, cos2) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.msgid++;
            this.wsEmitter("changeCostume", changeCostumeTemplate(cos1, cos2, this.msgid));
        } else {
            this.emit('wserror', new Error("WebSocket is not open"));
        }
    }

    // WebSocket connection and event handlers
    defineWebSocket(gamePin, gameToken) {
        try {
            this.ws = new WebSocket(`wss://kahoot.it/cometd/${gamePin}/${gameToken}`);
            this.ws.onopen = () => {
                this.wsEmitter('handshake', createHandshake());
            };
            this.ws.onerror = (error) => {
                this.emit('wserror', error);
            };
            this.ws.onmessage = (message) => {
                this.handleWebSocketMessage(message);
            };
            this.ws.onclose = () => {
                this.emit('wsdisconnect');
            };
        } catch (error) {
            this.emit('error', error);
        }
    }

    // Send messages through WebSocket
    wsEmitter(action, data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            try {
                this.ws.send(JSON.stringify(data));
            } catch (error) {
                this.emit('wserror', `${action},${error}`);
            }
        } else {
            this.emit('wserror', new Error("WebSocket is not open"));
        }
    }

    // Handle incoming WebSocket messages
    async handleWebSocketMessage(message) {
        try {
            const response = JSON.parse(message.data)[0];
            const channel = response.channel.substring(1).split("/");
            if (response.ext && response.ext.ack !== undefined) {
                this.ack = response.ext.ack;
            }
            switch (channel[0]) {
                case "meta":
                    await this.metaWsHandler(channel, response);
                    break;
                case "service":
                    await this.serviceWsHandler(channel, response);
                    break;
                default:
                    this.emit("wserror", new Error("Unknown channel"));
            }
        } catch (error) {
            this.emit('wserror', error);
        }
    }

    // Handle meta channels
    async metaWsHandler(channel, data) {
        try {
            if (channel[1] !== "connect") {
                switch (this.msgid) {
                    case 1:
                        this.msgid++;
                        this.clientData.clientId = data.clientId;
                        this.wsEmitter("secondhandshake", secondHandshake(data.ext.timesync, this.clientData.clientId, this.msgid));
                        await delay(750);  
                        this.msgid++; 
                        this.wsEmitter("joinGame", joinGame(
                            this.clientData.pin,
                            this.clientData.nickname,
                            this.msgid
                        ));
                        break;
                    default:
                        console.log("Unhandled action in metaWsHandler: ", this.msgid, JSON.parse(data));
                        break;
                }
            } else {
                this.msgid++;
                this.wsEmitter("ping", ping(this.msgid, this.ack));
            }
        } catch (error) {
            this.emit('wserror', error);
        }
    }

    // Handle service channels
    async serviceWsHandler(channel, data) {
        try {
            switch (channel[1]) {
                case "controller":
                    if (data.data && data.data.type === "loginResponse") {
                        this.msgid++;
                        this.wsEmitter("afterJoinGame", afterJoinGame(this.msgid));
                        this.emit('joined');
                    }
                    break;
                default:
                    console.log("Unhandled action in serviceWsHandler:", this.msgid, data);
                    break;
            }
        } catch (error) {
            this.emit('wserror', error);
        }
    }
}
