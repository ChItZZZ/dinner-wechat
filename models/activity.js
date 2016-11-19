var db = require("../utils/db");
var sd = require('silly-datetime');

exports.inquire = function(callback){
    var activityInquire = "select * from activity_config where activity_start_date <= DATE_FORMAT(CURDATE(), 'MM-dd-yyyy')" +
        " and activity_end_date >= DATE_FORMAT(CURDATE(), 'MM-dd-yyyy') order by activity_type";
    var values = [];
    db.exec(activityInquire, values, function (err, result) {
        var activities = {};
        if (err) {
            console.log('info: ' + 'activity error 2');
            callback(err);
            return;
        }
        else{
            var activity = {};
            for(var i = 0; i < result.length; i += 1){
                activity['id'] = result[i].activity_id;
                activity['type'] = result[i].activity_type;
                activity['amount1'] = result[i].activity_amount1;
                activity['amount2'] = result[i].activity_amount2;
                activity['amount3'] = result[i].activity_amount3;
                activity['amount4'] = result[i].activity_amount4;
                activity['startDate'] = result[i].activity_start_date;
                activity['endDate'] = result[i].activity_end_date;
                activity['description'] = result[i].activity_description;
                activity['catalogue'] = result[i].activity_catalogue;
                activities[i] = activity;
            }
        }
        callback(null, activities);
    });
};