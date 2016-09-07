var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '115.159.94.41',
    user: 'remote',
    password: 'remote',
    database: 'modu'
});

//增
exports.create = function (userAddSql) {
    connection.connect(function (err) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        console.log('[connection connect]  succeed!');
    });
    //var userAddSql = 'INSERT INTO stf_mst(stf_name,stf_password,stf_code) VALUES(?,?,?)';
    //var userAddSql_Params = ['Nicky', '123456', 3];
    connection.query(userAddSql, function (err, result) {
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
exports.select = function (userGetSql) {
    connection.connect(function (err) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        console.log('[connection connect]  succeed!');
    })

    //var userGetSql = 'SELECT * FROM stf_mst';
    connection.query(userGetSql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        console.log('-----------------------------------------------------------------\n\n');
    });

    connection.end(function (err) {
        if (err) {
            return;
        }
        console.log('[connection end] succeed!');
    })

}
//删
exports.delete = function (userDelSql) {

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