const path=require("path")
const solc=require("solc")
const fs=require("fs-extra")

//We remove the build folder if it exist
const buildPath=path.resolve(__dirname,"build")
fs.removeSync(buildPath)

const campaignPath=path.resolve(__dirname,"contracts","Campaign.sol")

const source=fs.readFileSync(campaignPath,"utf8")
// we add .contracts because we care about it 
const output=solc.compile(source,1).contracts

//if file does not exist the function will create it for us 
fs.ensureDirSync(buildPath)

for (let contract in output){
    fs.outputJsonSync(
        path.resolve(buildPath,contract.replace(/:/g,'') + '.json' ),
        output[contract]

    )
}
