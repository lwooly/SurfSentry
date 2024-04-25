import { addRegionToDB } from "../../../lib/apiFunctions/regions/queries.js";
import { addSurfSpotToDB } from "../../../lib/apiFunctions/surfSpots/queries.js";
import { fetchSpots } from "./fetchSpots.js";
import { getUKRegionsAndSpots } from "./getUKRegionsAndSpots.js";
import { processRegions } from "./processRegions.js";
import { processSpots } from "./processSpots.js";


const getSurflineTaxonomy = async () => {
  const surflineRegions = await getUKRegionsAndSpots()

  // filter for spots and regions only. Genonames excluded for now.
  const regionsArr = [];
  const spotsArr = [];
  surflineRegions.forEach((item) => {
    if (item.type === "spot") {
      spotsArr.push(item);
    } else if (item.type === 'region' || item.type === 'subregion'){
      regionsArr.push(item);
    }
  });

  // save regions array database
  const regions = processRegions(regionsArr);

  try {
    const results = await Promise.all(
      await regions.map(async (region) => {
        try {
          await addRegionToDB(region);
          return { success: true };
        } catch (err) {
          console.log(err)
          return { success: false, error: err };
        }
      })
    );

    // Check results to log successes and handle failures
    const successCount = results.filter(
      (result) => result.success !== false
    ).length;
    console.log("Total regions: ", regionsArr.length);
    console.log(`${successCount} regions successfully added to the database.`);
  } catch (err) {
    console.error("Error saving regions to DB");
  }

  // save spots to database
  const spots = processSpots(spotsArr);
  try {
    const results = await Promise.all(
      await spots.map(async (spot) => {
        try {
          await addSurfSpotToDB(spot);
          return { success: true };
        } catch (err) {
          return { success: false, error: err };
        }
      })
    );
    // Check results to log successes and handle failures
    const successCount = results.filter(
      (result) => result.success !== false
    ).length;
    console.log("Total spots: ", spotsArr.length);
    console.log(`${successCount} spots successfully added to the database.`);
  } catch (err) {
    console.error("Error saving spots to DB", err);
  }
};

getSurflineTaxonomy();
