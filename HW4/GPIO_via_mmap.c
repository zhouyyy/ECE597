// From : http://stackoverflow.com/questions/13124271/driving-beaglebone-gpio-through-dev-mem
//
// Read one gpio pin and write it out to another using mmap.
// Be sure to set -O3 when compiling.
// Modified by Mark A. Yoder  26-Sept-2013

// Modified by Ying Ying Zhou 10/1/14
// Added second GPIO input-output pair using mmap.

#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h> 
#include <signal.h>    // Defines signal-handling functions (i.e. trap Ctrl-C)
#include "beaglebone_gpio.h"

/****************************************************************
 * Global variables
 ****************************************************************/
int keepgoing = 1;    // Set to 0 when ctrl-c is pressed

/****************************************************************
 * signal_handler
 ****************************************************************/
void signal_handler(int sig);
// Callback called when SIGINT is sent to the process (Ctrl-C)
void signal_handler(int sig)
{
    printf( "\nCtrl-C pressed, cleaning up and exiting...\n" );
	keepgoing = 0;
}

int main(int argc, char *argv[]) {
    volatile void *gpio_addr;
    volatile unsigned int *gpio_oe_addr;
    volatile unsigned int *gpio_datain;
    volatile unsigned int *gpio_setdataout_addr;
    volatile unsigned int *gpio_cleardataout_addr;

    volatile void *gpio_addr2;
    volatile unsigned int *gpio_oe_addr2;
    volatile unsigned int *gpio_datain2;
    volatile unsigned int *gpio_setdataout_addr2;
    volatile unsigned int *gpio_cleardataout_addr2;

    unsigned int reg;

    // Set the signal callback for Ctrl-C
    signal(SIGINT, signal_handler);

    int fd = open("/dev/mem", O_RDWR);

	//GPIO 1
    printf("Mapping %X - %X (size: %X)\n", GPIO0_START_ADDR, GPIO0_END_ADDR, 
                                           GPIO0_SIZE);

    gpio_addr = mmap(0, GPIO0_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 
                        GPIO0_START_ADDR);

    gpio_oe_addr           = gpio_addr + GPIO_OE;
    gpio_datain            = gpio_addr + GPIO_DATAIN;
    gpio_setdataout_addr   = gpio_addr + GPIO_SETDATAOUT;
    gpio_cleardataout_addr = gpio_addr + GPIO_CLEARDATAOUT;

    if(gpio_addr == MAP_FAILED) {
        printf("Unable to map GPIO\n");
        exit(1);
    }
    printf("GPIO mapped to %p\n", gpio_addr);
    printf("GPIO OE mapped to %p\n", gpio_oe_addr);
    printf("GPIO SETDATAOUTADDR mapped to %p\n", gpio_setdataout_addr);
    printf("GPIO CLEARDATAOUT mapped to %p\n", gpio_cleardataout_addr);

	//GPIO2
    printf("Mapping %X - %X (size: %X)\n", GPIO0_START_ADDR, GPIO0_END_ADDR, 
                                           GPIO0_SIZE);

    gpio_addr2 = mmap(0, GPIO0_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 
                        GPIO0_START_ADDR);

    gpio_oe_addr2           = gpio_addr2 + GPIO_OE;
    gpio_datain2            = gpio_addr2 + GPIO_DATAIN;
    gpio_setdataout_addr2   = gpio_addr2 + GPIO_SETDATAOUT;
    gpio_cleardataout_addr2 = gpio_addr2 + GPIO_CLEARDATAOUT;

    if(gpio_addr2 == MAP_FAILED) {
        printf("Unable to map GPIO\n");
        exit(1);
    }
    printf("GPIO mapped to %p\n", gpio_addr2);
    printf("GPIO OE mapped to %p\n", gpio_oe_addr2);
    printf("GPIO SETDATAOUTADDR mapped to %p\n", gpio_setdataout_addr2);
    printf("GPIO CLEARDATAOUT mapped to %p\n", gpio_cleardataout_addr2);

	//copy input to output
    printf("Start copying GPIO_07 to GPIO_30\n");
    printf("Start copying GPIO_05 to GPIO_03\n");

    while(keepgoing) {
/*
    	if(*gpio_datain & GPIO_07) {
            *gpio_setdataout_addr= GPIO_30;
    	} else {
            *gpio_cleardataout_addr = GPIO_30;
    	}
    	if(*gpio_datain2 & GPIO_60) {
            *gpio_setdataout_addr2= GPIO_03;
    	} else {
            *gpio_cleardataout_addr2 = GPIO_03;
    	}
*/
    	if(*gpio_datain & GPIO_05) {
            *gpio_setdataout_addr= GPIO_30;
    	} else {
            *gpio_cleardataout_addr = GPIO_30;
    	}
    	if(*gpio_datain2 & GPIO_07) {
            *gpio_setdataout_addr2= GPIO_03;
    	} else {
            *gpio_cleardataout_addr2 = GPIO_03;
    	}
        //usleep(1);
    }

    munmap((void *)gpio_addr, GPIO0_SIZE);
    munmap((void *)gpio_addr2, GPIO0_SIZE);

    close(fd);
    return 0;
}
