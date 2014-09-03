/*
Ying Ying Zhou
ECE597 HW4
10/2/14
matrixLED.js

This program is modified from matrixLED.js, and utilizes both red and green LEDs on the 8x8 display.
Pixels will respond to clicks, and change state between green, yellow, red, and off.
*/

    var socket;
    var firstconnect = true,
        i2cNum  = "0x70",
	disp = [];
	dispred = [];
	dispgreen = [];

var count = 0;

// Create a matrix of LEDs inside the <table> tags.
var matrixData;
for(var j=7; j>=0; j--) {
	matrixData += '<tr>';
	for(var i=0; i<8; i++) {
	    matrixData += '<td><div class="LED" id="id'+i+'_'+j+
		'" onclick="LEDclick('+i+','+j+')">'+
		i+','+j+'</div></td>';
	    }
	matrixData += '</tr>';
}
$('#matrixLED').append(matrixData);

// The slider controls the overall brightness
$("#slider1").slider({min:0, max:15, slide: function(event, ui) {
	socket.emit("i2cset",  {i2cNum: i2cNum, i: ui.value+0xe0, disp: 1});
    }});


// Send one column when LED is clicked.
function LEDclick(i, j) {
//	alert(i+","+j+" clicked");
//	socket.emit('i2c', i2cNum);
	count++;
	console.log('count is '+count);

	if (count==1) {
		dispgreen[i] ^= 0x1<<j;
		dispred[i] ^= 0x0<<j;
		$('#id'+i+'_'+j).addClass('green');
		console.log('green');
	}else if (count==2) {
		dispred[i] ^= 0x1<<j;
		$('#id'+i+'_'+j).addClass('yellow');
	        $('#id'+i+'_'+j).removeClass('green');
		console.log('yellow');
	}else if (count==3) {
		dispgreen[i] ^= 0x1<<j;
		$('#id'+i+'_'+j).addClass('red');
	        $('#id'+i+'_'+j).removeClass('yellow');
		console.log('red');
	}else if (count>3) {
		dispred[i] ^= 0x1<<j;
	        $('#id'+i+'_'+j).removeClass('red');
		count = 0;
		console.log('off');
	}


    // Toggle bit on display
/*    if(disp[i]>>j&0x1 === 1) {
        $('#id'+i+'_'+j).addClass('on');
    } else {
        $('#id'+i+'_'+j).removeClass('on');
    }
*/
    socket.emit('i2cset', {i2cNum: i2cNum, i: 2*i, 
			     disp: '0x'+dispgreen[i].toString(16)});
    socket.emit('i2cset', {i2cNum: i2cNum, i: 2*i+1, 
			     disp: '0x'+dispred[i].toString(16)});
}

    function connect() {
      if(firstconnect) {
        socket = io.connect(null);

        // See https://github.com/LearnBoost/socket.io/wiki/Exposed-events
        // for Exposed events
        socket.on('message', function(data)
            { status_update("Received: message " + data);});
        socket.on('connect', function()
            { status_update("Connected to Server"); });
        socket.on('disconnect', function()
            { status_update("Disconnected from Server"); });
        socket.on('reconnect', function()
            { status_update("Reconnected to Server"); });
        socket.on('reconnecting', function( nextRetry )
            { status_update("Reconnecting in " + nextRetry/1000 + " s"); });
        socket.on('reconnect_failed', function()
            { message("Reconnect Failed"); });

        socket.on('matrix',  matrix);

    socket.emit('i2cset', {i2cNum: i2cNum, i: 0x21, disp: 1}); // Start oscillator (p10)
    socket.emit('i2cset', {i2cNum: i2cNum, i: 0x81, disp: 1}); // Disp on, blink off (p11)
    socket.emit('i2cset', {i2cNum: i2cNum, i: 0xe7, disp: 1}); // Full brightness (page 15)
    /*
	i2c_smbus_write_byte(file, 0x21); 
	i2c_smbus_write_byte(file, 0x81);
	i2c_smbus_write_byte(file, 0xe7);
    */
        // Read display for initial image.  Store in disp[]
        socket.emit("matrix", i2cNum);

        firstconnect = false;
      }
      else {
        socket.socket.reconnect();
      }
    }

    function disconnect() {
      socket.disconnect();
    }

    // When new data arrives, convert it and display it.
    // data is a string of 16 values, each a pair of hex digits.
    function matrix(data) {
        var i, j;
        dispgreen = [];
	dispred = [];
        //        status_update("i2c: " + data);
        // Make data an array, each entry is a pair of digits
        data = data.split(" ");
        //        status_update("data: " + data);
        // Every other pair of digits are Green. The others are red.
        // Ignore the red.
        // Convert from hex.
        for (i = 0; i < data.length; i += 2) {
            dispgreen[i / 2] = parseInt(data[i], 16);
            dispred[(i-1) / 2] = parseInt(data[i], 16);
        }
        //        status_update("disp: " + disp);
        // i cycles through each column
/*
        for (i = 0; i < disp.length; i++) {
            // j cycles through each bit
            for (j = 0; j < 8; j++) {
                if (((disp[i] >> j) & 0x1) === 1) {
                    $('#id' + i + '_' + j).addClass('on');
                } else {
                    $('#id' + i + '_' + j).removeClass('on');
                }
            }
        }
*/
        for (i = 0; i < dispgreen.length; i++) {
            // j cycles through each bit
            for (j = 0; j < 8; j++) {
                if (((dispgreen[i] >> j) & 0x1) === 1) {
                    $('#id' + i + '_' + j).addClass('green');
                } else {
                    $('#id' + i + '_' + j).removeClass('green');
                }
            }
        }
        for (i = 0; i < dispred.length; i++) {
            // j cycles through each bit
            for (j = 0; j < 8; j++) {
                if (((dispred[i] >> j) & 0x1) === 1) {
                    $('#id' + i + '_' + j).addClass('red');
                } else {
                    $('#id' + i + '_' + j).removeClass('red');
                }
            }
        }
    }

    function status_update(txt){
	$('#status').html(txt);
    }

    function updateFromLED(){
      socket.emit("matrix", i2cNum);    
    }

connect();

$(function () {
    // setup control widget
    $("#i2cNum").val(i2cNum).change(function () {
        i2cNum = $(this).val();
    });
});
