module.exports.convertDate = (date) => {
  if (date === null || date === undefined) {
    return null;
  }

  return `${date.substring(8, 10)}-${date.substring(5, 7)}-${date.substring(
    0,
    4
  )} ${date.split("T")[1].substring(0, 5)}`;
};

module.exports.calculateTodayDateAsString = () => {
  const today = new Date();
  const todayYear = today.getFullYear();

  const todayMonthAsInt = today.getMonth() + 1;
  const todayMonth =
    todayMonthAsInt > 9 ? todayMonthAsInt : "0" + todayMonthAsInt;

  const todayDateAsInt = today.getDate();
  const todayDate = todayDateAsInt > 9 ? todayDateAsInt : "0" + todayDateAsInt;

  return `${todayYear}-${todayMonth}-${todayDate}`;
};
