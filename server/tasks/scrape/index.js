import axios from "axios";
import { JSDOM, VirtualConsole } from "jsdom";

const scrapeForLinks = async () => {
  const websiteLinks = new Set();

  // url of website to scrape
  const scrape = async (targetUrl) => {
    // create url
    const url = new URL(targetUrl);

    // if link has not been scraped already - scrape
    if (!websiteLinks.has(url.href)) {
      // add link to websiteLinks so not scraped again
      websiteLinks.add(url.href);

      try {
        //get page
        const res = await axios.get(url.href);

        // Create a custom virtual console
        const virtualConsole = new VirtualConsole();

        //use jsdom to get all links from page
        const dom = new JSDOM(res.data, { virtualConsole });
        const { document } = dom.window;
        const links = document.querySelectorAll("a");

        // iterate through all links found
        links.forEach((link) => {
          const { href } = link;

          // Check if the link is from the same site
          const isSiteLink =
            href.startsWith("/") || href.startsWith(url.origin);
          if (isSiteLink) {
            const fullUrl = href.startsWith(url.origin)
              ? href
              : url.origin + href; // add origin to href
            scrape(fullUrl); // Recursively scrape site links
            console.log("Link scraped:", fullUrl);
          }
        });
      } catch (err) {
        console.log("Link not scraped", url.href, err.code);
      }
    }
  };

  await scrape("https://www.thejump.tech");

  console.log('/n /n /n /n Links found:', websiteLinks.values());
};

scrapeForLinks()
