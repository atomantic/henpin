/**
 * attempts long-running background curl to fetch assets from ipfs gateways
 **/
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { timeout } = require("../config");

module.exports = async ({ hash, prefix }) => {
  console.log(
    `⚡ ${prefix} running unstick\t ${hash}... (will retry pin when loaded)`
  );
  await exec(
    `curl https://cloudflare-ipfs.com/ipfs/${hash} &> /dev/null`
  ).catch((e) => e);
  console.log(`✅ ${prefix} cloudflare unstuck\t ${hash}...`);
  await exec(`curl https://ipfs.io/ipfs/${hash} &> /dev/null`).catch((e) => e);
  console.log(`✅ ${prefix} ipfs.io unstuck\t ${hash}...`);
  // attempt again
  console.log(`⚡${prefix}\t add ${hash}`);

  const { stdout, stderr } = await exec(
    `ipfs pin add ${hash} --timeout ${timeout}`
  ).catch((e) => e);
  if (stderr) {
    console.error(`🚨 error on ${hash}`, stderr);
    return;
  }
  if (stdout) console.log(`✅${prefix}\t`, stdout.replace("\n", ""));
};
