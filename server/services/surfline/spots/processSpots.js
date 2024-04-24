export const processSpots = (spotsArr) => {
  const mappedArr = spotsArr.map((item) => {
    //Mapped item structure
    const mappedItem = {
      surfline_id: item.spot,
      spotRef: item._id,
      category: item.category,
      hasSpots: item.hasSpots,
      liesIn: item.liesIn ? item.liesIn.join(", ") : null,
      spotLocation: JSON.stringify(item.location),
      spotname: item.name,
      updatedAt: item.updatedAt,
      depth: item.depth,
    };
    return mappedItem;
  });

  return mappedArr;
};
