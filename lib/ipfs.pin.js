const util = require("util");
const exec = util.promisify(require("child_process").exec);

module.exports = async (key, method = "add", prefix = "") => {
  const hash = key.replace("ipfs://", ""); // just the id
  if (process.env.DRY) {
    return console.log(`dry run, not pinning: `, method, key);
  }
  console.log(`⚡`, method, key);
  const { stdout, stderr } = await exec(`ipfs pin ${method} ${hash}`).catch(
    (e) => e
  );
  // not pinned is a valid state when rm is used
  if (stderr && !stderr.includes("not pinned"))
    console.error(`🚨 error with ${hash}`, stderr);
  if (stdout)
    console.log(
      method === "add" ? `✅${prefix ? ` ${prefix}\t` : ""}` : `🗑️ `,
      stdout.replace("\n", "")
    );
};
