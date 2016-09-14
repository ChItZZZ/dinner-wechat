/**
 *
 * Created by my on 9/13/16.
 */
var ButtonInfo = React.createClass({
    getInitialState: function () {
        return {
            value: '点击',
            css:{
                fontSize:'25px',
                zIndex:1
            }
        }
    },
    render: function () {
        return (
            <div>
                <button className="btn btn-info button-info" style={{fontSize:'30px'}}>{this.state.value}</button>
            </div>
        );
    }
});

ReactDOM.render(
    <ButtonInfo/>,
    document.getElementById('example')
);
