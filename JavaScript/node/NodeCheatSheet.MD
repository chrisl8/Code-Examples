Node Cheat Sheet
================
This will be Node specific. See the JavaScript files for non-node specific JS help.

### Get an environment variable
`var environmentVariable = process.env.ENV_VAR;`  
For instance you often want to find your home folder:  
`var homeFolder = process.env.HOME;`

### Normalize a home folder reference
[Github Issue Comment](https://github.com/nodejs/node-v0.x-archive/issues/2857#issuecomment-43699059)
```
function resolvePath(str) {
  const path = require('path');
  if (str.substr(0, 2) === '~/') {
    str = (process.env.HOME || process.env.HOMEPATH || process.env.HOMEDIR || process.cwd()) + str.substr(1);
  }
  return path.resolve(str);
}
```

### Dump entire Object in console..log
[Stack Overflow](https://stackoverflow.com/a/10729284)
```
        const complexDeepObjeject = {};
        const util = require('util');
        console.log(util.inspect(complexDeepObjeject, {showHidden: false, depth: null}));

```

### Dump entire Array in console.log
[Stack Overflow](https://stackoverflow.com/a/48231698/4982408)
```
const longArray = [];
        const util = require('util');
        console.log(util.inspect(longArray, {maxArrayLength: null}));
```