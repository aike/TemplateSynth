/*
 * webmidilink.js
 *
 * This program is licensed under the MIT License.
 * Copyright 2014, aike (@aike1000)
 *
 */

$(function() {

	window.addEventListener("message", webMidiLinkRecv, false);
	function webMidiLinkRecv(event) {
		if ((typeof event.data.valueOf()) != 'string')
			return;
		var msg = event.data.split(",");
		switch (msg[0]) {
			case "link":  //Level1 messages
				switch (msg[1]) {
					case "reqpatch":
						event.source.postMessage("link,patch," + GetPatchString(), "*");
						break;
					case "setpatch":
						SetPatchString(msg[2]);
						break;
				}
				break;
			case "midi":
				switch (parseInt(msg[1], 16) & 0xf0) {
					case 0x80:
						synth.keyUp(parseInt(msg[2], 16));
						break;
					case 0x90:
						var velo = parseInt(msg[3], 16);
						if (velo > 0)
							synth.keyDown(parseInt(msg[2], 16), velo);
						else
							synth.keyUp(parseInt(msg[2], 16));
						break;
					case 0xb0:
						if (parseInt(msg[2], 16) == 0x78) {
							synth.allNoteOff();
						}
						break;
				}
				break;
		}
	};

	// TODO: web-audio-controlsの値の取得方法
	//       knob/switch/etcで違いはあるか？
	function GetPatchString() {
		var s = '';
		for (var i = 0; i < synth.controls.length; i++) {
			s = s + Math.floor($(synth.controls[i])[0].value) + '/';
		}
		return s;
	};

	function SetPatchString(s) {
		var a = s.split('/');
		for (var i = 0; i < synth.controls.length; i++) {
			$(synth.controls[i])[0].setValue(parseInt(a[i], 10), true);
		}
	};

	function LinkReady() {
		if (window.opener) {
			window.opener.postMessage("link,ready", "*");
		} else {
			window.parent.postMessage("link,ready", "*");
		}
	};

	LinkReady();

});
