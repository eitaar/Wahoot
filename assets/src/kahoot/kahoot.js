import { EventEmitter } from "events";
import { createHandshake, secondHandshake, joinGame, ackCreator, afterJoinGame,ping } from "./template"; 
import { delay } from "./other";

export class Client extends EventEmitter {
    constructor() {
        super();
        this.ws = null;
        this.ack = 0;
        this.msgid = 1;
        this.nickName = null;
        this.gamePin = null;
        this.clientId = null;
        this.eventId = {"handshake":1,"secondHandshake":2, "ackCreator":3,"join":4,"afterJoin":5};
    }

    async getGameData(gamePin) {
        try {
            const response = await fetch(`/api/getGameToken/?pin=${gamePin}`);
            const data = await response.json();
            return data;
        } catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    async checkPin(gamePin) {
        try {
            const data = await this.getGameData(gamePin);
            if (data.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            this.emit('error', error);
            return null; 
        }
    }

    async join(gamePin, nickName) {
        this.nickName = nickName;
        try {
            const gameData = await this.getGameData(gamePin);
            if (gameData.status !== 200) {
                this.emit('error', new Error("Invalid game pin"));
                return;
            }
            const gameToken = gameData.gameToken;
            this.connectWebSocket(gamePin, gameToken);
        } catch (error) {
            this.emit('error', error);
        }
    }

    connectWebSocket(gamePin, gameToken) {
        try {
            this.ws = new WebSocket(`wss://kahoot.it/cometd/${gamePin}/${gameToken}`);
            this.ws.onopen = () => {
                this.wsHandler('handshake', createHandshake());
                this.gamePin = gamePin;
            };
            this.ws.onerror = (error) => { this.emit('wserror', error); };
            this.ws.onmessage = (message) => { this.handleWebSocketMessage(message); };
            this.ws.onclose = () => { this.emit('wsdisconnect'); };
        } catch (error) {
            this.emit('error', error);
        }
    }

    wsHandler(action, data) {
        console.log(action);
        try {
            this.ws.send(JSON.stringify(data));
        } catch (error) {
            this.emit('wserror', error);
        }
    }

    handleWebSocketMessage(message) {
        try {
            const response = JSON.parse(message.data)[0];
            if (this.ack != null || response.ext.ack != undefined) {
                this.ack = response.ext.ack;
            }
            switch(this.msgid) {
                case 1:
                    this.clientId = response.clientId;
                    this.wsHandler("secondHandshake", secondHandshake(response.ext.timesync, this.clientId));
                    this.msgid++;
                    break;
                case 2:
                    this.msgid++;
                    this.wsHandler("ping", ackCreator(this.msgid, this.clientId, this.ack + 1));
                    delay(1000).then(() => {
                        this.msgid++;
                        this.wsHandler("joinGame", joinGame(this.gamePin, this.nickName, this.clientId, this.msgid));
                    }).catch(error => this.emit('wserror', error));
                    break;
                case 4:
                    console.log("case4",this.msgid)
                default:
                    this.msgid++;
                    if (response.data.cid != undefined && response.data.cid) {
                        console.log(this.msgid)
                        this.wsHandler("afterJoinGame", afterJoinGame(this.gamePin, this.msgid, this.clientId));
                        this.emit('joined');
                        break;
                    }
            }
        } catch (error) {
            this.emit('wserror', error);
        }
    }
    
}
