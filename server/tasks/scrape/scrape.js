// scrape function
const scrape = async (targetUrl) => {
    //create js DOM virtual console to filter console output
    // Create a custom virtual console
    const virtualConsole = new VirtualConsole();

    // create url
    const url = new URL(targetUrl);


    // if link has been scraped already
    if (websiteLinks.has(url.href)) {
        console.log('link exists')
      return; //visited previously skip
    }
    // add link to websiteLinks so not scraped again
    websiteLinks.add(url.href);

    console.log(websiteLinks)

    //set timeout to rate limit requests to server
    const timeDelay = 2 * 1000 + getRandomInt(30 * 1000)
    await setTimeout(() => {console.log(timeDelay /1000, 'seconds delay')}, timeDelay);

    try {
      //get page
      const res = await axios.get(url.href, {
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
        const isSiteLink = href.startsWith("/") || href.startsWith(url.origin);
        if (isSiteLink) {
          const fullUrl = href.startsWith(url.origin)
            ? href
            : url.origin + href; // add origin to href
          promises.push(scrape(fullUrl)); // Recursively scrape site links
          console.log("Link scraped:", fullUrl);
        }
      };


    } catch (err) {
      console.log("Link not scraped", url.href, err.code);
    }
  };