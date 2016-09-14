/**
 *
 * Created by my on 9/13/16.
 */


var ButtonDefault = React.createClass({

    getDefaultProps: function () {
        value: '默认'
    },
    render: function () {
        return (
            <button className="btn btn-default">{this.props.value}</button>
        );
    }
});
