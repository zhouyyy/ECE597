Ying Ying Zhou
ECE597 - HW3
9/23/14

- tmp101.js
This program reads values from the two TMP101 temperature sensors on the board.
It configures the two sensors with THigh = 28 degrees celcius and Tlow = 26 degrees celcius. 
When the temperature is outside of the range, it will trigger an interrupt on the alert pin, which prints out the current temperature on the sensor. 

-HW3_etch_and_sketch.js
This program is an extension of HW2_etch_and_sketch.js. The five buttons on the breadboard represent the four directions and reset. When a button is pressed, a respective LED lights up, and 'x' is "etched" into a 8x8 grid printed on the screen. No response will be triggered if the user attempts to move outside of the range of the grid. The fifth button is a reset button, which will clear the grid when pressed. 
The grid is also displayed on the 8x8 LED Matrix.
