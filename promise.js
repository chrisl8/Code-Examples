const myPromise = new Promise((resolve, reject) => { // Promise is always called with two arguments of resolve & reject
    // Calling resolve() will resolve the promise
    // Calling reject() will reject the promise
    //resolve();

    // Simulate long running process
    setTimeout(() => {
        console.log(`Hi, I hope I'm not late`);
        resolve();
    }, 3000);
    // setTimeout(() => {
    //     reject();
    // }, 1000);
});

myPromise
    .then(() => {
    // This is where the callback goes if the resolve() is run in the promise.
    console.log('finally finished!');
    })
    .then(() => {
        console.log('I was also run!');
    })
    .catch(() => {
        // This is the callback that is run anytime reject() is called in the promise.
        // If you don't have a .catch(), and a rejection happens,
        // then you will get:
        // UnhandledPromiseRejectionWarning: Unhandled promise rejection
        console.log('uh oh!');
    });

console.log(`Your script has reached the end. There is no more. I'm 99% sure of it.`);
