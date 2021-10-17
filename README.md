# hěn pīn 狠拼 (very together, much backup)

A H=N IPFS pinning tool.

## IPFS Pinning

Hic et Nunc (like most NFT platforms) stored the NFT data on IPFS. This is a network of decentralized file hosts. Every computer running an IPFS node is an edge caching server for the network as well as a host for specific (pinned) files. You can run your own website from IPFS if you like :)

There's a caveat with IPFS: If nobody is pinning a piece of content, it can expire from the network and be lost.

You can backup the Hic et Nunc platform (or just your own creations and collection, or that of your friends) by running an IPFS node and pinning the associated content.

This is a tool for pinning all of the creations and collections of a given tezos wallet.

1. Install and run IPFS: https://ipfs.io/#install
2. Git Clone this repository or download the release zip file
3. Make sure you have Node.js installed: http://nodejs.org
4. Pin collection/creations by wallet address:

```
node pin.js tz1iyFi4WjSttoja7Vi1EJYMEKKSebQyMkF9
```

or edit `pin.sh` to add your own addresses and run like so:

```
./pin.sh
```

## HENode

You can fun a full node of all H=N published assets by running

```
node henode.js
```

This will keep track of which files have already succesfully pinnned in a local state file (`.state.json`) and will resume from there on restarts.

![henode running](./docs/henode.png)

## File Stuck?

If the script hangs on a particular file (e.g. ipfs://QmdnQYJWkK2N5oVYhDY3GfX6kz4CG6bcXSbaLkRs8krF7u), you can try jiggling the proverbial handle on IPFS by loading the asset in the two main ipfs gateways:

https://cloudflare-ipfs.com/ipfs/QmdnQYJWkK2N5oVYhDY3GfX6kz4CG6bcXSbaLkRs8krF7u
https://ipfs.io/ipfs/QmdnQYJWkK2N5oVYhDY3GfX6kz4CG6bcXSbaLkRs8krF7u

just replace `QmdnQYJWkK2N5oVYhDY3GfX6kz4CG6bcXSbaLkRs8krF7u` with the troublesome hash. This worked for me after my local IPFS hung for a while, slow loading a few hashes. Once I routed the assets close to me via the two gateways above and restarting the pinning tool, it resolved quickly. This may just be me reading tea leaves late at night though with anecdotal evidence. Your mileage may vary. Give a shot and let me know if it works or not. Please file a bug or make a pull-request if you find any issues or have ideas for improvements.

## Under the Hood

this repo created by Adam Eivy @antic - https://tryshowtime.com/antic

Much thanks, very wow goes to https://hicdex.com/ (the underlying query api) by @marchingsquare - https://www.hicetnunc.xyz/marchingsquare
