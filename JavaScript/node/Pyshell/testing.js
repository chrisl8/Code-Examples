const {PythonShell} = require('python-shell');
const myPythonScriptPath = 'myPythonScript.py';

const py_whatsup = (data) => {
  return new Promise(function(resolve, reject) {
    let pyshell = new PythonShell(myPythonScriptPath);
    let result;
    pyshell.send(JSON.stringify(data));
    pyshell.on('message', function (message) {
      result = JSON.parse(message);
    });
    pyshell.end(function (err) {
      if (err) reject(err);
      resolve(result);
    });
  });
};

(async () => {
  try {
    const result = await py_whatsup();
    console.log(result);
  } catch(e) {
    console.error("Error:");
    console.error(e);
  }
})();
