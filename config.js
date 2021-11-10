module.exports = {
  ignore: [
    // particularly absurdly large files that probably only I will want to back up
    // or otherwise troublesome files that are hanging up IPFS desktop...
    // if you are getting stuck with pinning and want to temporarily skip items,
    // you can add them here, then comment out if/when you want to try them again
    // "ipfs://QmdnQYJWkK2N5oVYhDY3GfX6kz4CG6bcXSbaLkRs8krF7u",
    // "ipfs://QmSFJfVCSH7DQ3rwYTq8LgRRUCs6EFt9sQKqpQHFW6P6QC",
  ],
  unstick: process.env.IPFS_UNSTICK || true,
  timeout: process.env.IPFS_PIN_TIMEOUT || "60s",
  local: process.env.IPFS_LOCAL || true,
  remoteservice : process.env.IPFS_PIN_REMOTESERVICE || "nickname",
  gateways: [
    "https://cloudflare-ipfs.com/ipfs/",
    "https://ipfs.infura.io/ipfs/",
    "https://ipfs.io/ipfs/",
  ],
};
