pragma solidity ^0.6.0 < 0.6.13;

//import './Storage.sol';

/*
*   This is an ERC20 Fungible, transferrable, stablecoin
*/

contract Stablecoin {
	bool private initialized = false;
    //ERC20 Required Variables
    string constant token_name = "Stablecoin Stable Coin";
    string constant token_symbol = "Eduonix";
    uint8 constant token_decimal = 8;

    mapping(address => uint256) balances;
	mapping(uint8 => address) Accounts;
    mapping(address => mapping(address => uint256)) allowed;
    uint256 totalSupply_;
	uint8 private AcctIndex;
    address private owner;

    /*
    *   Standard event declaration required by ERC20 framework
    */
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);
//    event AcctUpdate(mapping(uint8 => address) Accounts, uint8 AcctIndex);
    //event InflationToken(address owner, unit256 AcctIndex, uint256 newTokenSupply);

    /*
	* constructor is run once when it is deployed for the first time
	* unlike the standard constructor practice in an OOP
	* Only the deploying account can enter a contract’s constructor. When the contract is * started up, this function allocates available tokens to the ‘contract owner’ account.
	*/


/*	constructor () public {
	}
*/	
//	function InitContract(uint256 total) public view returns (uint256) {
	function InitContract(uint256 total) external {
		require(!initialized, "StableCoin Contract instance has already been initialized");
        initialized = true;
		totalSupply_ = total;
		balances[msg.sender] = totalSupply_;
		owner = msg.sender;
		uint NewBal=0;
		for (uint8 j=0; AcctIndex > j; j++){
			balances[Accounts[j]] = NewBal;
		}
		AcctIndex = 0;
//		return totalSupply_;

    }
	/*
	* ERC20 Standard function but can be optional
	*/
	function name() public view returns (string memory) {
			return(token_name);
	}

	/*
	* ERC20 Standard function but optional
	*/
	function symbol() public view returns (string memory) {
		return(token_symbol);
	}

	function NumAccts() public view returns (uint8) {
		return(AcctIndex);
	}
	
	/*
	* ERC 20 Standard but optional
	*/
	function decimals() public view returns (uint8) {
		return(token_decimal);
	}

	/*
	* ERC20 required function declaration
	*/
	function totalSupply() public view returns (uint256) {
		return totalSupply_;
	}

    /*
	* ERC20 required function declaration
	*/
	function balanceOf(address tokenOwner) public view returns (uint) {
//		require(false, "StableCoin Contract balanceof Function==========");
		return balances[tokenOwner]; 
	}

	/*
	* ERC20 required function declaration
	*/
	function allowance(address _owner, address delegate) public view returns (uint) {
  		return allowed[owner][delegate];
	}

	/*
	* ERC20 required function declaration
	*/
	function transfer(address receiver, uint numTokens) public returns (bool) {
  		require(numTokens <= balances[msg.sender]);
  		balances[msg.sender] = balances[msg.sender]-numTokens;
  		balances[receiver] = balances[receiver] + numTokens;
		
		Accounts[AcctIndex] = receiver; // Alex
		AcctIndex = AcctIndex+1;
		//emit AcctUpdate(Accounts, AcctIndex);

  		emit Transfer(msg.sender, receiver, numTokens);
  		return true;
	}

	/*
	* @Params:
	* 	delegate = spender
	*	numTokens = tokens to be transfered
	*/
	function approve(address delegate, uint numTokens)  public returns (bool) {
		allowed[msg.sender][delegate] = numTokens;
  		emit Approval(msg.sender, delegate, numTokens);
  		return true;
	}

	/*
	* ERC20 required function declaration
	*/
	function transferFrom(address _owner, address buyer, uint numTokens) public returns (bool) {
  		require(numTokens <= balances[owner]);
  		require(numTokens <= allowed[owner][msg.sender]);
  		balances[owner] = balances[owner]-numTokens;
  		allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
  		balances[buyer] = balances[buyer]+numTokens;
  		emit Transfer(owner, buyer, numTokens);
		return true;
	}

}