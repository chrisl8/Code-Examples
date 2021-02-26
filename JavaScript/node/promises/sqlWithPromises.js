// First you need to set up a SQL connection.
// Hop up to the parent folder to see how to set that up!
var sqlTable = require('../sqlTable');

// This function will "do all the tings" in order and spit out the result.
// Rather than the typical thing where Javascript prints the result before
// the things are done.
// This is done by way of promises
// The beauty of this setup is that we run all of the queries at the same time,
// but we wait for them to be done before moving on,
// So we benefit from async, but we don't suffer from it.
function runSomeQueries(req, res, template) {
    'use strict';
    // First we set up a SINGLE query function
    var sqlQuery = function(queryToRun) {
        // This function returns a promise, which allows us to use it
        // with .then
        return new Promise(function(resolve, reject) {
            // Notice we just use our pool here,
            // If you look at the database connections you will see we actually get
            // one connection per query, if we can make that many, because they all run at once!
            // But if we cannot make that many, node-mysql makes them one at a time for us,
            // and Promises lets us wait until they are all done.
            sqlTable.pool.query(queryToRun, function(err, rows, fields) {
                if (err) {
                    console.log('SQL Error: ' + err);
                    // Notice how we "reject" instead of return if there is an error.
                    // That is a Promise thing.
                    reject(err);
                } else {
                    // Notice how we "resolve" instead of return if things are good.
                    // That is a Promise thing also.
                    resolve(rows[0][Object.keys(rows[0])[0]]);
                }
            });
        });
    };

    // This is a function to run all the queries . . . no seriously, it will
    function runAllTheQueries() {
        // First you need an array of something to iterate over,
        // So if you are playing with something else besides SQL queries, think about
        // how you can key on one piece of information that is different,
        // and the rest is the same.
        // The "same" part goes in the function above called "sqlQuery()"
        // This is a set of queries used for a report,
        // I'm sure there are ways to just ask SQL to do this for us with one query,
        // but that doesn't help us use Promises
        var queryList = [
            'SELECT COUNT(*) FROM my_amazing_table WHERE (result = "IT_WORKED")',
            'SELECT COUNT(*) FROM thing.my_amazing_table WHERE (result = "IT_WORKED" and thing like "ICK%");',
            'SELECT COUNT(*) FROM thing.my_amazing_table WHERE (result = "IT_WORKED" and thing like "ACK%");',
            'SELECT COUNT(DISTINCT user) FROM thing.my_amazing_table WHERE (result = "IT_WORKED");',
            'SELECT COUNT(*) FROM my_amazing_table WHERE (result = "IT_DID_NOT_WORK")',
            'SELECT COUNT(*) FROM my_amazing_table WHERE (result = "WE_NEVER_TRIED")',
        ];
        // Now that we have an array of "different" things that we can pass to our
        // sqlQuery() function (I should call it "doOneThing()"),
        // we use the amazing .map function on the array to create
        // a function for each item in the array:
        var sqlQueries = queryList.map(function(value) {
            // And each function will return a Promise,
            // Using the .then description.
            // Remember that sqlQuery() created a new Promise
            // and returns "reject" or "resolve", so the value of
            // "newValue" will be a Promise resolve or reject
            return sqlQuery(value).then(function(newValue) {
                return newValue;
                // Remember, we return a Promise, because that is what
                // sqlQuery() is set up to return.
            });
        });
        // Now we really DO ALL THE TINGS by using the Promise.all
        // function. Note that this literally waits for ALL of them
        // to resolve. Simple as that.
        // Look up Javascript Promises for other features.
        // If any one of them rejects, this should asl reject.
        return Promise.all(sqlQueries);
        // Again, what will happen is this will return immediately,
        // because Javascript always does that,
        // but what it will return is a Promise,
        // and you will use .then on this function,
        // causing you to WAIT for the Promises to resolve
        // or .catch if they reject.
    }

    // Finally we RUN the actual "runAllTheQueries()" function
    runAllTheQueries().then(function(queryResult) {
        // This is the cool part,
        // this stuff here does not happen until ALL
        // of the things are run and return successful,
        // So we run all 6 queries,
        // and when all 6 succeed, THEN this runs:
        console.log(queryResult[0]);
        console.log(queryResult[2]);
        console.log(queryResult[3]);
        console.log(queryResult[5]);
        console.log(queryResult[4]);

        // Clearly I'm doing nothing exciting here with the results, but if you
        // were rendering a web page from express,
        // or doing something with the entire set of results,
        // this would work.

    }).catch(function(error) {
        // Finally, if ANY of them fail or rather "reject", then this
        // will be called instead, and you can handle the error
        // as you like
        console.log('And they all fall down like dominoes.');
    });
}
module.exports = runSomeQueries;
