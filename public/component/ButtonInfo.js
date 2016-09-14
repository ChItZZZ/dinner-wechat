/**
 *
 * Created by my on 9/13/16.
 */


var ButtonInfo = React.createClass({

    getDefaultProps: function () {
        value: '默认'
    },
    render: function () {
        return (
            <button className="btn btn-info">{this.props.value}</button>
        );
    }
});
