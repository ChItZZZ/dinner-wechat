/**
 * Created by my on 9/7/16.
 */


// controller demo
var db = require('../utils/db');
exports.demo = function(callback) {
    var sql = "SELECT * FROM stf_mst where stf_id = ? or stf_id = ? ";
    var values = [5, 6];
    //var sql = "SELECT * FROM stf_mst";
    //var values = [];
    db.exec(sql, values, function(err, result) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
    });

}

/**
 * get items information from db , callbacl error or json result
 *    result json format like this:
 *         items: {
 *               "面类": [{id: "1", name: "咸肉面", cls: "肉品", price: "15", sels: "45", imageUrl: "images/1.jpg"}],
 *
 *               "蔬菜": [{id: "13", name: "飘菜", cls: "蔬菜", price: "152", sels: "524", imageUrl: "images/13.jpg"},
 *                       {id: "14", name: "苦瓜", cls: "蔬菜", price: "154", sels: "524", imageUrl: "images/14.jpg"},],
 * 
 *               "糕点": [{id: "24", name: "糕点", cls: "糕点", price: "152", sels: "12", imageUrl: "images/24.jpg"},
 *                       {id: "25", name: "糕点", cls: "糕点", price: "154", sels: "16", imageUrl: "images/25.jpg"},
 *                       {id: "26", name: "糕点", cls: "糕点", price: "151", sels: "18", imageUrl: "images/26.jpg"}]    
 *              }
 */
exports.getItems = function(callback) {
    var sql = "select b.* from gd_ctlg a right join gd_mst b " +
        "on a.ctlg_name = b.gd_catalogue_name order by a.ctlg_name";
    var values = [];
    db.exec(sql, values, function(err, result) {
        if (err) {
            callback(err);
            return;
        }
        var items = {};

        if (result.length > 0) {
            var item = {};
            var arr = [];

            for (var i = 0; i < result.length; ++i) {
                item['id'] = result[i].gd_id + '';
                item['name'] = result[i].gd_name;
                item['cls'] = result[i].gd_catalogue_name;
                item['price'] = result[i].gd_price;
                item['sels'] = result[i].gd_sales;
                item['imageUrl'] = result[i].gd_picture;
                item['smallImageUrl'] = result[i].gd_small_picture;
                item['saleOut'] = result[i].gd_is_sale_out;
                arr.push(item);
                item = {};
                while (i < result.length - 1 && result[i].gd_catalogue_name == result[i + 1].gd_catalogue_name) {
                    item['id'] = result[i + 1].gd_id + '';
                    item['name'] = result[i + 1].gd_name;
                    item['cls'] = result[i + 1].gd_catalogue_name;
                    item['price'] = result[i + 1].gd_price;
                    item['sels'] = result[i + 1].gd_sales;
                    item['imageUrl'] = result[i + 1].gd_picture;
                    item['smallImageUrl'] = result[i + 1].gd_small_picture;
                    item['saleOut'] = result[i + 1].gd_is_sale_out;
                    arr.push(item);
                    item = {};
                    ++i;
                }
                items[result[i].gd_catalogue_name] = arr;
                arr = [];
            }
        }
        callback(null, items);
    });
};

/**
  get items config from db , callbacl error or json result
 recommend list is the list of item id,
     result json format like this:
         {
    "size": [
    "大份",
    "小份"
],
    "flavor": [
    "微辣",
    "中辣"
],
    "recommend": [
    "7"
]
}
 */
exports.getConfig = function (value,callback){
    var sql_config = 'SELECT * FROM gd_mst_config where gd_id = ? order by gd_config_type ';
    db.exec(sql_config, value, function (err, result) {
        if (err) {
            //callback(err);
            return;
        }
        var configuration = {};
        if(result.length>0){

            var sizeList=[];
            var flavorList=[];
            var recommendList=[];
            for(var i = 0 ; i<result.length;i++){
                switch (result[i].gd_config_type){
                    case 1:
                        sizeList.push(result[i].gd_config);
                        break;
                    case 2:
                        flavorList.push(result[i].gd_config);
                        break;
                    case 3:
                        recommendList.push(result[i].gd_config);
                        break;
                    default:
                        break;
                }
            }
            configuration.size = sizeList;
            configuration.flavor= flavorList;
            configuration.recommend = recommendList;
        }
        callback(null,configuration);
    });
}