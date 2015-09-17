// A lot of times you need to run an external process with node
// and then do something only after it comes back.
// The standard pattern is to use a callback, and that is fine,
// but sometimes we get into "callback heck" (heck is funnier than hell),
// Like if we want to run 25 things in a row,
// or do lots of things before/after/during the spawn process.

// So what we can do is "wrap" the spawn function in a Promise.

// You can also use this pattern to wrap other things that don't
// natively return promises.

// First we get the spawn function
var spawn = require('child_process').spawn;

// Here I will make an object
// This object will return a promise
// that is actually resulting from the callback
// of the spawn process.

function ShellRunner(anEloquentArgument) {
    'use strict';
    this.commandToRun = '/home/chrisl8/marcelTheShellScript.sh';
    this.argumentsToMakeToMarcel = [anEloquentArgument];
    // Because programs have a habit of returning data
    // in funny chunks, we will collect it in bits
    // in predefined variables.
    this.stdData = '';
    this.stdError = '';
}
ShellRunner.prototype.run = function() {
    'use strict';
    // We need to hang onto ourselves here, because otherwise we'll get lost
    var self = this;
    // See, here we actually return a Promise!
    return new Promise(function(resolve, reject) {
        self.process = spawn(self.commandToRun, self.argumentsToMakeToMarcel);
        self.process.stdout.setEncoding('utf8');
        self.process.stdout.on('data', function(data) {
            self.stdData = data;
            // Or we could do other things if we want to parse it now.
        });
        self.process.stderr.on('data', function(chunk) {
            // Doing the same thing here, only now
            // we call it "chunk" instead of "data"
            self.stderr += chunk;
        });
        // Don't get tripped up here,
        // This is old fashioned Javascript chaining,
        // On an 'error' we just send back the error
        // as the reject message,
        // but on 'close' we get fancier
        self.process.on('error', reject)
            .on('close', function(code) {
                if (code === 0) {
                    // If the result code is 0 it was good right?
                    if (self.stdData === '') {
                        // Or maybe we are more picky,
                        // Here we reject if there is no data,
                        // but that isn't required.
                        reject('empty');
                    } else {
                        // ANd if the result was 0,
                        // and there was data, we send it back.
                        resolve(self.stdData);
                    }
                } else {
                    // Finally if the code was not 0,
                    // we reject and send the data to ourselves
                    reject(self.stdError);
                    // Do note we didn't send ourselves the actual code,
                    // So if you need that, umm, do that too. ;)
                }
            });
    });
};

// OK, so that was it! Now we have an object that runs a command, but returns
// a Promise! So we don't have to use the callback,
// Remember, we pass a callback into the function, but with a Promise,
// We keep our code here, and just wait for the Promise to resolve or reject.
function runCommand(req, res) {
    'use strict';
    var explainToMarcelWhy = 'He cannot own a dog.'; // I'm not certain on Marcel's gender actually
    // We initiate an instance of the object here,
    // including the argument to make.
    // This is a standard object, so if you need to change options later,
    // do that like you would with any object.
    var shellRunner = new ShellRunner(explainToMarcelWhy);
    // Now, we call the .run() function of the object,
    // but since it returns a Promise, we .then() it instead of passing it
    // a callback!
    shellRunner.run().then(function(marcelsReply) {
        console.log(marcelsReply);
    }).catch(function(error) {
        if (error === 'empty') {
            console.log('Marcel was there, but made no reply.');
        } else {
            console.log('Marcel is having issues, maybe check under the bed.');
        }
    });
}

module.exports = authenticateUser;
