export const formatDate = (date = new Date(), separationChar = '.') => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day < 10 ? `0${day}` : day}${separationChar}${month}${separationChar}${year}`;
};
