import * as db from "../../../db/index.js";

export const getRegionsFromDB = async () => {
  const text =`SELECT * FROM regions;`
  const data = await db.query(text)
  return data.rows;
}

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
        region_name,
        region_type,
        category,
        has_spots,
        lies_in,
        depth,
        updated_at,
        latitude,
        longitude,
        fcode,
        fcl_name,
        fcode_name,
        enumerated_path,
        subregion_id
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
