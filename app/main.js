// const greeter=require('./Greeter.js');
// document.querySelector("#root").appendChild(greeter());
//
import React from 'react';
import {render} from 'react-dom';
import Greeter from "./Greeter";

// import './main.css';
import 'ol/ol.css';
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import XYZSource from 'ol/source/xyz';
// import './jquery.min.js'
// const $=require('jQuery')
const moment=require('moment')
// render(<Greeter />, document.getElementById('root'))


new Map({
    target: 'map-container',
    layers: [
        new TileLayer({
            source: new XYZSource({
                url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
            })
        })
    ],
    view: new View({
        center: [0, 0],
        zoom: 2
    })
});
$('body').append('<p>now is '+moment().format()+'</p>')
