const fetch = require("./fetch");
module.exports = () =>
  fetch(
    "https://raw.githubusercontent.com/hicetnunc2000/hicetnunc/main/filters/o.json",
    { json: true }
  );
