// node-mysql works great, and it has built in pooling,
// so instead of messing with connections one by one,
// just make a pool and share it with your entire node app

// First include the node-mysql module
var mysql = require('mysql');

// You can either put this settings object directly
// into the createPool() function, or make a separate object
// like this.
// Making a separate object makes it easier to move the password out
// of your code later.
var dbConnectInformation = {
    // You do not have to put in a connection limit,
    // If you don't, you just rely on the database to limit you.
    // This is just to curb my own enthusiasm.
    connectionLimit: 10,
    host: 'localhost',
    user: 'hoopyFrood',
    password: 'anAmazingPassword',
    database: 'crazy_database_name',
    // You only need the port if it isn't using the standard port number.
    port: 12345
};

// As soon as this module is included, it will start up the pool,
// but the node-mysql module won't make any connections until you actually
// make a query.
// Conversely, if the DB kills your connections, node-mysql will rebuild
// them for you as needed,
// So this is very hand.
// Plus, since this pool variable is in this module's scope,
// and since node.js only loads modules once,
// you are able to SHARE this pool across your entire application!
var pool = mysql.createPool(dbConnectInformation);
exports.pool = pool;

// Now you can USE this this way:
/*
var sqlTable = require('./sqlTable');

function insertIntSqlTable(aThing) {
    'use strict';
    sqlTable.pool.query('INSERT INTO aTable (things) VALUES (?)', [aThing], function(err, rows, fields) {
        if (err) console.log('SQL Error: ' + err);
    });
}
*/

// If you wanted to make a per function pool you could do this:
var getMyOwnPool = function() {
    var pool;
    if (!pool) {
       pool = mysql.createPool(dbConnectInformation);
    }
    return pool;
};
exports.getMyOwnPool = getMyOwnPool;

// and then call this function from another module like so:
/*
var sqlTable = require('./sqlTable');
var pool = sqlTable.getDbConnection();

function insertIntSqlTable(aThing) {
    'use strict';
    pool.query('INSERT INTO aTable (things) VALUES (?)', [aThing], function(err, rows, fields) {
        if (err) console.log('SQL Error: ' + err);
    });
}
*/
