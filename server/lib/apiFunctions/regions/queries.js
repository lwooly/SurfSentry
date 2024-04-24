import * as db from "../../../db/index.js";

export const addRegionToDB = async (region) => {
  const {
    id,
    regionName,
    regionType,
    category,
    hasSpots,
    liesIn,
    depth,
    updatedAt,
    latitude,
    longitude,
    fcode,
    fclName,
    fcodeName,
    enumeratedPath,
    subregionId,
  } = region;

  const text = `INSERT INTO regions (
        id,
        regionName,
        regionType,
        category,
        hasSpots,
        liesIn,
        depth,
        updatedAt,
        latitude,
        longitude,
        fcode,
        fclName,
        fcodeName,
        enumeratedPath,
        subregionId
    ) 
        VALUES (
            $1, 
            $2, 
            $3, 
            $4, 
            $5, 
            $6, 
            $7, 
            $8, 
            $9, 
            $10, 
            $11, 
            $12, 
            $13, 
            $14, 
            $15
        )`;
  const values = [
    id,
    regionName,
    regionType,
    category,
    hasSpots,
    liesIn,
    depth,
    updatedAt,
    latitude,
    longitude,
    fcode,
    fclName,
    fcodeName,
    enumeratedPath,
    subregionId,
  ];
  const data = await db.query(text, values);
  return data.rows;
};
