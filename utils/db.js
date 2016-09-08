var mysql = require('mysql');

//增
exports.query = function (userAddSql) {
    var connection = mysql.createConnection({
        host: '115.159.94.41',
        user: 'remote',
        password: 'remote',
        database: 'modu'
    });

    connection.connect(function (err) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        console.log('[connection connect]  succeed!');
    });
    var userAddSql = 'INSERT INTO stf_mst(stf_name,stf_password,stf_code) VALUES(?,?,?)';
    var userAddSql_Params = ['Nicky', '123456', 3];
    //var sql = "sel" + var
    connection.query(userAddSql, userAddSql_Params,function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);
        console.log('INSERT ID:', result);
        console.log('-----------------------------------------------------------------\n\n');
    });

    connection.end(function (err) {
        if (err) {
            return;
        }
        console.log('[connection end] succeed!');
    });
}

//改
exports.update = function (userModSql) {
    var connection = mysql.createConnection({
        host: '115.159.94.41',
        user: 'remote',
        password: 'remote',
        database: 'modu'
    });


    connection.connect(function (err) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        console.log('[connection connect]  succeed!');
    })

    //var userModSql = 'UPDATE stf_mst SET stf_name = ?,stf_password = ? WHERE stf_id = ?';
    //var userModSql_Params = ['hahaha', '123123', 3];
    connection.query(userModSql, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }
        console.log('--------------------------UPDATE----------------------------');
        console.log('UPDATE affectedRows', result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
    });

    connection.end(function (err) {
        if (err) {
            return;
        }
        console.log('[connection end] succeed!');
    })

}

//查
exports.select = function (callback) {
    var connection = mysql.createConnection({
        host: '115.159.94.41',
        user: 'remote',
        password: 'remote',
        database: 'modu'
    });

    connection.connect(function (err) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        console.log('[connection connect]  succeed!');
    })

    var userGetSql = 'SELECT * FROM stf_mst';
    var rs = connection.query(userGetSql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            //callback
            return;
        }
        console.log('--------------------------SELECT----------------------------');
        //return  result;
        callback(null,result);
        //console.log(result);
        console.log('-----------------------------------------------------------------\n\n');
    });

    connection.end(function (err) {
        if (err) {
            return;
        }
        console.log('[connection end] succeed!');
    })
    return rs;
}
//删
exports.delete = function (userDelSql) {
    var connection = mysql.createConnection({
        host: '115.159.94.41',
        user: 'remote',
        password: 'remote',
        database: 'modu'
    });

    connection.connect(function (err) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        console.log('[connection connect]  succeed!');
    })

    //var userDelSql = 'DELETE FROM userinfo';
    connection.query(userDelSql, function (err, result) {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------DELETE----------------------------');
        console.log('DELETE affectedRows', result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
    });

    connection.end(function (err) {
        if (err) {
            return;
        }
        console.log('[connection end] succeed!');
    })

}