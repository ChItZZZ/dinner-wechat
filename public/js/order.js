/**
 * Created by 重书 on 2016/9/11.
 */
var order_arr = [];
$(function () {
    console.log("Posting now");
    $.ajax({
        type: 'post',
        url: '/searchorder',
        data: {
            open_id:123
        },
        success: function (data) {
            console.log(data);
            order_arr = data;
        }
    })

});
function payOrder(id,price){
    var desk_id = 1;
    var store_id = 1;
    window.location = '/payForUnfinishedOrder?price='+ price + '&'
        +'order_id='+ id  + '&'
        +'order_str='+ '{}' + '&'
        +'desk_id='  + desk_id   + '&'
        +'store_id=' + store_id;
}
// $(document).ready(function(){
//     alert(arr.length+"");
//     for(var i=0;i<arr.length;i++) {
//         if(arr[i]['state'] == 0){
//             console.log(i+'binded');
//             $("#" + i).bind("click", function(e){
//                 var desk_id = 1;
//                 var store_id = 1;
//                 window.location = 'http://wechat.qiancs.cn/payForUnfinishedOrder?price='+ arr[i].price + '&'
//                     +'order_id='+ arr[i]['id']  + '&'
//                     +'order_str='+ '{}' + '&'
//                     +'desk_id='  + desk_id   + '&'
//                     +'store_id=' + store_id;
//             });
//         }
//
//     }
//
// });
