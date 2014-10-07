#!/usr/bin/env node

//Ying Ying Zhou
//ECE597 HW2
//Etch and Sketch
//This program uses the five buttons on the breadboard to etch on a grid.

var b = require('bonescript');

var LED_left = 'P9_11';
var LED_up = 'P9_13';
var LED_right = 'P9_15';
var LED_down = 'P9_17';

var button_left = 'P9_12';
var button_up = 'P9_14';
var button_right = 'P9_16';
var button_down = 'P9_18';
var button_reset = 'P9_42';

var i;
var j;
var x = 0;
var y = 0;
var size = 8;

//initialize grid
var grid = new Array(size);
for (i = 0; i < size; i++){
	grid[i] = new Array(size);
}

//set button and LED pinmode
b.pinMode(LED_left, b.OUTPUT, 7);
b.pinMode(LED_up, b.OUTPUT, 7);
b.pinMode(LED_right, b.OUTPUT, 7);
b.pinMode(LED_down, b.OUTPUT, 7);

b.pinMode(button_left, b.INPUT, 7, 'pullup');
b.pinMode(button_up, b.INPUT, 7, 'pullup');
b.pinMode(button_right, b.INPUT, 7, 'pullup');
b.pinMode(button_down, b.INPUT, 7, 'pullup');
b.pinMode(button_reset, b.INPUT, 7, 'pullup');

b.attachInterrupt(button_left, false, b.CHANGE, moveLeft);
b.attachInterrupt(button_up, false, b.CHANGE, moveUp);
b.attachInterrupt(button_right, false, b.CHANGE, moveRight);
b.attachInterrupt(button_down, false, b.CHANGE, moveDown);
b.attachInterrupt(button_reset, false, b.CHANGE, clear);

//print empty grid
for (i=0; i<size; i++){
	for (j=0; j<size; j++) {
		grid[i][j] = ' ';
	}
}

for (i=0; i<size; i++){
	console.log(grid[i]);
}

function moveLeft(b_state) {
//	console.log('left');
//	console.log('state value ' + b_state.value);
	if ((y>0) && (b_state.value == 0)){
	y--;
	grid[x][y] = 'x';
	for (i=0; i<size; i++){
		console.log(grid[i]);
	}
	console.log('\n');
	b.digitalWrite(LED_left, b.HIGH);
	}
	if (b_state.value == 1) 
	b.digitalWrite(LED_left, b.LOW);
}

function moveUp(b_state) {
//	console.log('up');
//	console.log('state value ' + b_state.value);
	if ((x>0) && (b_state.value == 0)) {
	x--;
	grid[x][y] = 'x';
	for (i=0; i<size; i++){
		console.log(grid[i]);
	}
	console.log('\n');
	b.digitalWrite(LED_up, b.HIGH);
	}
	if (b_state.value == 1) 
	b.digitalWrite(LED_up, b.LOW);
}

function moveRight(b_state) {
//	console.log('right');
//	console.log('state value ' + b_state.value);
	if ((y<(size-1) && (b_state.value==0))) {
	y++;
	grid[x][y] = 'x';
	for (i=0; i<size; i++){
		console.log(grid[i]);
	}
	console.log('\n');
	b.digitalWrite(LED_right, b.HIGH);
	}
	if (b_state.value == 1) 
	b.digitalWrite(LED_right, b.LOW);
}

function moveDown(b_state) {
//	console.log('down');
//	console.log('state value ' + b_state.value);
	if ((x<(size-1) && (b_state.value==0))) {
	x++;
	grid[x][y] = 'x';
	for (i=0; i<size; i++){
		console.log(grid[i]);
	}
	console.log('\n');
	b.digitalWrite(LED_down, b.HIGH);
	}
	if (b_state.value == 1) 
	b.digitalWrite(LED_down, b.LOW);
}

function clear(b_state) {
	if (b_state.value==1) {
		for (i=0; i<size; i++){
			for (j=0; j<size; j++) {
				grid[i][j] = ' ';
			}
		}

		for (i=0; i<size; i++){
			console.log(grid[i]);
		}
	}
}
