import axios from "axios";
import { JSDOM, VirtualConsole } from "jsdom";
import { getUserAgent } from "./config/userAgents.js";
import { getRandomInt } from "../../utils/getRandomInt.js";
import { getDisallowedPaths } from "./robotsParser/index.js";
import { checkPathAllowed } from "./checkPathAllowed.js";

const scrapeForLinks = async (TARGET_URL) => {
  console.log("Scraping....");

  const MASTER_URL = new URL(TARGET_URL);
  const ORIGIN = MASTER_URL.origin;
  const HOSTNAME = MASTER_URL.hostname;

  const URLS = new Set()
  // save new calls so can wait for them to finish before ending
  const promises = [];

  // scrape function
  const scrape = async (url) => {
    //create js DOM virtual console to filter console output
    // Create a custom virtual console
    const virtualConsole = new VirtualConsole();
    // check and register url
    if (URLS.has(url)) {
      return; //visited previously skip
    }
    // add link to URLS so not scraped again - TBC whether I want to include links that are not to be scraped. 
    URLS.add(url);
    console.log('Scraping', url)

    //check if useragent is allowed to scrape this path
    if (!checkPathAllowed(url, ORIGIN)) {
        return // scrape of this url not allowed
    }

    try {
      //get page
      const res = await axios.get(url, {
        headers: {
          "User-Agent": getUserAgent(),
          Referer: "https://www.google.com",
        },
      });

      //use jsdom to get all links from page
      const dom = new JSDOM(res.data, { virtualConsole });
      const { document } = dom.window;
      const links = document.querySelectorAll("a");

      // iterate through all links found
      for (const link of links) {
        const { href } = link;

        // Check if the link is from the same site
        const isSiteLink = href.startsWith("/") || href.startsWith(ORIGIN);
        if (isSiteLink) {
          const fullUrl = href.startsWith(ORIGIN) ? href : ORIGIN + href; // add origin to href
          // Asynchronously manage scraping to avoid too many concurrent processes
          promises.push(await scrape(fullUrl))
        }
      }
    } catch (err) {
      console.log("Link not scraped", url, err.code);
    }
  };

  await scrape(TARGET_URL);
  await Promise.all(promises)

  console.log('Scraping complete')
  console.log(URLS)
};

scrapeForLinks("https://www.scrapethissite.com/");
