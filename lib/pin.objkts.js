const getBlockedObj = require("./get.blocked.obj");
const getBlockedTz = require("./get.blocked.tz");
const pin = require("./ipfs.pin");
const assets = ["artifact_uri", "display_uri", "metadata", "thumbnail_uri"];
const config = require("../config");

module.exports = async (objkts, afterEach) => {
  const [oblock, wblock] = await Promise.all([getBlockedObj(), getBlockedTz()]);
  const good_items = objkts.filter(
    (o) => !oblock.includes(o.id) && !wblock.includes(o.creator_id)
  );
  const bad_items = objkts.filter(
    (o) => oblock.includes(o.id) || wblock.includes(o.creator_id)
  );

  for (let i = 0; i < good_items.length; i++) {
    let item = good_items[i];
    let failure = false;
    for (let a = 0; a < assets.length; a++) {
      let key = assets[a];
      let hash = item[key];
      if (!hash) {
        console.error(`🚨 objkt has no value for ${key}`, item);
        continue;
      }
      if (config.ignore.includes(hash)) {
        console.log(`✅ ignored ${hash}`);
        continue;
      }
      let result = await pin(hash, "add", `${item.id}-${key}`);
      if (!result) failure = true;
    }
    if (!failure && afterEach) await afterEach(item.id, "add");
  }
  for (let i = 0; i < bad_items.length; i++) {
    let item = bad_items[i];
    let failure = false;
    for (let a = 0; a < assets.length; a++) {
      let key = assets[a];
      let hash = item[key];
      if (!hash) {
        console.error(`🚨 objkt has no value for ${key}`, item);
        continue;
      }
      if (config.ignore.includes(hash)) {
        console.log(`✅ ignored ${hash}`);
        continue;
      }
      let result = await pin(item[key], "rm", `${item.id}-${key}`);
      if (!result) failure = true;
    }
    if (!failure && afterEach) await afterEach(item.id, "rm");
  }
};
