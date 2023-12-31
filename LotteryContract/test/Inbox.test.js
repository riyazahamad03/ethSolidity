const assert = require('assert');
const ganace = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganace.provider());

const { abi, evm } = require('../compile');

let lottery;
let accounts;

beforeEach(async ()=> {
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(abi)
    .deploy({
      data : evm.bytecode.object
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    })
});

describe('Lottery Contract',()=>{
  it('deploys a contract',()=>{
    assert.ok(lottery.options.address);
  });

  it('allows one account to enter ', async()=>{
    await lottery.methods.enter().send({
      from:accounts[0],
      value: web3.utils.toWei('0.02','ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from:accounts[0]
    })

    assert.equal(accounts[0],players[0]);
    assert.equal(1,players.length);
  });

  it('allows Multiple account to enter ', async()=>{
    await lottery.methods.enter().send({
      from:accounts[0],
      value: web3.utils.toWei('0.02','ether')
    });


    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.02','ether')
    });


    await lottery.methods.enter().send({
      from:accounts[2],
      value: web3.utils.toWei('0.02','ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from:accounts[0]
    })

    assert.equal(accounts[0],players[0]);
    assert.equal(accounts[1],players[1]);
    assert.equal(accounts[2],players[2]);
    assert.equal(3,players.length);
  });

  it('Requires Minimum amount of ether',async()=>{
    try{
      await lottery.methods.enter().send({
        from : accounts[0],
        value : 200
      });
      assert(false)
    }catch(err){
      assert(err);
    }
  });

  it('Only manager can call' , async()=>{
    try{
      await lottery.methods.pickWinner().send({
        from:accounts[1]
      })
      assert(false);
    } catch(err){
      assert(err);
    }
  })

  it('Sends The Money and resets the player Array' , async()=>{
    await lottery.methods.enter().send({
      from:accounts[0],
      value: web3.utils.toWei('2','ether')
    });
    const initialBal = await web3.eth.getBalance(accounts[0]);
    await lottery.methods.pickWinner().send({
      from:accounts[0]
    })
    const finalBal = await web3.eth.getBalance(accounts[0]);
    const diff = finalBal - initialBal;
    assert(diff > web3.utils.toWei('1.8','ether'));
  })
});
