const Relay = artifacts.require("Relay");
const Stablecoin = artifacts.require("Stablecoin");
const StablecoinUpgrade = artifacts.require("Stablecoinupgrade");
const Storage = artifacts.require("Storage");

module.exports = function(deployer) {
  deployer.deploy(Storage);
  deployer.deploy(Relay);
  deployer.deploy(Stablecoin)
  deployer.deploy(StablecoinUpgrade)
};
