const Web3 = require("web3");
const web3 = new Web3();

const address = "0xeCa85E2b195A7669EAdA8919D59e29Ec2a55a4"; // Replace with your address
const checksummedAddress = web3.utils.toChecksumAddress(address);

console.log(checksummedAddress);
