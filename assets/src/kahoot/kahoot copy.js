import { EventEmitter } from "events";
import { createHandshake, secondHandshake, joinGame, ping, afterJoinGame } from "./template";
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

    async checkPin(gamePin) {
        try {
            const data = await this.getGameData(gamePin);
            return data.status === 200;
        } catch (error) {
            return false;
        }
    }

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

    defineWebSocket(gamePin, gameToken) {
        try {
            this.ws = new WebSocket(`wss://kahoot.it/cometd/${gamePin}/${gameToken}`);
            this.ws.onopen = () => {this.wsEmitter('handshake', createHandshake());};
            this.ws.onerror = (error) => {this.emit('wserror', error);};
            this.ws.onmessage = (message) => {this.handleWebSocketMessage(message);};
            this.ws.onclose = () => {this.emit('wsdisconnect');};
        } catch (error) {
            this.emit('error', error);
        }
    }
    wsEmitter(action, data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            try {
                this.ws.send(JSON.stringify(data));
            } catch (error) {
                this.emit('wserror', error);
            }
        } else {
            this.emit('wserror', new Error("WebSocket is not open"));
        }
    }


    async handleWebSocketMessage(message) {
        try {
            const response = JSON.parse(message.data)[0];
            if (response.ext && response.ext.ack !== undefined) {this.ack = response.ext.ack;}
            switch (this.msgid) {
                case 1: // Handshake
                    this.msgid++;
                    this.clientData.clientId = response.clientId;
                    this.wsEmitter("secondHandshake", secondHandshake(response.ext.timesync, this.clientData.clientId,this.msgid));
                    break;
                case 2: // Second handshake
                    console.log("case 2")                
                    this.msgid++;
                    this.wsEmitter("ping", ping(this.msgid, this.clientData.clientId, this.ack));
                    await delay(500);
                    this.msgid++;
                    this.wsEmitter("joinGame", joinGame(
                        this.clientData.pin,
                        this.clientData.nickname,
                        this.clientData.clientId,
                        this.msgid
                    ));
                    break;
                case 4:
                    console.log("444")
                    this.msgid++;
                    this.wsEmitter("ping", ping(this.msgid, this.clientData.clientId, this.ack + 1));
                    break;

                default:
                    this.msgid++;
                    if (response.data && response.data.type === "loginResponse") {
                        console.log("hi");
                        this.wsEmitter("afterJoinGame", afterJoinGame(this.clientData.pin, this.msgid, this.clientData.clientId));
                        this.emit('joined');
                    } else {
                        console.log("Unhandled response", response);
                    }
                    break;
            }
        } catch (error) {
            this.emit('wserror', error);
        }
    }
}