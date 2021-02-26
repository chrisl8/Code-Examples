const util = require('util');
const exec = util.promisify(require('child_process').exec);
(async function () {
    console.log(`------ Calling Shell Script From Node Starting ----------`);
    let now = new Date();
    console.log(`${now}`);
    try {
      const {stdout, stderr} = await exec(`${__dirname}/CallScriptFromNode.sh`);
      if (stdout) {
        console.log('Calling Shell Script From Node output:');
        console.log(stdout);
      }
      if (stderr) {
        console.error('ERROR from Calling Shell Script From Node:');
        console.error(stderr);
      }
    } catch (e) {
      console.error(`Calling Shell Script From Node Error: ${e}`);
    }
    now = new Date();
    console.log(`${now}`);
    console.log(`------ Calling Shell Script From Node DONE --------------`);
  }
)();
