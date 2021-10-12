module.exports = function sleep(ms) {
  console.log(`sleeping ${ms / 1000} seconds...`);
  return new Promise((resolve) => setTimeout(resolve, ms));
};
