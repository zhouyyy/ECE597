#!/usr/bin/env node

var b = require('bonescript');

//read GPIO
var alert = 'P9_21';
var alert2 = 'P9_22';

b.pinMode(alert, b.INPUT, 7, 'pullup');
b.pinMode(alert2, b.INPUT, 7, 'pullup');
state = b.digitalRead(alert);
state2 = b.digitalRead(alert2);
console.log('alert state =' + state);
console.log('alert state 2=' + state2);
//interrupt
b.attachInterrupt(alert, false, b.CHANGE, printStatus);
b.attachInterrupt(alert2, false, b.CHANGE, printStatus2);

function printStatus(x) {
	console.log('x.value = ' + x.value);
}

function printStatus2(x) {
	console.log('x.value2 = ' + x.value);
}
