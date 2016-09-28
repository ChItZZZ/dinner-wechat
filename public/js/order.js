/**
 * Created by 重书 on 2016/9/11.
 */
var order_arr = [];
$(function () {
    console.log("Posting now");
    $.ajax({
        type: 'post',
        url: 'http://wechat.qiancs.cn/searchorder',
        data: {
            open_id:123
        },
        success: function (data) {
            console.log(data);
            order_arr = data;
        }
    })
})
