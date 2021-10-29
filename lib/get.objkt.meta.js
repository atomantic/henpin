const fetch = require("./fetch");
module.exports = async (hash) => {
  return fetch(`https://cloudflare-ipfs.com/ipfs/${hash}`, { json: true });
};
