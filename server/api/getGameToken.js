export default defineEventHandler(async (event) => {
    const query = await getQuery(event);
    const pin = query.pin;
    let data = {};
    let responseStatus = 200;
    let sessionToken;
    let gameToken;
    try {
        const gameDataResponse = await fetch(`https://kahoot.it/reserve/session/${pin}?{Date.now()}`);
        if (gameDataResponse.status === 404) {return {status: 404, error: "Invalid pin"};}
        data = await gameDataResponse.json();
        sessionToken = gameDataResponse.headers.get('x-kahoot-session-token');
        gameToken = getToken(sessionToken, data.challenge);
    } catch (error) {
        return {status: 404, error: error}
    }
    
    function decodeSessionToken(sessionToken, message, offsetEquation) {
        const r = reserveChallengeToAnswer(message, offsetEquation);
        const decodedString = atob(sessionToken);
        return xorString(decodedString, r);
    }

    function xorString(input, key) {
        return input.split('').map((char, index) => {
            const charCode = char.charCodeAt(0);
            const keyCode = key.charCodeAt(index % key.length);
            return String.fromCharCode(charCode ^ keyCode);
        }).join('');
    }

    function extractMessageAndOffset(challenge) {
        const equalsIndex = challenge.indexOf('=');
        const offsetEquation = challenge.slice(equalsIndex + 1).split(';')[0].trim();
        const messageMatch = challenge.match(/'(\d*[a-z]*[A-Z]*)\w+'/);
        const message = messageMatch ? messageMatch[0].slice(1, -1) : "";
        return {message,offsetEquation};
    }

    function reserveChallengeToAnswer(message, offsetEquation) {
        // Safely evaluate the offset equation using Function constructor (safer than eval)
        // The equation only contains position and mathematical operations
        return message.replace(/./g, (char, position) => {
            const charCode = char.charCodeAt(0);
            const offset = new Function('position', `return ${offsetEquation}`)(position);
            return String.fromCharCode(((charCode * position + offset) % 77) + 48);
        });
    }

    function getToken(sessionToken, challenge) {
        const { message, offsetEquation } = extractMessageAndOffset(challenge);
        return decodeSessionToken(sessionToken, message, offsetEquation);
    }

    return {status: 200,response: data,sessionToken,gameToken};
});
