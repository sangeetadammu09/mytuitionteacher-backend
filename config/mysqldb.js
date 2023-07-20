const mysql = require('mysql2');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    database: 'demodb',
    user: 'root',
    password: 'demo0912'
});

module.exports = connection;