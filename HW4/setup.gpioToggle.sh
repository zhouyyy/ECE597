#!/bin/bash
# Set up gpio 7 to read and gpio 30 to write
# Set up gpio 4 to read and gpio 60 to write
cd /sys/class/gpio

echo 30 > export
echo 7 > export
echo in  > gpio7/direction
echo out > gpio30/direction

echo 5 > export
echo 3 > export
echo in  > gpio5/direction
echo out > gpio3/direction
