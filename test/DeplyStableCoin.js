var Stablecoin = artifacts.require("Stablecoin");
var Stablecoinupgrade = artifacts.require("Stablecoinupgrade");
var Relay = artifacts.require("Relay");


let proxyrelay;
let relay;
let stablecoinupgrade;
let coin;

contract('Stablecoin', function(accounts) {
    let STContarct;
    let RelContarct;
    it("Create Stablecoin Instance", async() => {
        STContarct = await Stablecoin.deployed();
        console.log("\t\t[ Contract Owner address :: " + STContarct.address + " ]");
        assert(STContarct !== undefined, 'has no stablecoin instance');
    }).timeout(100000);
    it("Create Stablecoin Upgrade Instance", async() => {
        STUPGContarct = await Stablecoinupgrade.deployed();
        console.log("\t\t[ Contract Owner address :: " + STUPGContarct.address + " ]");
        assert(STUPGContarct !== undefined, 'has no Stablecoin Upgrade instance');
    }).timeout(100000);

    it("Create Relay Instance", async() => {
        RelContarct = await Relay.deployed();
        console.log("\t\t[ Contract Owner address :: " + RelContarct.address + " ]");
        assert(RelContarct !== undefined, 'has no relay instance');
    }).timeout(100000);
    it("Register to Proxy", async() => {
        console.log("[ " + STContarct.address + " :: " + RelContarct.address + "]");
        let result = await RelContarct.setLogicContract(STContarct.address);
        console.log("Proxy Registered StableCoin?: " + Boolean(result) );
        proxyrelay = await Stablecoin.at(STContarct.address); 
        //console.log("Stablecoin Registered StableCoin: " + Boolean(proxyrelay) );
        await proxyrelay.InitContract(1000)
        await proxyrelay.name().then(name=>console.log( "Contract Name: " + name))
        console.log("Contract Address: " + STContarct.address );
        await proxyrelay.balanceOf(accounts[0]).then(bal=>console.log( "Initialized Stable Coin with this amount : " + bal.toNumber()))
        await proxyrelay.transfer(accounts[1],100)
        await proxyrelay.balanceOf(accounts[1]).then(bal=>console.log( "Transferred to Acct 1, Acct Bal 1 Balance is: " + bal.toNumber()))
        await proxyrelay.balanceOf(accounts[0]).then(bal=>console.log( "Stable Coin Total Supply is : " + bal.toNumber()))
        await proxyrelay.transfer(accounts[2],200)
        await proxyrelay.balanceOf(accounts[2]).then(bal=>console.log( "Transferred to Acct 2, Acct Bal 2 Balance is: " + bal.toNumber()))
        await proxyrelay.balanceOf(accounts[0]).then(bal=>console.log( "Stable Coin Total Supply is : " + bal.toNumber()))

/*        console.log(" Switching to Stablecoin Upgrade: " );
        result = await RelContarct.setLogicContract(STUPGContarct.address);
        proxyrelay = await Stablecoin.at(STUPGContarct.address); 
        console.log("Proxy Registered StableCoin Upgrade Succeeded?: " + Boolean(result) );
        await proxyrelay.name().then(name=>console.log( "Contract Name: " + name))
        console.log("Contract Address: " + STUPGContarct.address );
        await proxyrelay.balanceOf(accounts[1]).then(bal=>console.log( "Acct 1 Balance NOW is: " + bal.toNumber()))
        await proxyrelay.balanceOf(accounts[2]).then(bal=>console.log( "Acct 2 Balance NOW is: " + bal.toNumber()))
        await proxyrelay.InitContract(2000)
        await proxyrelay.balanceOf(accounts[0]).then(bal=>console.log( "Initialized Stable Coin UPGARDE with this amount : " + bal.toNumber()))
        proxyrelay.transfer(accounts[1],300)
        proxyrelay.transfer(accounts[2],400)
        await proxyrelay.balanceOf(accounts[1]).then(bal=>console.log( "Transferred to Acct 1, Acct Bal 1 Balance is: " + bal.toNumber()))
        await proxyrelay.balanceOf(accounts[2]).then(bal=>console.log( "Transferred to Acct 2, Acct Bal 1 Balance is: " + bal.toNumber()))
        await proxyrelay.balanceOf(accounts[0]).then(bal=>console.log( "Stable Upgrade Coin Total Supply is : " + bal.toNumber()))
*/
        //require(ResVal , 'stablecoin HAS NOT been registered in Relay');
    });
});




