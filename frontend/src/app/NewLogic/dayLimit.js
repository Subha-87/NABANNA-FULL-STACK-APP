export const isNew = (date) => {
  const createdDate = new Date(date);
  const now = new Date();

  // normalize both to SAME day (critical fix)
  createdDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffInDays = Math.floor(
    (now - createdDate) / (1000 * 60 * 60 * 24)
  );

  //console.log("DIFF DAYS:", diffInDays);

  return diffInDays >= 0 && diffInDays <= 10;
}