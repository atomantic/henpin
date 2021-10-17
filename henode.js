/**
 * HENode
 * persistent process that runs an IPFS cacher for all HEN tokens
 * bootstraps the whole network and then monitors new mints every 60 seconds
 *
 * additionally grabs updated blocklists to unpin/kill blocked items
 */

const fs = require("fs");

const getObjkts = require("./lib/get.objkts.all");
const pinObjkts = require("./lib/pin.objkts");

const stateFile = `${__dirname}/.state.json`;

let alreadyPinned = [];

const stateFileExists = fs.existsSync(stateFile);
if (!stateFileExists) {
  fs.writeFileSync(stateFile, JSON.stringify(alreadyPinned));
} else {
  alreadyPinned = JSON.parse(fs.readFileSync(stateFile).toString());
}

const pinNewObjkts = async () => {
  // call hicdex to get full list of objects
  const objkts = await getObjkts();
  const newObjkts = objkts.filter((o) => !alreadyPinned.includes(o.id));
  console.log(`✅ ${newObjkts.length.toLocaleString()} objkts to pin`);
  if (newObjkts.length) {
    await pinObjkts(newObjkts, (id) => {
      alreadyPinned.push(id);
      fs.writeFileSync(stateFile, JSON.stringify(alreadyPinned));
    });
  }
  // wait 1 minute before checking hicdex again
  setTimeout(pinNewObjkts, 60000);
};

(async () => {
  console.log(`running HENode with ${alreadyPinned.length} already synced`);
  await pinNewObjkts();
})();
