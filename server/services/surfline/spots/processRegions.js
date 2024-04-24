export const processRegions = (regionsArr) => {

   const mappedArr = regionsArr.map(item => {

        //Mapped item structure
        const mappedItem = {
            id: item._id,
            regionName: item.name,
            regionType: item.type,
            category: item.category,
            hasSpots: item.hasSpots,
            liesIn: item.liesIn ? item.liesIn.join(', ') : null,
            depth: item.depth,
            updatedAt: item.updatedAt || null,
            latitude: null,
            longitude: null,
            fcode: null,
            fclName: null,
            fcodeName: null,
            enumeratedPath: item.enumeratedPath || null,
            subregionId: null,
        }

        if (item.type === 'geoname') {
            mappedItem.latitude = item.geonames.lat;
            mappedItem.longitude = item.geonames.lng;
            mappedItem.fcode = item.geonames.fcode;
            mappedItem.fclName = item.geonames.fclName;
            mappedItem.fcodeName = item.geonames.fcodeName;
        }  else if (item.regionType === 'subregion') {
            // Subregions might not have direct lat/lng
            mappedItem.subregionId = item.subregion;
        }

        return mappedItem
    });

    return mappedArr;

}