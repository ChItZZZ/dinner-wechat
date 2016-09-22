/**
 *
 * Created by my on 9/13/16.
 */
//var Sidebar = require('Sidebar');
var ListMenu = require('./ListMenu');
var dataList = require('../../models/item_test').items;
//require('../../public/css/flat.css')
//import React from 'react';
//import ReactDOM from 'react-dom';
//var React = require('react');
//var ReactDOM = require('react-dom');

if(module.hot) {
    module.hot.accept();
}

ReactDOM.render(
    <ListMenu data={dataList}></ListMenu>,
    document.getElementById('ex')
);
