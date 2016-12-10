/**
 * execute sql, callback error or result
 */

var mysql = require('mysql');
var env = require('../app');

//database config

//console.log(env.DB);

/** 
 * param :
 *      sql : sql sentence    "SELECT * FROM stf_mst where stf_id = ? or stf_id = ? "
 *                             or "SELECT * FROM stf_mst where stf_id"
 *      values : keys          [5,6]
 *                             or []
 *      callback : function callback(err,result)
 * 
*/


exports.exec = function(sql,values,callback) {
    var option = env.dbconn;
    var connection = mysql.createConnection(option);

    connection.connect(function(err) {
        if (err) {
            console.log('[connection connect failed] - :' + err);
            callback(err);
            return;
        }
    });
    //console.log('[connection connect]  succeed!');

    connection.query(sql,values,function(err, result) {
        console.log('sql: ' + sql + " values: " + values);

        if (err) {
            console.log('[SQL ERROR] - ', err.message);
            callback(err);
            return;
        }
        //console.log('SQL RESULT:', result);
        callback(null, result);
    });

    connection.end(function(err) {
        if (err) {
            console.log('[connection end failed] - :' + err);
            return;
        }
        //console.log('[connection end] succeed!');
    });
}