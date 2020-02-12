const astTypes =  require('ast-types');
const babylon= require('babylon');
const fs = require('fs');
const parse = require("@typescript-eslint/typescript-estree");


const defaultCompareConfig = {
    primary: {
        type:"TS",
        path:"./sample/abc.ts"
    },
    secondary:{
        type:"JS",
        path:"./sample/abc.js"
    }
}

const getFileContent = (filePath) => {
    return fs.readFileSync(filePath, {encoding:'utf-8'});
}
const compareCode = async (compareConfig = defaultCompareConfig) => {
    let primaryFileContent ;
    let secondaryFileContent ;
    if(compareConfig.primary) {
        primaryFileContent = await getFileContent(compareConfig.primary.path) ;
    }
    // secondary files
    if(compareConfig.secondary) {
        secondaryFileContent = await getFileContent(compareConfig.secondary.path) ;
    }

    const secondaryAST = babylon.parse(secondaryFileContent);
    const primaryAST = parse(primaryFileContent);

    console.log(secondaryAST)
    console.log(primaryAST)

}


compareCode()