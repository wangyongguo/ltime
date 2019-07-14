var mysql = require('mysql');
var dbconfig = require('../config/database');
// 使用连接池
var pool = mysql.createPool(dbconfig.mysql);
// 使用连接池
var pool = mysql.createPool(dbconfig.mysql);
module.exports = {
    query: function (sql, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql, function (err, rows) {
                callback(err, rows);
                connection.release();
            })
        })
    }
}