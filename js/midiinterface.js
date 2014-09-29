$(function() {
var MidiInterface = function(initCallback) {
	this.in_port = null;
	this.inputs = null;
	this.outputs = null;
	this.input = null;
	this.inportList = [];
	this.ch = 0;
	this.midi = null;
	this.initCallback = initCallback;

	var self = this;
	this.onMidiSuccess = function(midiAccess) {
		self.midi = midiAccess;
		self.getInterfaceList();
		if ((typeof(self.midi.inputs) != "function"))  // New MIDI inputs implementation code
			self.setPort(self.inportList[0].value);
		else
			self.setPort(0);
		if (self.initCallback)
			self.initCallback(self.inportList);
	};
	this.onMidiFailure = function(msg) {
		alert('Failed - ' + msg);
	};

	navigator.requestMIDIAccess().then(this.onMidiSuccess, this.onMidiFailure);
}

////////////////// Top Level API ////////////////////////

MidiInterface.prototype.getInterfaceList = function() {
	if ((typeof(this.midi.inputs) != "function")) {  // New MIDI inputs implementation code
		for (var input of this.midi.inputs.values()) {
			this.inportList.push({value: input.id, text:input.name});
		}
		return;
	}
	var inputs = this.midi.inputs();
	for (var i = 0; i < inputs.length; i++) {
		this.inportList.push({value: i.toString(10), text:inputs[i].name});
	}
}

MidiInterface.prototype.setPort = function(n) {
	if ((typeof(this.midi.inputs) != "function")) {  // New MIDI inputs implementation code
		if (this.in_port !== null)
			this.in_port.onmidimessage = null;

		var self = this;
		this.onmidimessage = function(e) { self.receive(e); };
		this.in_port = this.midi.inputs.get(n);
		this.in_port.onmidimessage = this.onmidimessage;
	    return;
	}

	if (this.in_port !== null)
		this.midi.inputs()[this.in_port].onmidimessage = function() {};
	this.in_port = n;

	var self = this;
	this.onmidimessage = function(e) { self.receive(e); };
	this.midi.inputs()[this.in_port].onmidimessage = this.onmidimessage;
}

MidiInterface.prototype.setMidiChannel = function(n) {
	this.ch = n;
}

MidiInterface.prototype.receive = function(event) {
	$('#midi_signal').css({color: '#853'});
	setTimeout(function() {	$('#midi_signal').css({color: '#222'}); }, 50);
	if (event.data.length >= 3) {
		var note_no = event.data[1];
		if ((event.data[0] & 0xF0) === 0x90) {
			var velocity = event.data[2];
			if (velocity > 0) {
				// Note On
				synth.keyDown(note_no, velocity);
			} else {
				// Note On  Velocity 0  -->  Note Off
				synth.keyUp(note_no);
			}
		} else if ((event.data[0] & 0xF0) === 0x80) {
			// Note Off
			synth.keyUp(note_no);
		}
	}
}

	var midi;
	var init = function(list) {
		$.each(list, function(){
			var option = $('<option>', this);
			$('#midi_device').append(option);
		});
		$('#midi_device').change(function() {
			console.log(parseInt($(this).val(), 10));
			midi.setPort(parseInt($(this).val(), 10));
		});
	}
	midi = new MidiInterface(init);


});