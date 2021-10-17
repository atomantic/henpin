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
    if (config.ignore.includes(good_items[i])) continue;
    let failure = false;
    for (let a = 0; a < assets.length; a++) {
      let result = await pin(
        good_items[i][assets[a]],
        "add",
        `${good_items[i].id}-${assets[a]}`
      );
      if (!result) failure = true;
    }
    if (!failure && afterEach) await afterEach(good_items[i].id, "add");
  }
  for (let i = 0; i < bad_items.length; i++) {
    if (config.ignore.includes(bad_items[i])) continue;
    let failure = false;
    for (let a = 0; a < assets.length; a++) {
      let result = await pin(
        bad_items[i][assets[a]],
        "rm",
        `${bad_items[i].id}-${assets[a]}`
      );
      if (!result) failure = true;
    }
    if (!failure && afterEach) await afterEach(bad_items[i].id, "rm");
  }
};
