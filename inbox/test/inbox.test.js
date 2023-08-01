const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface,bytecode } = require('../compile.js');


let accounts;
let inbox;
beforeEach(async ()=>{
  // get the list of all accounts
  accounts = await web3.eth.getAccounts();
  // use one of those to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({
    data:bytecode,
    arguments:['Hi There!']
  }).send({
    from:accounts[0],
    gas:'1000000'}
  );
});

describe('Inbox',()=>{
  it('Deploys an contract',()=>{
    assert.ok(inbox.options.address);
    // console.log(inbox.options.address);
  });
  it("It Has a default message",async ()=>{
    const message = await inbox.methods.message().call();
    // const message_1 = await inbox.methods.message_1().call();
    assert.equal(message,'Hi There!')
  });
  it("Can able to Change",async ()=>{
    await inbox.methods.setMessage("Bye There").send({
      from:accounts[0]
      });
    const message = await inbox.methods.message().call();
    assert.equal(message,'Bye There');

  });

});

// class Car {
//   park() {
//     return 'stopped';
//   }
//
//   drive(){
//     return 'vroom';
//   }
// }

// let car;
//
// beforeEach(()=>{
//   car = new Car();
// });
//
// describe('Car', ()=>{
//   const car = new Car();
//   it('Can Park',()=>{
//     assert.equal(car.park(),'stopped');
//   });
//   it('Can Drive',()=>{
//     assert.equal(car.drive(),'vroom');
//   });
// });
