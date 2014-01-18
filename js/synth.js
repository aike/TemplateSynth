var Synth = function(voice) {
	var id = 0;
	this.param = {
		MasterVolume: id++
	};

	this.controls = [];
	this.max_voice = voice;
	this.ctx = this.getContext();
	if (!this.ctx)
		return;
	this.oscs = new OscPool(this.ctx, this.max_voice);
	this.master_vol = this.ctx.createGain();

	this.oscs.connect(this.master_vol);
	this.master_vol.connect(this.ctx.destination);
}

Synth.prototype.getContext = function() {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	var ret;
	try {
		ret = new AudioContext() ;
	} catch(e) {
		alert('Web Audio API is not supported in this browser');
		ret = null;
	}
	return ret;
}

Synth.prototype.noteOn = function(note, velocity) {
	this.oscs.noteOn(note, velocity);
}

Synth.prototype.noteOff = function(note) {
	this.oscs.noteOff(note);
}

Synth.prototype.keyDown = function(note, velocity) {
	this.noteOn(note, velocity);
	$('#key')[0].setNote(1, note);
}

Synth.prototype.keyUp = function(note) {
	this.noteOff(note);
	$('#key')[0].setNote(0, note);
}

Synth.prototype.AllNoteOff = function() {
	for (var i = 0; i < 128; i++)
		this.keyUp(i);
}


Synth.prototype.setParam = function(param_id, val) {
	switch (param_id) {
		case this.param.MasterVolume:
			this.master_vol.gain.value = val / 100.0;
			break;
		default:
			this.oscs.setParam(param_id, val);
			break;
	}
}

var synth;
$(function() {
	synth = new Synth(8);
});
