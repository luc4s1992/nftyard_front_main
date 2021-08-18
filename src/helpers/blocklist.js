// Add Metatag hash to block NFT
const blocklist = [
  "QmWnedDyZ1tUJFdnM8Wo3c5Ng3demhRyPD55vUmpW4nTin",
  "QmeJBv29R5mzEo9prWZ1NDPfPDrwDPsPwSpCVFuPirGC3e",
  "QmaGbcfzfhtgAxANh33D8nafk4G5u6Fp16r4cAEbvrUcWb",
  "QmNszhqj2NRHSGsEGqhLRrtpDhYuN364zKCwzHJqWdpow8",
  "QmWRuANKsimRNgt16b8CymWyDgKioN9jZuvBHHxujRkQRA",
  "QmUyP5ejpZYZbD57QJmyDc1xdHVpCPpw1Ltz3nJWqRZ9ML",
  "QmWaKBZDWt3n6aUep6yebCmVe39JgtQHFBtTxgWWDpFTaA",
];

export default function isBlocklisted(hash) {
  return blocklist.indexOf(hash) >= 0;
}
