import { getRandomInt } from "../../../utils/getRandomInt.js";
import userAgentsObj from "./userAgents.json" assert { type: 'json' };

export const getUserAgent = () => {
    const randomNum = getRandomInt(userAgentsObj.length)

    const userAgent = userAgentsObj[randomNum]

    return userAgent.ua
}

console.log(getRandomInt(3000))

setTimeout(() => {}, 2 * 1000 + getRandomInt(30 * 1000));


