Ying Ying Zhou
ECE597 - HW4
10/2/14

- GPIO_via_mmap.c
This program is modified from gpioThru.c in the exercises.
Run setup.gpioToggle.sh before running this program. 
It reads two buttons wired on the breadboard (from GPIO_7 and GPIO_5), and sets the values on two LEDS (GPIO_30 and GPIO_3) to follow the values on the buttons. 

- gpioThru.c
This program reads the value from a button, and sets the value on an LED.

- HW4_etch_and_sketch.js
This program is an extension of HW3_etch_and_sketch.js.
Run setupEncoder.sh before running this program.
Instead of buttons, two rotary encoders are used to etch the grid. The reset button remains the same. 

- realtime/matrixLED.js
This program is modified from the example matrixLED.js.
Instead of toggling between on and off, each click cycles the cell through green, yellow, red, and off. 
