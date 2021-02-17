# StableCoin

                                 The New Dollar
You are a solidity engineer on a team that is building a one of a kind stablecoin that the
world has never seen before. This stablecoin uses a very unique pattern and is designed to
incentivize people who own these coins to spend them as fast as possible to stimulate the
economy. This bank is developing a stablecoin whose user balances reset anytime the bank
upgrades their stablecoin smart contract. This means that if the bank has an upgrade every 30
days, you no longer own these stablecoins at the end of the month.
                                      Problem
Design an ERC20 compliant token where the balances reset every time you upgrade it.
If you own this stablecoin in January, and there is always a smart contract upgrade at the end of
each month, then in February, you should not own those stablecoins anymore. Your token
should have all ERC20 interfaces and events. You can use whatever framework or version of
solidity that you would like, but you cannot use a framework for handling the creation of the
proxy contracts. It would be great to have a few tests to demonstrate functionality without having
to manually run through things.
                                         Bonus
Build the token so that users balance resets automatically every 30 days in addition to
resetting when the smart contract upgrades. This means that the balances will reset when there
is a smart contract upgrade, and they will reset on the 30 day schedule.

1- In One windows start ganache-cli -e
2- To run a test end-to-end, deploying the initial Stable Coin Contract then the Upgrade run:
      $ truffle test ~/StableCoin/test/TestAllContracts.js
3- To run a test deploying the initial Stable Coin Contract then the Upgrade on a scheduled first of each month, 
   run:
      $nodejs ~/StableCoin/test/Deploy-StableCoin-Then-Schedule-Upgrade.js
