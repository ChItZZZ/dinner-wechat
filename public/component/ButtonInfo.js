/**
 *
 * Created by my on 9/12/16.
 */
//var React = require('react');
//var ReactDOM = require('react-dom');

var ButtonInfo = React.createClass({
    getInitialState: function () {
        return {
            value:"下单"
        }
    },
    render: function () {
        return (
            <button className="btn btn-info">{this.state.value}</button>
        );
    }
});

ReactDOM.render(
    <ButtonInfo></ButtonInfo>
,document.getElementById('example'));

//module.exports = Component;
