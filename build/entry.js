/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * Created by my on 9/13/16.
	 */
	//var Sidebar = require('Sidebar');
	var ListMenu = __webpack_require__(1);
	var dataList = __webpack_require__(2).items;

	ReactDOM.render(React.createElement(ListMenu, { data: dataList }), document.getElementById('ex'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 *
	 * Created by my on 9/13/16.
	 */
	//var React = require('react');
	var dataList = {
	    "面类": [{ id: "1", name: "咸肉面", cls: "肉品", price: "15", sels: "45", imageUrl: "images/1.jpg" }, { id: "2", name: "牛肉面", cls: "肉品", price: "23", sels: "75", imageUrl: "images/2.jpg" }, { id: "3", name: "牛杂面", cls: "肉品", price: "45", sels: "36", imageUrl: "images/3.jpg" }, { id: "4", name: "素面", cls: "肉品", price: "85", sels: "26", imageUrl: "images/4.jpg" }],
	    "蔬菜": [{ id: "13", name: "飘菜", cls: "蔬菜", price: "152", sels: "524", imageUrl: "images/13.jpg" }, { id: "14", name: "苦瓜", cls: "蔬菜", price: "154", sels: "524", imageUrl: "images/14.jpg" }, { id: "16", name: "黄瓜", cls: "蔬菜", price: "152", sels: "524", imageUrl: "images/16.jpg" }, { id: "17", name: "黄豆", cls: "蔬菜", price: "152", sels: "524", imageUrl: "images/17.jpg" }, { id: "18", name: "白苦瓜", cls: "蔬菜", price: "152", sels: "524", imageUrl: "images/18.jpg" }],
	    "糕点": [{ id: "24", name: "糕点", cls: "糕点", price: "152", sels: "12", imageUrl: "images/24.jpg" }, { id: "25", name: "糕点", cls: "糕点", price: "154", sels: "16", imageUrl: "images/25.jpg" }, { id: "26", name: "糕点", cls: "糕点", price: "151", sels: "18", imageUrl: "images/26.jpg" }, { id: "27", name: "糕点", cls: "糕点", price: "152", sels: "19", imageUrl: "images/27.jpg" }]
	};

	//var dataList = [{id: "1", name: "咸肉面", cls: "肉品", price: "15", sels: "45", imageUrl: "images/1.jpg"},
	//    {id: "2", name: "牛肉面", cls: "肉品", price: "23", sels: "75", imageUrl: "images/2.jpg"},
	//    {id: "3", name: "牛杂面", cls: "肉品", price: "45", sels: "36", imageUrl: "images/3.jpg"},
	//    {id: "4", name: "素面", cls: "肉品", price: "85", sels: "26", imageUrl: "images/4.jpg"}];
	var ListMenu = React.createClass({
	    displayName: "ListMenu",

	    getInitialState: function () {
	        return {
	            see: false
	        };
	    },
	    render: function () {
	        //var oneMenuNodes = this.props.results.map(function (result, index) {
	        //    return <dd className="active" key={index}><a data_name={result.id}>{result.name }</a></dd>;
	        //});

	        var oneMenuNodes = Object.keys(dataList).map(function (name, index) {
	            return React.createElement(
	                "dd",
	                { className: "active", key: index },
	                React.createElement(
	                    "a",
	                    { data_name: name },
	                    name
	                )
	            );
	        });

	        var display = this.state.see ? 'block' : '';
	        return React.createElement(
	            "div",
	            { style: { display: display } },
	            oneMenuNodes
	        );
	    }
	});
	listMenu = ReactDOM.render(React.createElement(ListMenu, { results: dataList }), document.getElementById('ex'));
	//module.exports = ListMenu;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var iG = {
	    items: {
	        "面类": [{ id: "1", name: "咸肉面", cls: "肉品", price: "15", sels: "45", imageUrl: "images/1.jpg" }, { id: "2", name: "牛肉面", cls: "肉品", price: "23", sels: "75", imageUrl: "images/2.jpg" }, { id: "3", name: "牛杂面", cls: "肉品", price: "45", sels: "36", imageUrl: "images/3.jpg" }, { id: "4", name: "素面", cls: "肉品", price: "85", sels: "26", imageUrl: "images/4.jpg" }],
	        "蔬菜": [{ id: "13", name: "飘菜", cls: "蔬菜", price: "152", sels: "524", imageUrl: "images/13.jpg" }, { id: "14", name: "苦瓜", cls: "蔬菜", price: "154", sels: "524", imageUrl: "images/14.jpg" }, { id: "16", name: "黄瓜", cls: "蔬菜", price: "152", sels: "524", imageUrl: "images/16.jpg" }, { id: "17", name: "黄豆", cls: "蔬菜", price: "152", sels: "524", imageUrl: "images/17.jpg" }, { id: "18", name: "白苦瓜", cls: "蔬菜", price: "152", sels: "524", imageUrl: "images/18.jpg" }],
	        "糕点": [{ id: "24", name: "糕点", cls: "糕点", price: "152", sels: "12", imageUrl: "images/24.jpg" }, { id: "25", name: "糕点", cls: "糕点", price: "154", sels: "16", imageUrl: "images/25.jpg" }, { id: "26", name: "糕点", cls: "糕点", price: "151", sels: "18", imageUrl: "images/26.jpg" }, { id: "27", name: "糕点", cls: "糕点", price: "152", sels: "19", imageUrl: "images/27.jpg" }]
	    }
	};

	module.exports = iG;

/***/ }
/******/ ]);