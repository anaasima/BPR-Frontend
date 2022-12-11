module.exports.getUserDetails = () => {
  if (localStorage.getItem("app-token") === null) {
    return { name: "" };
  }
  return JSON.parse(atob(localStorage.getItem("app-token").split(".")[1]));
};
