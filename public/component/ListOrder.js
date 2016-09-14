/**
 *
 * Created by my on 9/13/16.
 */

var ListOrder = React.createClass({
    render: function () {
        return (
            <div class="row" id="J_order_Manager">
                <div class="col-xs-12 clearfix board_content">
                    <div class="col-xs-4 title_contain">
                        <p class="menu_title ">菜篮子</p>
                    </div>
                    <div class="col-xs-2"></div>
                    <div class="col-xs-3 title_contain">
                        <button class="btn btn-info" id="addOrder">返回选购</button>
                    </div>
                    <div class="col-xs-3 title_contain">
                        <button id="clearOder" class="btn btn-default">清空购物车</button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ListOrder;
