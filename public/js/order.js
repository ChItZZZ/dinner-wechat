/**
 * Created by 重书 on 2016/9/11.
 */
var order_arr = [];
var options = [];
var page_counter = 1;
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

    options = [
        {selector: '#footer', offset: -40, callback: 'updateFire()' },

    ];
    Materialize.scrollFire(options);
});
function updateFire(){
    page_counter ++;
    $("#loader").show();
    console.log("Fetching");
    $.ajax({
        type: 'post',
        url: '/getMoreOrder',
        data: {
            page:page_counter
        },
        success: function (data) {
            console.log(data);
            if(data.length == 0){
                Materialize.toast("没有更多订单.", 1500 );
                $("#loader").hide();
            }else {
                for(var i = 0;i<data.length;i++){
                    var order_price=data[i]['price'];
                    var id=data[i]['id'];
                    var state=data[i]['state'];
                    var date=data[i]['date'];
                    var items=data[i].items;
                    var result = '';
                    if(data[i]['state']==0){
                        result+='<div class=\"row card z-depth-1 darken-1 hoverable\" id=\"'+id+'\" onclick=payOrder('+id+','+order_price+')>';
                        result+='<div class=\"col-md-12 clearfix card-content order_state\">\
                                       <div class=\"col-md-6 red-text\">\
                                            订单未支付'

                    }else {
                        result+='<div class=\"row card z-depth-1 darken-1 hoverable\" id=\"'+id+'\">';
                        result+='<div class=\"col-md-12 clearfix card-content order_state\">\
                                       <div class=\"col-md-6\">\
                                            订单已完成';

                    }
                    result+= '<span style="font-size: 14px;color: darkgray;">\
                             '+date+'\
                                     </span>\
                                 </div>\
                             </div>\
                             <div class="col s12 clearfix card-action">';
                    for(var j=0;j<items.length;j++){
                        result+='<div class="col s6">\
                            <div class="col s6 clearfix item_name"><span>\
                        '+items[j]['name']+'\
                            </span></div>\
                            </div>\
                            <div class="col s6">\
                            <div class="btn_wrap counter"><i class="nocounter fl" style="display: inline-block;">\
                        '+items[j]['counter']+'份\
                            </i></div>\
                            </div>';
                    }
                    result+='</div>\
                            <div class=\"col-md-12 clearfix card-action order_paid\">\
                            <span class=\"ac_paid\">实付:\
                        '+order_price+'\
                    </span>\
                    </div>\
                        </div>';
                    $("#J_order_list").append(result);
                    if(i==data.length-1){

                    }
                }
            }
            options = [
                {selector: '#footer', offset: -20, callback: 'updateFire()' },
            ];
            Materialize.scrollFire(options);
            $("#loader").hide();
        }
    })


}
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
