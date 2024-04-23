import axios from "axios";
import robotsParser from "robots-parser";

const cache = {};

export const canScrape = async (url) => {
  // get robots.txt file
  const DOMAIN = new URL(url).origin;
  const robotsUrl = `${DOMAIN}/robots.txt`;

  let robotsTextFile;

  if (cache[robotsUrl]) {
    robotsTextFile = cache[robotsUrl];
  } else {
    console.log('robots.txt not cached. Fetching...')
    try {
      // fetch robots.txt file
      const res = await axios.get(robotsUrl);
      robotsTextFile =  res.data
      //cache
      cache[robotsUrl] = robotsTextFile
      console.log("Robots.txt fetched");
    } catch (err) {
      console.log("Robots.txt not found - check if domain valid");
      return false; // safely exit, avoiding any unauthorized paths
    }
  }

  const robots = robotsParser(robotsUrl, robotsTextFile)

  const isAllowed = robots.isAllowed(url, '*');

  return isAllowed
};
