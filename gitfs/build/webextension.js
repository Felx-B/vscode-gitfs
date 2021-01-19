const fs = require('fs');



const packageJSON = JSON.parse(fs.readFileSync('./package.json'));

const result = {
    packageJSON,
    extensionPath: "../../../../gitfs"
};

fs.writeFileSync("./dist/webextension.js", "var gitfs =" + JSON.stringify(result));