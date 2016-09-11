/**
 * Created by 重书 on 2016/9/11.
 */
$(function () {
    console.log("Posting now");
    $.ajax({
        type: 'post',
        url: 'http://localhost:3000/searchorder',
        data: {
            open_id:123

        },
        success: function (data) {
            console.log(data);
            // iG.items = data;
            // console.log(iG.items);
            // init();//ajax成功后执行init();

        }
    })
})
