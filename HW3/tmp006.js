#!/usr/bin/env node
var TMP006 = require('sensor_tmp006');

var sense = new TMP006();
sense.init(function(err, val) {
  if (!err) {
    sense.getObjTemp(function(error, val) {
      if (!error) console.log(val + ' °C');
    });    
  }
});
