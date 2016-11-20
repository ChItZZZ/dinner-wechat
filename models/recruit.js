var db = require("../utils/db");

exports.inquire = function(callback){
    var recruitInquire = "select * from recruit_master ";
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
            for(var i = 0; i < result.length; i++){
                var recruit = {};
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