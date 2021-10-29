const fetch = require("./fetch");
module.exports = () =>
  fetch(
    "https://raw.githubusercontent.com/hicetnunc2000/hicetnunc/main/filters/w.json",
    { json: true }
  );
