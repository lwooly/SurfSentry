import robotsParser from "robots-txt-parser";

const robots = robotsParser({
  userAgent: "*",
  allowOnNeutral: false,
});

let robotsCache;


export const getDisallowedPaths = async (origin) => {

    if (robotsCache) {
        return robotsCache;
    }
  try {
    // get and cache robots.txt for origin
    const res = await robots.useRobotsFor(origin);
   


    //check for any useragent
    const disallowedPaths = res['*'].disallow
    robotsCache = disallowedPaths;
    return disallowedPaths

  } catch (err) {
    console.log("Error fetching or parsing robots.txt:", err);
  }
};
