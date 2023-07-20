const Dex = artifacts.require("Dex");
const Link = artifacts.require("Link");
const truffleAssert = require('truffle-assertions');


contract.skip ("Dex", accounts =>{
    it("should only be possible for owner to add tokens", async() =>{
    
  let dex = await Dex.deployed();
  let link = await Link.deployed();

  await truffleAssert.passes(
    dex.addToken(web3.utils.fromUtf8("LINK"), link.address, {from: accounts[0]})
  )

    })

    it("should handle deposits correctly", async() =>{
    
        let dex = await Dex.deployed();
        let link = await Link.deployed();

        await link.approve(dex.address, 500);

        await dex.deposit(100, web3.utils.fromUtf8("LINK"));

        let balance = await dex.balances(accounts[0], web3.utils.fromUtf8("LINK"))

        assert.equal(balance.toNumber(), 100);
      
          })


    it("should handle faulty withdrawls correctly", async() =>{
    
        let dex = await Dex.deployed();
        let link = await Link.deployed();

        await truffleAssert.reverts (dex.withdrawl(500, web3.utils.fromUtf8("LINK")))
    
            
          
        })

    it("should handle correct withdrawls correctly", async() =>{
    
        let dex = await Dex.deployed();
        let link = await Link.deployed();
    
        await truffleAssert.passes (dex.withdrawl(100, web3.utils.fromUtf8("LINK")))
        
                
              
        })
})