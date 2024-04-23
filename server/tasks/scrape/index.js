import axios, { all } from "axios";
import { JSDOM, VirtualConsole } from "jsdom";
import { getUserAgent } from "./config/userAgents.js";
import { getRandomInt } from "../../utils/getRandomInt.js";
import { canScrape } from "./robotsParser/index.js";
import async from "async";

const scrapeForLinks = async (TARGET_URL) => {
  console.log("Scraping....");

  const MASTER_URL = new URL(TARGET_URL);
  const ORIGIN = MASTER_URL.origin;
  const HOSTNAME = MASTER_URL.hostname;

  const URLS = new Set();
  const DISALLOWED_URLS = new Set();

  // Using async.queue to manage concurrency
  const queue = async.queue(async (task, done) => {
    await scrape(task.url);
    setTimeout(done, 2000)
  }, 2); // Concurrency level is 5, adjust as necessary

  queue.drain(() => {
    console.log("Scraping complete");
    console.log(URLS);
  });

  // Start scraping from the target URL
  queue.push({ url: TARGET_URL });

  // scrape function
  const scrape = async (url) => {
    // check and register url
    if (URLS.has(url) || DISALLOWED_URLS.has(url)) {
      return; //visited previously skip
    }

    //delay

    await new Promise(resolve => setTimeout(resolve, 2* 1000 + getRandomInt(30) * 1000))

    //check if useragent is allowed to scrape this path
    const isAllowed = await canScrape(url);
    if (!isAllowed) {
      console.log("not allowed to scrape:", url);
      DISALLOWED_URLS.add(url);
      return; // scrape of this url not allowed
    }

    // add link to URLS so not scraped again
    URLS.add(url);
    console.log('Scraped:', url)

    try {
      //get page
      const res = await axios.get(url, {
        headers: {
          "User-Agent": getUserAgent(),
          Referer: "https://www.google.com",
        },
      });

      //use jsdom to get all links from page
      //create js DOM virtual console to filter console output
      const dom = new JSDOM(res.data, { virtualConsole: new VirtualConsole() });
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
          queue.push({ url: fullUrl }); // Push new task to the queue
        }
      }
    } catch (err) {
      console.log("Link not scraped", url, err.code);
    }
  };
};

scrapeForLinks("https://www.surfline.com/");
