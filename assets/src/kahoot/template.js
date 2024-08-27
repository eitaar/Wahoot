let l;
let o;

function createHandshake() {
    return [{
        "id": "1",
        "version": "1.0",
        "minimumVersion": "1.0",
        "channel": "/meta/handshake",
        "supportedConnectionTypes": ["websocket", "long-polling", "callback-polling"],
        "advice": {"timeout": 60000, "interval": 0},
        "ext": {
            "ack": true,
            "timesync": {"tc": Date.now(), "l": 0, "o": 0}
        }
    }];
}

function secondHandshake(serverTime, clientId) {
    l = Math.round((Date.now() - serverTime.tc - serverTime.p) / 2);
    o = serverTime.ts - serverTime.tc - l;
    return [{
        "id": "2",
        "channel": "/meta/connect",
        "connectionType": "websocket",
        "advice": {"timeout": 0},
        "clientId": clientId,
        "ext": {
            "ack": 0,
            "timesync": {"tc": Date.now(), "l": l, "o": o}
        }
    }];
}

function ping(msgid, clientId, ack) {
    return [{
        "id": msgid,
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

function afterJoinGame(gamePin, msgid, clientId) {
    return [{
        "id": msgid,
        "channel": "/service/controller",
        "data": {
            "gameid": gamePin,
            "type": "message",
            "host": "kahoot.it",
            "id": 16,
            "content": "{\"usingNamerator\":true}"
        },
        "clientId": clientId,
        "ext": {}
    }];
}

function joinGame(gamePin, nickName, clientId, msgid) {
    return [{
        "id": msgid,
        "channel": "/service/controller",
        "data": {
            "type": "login",
            "gameid": gamePin,
            "host": "kahoot.it",
            "name": nickName,
            "content": JSON.stringify({
                "device": {
                    "userAgent": navigator.userAgent,
                    "screen": {
                        "width": "1920",
                        "height": "1080"
                    }
                }
            })
        },
        "clientId": clientId,
        "ext": {}
    }];
}

export {
    createHandshake, secondHandshake, joinGame, ping, afterJoinGame
}
