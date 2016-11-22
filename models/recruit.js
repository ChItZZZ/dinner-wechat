var db = require("../utils/db");

exports.inquire = function(callback){
    var recruitInquire = "select * from recruit_master limit 1";
    var values = [];
    var recruits = {};
    db.exec(recruitInquire, values, function (err, result) {
        if (err) {
            console.log('info: ' + 'in recruit.js inquire err1');
            callback(err);
            return;
        }
        else{
            console.log('info: ' + 'in recruit.js inquire else');
            var recruit = {};
            recruit['id'] = result[0].recruit_id;
            recruit['title'] = result[0].recruit_title;
            recruit['content'] = result[0].recruit_content;
            recruit['releae_date'] = result[0].release_date;
        }
        callback(null, recruit);
    });
};