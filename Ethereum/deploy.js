const HDWalletProvider = require("truffle-hdwallet-provider");

const Web3 = require("web3");

const compiledFactory = require("./build/CampaignFactory.json");
console.log(compiledFactory.interface)
const provider = new HDWalletProvider(
  "december crush human heavy liquid similar wrestle rhythm volcano wife feed cinnamon",
  "https://rinkeby.infura.io/v3/f3bf258d4ee84eac9db0fe5b5107c069"
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(
      JSON.parse(compiledFactory.interface)
    )
      .deploy({ data: compiledFactory.bytecode })
      .send({ gas: "1000000", gasPrice: "2000000000", from: accounts[0] });
    
    console.log("Contract deployed to ", result.options.address);
  } catch (error) {
    console.log(error);
  }
};
deploy();
