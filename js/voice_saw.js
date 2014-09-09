var Voice = function(ctx) {
	this.ctx = ctx;
	this.next_node = null;
	this.noteNoToFrequency = function(noteno) {
		return 440.0 * Math.pow(2.0, (noteno - 69.0) / 12.0); 
	}
	this.osc = new Array(5);
	this.gain = new Array(5);
	for (var i = 0; i < 5; i++) {
		this.gain[i] = this.ctx.createGain();
		this.gain[i].gain.value = 0.3;
	}
}

Voice.prototype.connect = function(node) {
	this.next_node = node;
	for (var i = 0; i < 5; i++)
		this.gain[i].connect(this.next_node);
}

Voice.prototype.noteOn = function(note, velocity) {
	for (var i = 0; i < 5; i++) {
		this.osc[i] = this.ctx.createOscillator();
		this.osc[i].type = 'sawtooth';
		this.osc[i].detune.value = 10 * i - 20;
		this.osc[i].frequency.value = this.noteNoToFrequency(note);
		this.osc[i].connect(this.gain[i]);
		this.osc[i].start(0);
	}
}

Voice.prototype.changeNote = function(note) {
	for (var i = 0; i < 5; i++)
		this.osc[i].frequency.value = this.noteNoToFrequency(note);
}

Voice.prototype.noteOff = function() {
	for (var i = 0; i < 5; i++)
		this.osc[i].stop(0);
}

Voice.prototype.setParam = function(param_id, val) {
}
