/**
 * attempts long-running background curl to fetch assets from ipfs gateways
 **/
const fetch = require("./fetch");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { gateways } = require("../config");
const fs = require("fs");

module.exports = async ({ hash, prefix }) => {
  console.log(`⚡ ${prefix} running unstick\t ${hash}...`);

  // try each gateway in order until one succeeds
  let success = true;
  for (let i = 0; i < gateways.length; i++) {
    const baseURL = gateways[i];
    console.log(`⚡ attempting download from ${baseURL}${hash}`);
    await fetch(`${baseURL}${hash}`, { toFile: hash }).catch((e) => {
      console.error(e);
      success = false;
    });
    if (success) {
      console.log(`✅ ${prefix}\t downloaded from ${baseURL}${hash}`);
      console.log(`⚡ ${prefix}\t add ${hash}`);
      const { stderr } = await exec(`ipfs add ${hash}`).catch((e) => e);
      fs.unlinkSync(hash);
      if (stderr) {
        return console.error(`🚨 error on ${hash}`, stderr);
      }
      return console.log(`✅ ${prefix}\tadded`);
    }
  }
  if (!success) {
    return console.error(
      `🚨 ${prefix}\t ${hash} could not be downloaded from any of the provided gateways`
    );
  }
};
