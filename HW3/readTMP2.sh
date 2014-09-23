#!/bin/bash

t2=$(i2cget -y 1 0x4a 0)
echo $((($t2)*9/5+32)) 
