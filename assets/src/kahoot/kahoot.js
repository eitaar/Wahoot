import { EventEmitter } from "events";
import { createHandshake, secondHandshake, joinGame, ping, afterJoinGame } from "./template";
import { delay } from "./other";

export class Client extends EventEmitter {
    constructor() {
        super();
        this.ws = null;
        this.ack = 0;
        this.msgid = 1;
        this.clientData = { "pin": undefined, "nickname": undefined, "clientId": undefined, "cid": undefined };
        this.gameData = undefined;
    }

    async getGameData(gamePin) {
        try {
            const response = await fetch(`/api/getGameToken/?pin=${gamePin}`);
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
            await this.getGameData(gamePin);
            return this.gameData.status === 200;
        } catch (error) {
            this.emit('error', error);
            return false;
        }
    }

    async join(gamePin, nickName) {
        this.clientData.nickname = nickName;
        try {
            await this.getGameData(gamePin);
            if (this.gameData.status !== 200) {
                this.emit('error', new Error("Invalid game pin"));
                return;
            }
            this.clientData.pin = gamePin;
            this.defineWebSocket(gamePin, this.gameData.gameToken);
        } catch (error) {
            this.emit('error', error);
        }
    }

    defineWebSocket(gamePin, gameToken) {
        try {
            this.ws = new WebSocket(`wss://kahoot.it/cometd/${gamePin}/${gameToken}`);
            this.ws.onopen = () => {
                this.wsHandler('handshake', createHandshake());
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
            this.emit('error', error);1
        }
    }

    wsHandler(action, data) {
        try {
            this.ws.send(JSON.stringify(data));
        } catch (error) {
            this.emit('wserror', error);
        }
    }

    async handleWebSocketMessage(message) {
        try {
            const response = JSON.parse(message.data)[0];
            if (response.ext && response.ext.ack !== undefined) {
                this.ack = response.ext.ack;
            }
            switch (this.msgid) {
                case 1:
                    this.clientData.clientId = response.clientId;
                    console.log(this.clientData.clientId);
                    this.wsHandler("secondHandshake", secondHandshake(response.ext.timesync, this.clientData.clientId));
                    this.msgid++;
                    break;
                case 2:
                    this.msgid++;
                    this.wsHandler("ping", ping(this.msgid, this.clientData.clientId, this.ack));
                    await delay(500);
                    this.msgid++;
                    this.wsHandler("joinGame", joinGame(
                        this.clientData.pin,
                        this.clientData.nickname.replace(/\\u([\dA-Fa-f]{4})/g, (match, grp) => String.fromCharCode(parseInt(grp, 16))),
                        this.clientData.clientId,
                        this.msgid
                    ));
                    break;
                case 4:
                    this.msgid++;
                    console.log("444444444444444");
                    this.wsHandler("ping", ping(this.msgid, this.clientData.clientId, this.ack + 1));
                    break;
                default:
                    this.msgid++;
                    if (response.data && response.data.type === "loginResponse") {
                        this.wsHandler("afterJoinGame", afterJoinGame(this.clientData.pin, this.msgid, this.clientData.clientId));
                        this.emit('joined');
                    } else {
                        console.log(response);
                    }
                    this.msgid++;
                    break;
            }
        } catch (error) {
            this.emit('wserror', error);
        }
    }
}
