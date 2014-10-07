#!/bin/bash
dtc -O dtb -o bone_eqep2b-00A0.dtbo -b 0 -@ bone_eqep2b.dts
cp bone_eqep2b-00A0.dtbo /lib/firmware
echo bone_eqep2b > /sys/devices/bone_capemgr.*/slots

dtc -O dtb -o bone_eqep1b-00A0.dtbo -b 0 -@ bone_eqep1b.dts
cp bone_eqep1b-00A0.dtbo /lib/firmware
echo bone_eqep1b > /sys/devices/bone_capemgr.*/slots
