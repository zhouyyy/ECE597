#!/usr/bin/env node

//Ying Ying Zhou
//ECE597 - HW3
//Read TMP101
//This program sets and reads the values of the two TMP101 temperature sensors
//on the breadboard. Thigh is set to 82 degrees F, and Tlow is set to 78 
//degress F. When the temperature falls out of this range, an interrupt
//will be triggered, and the current temperature on the sensor will be 
//printed.

var b = require('bonescript');
var exec = require('child_process').exec;

//read GPIO
var alert = 'P9_21';
var alert2 = 'P9_22';

b.pinMode(alert, b.INPUT, 7, 'pullup');
b.pinMode(alert2, b.INPUT, 7, 'pullup');

//state = b.digitalRead(alert);
//state2 = b.digitalRead(alert2);
//console.log('alert state =' + state);
//console.log('alert state 2=' + state2);

//set Thigh and Tlow
        exec ('./setTMP.sh', function(error, stdout, stderr) {
        //console.log('stdout: ' + stdout);
        //console.log('stderr: ' + stderr);
        if (error !== null) {
                console.log('exec error: ' + error);
        }
        });

//interrupt
b.attachInterrupt(alert, false, b.CHANGE, printStatus);
b.attachInterrupt(alert2, false, b.CHANGE, printStatus2);

function printStatus(x) {
	//console.log('x.value = ' + x.value);
	exec ('./readTMP.sh', function(error, stdout, stderr) {
    	console.log('Temperature of sensor 1 is: ' + stdout);
    	//console.log('stderr: ' + stderr);
    	if (error !== null) {
        	console.log('exec error: ' + error);
    	}
	});
}

function printStatus2(x) {
	//console.log('x.value2 = ' + x.value);
        exec ('./readTMP2.sh', function(error, stdout, stderr) {
        console.log('Temperature of sensor 2 is: ' + stdout);
        //console.log('stderr: ' + stderr);
        if (error !== null) {
                console.log('exec error: ' + error);
        }
        });
}
