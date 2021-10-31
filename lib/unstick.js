/**
 * attempts long-running background curl to fetch assets from ipfs gateways
 **/
const fetch = require("./fetch");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { gateways } = require("../config");
const fs = require("fs");

module.exports = async ({ hash, prefix }) => {
  console.log(`⚡ ${prefix}\trunning unstick\t ${hash}...`);

  // try each gateway in order until one succeeds
  let success = true;
  for (let i = 0; i < gateways.length; i++) {
    const baseURL = gateways[i];
    console.log(`⚡ ${prefix}\tattempting download from ${baseURL}${hash}`);
    await fetch(`${baseURL}${hash}`, { toFile: hash }).catch((e) => {
      console.error(e);
      success = false;
    });
    if (success) {
      console.log(`✅ ${prefix}\tdownloaded from ${baseURL}${hash}`);
      console.log(`⚡ ${prefix}\tipfs add ${hash}`);
      const { stderr, stdout } = await exec(`ipfs add ${hash}`).catch((e) => e);
      // console.log({ stderr, stdout });
      fs.unlinkSync(hash);
      if (!stdout.includes(`added ${hash} ${hash}`)) {
        console.error(`🚨 ${hash}`, stderr, stdout);
        return false;
      }
      console.log(`✅ ${prefix}\tadded`);
      return true;
    }
  }
  if (!success) {
    console.error(
      `🚨 ${prefix}\t ${hash} could not be downloaded from any of the provided gateways`
    );
    return false;
  }
  return true;
};
