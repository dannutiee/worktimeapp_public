export const convertToHHMM = info => {
  var hrs = parseInt(Number(info));
  var min = Math.round((Number(info) - hrs) * 60);
  return hrs + ' hours ' + min + ' minutes';
};

export const convertToHM = info => {
  var hrs = parseInt(Number(info));
  var min = Math.round((Number(info) - hrs) * 60);
  return hrs + ' h ' + min + ' min';
};
