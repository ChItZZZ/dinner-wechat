/**
 *
 * Created by my on 9/13/16.
 */
var Item = React.createClass({
    render: function () {
        return (
            <div className="col-md-4 clearfix foot-items">
                <div className="col-xs-4 foot-img">
                    <img src={_list[i].imageUrl} className="img-responsive" style={{height: '90px'}}
                         data_id={ _list[i].id }/>
                </div>
                <div className="col-xs-4 foot-info"><p>
                    <strong>  {_list[i].name } </strong>
                </p>
                    <p className="colred">
                        {_list[i].price}元/份
                    </p>
                    <p>
                        <small>  {_list[i].sels} 人买过</small>
                    </p>
                </div>
                <div className="col-xs-4 icons-pick foot-pick">
                    <div className="btn_wrap counter">
                        <button className="list_minus counter_minus fl" style={{display: ''}} data_id={ _list[i].id }
                                ontouchstart="">
                            <strong></strong>
                        </button>
                        <i className="nocounter fl" style={{display: ''}}>0</i>
                        <button className="list_add counter_plus" data_id={_list[i].id} ontouchstart="">
                            <strong></strong></button>
                        <em className="fixBig  fake"></em>
                    </div>
                </div>
            </div>
        );
    }
});
