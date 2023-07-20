const Link = artifacts.require("Link");
const Wallet = artifacts.require("wallet");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Link);

  let wallet = await Wallet.deployed();

  let link = await Link.deployed();

  await wallet.addToken(web3.utils.fromUtf8("LINK"), link.address);

  await link.approve(wallet.address, 500);

  await wallet.deposit(200, web3.utils.fromUtf8("LINK"));

  let balanceOfLink = await wallet.balances(accounts[0], web3.utils.fromUtf8("LINK"));

  console.log(balanceOfLink);

};