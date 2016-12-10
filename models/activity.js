var db = require("../utils/db");
var sd = require('silly-datetime');

/**
 *  json = {"hasActivity":1,
 *          "activities":[ 
 *                        {"id":13,"type":"折扣","amount1":5,"amount2":null,"amount3":null,
 *                        "amount4":null,"startDate":"2016-10-15T16:00:00.000Z","endDate":"2016-12-09T16:00:00.000Z",
 *                        "description":"5折","catalogue":"糕点;必点配菜;"} 
 *                      ]
 *         }
 */
exports.inquire = function(callback){
    var activityInquire = "select * from activity_config where TO_DAYS(NOW()) > TO_DAYS(activity_start_date) " +
        " and TO_DAYS(NOW()) < TO_DAYS(activity_end_date) order by activity_type limit 1";
    var values = [];
    db.exec(activityInquire, values, function (err, result) {
        var json = {};
        if (err) {
            callback(err);
            return;
        }
        else{
            if(result.length > 0)
                json.hasActivity = 1;
            else
                json.hasActivity = 0;

            var activities = [];
            for(var i = 0; i < result.length; i++){
                var activity = {};
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
                activity['picture'] = result[i].activity_picture;

                activities.push(activity);
            }
            json.activities = activities;
        }
        //console.log('activity ' + JSON.stringify(json));
        callback(null, json);
        return;
    });
};