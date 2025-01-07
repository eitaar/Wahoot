let l = 0;
let o = 0;
let gamePin = '';
let clientId = '';

function createHandshake() {
    return [{
        "id": "1",
        "version": "1.0",
        "minimumVersion": "1.0",
        "channel": "/meta/handshake",
        "supportedConnectionTypes": ["websocket", "long-polling", "callback-polling"],
        "advice": { "timeout": 60000, "interval": 0 },
        "ext": {
            "ack": true,
            "timesync": { "tc": Date.now(), "l": 0, "o": 0 }
        }
    }];
}

function secondHandshake(serverTime, clientid, msgId) {
    l = Math.round((Date.now() - serverTime.tc - serverTime.p) / 2);
    o = serverTime.ts - serverTime.tc - l;
    console.log(l, o);
    clientId = clientid;
    return [{
        "id": msgId.toString(),
        "channel": "/meta/connect",
        "connectionType": "websocket",
        "advice": { "timeout": 0 },
        "clientId": clientId,
        "ext": {
            "ack": 0,
            "timesync": { "tc": Date.now(), "l": l, "o": o }
        }
    }];
}

function ping(msgId, ack) {
    return [{
        "id": msgId.toString(),
        "channel": "/meta/connect",
        "connectionType": "websocket",
        "clientId": clientId,
        "ext": {
            "ack": ack,
            "timesync": {
                "tc": Date.now(),
                "l": l,
                "o": o
            }
        }
    }];
}

function afterJoinGame(msgId) {
    return [{
        "id": msgId.toString(),
        "channel": "/service/controller",
        "data": {
            "gameid": gamePin.toString(),
            "type": "message",
            "host": "kahoot.it",
            "id": 16,
            "content": "{\"usingNamerator\":true}"
        },
        "clientId": clientId,
        "ext": {}
    }];
}

function joinGame(gamepin, nickName, msgId) {
    gamePin = gamepin.toString();
    return [{
        "id": msgId.toString(),
        "channel": "/service/controller",
        "data": {
            "type": "login",
            "gameid": gamePin,
            "host": "kahoot.it",
            "name": nickName.toString(),
            "content": JSON.stringify({
                "device": {
                    "userAgent": navigator.userAgent,
                    "screen": {
                        "width": screen.width.toString(),
                        "height": screen.height.toString()
                    }
                }
            })
        },
        "clientId": clientId,
        "ext": {}
    }];
}

function changeCostumeTemplate(cos1, cos2, msgId) {
    return [{
        "id": msgId.toString(),
        "channel": "/service/controller",
        "data": {
            "gameid": gamePin.toString(),
            "type": "message",
            "host": "kahoot.it",
            "id": 46,
            "content": `{"avatar":{"type":"${cos1.toString()}","item":"${cos2.toString()}"}}`
        },
        "clientId": clientId,
        "ext": {}
    }];
}

function answerTemplate(choice, gameBlockType, questionIndex, msgId) {

    return [{
        "id": msgId.toString(),
        "channel": "/service/controller",
        "data": {
            "gameid": gamePin.toString(),
            "type": "message",
            "host": "kahoot.it",
            "id": 45,
            "content": `{"type":"${gameBlockType}","choice":${JSON.stringify(choice)},"questionIndex":${questionIndex}}`
        },
        "clientId": clientId,
        "ext": {}
    }];
}

export {
    createHandshake, secondHandshake, joinGame, ping, afterJoinGame, changeCostumeTemplate, answerTemplate
};
