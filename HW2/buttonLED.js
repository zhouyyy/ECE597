#!/usr/bin/env node

//Ying Ying Zhou
//ECE597 HW2
//Buttons and LEDs
//This program reads the values on four different buttons, and triggers 
//LEDs to light up when the button is pressed.

var b = require('bonescript');
var LED = 'P9_11';
var LED2 = 'P9_13';
var LED3 = 'P9_15';
var LED4 = 'P9_17';

var button = 'P9_12';
var button2 = 'P9_14';
var button3 = 'P9_16';
var button4 = 'P9_18';

b.pinMode(LED, b.OUTPUT, 7);
b.pinMode(LED2, b.OUTPUT, 7);
b.pinMode(LED3, b.OUTPUT, 7);
b.pinMode(LED4, b.OUTPUT, 7);

b.pinMode(button, b.INPUT, 7, 'pullup');
b.pinMode(button2, b.INPUT, 7, 'pullup');
b.pinMode(button3, b.INPUT, 7, 'pullup');
b.pinMode(button4, b.INPUT, 7, 'pullup');

b.attachInterrupt(button, false, b.CHANGE, lightLED);
b.attachInterrupt(button2, false, b.CHANGE, lightLED2);
b.attachInterrupt(button3, false, b.CHANGE, lightLED3);
b.attachInterrupt(button4, false, b.CHANGE, lightLED4);

function lightLED(b_state) {
	if (b_state.value == 0){
	b.digitalWrite(LED, b.HIGH);
	}
	if (b_state.value == 1) 
	b.digitalWrite(LED, b.LOW);
}

function lightLED2(b_state) {
	if (b_state.value == 0){
	b.digitalWrite(LED2, b.HIGH);
	}
	if (b_state.value == 1) 
	b.digitalWrite(LED2, b.LOW);
}

function lightLED3(b_state) {
	if (b_state.value == 0){
	b.digitalWrite(LED3, b.HIGH);
	}
	if (b_state.value == 1) 
	b.digitalWrite(LED3, b.LOW);
}

function lightLED4(b_state) {
	if (b_state.value == 0){
	b.digitalWrite(LED4, b.HIGH);
	}
	if (b_state.value == 1) 
	b.digitalWrite(LED4, b.LOW);
}
