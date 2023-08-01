const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { abi, evm } = require('./compile');

provider = new HDWalletProvider(
  'quality gown pistol infant bleak bench destroy clean review flag popular blind',
  // the above mnemonic is metamask's phrase
  'https://goerli.infura.io/v3/2c796a5fc99c49078b80cece0509b561'
  //above url is genreated from infura website..
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
