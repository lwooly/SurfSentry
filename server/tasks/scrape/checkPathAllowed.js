import { getDisallowedPaths } from "./robotsParser/index.js"


export const checkPathAllowed = async (url, ORIGIN) => {

    console.log('origin dddd', ORIGIN)
//   // Get disallowed paths from robots.txt file
const disallowedPaths = await getDisallowedPaths(ORIGIN)

console.log('disaksflakga', disallowedPaths)

    const result = disallowedPaths.some(disallowedPath => {
        console.log(disallowedPath.path)
        console.log('path allowed',disallowedPath.path.test(url))
    });

    console.log('result', result)
    return result;
}