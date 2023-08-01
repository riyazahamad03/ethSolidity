const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface,bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'quality gown pistol infant bleak bench destroy clean review flag popular blind',
  // the above mnemonic is metamask's phrase
  'https://goerli.infura.io/v3/2c796a5fc99c49078b80cece0509b561'
  //above url is genreated from infura website..
)
const web3 = new Web3(provider);

const deploy = async ()=>{
  const account = await web3.eth.getAccounts();
  console.log(account[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({
    data:bytecode,
    arguments : ['Hi There!']
  })
  .send({
    gas : '1000000',
    from : account[0]
  })
  console.log('Contact deployed to ',result.options.address);
  provider.engine.stop()
}
deploy();
