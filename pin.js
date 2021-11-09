/**
 * This is the main entrypoint for pinning all creations/collections by a single address
 *
 * if you are running an IPFS node,
 * you can pin the collection/creations of any tz address like so
 *
 * node pin.js tz1iyFi4WjSttoja7Vi1EJYMEKKSebQyMkF9
 */
require("console-stamp")(console, {
  format: ":date(yyyy-mm-dd HH:MM:ss.l)",
});
const getObjkts = require("./lib/get.objkts.addr");
const pinObjkts = require("./lib/pin.objkts");

(async () => {
  const tz = process.argv[2];
  const objkts = await getObjkts(tz);
  await pinObjkts(objkts);
})();
