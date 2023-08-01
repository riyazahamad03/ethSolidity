const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { abi, evm } = require('./compile');

provider = new HDWalletProvider(
  'amused skate wreck awkward desk fiscal crop change tool high horn suit',
  // the above mnemonic is metamask's phrase
  'https://goerli.infura.io/v3/20bf75596439478fae87429adc1ad9a8'
  //above url is genreated from infura website..
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object})
    .send({ gas: '1000000', from: accounts[0] });
  console.log(abi);
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
