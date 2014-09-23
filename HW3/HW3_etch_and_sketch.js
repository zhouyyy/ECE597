#!/usr/bin/env node

//Ying Ying Zhou
//ECE597 HW3
//Etch and Sketch
//This program uses the five buttons on the breadboard to etch on a grid.

var b = require('bonescript');

//add i2c
var i2c = require('i2c');
var address = 0x70;                                  // Address of 8x8 Matrix is found in 0x70
var matrix = new i2c(address, {device: '/dev/i2c-1'}); // Points to the i2c address

//setup Matrix
matrix.writeBytes(0x21, 0x00);            // 8x8 Bi-Color LED Matrix Set-up
matrix.writeBytes(0x81, 0x00);            // Display on and no blinking
matrix.writeBytes(0xE7, 0x00);      // Configures the brightness

//initialize red and green pixels
var red = [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00];    // Red Pixels
var green = [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00]; 

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
                grid[i][j] = 0;
        }
}

for (i=0; i<size; i++){
        console.log(grid[i]);
        var gridToParse = grid[i].join('');
        red[i] = parseInt(gridToParse,2);
        matrix.writeBytes(i*2, [green[i], red[i]]);
}

function moveLeft(b_state) {
//      console.log('left');
//      console.log('state value ' + b_state.value);
        if ((y>0) && (b_state.value == 0)){
        y--;
        grid[x][y] = 1;
        for (i=0; i<size; i++){
                console.log(grid[i]);
                var gridToParse = grid[i].join('');
                red[i] = parseInt(gridToParse,2);
                matrix.writeBytes(i*2, [green[i], red[i]]);
        }
        console.log('\n');
        b.digitalWrite(LED_left, b.HIGH);
        }
        if (b_state.value == 1)
        b.digitalWrite(LED_left, b.LOW);
}

function moveUp(b_state) {
//      console.log('up');
//      console.log('state value ' + b_state.value);
        if ((x>0) && (b_state.value == 0)) {
        x--;
        grid[x][y] = 1;
        for (i=0; i<size; i++){
                console.log(grid[i]);
                var gridToParse = grid[i].join('');
                red[i] = parseInt(gridToParse,2);
                matrix.writeBytes(i*2, [green[i], red[i]]);
	}
        console.log('\n');
        b.digitalWrite(LED_up, b.HIGH);
        }
        if (b_state.value == 1)
        b.digitalWrite(LED_up, b.LOW);
}

function moveRight(b_state) {
//      console.log('right');
//      console.log('state value ' + b_state.value);
        if ((y<(size-1) && (b_state.value==0))) {
        y++;
        grid[x][y] = 1;
        for (i=0; i<size; i++){
                console.log(grid[i]);
                var gridToParse = grid[i].join('');
                red[i] = parseInt(gridToParse,2);
                matrix.writeBytes(i*2, [green[i], red[i]]);
        }
        console.log('\n');
        b.digitalWrite(LED_right, b.HIGH);
        }
        if (b_state.value == 1)
        b.digitalWrite(LED_right, b.LOW);
}

function moveDown(b_state) {
//      console.log('down');
//      console.log('state value ' + b_state.value);
        if ((x<(size-1) && (b_state.value==0))) {
        x++;
        grid[x][y] = 1;
        for (i=0; i<size; i++){
                console.log(grid[i]);
		var gridToParse = grid[i].join('');
		red[i] = parseInt(gridToParse,2);
		matrix.writeBytes(i*2, [green[i], red[i]]);
	}
	console.log(red);
	console.log(green);
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
                                grid[i][j] = 0;
                        }
                }

                for (i=0; i<size; i++){
                        console.log(grid[i]);
	                var gridToParse = grid[i].join('');
 	                red[i] = parseInt(gridToParse,2);
        	        matrix.writeBytes(i*2, [green[i], red[i]]);

                }
        }
}
