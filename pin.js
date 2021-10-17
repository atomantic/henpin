/**
 * This is a conseil using method of pinning
 * Rather than hitting the hicetnunc API
 * This method requires the process.env.CONSEIL_KEY environmental variable
 * AND requires node module dependencies
 *
 * if you are running an IPFS node,
 * you can pin the collection/creations of any tz address like so
 *
 * node pin.js tz1iyFi4WjSttoja7Vi1EJYMEKKSebQyMkF9
 */

const getBlockedObj = require("./lib/get.blocked.obj");
const getBlockedTz = require("./lib/get.blocked.tz");
const getObjkts = require("./lib/get.objkts.addr");
const pin = require("./lib/ipfs.pin");
// const sleep = require("./lib/sleep");

const tz = process.argv[2];

console.log(`⚡ fetching content for address ${tz}`);

const assets = ["artifact_uri", "display_uri", "metadata", "thumbnail_uri"];

const config = require("./config");

(async () => {
  const [oblock, wblock] = await Promise.all([getBlockedObj(), getBlockedTz()]);
  const objkts = await getObjkts(tz);
  const filtered = objkts.filter(
    (o) => !oblock.includes(o.id) && !wblock.includes(o.creator_id)
  );
  const blocked = objkts.filter(
    (o) => oblock.includes(o.id) || wblock.includes(o.creator_id)
  );

  for (let a = 0; a < assets.length; a++) {
    const key = assets[a];
    const good_items = filtered.map((o) => o[key]);
    console.log(`⚡ pinning ${good_items.length} ${key}`);
    for (let i = 0; i < good_items.length; i++) {
      if (config.ignore.includes(good_items[i])) continue;
      await pin(good_items[i], "add");
      // await sleep(10);
    }
    const bad_items = blocked.map((o) => o[key]);
    console.log(`⚡ unpinning ${bad_items.length} blocked ${key}`);
    for (let i = 0; i < bad_items.length; i++) {
      await pin(bad_items[i], "rm");
      // await sleep(1000);
    }
    // await sleep(1000);
  }
})();
