const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "campaign.sol");
const source = fs.readFileSync(campaignPath, "utf-8");

const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

console.log(output);
for (let contract in output) {
  const contractFileName = contract.replace(":", ""); // Remove the colon from the contract name
  fs.writeJsonSync(
    path.resolve(buildPath, `${contractFileName}.json`),
    output[contract]
  );
}
