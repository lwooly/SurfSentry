import { fetchSpots } from "./fetchSpots.js";

export const EUROPE_GEONAME_ID = "58f7eef8dadb30820bb5601b";


//Function to get regions and associated spots for the UK

export const getUKRegionsAndSpots = async () => {
  const res = await fetchSpots(EUROPE_GEONAME_ID, 2);
  const surflineRegions = Array.from(res.contains);

  const types = [];
  //Note regions are not provided by surfline in their structure. Only subregions.
  const subregions = surflineRegions.filter((area) => {
    return area.type === "subregion";
  });

  // now from the subregions find the regions. (parent)
  const regionIds = [];
  subregions.forEach((subregion) => {
    subregion?.liesIn.forEach((parentId) => {
      if (!regionIds.includes(parentId)) {
        regionIds.push(parentId);
      }
    });
  });

  const regions = [];

  await Promise.all(
    regionIds.map(async (regionId) => {
      const res = await fetchSpots(regionId, 3);

      //for now only include regions which are in the uk
      if (
        (res.type === "region" && res.name === "Wales") ||
        res.name === "England" ||
        res.name === "Scotland" ||
        res.name === "Northern Ireland"
      ) {
        regions.push(res);
      }
    })
  );

  //create results array containing all regions, subregions and spots
  const result = []
  const uniqueIds = new Set()

  //add unique regions to results array
  regions.forEach((region) => {
    if (!uniqueIds.has(region._id)) {
      uniqueIds.add(region._id)
      result.push(region)
    }
  })

  // now get all unique subregions and spots for these regions
  regions.forEach((region) => {
    region.contains.forEach(item => {
      if (!uniqueIds.has(item._id)) {
        uniqueIds.add(item._id)
        result.push(item)
      }
    }
  )})
      
  return result
};
