#include<stdio.h>
#include<stdlib.h>

void main()
{
	int lengthX = 7;
	int lengthY = 7;
	char grid [lengthX][lengthY];
	int i;
	int j;

	for (i=0; i<lengthX; i++) {
		for (j=0; j<lengthY; j++) {
		grid [i][j] = ' ';
		}
	}

	for (i=0; i<lengthX; i++) {
		for (j=0; j<lengthY; j++) {
		printf("%c ", grid [i][j]);
		}
	printf("\n");
	}

	int x = 0;
	int y = 0;
	char input[1];

	while (1) {
	        printf("a,s,w,d or z: ");
        	scanf("%s", input);
		printf("input is: %i\n", input[0]); 

			
		switch (input[0]) {
		case 'a':
			y--;
			grid [x][y] = 'x';
			for (i=0; i<lengthX; i++) {
				for (j=0; j<lengthY; j++) {
				printf("%c ", grid [i][j]);
				}
			printf("\n");
			}
			break;
		case 'd':
			y++;
			grid [x][y] = 'x';
			for (i=0; i<lengthX; i++) {
				for (j=0; j<lengthY; j++) {
				printf("%c ", grid [i][j]);
				}
			printf("\n");
			}			
			break;
		case 'w':
			x--;
			grid [x][y] = 'x';
			for (i=0; i<lengthX; i++) {
				for (j=0; j<lengthY; j++) {
				printf("%c ", grid [i][j]);
				}
			printf("\n");
			}
			break;
		case 's':
			x++;
			grid [x][y] = 'x';
			for (i=0; i<lengthX; i++) {
				for (j=0; j<lengthY; j++) {
				printf("%c ", grid [i][j]);
				}
			printf("\n");
			}
			break;
		case 'z':
			for (i=0; i<lengthX; i++) {
				for (j=0; j<lengthY; j++) {
				grid [i][j] = ' ';
				}
			}
			for (i=0; i<lengthX; i++) {
				for (j=0; j<lengthY; j++) {
				printf("%c ", grid [i][j]);
				}
			printf("\n");
			}
			x = 0;
			y = 0;
			break;
		default:
			break;
		}
	}
	
}



