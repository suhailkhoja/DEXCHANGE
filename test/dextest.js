// The trader must have ETH in his wallet such that ETH >= Buy Order Amount (For LINK)

//The Buy order book should be ordered on price from highest to low

//For Sell, the user must have enough tokens deposited such that token balance >= sell amount

const Dex = artifacts.require("Dex");
const Link = artifacts.require("Link");
const truffleAssert = require('truffle-assertions');


contract ("Dex", accounts =>{
    
    it("The Buy order should be placed from higher to lower price", async() =>{
    
        let dex = await Dex.deployed();
        let link = await Link.deployed();
      
        await link.approve(dex.address, 500);
        //await dex.depositEth({value: 3000});

        await dex.createLimitOrder(0, web3.utils.fromUtf8("LINK"), 1, 300);
        await dex.createLimitOrder(0, web3.utils.fromUtf8("LINK"), 1, 100);
        await dex.createLimitOrder(0, web3.utils.fromUtf8("LINK"), 1, 200);
        await dex.createLimitOrder(0, web3.utils.fromUtf8("LINK"), 1, 150);

        let orderBook = await dex.getOrderBook(web3.utils.fromUtf8("LINK"), 0);
        console.log(orderBook);
        truffleAssert(orderBook.length >0);


        for(let i = 0; i < orderBook.length -1; i++) {
            truffleAssert(orderBook[i].price >= orderBook[i+1].price, "not right order price")
        }
      
          })

    it("The Sell order should be placed from lower to higher price", async() =>{
    
        let dex = await Dex.deployed();
        let link = await Link.deployed();
      
        await link.approve(dex.address, 500);
        //await dex.depositEth({value: 3000});

        await dex.createLimitOrder(1, web3.utils.fromUtf8("LINK"), 1, 300);
        await dex.createLimitOrder(1, web3.utils.fromUtf8("LINK"), 1, 100);
        await dex.createLimitOrder(1, web3.utils.fromUtf8("LINK"), 1, 200);
        await dex.createLimitOrder(1, web3.utils.fromUtf8("LINK"), 1, 150);

        let orderBook = await dex.getOrderBook(web3.utils.fromUtf8("LINK"), 1);
        console.log(orderBook);
        truffleAssert(orderBook.length >0);


        for(let i = 0; i < orderBook.length -1; i++) {
            truffleAssert(orderBook[i].price <= orderBook[i+1].price, "not right order price")
        }
      
          })
          
          

})