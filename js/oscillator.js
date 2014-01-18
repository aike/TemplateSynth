var Oscillator = function(ctx) {
	this.ctx = ctx;
	this.next_node = null;
	this.noteNoToFrequency = function(noteno) {
		return 440.0 * Math.pow(2.0, (noteno - 69.0) / 12.0); 
	}
}

Oscillator.prototype.connect = function(node) {
	this.next_node = node;
}

Oscillator.prototype.noteOn = function(note, velocity) {
	this.osc = this.ctx.createOscillator();
	this.osc.frequency.value = this.noteNoToFrequency(note);
	this.osc.connect(this.next_node);
	this.osc.start(0);
}

Oscillator.prototype.changeNote = function(note) {
	this.osc.frequency.value = this.noteNoToFrequency(note);
}

Oscillator.prototype.noteOff = function() {
	this.osc.stop(0);
}

Oscillator.prototype.setParam = function(param_id, val) {
}
