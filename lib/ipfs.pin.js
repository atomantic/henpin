const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { timeout, unstick } = require("../config");
const doUnstick = require("./unstick");

module.exports = async (key, method = "add", prefix = "") => {
  const hash = key.replace("ipfs://", ""); // just the id
  if (process.env.DRY) {
    return console.log(`dry run, not pinning: `, method, key);
  }
  console.log(`⚡${prefix ? ` ${prefix}\t` : ""} ${method} ${key}`);

  const { stdout, stderr } = await exec(
    `ipfs pin ${method} ${hash} --timeout ${timeout}`
  ).catch((e) => e);
  // not pinned is a valid state when rm is used
  if (stderr && !stderr.includes("not pinned")) {
    console.error(`⚠️  error with ${hash}`, stderr);
    if (
      unstick &&
      method === "add" &&
      (stderr.includes("context deadline exceeded") ||
        stderr.includes("merkledag: not found"))
    )
      await doUnstick({ hash, prefix });
    return;
  }
  if (stdout)
    console.log(
      method === "add" ? `✅${prefix ? ` ${prefix}\t` : ""}` : `🗑️ `,
      stdout.replace("\n", "")
    );
  return true;
};
