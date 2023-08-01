const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

// const provider = new HDWalletProvider(
//   "amused skate wreck awkward desk fiscal crop change tool high horn suit",
//   // the above mnemonic is metamask's phrase
//   "https://goerli.infura.io/v3/20bf75596439478fae87429adc1ad9a8"
//   //above url is genreated from infura website..
// );

const mnemonicPhrase =
  "amused skate wreck awkward desk fiscal crop change tool high horn suit";
let provider = new HDWalletProvider({
  mnemonic: mnemonicPhrase,
  providerOrUrl: "https://goerli.infura.io/v3/c70b8af7c7bd4668b805660719cf7ee0",
  // addressIndex: 0,
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });
  console.log(accounts);
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
