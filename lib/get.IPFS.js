const fetch = require("./fetch");
module.exports = (hash) =>
  fetch("https://cloudflare-ipfs.com/ipfs/" + hash, { json: true });
