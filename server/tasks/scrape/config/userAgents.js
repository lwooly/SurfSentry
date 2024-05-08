import userAgentsObj from "./userAgents.json" assert { type: 'json' };

export const getUserAgent = () => {
    const randomNum = getRandomInt(userAgentsObj.length)

    const userAgent = userAgentsObj[randomNum]

    return userAgent.ua
}

