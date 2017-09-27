/*
 * Some testing to visualize how Promises work.
 * http://odetocode.com/blogs/scott/archive/2015/10/01/javascript-promises-and-error-handling.aspx
 */

var log = "";
var i = 0;

function done() {
    log += "D" + i++;
    writeLog(log)
}

function doWork() {
    log += "W" + i++;
    write(log);
    return Promise.resolve();
}

function doNoWork() {
    log += "w" + i++;
    write(log);
    return Promise.resolve();
}

function doError() {
    log += "E" + i++;
    write(log);
    throw new Error("oops!");
}

function errorHandler(error) {
    log += "H" + i++;
    write(log);
}

function noerrorHandler(error) {
    log += "h" + i++;
    write(log);
}

function rejectPromise() {
    log += "R" + i++;
    write(log);
    Promise.reject("error!");
}

function write(txt) {
    console.info(txt);
    //document.getElementById("log").innerHTML += "<hr/>" + txt;
}

function writeLog(txt) {
    // document.getElementById("log").innerHTML += "<hr/>" + txt;
    console.log("log");
}

/*
 * This will throw
 */
function test() {
    log = "";
    i = 0;
    write("test start");
    doWork() //W1
        .then(doWork) //W2
        .then(doError, noerrorHandler) //noerrorHandler skipped as W2 had no error
        .then(doNoWork, errorHandler) // this 'doNoWork' will be skipped
        .then(doWork)
        .then(done); //Expected: W0W1E2H3W4D5
}

function test1() {
    log = "";
    i = 0;
    write("test start");
    doWork()
        .then(doWork)
        .then(doError)
        .catch(errorHandler)
        .then(doWork)
        .then(done); //Expected W0W1E2H3W4D5
}

function test2() {
    log = "";
    i = 0;
    write("test start");
    doWork()
        .then(rejectPromise)
        .catch(errorHandler)
        .then(doWork)
        .then(done); //Expected W0R1W2D3
}

function test3() {
    console.log("start test3");
    try {
        doWork() //W1
            .then(doError, noerrorHandler) //noerrorHandler skipped as W1 had no error
            .then(doWork) // - not done
        ;
    } catch (err) {
        log += "E" + i++;
    } finally {
        done(); //Expected W0D1
    }
}

function test4() {
    console.log("start test3");
    try {
        doWork() //W1
            .then(doError, noerrorHandler) //noerrorHandler skipped as W1 had no error
            .then(doNoWork, reThrowErrorHandler) // this 'doNoWork' will be skipped
            .then(doWork) //-- NOT DONE
        ;
    } catch (err) {
        log += "E" + i++;
    } finally {
        done(); //Expected W0E1D2
    }
}

test2();
