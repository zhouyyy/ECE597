#!/bin/bash

echo $(i2cset -y 1 0x48 1 0x04)
echo $(i2cset -y 1 0x48 2 0x1b)
echo $(i2cset -y 1 0x48 3 0x1c)

echo $(i2cset -y 1 0x4a 1 0x04)
echo $(i2cset -y 1 0x4a 2 0x1b)
echo $(i2cset -y 1 0x4a 3 0x1c)
