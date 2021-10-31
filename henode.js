/**
 * HENode
 * persistent process that runs an IPFS cacher for all HEN tokens
 * bootstraps the whole network and then monitors new mints every 60 seconds
 *
 * additionally grabs updated blocklists to unpin/kill blocked items
 */

const { pinned, save } = require("./lib/state");

const getObjkts = require("./lib/get.objkts.all");
const pinObjkts = require("./lib/pin.objkts");

const pinNewObjkts = async () => {
  // call hicdex to get full list of objects
  const objkts = await getObjkts();
  const newObjkts = objkts.filter((o) => !pinned.includes(o.id));
  console.log(`✅ ${newObjkts.length.toLocaleString()} objkts to pin`);
  if (newObjkts.length) {
    await pinObjkts(newObjkts, (id) => {
      pinned.push(id);
      save();
    });
  }
  // wait 1 minute before checking hicdex again
  setTimeout(pinNewObjkts, 60000);
};

(async () => {
  console.log(`running HENode with ${pinned.length} already synced`);
  await pinNewObjkts();
})();
