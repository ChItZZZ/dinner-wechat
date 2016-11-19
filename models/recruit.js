var db = require("../utils/db");
var sd = require('silly-datetime');

exports.inquire = function(callback){
    console.log('info: ' + 'recruit.js error 1');
    var recruitInquire = "select * from recruit_master ";
    console.log('info: ' + 'recruit.js error 2');
    var values = [];
    console.log('info: ' + 'recruit.js error 3');
    var recruits = {};
    console.log('info: ' + 'recruit.js error 4');
    db.exec(recruitInquire, values, function (err, result) {
        if (err) {
            console.log('info: ' + 'in recruit.js inquire err1');
            callback(err);
            return;
        }
        else{
            console.log('info: ' + 'in recruit.js inquire else');
            var recruit = {};
            for(var i = 0; i < result.length; i++){
                recruit['id'] = result[i].recruit_id;
                recruit['title'] = result[i].recruit_title;
                recruit['content'] = result[i].recruit_content;
                recruit['releae_date'] = result[i].release_date;
                recruits[i] = recruit;
            }
        }
        callback(null, recruits);
    });
};