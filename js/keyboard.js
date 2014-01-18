/*
 * keyboard.js
 *
 * This program is licensed under the MIT License.
 * Copyright 2014, aike (@aike1000)
 *
 */
$(function() {

	var n = parseInt($('#key').attr('min'), 10);

	var keytable = {};
	keytable[90]  = n++;	// Z
	keytable[83]  = n++;	// S
	keytable[88]  = n++;	// X
	keytable[68]  = n++;	// D
	keytable[67]  = n++;	// C
	keytable[86]  = n++;	// V
	keytable[71]  = n++;	// G
	keytable[66]  = n++;	// B
	keytable[72]  = n++;	// H
	keytable[78]  = n++;	// N
	keytable[74]  = n++;	// J
	keytable[77]  = n++;	// M
	keytable[188] = n++;	// ,
	keytable[76]  = n++;	// L
	keytable[190] = n++;	// ,
	keytable[187] = n++;	// ;
	keytable[191] = n++;	// /
	keytable[189] = n;		// _ Mac
	keytable[226] = n++;	// \ Windows
	keytable[49]  = n++;	// 1
	keytable[81]  = n++;	// Q
	keytable[50]  = n++;	// 2
	keytable[87]  = n++;	// W
	keytable[51]  = n++;	// 3
	keytable[69]  = n++;	// E
	keytable[82]  = n++;	// R
	keytable[53]  = n++;	// 5
	keytable[84]  = n++;	// T
	keytable[54]  = n++;	// 6
	keytable[89]  = n++;	// Y
	keytable[85]  = n++;	// U
	keytable[56]  = n++;	// 8
	keytable[73]  = n++;	// I
	keytable[57]  = n++;	// 9
	keytable[79]  = n++;	// O
	keytable[48]  = n++;	// 0
	keytable[80]  = n++;	// P
	keytable[219]  = n;		// @ Mac
	keytable[192]  = n++;	// @ Windows

	funcKeyDown = function (e) {
		var keyCode = (e||event).keyCode;
		if (keytable[keyCode] != undefined)
			synth.keyDown(keytable[keyCode], 100);
	};

	funcKeyUp = function (e) {
		var keyCode = (e||event).keyCode;
//console.log(keyCode);
		if (keytable[keyCode] != undefined)
			synth.keyUp(keytable[keyCode]);
	};

	document.onkeydown = funcKeyDown;
	document.onkeyup   = funcKeyUp;

});
