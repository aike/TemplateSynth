var Voice = function(ctx) {
	this.ctx = ctx;
	this.next_node = null;
	this.noteNoToFrequency = function(noteno) {
		return 440.0 * Math.pow(2.0, (noteno - 69.0) / 12.0); 
	}
}

Voice.prototype.connect = function(node) {
	this.next_node = node;
}

Voice.prototype.noteOn = function(note, velocity) {
	this.osc = this.ctx.createOscillator();
	this.osc.frequency.value = this.noteNoToFrequency(note);
	this.osc.connect(this.next_node);
	this.osc.start(0);
}

Voice.prototype.changeNote = function(note) {
	this.osc.frequency.value = this.noteNoToFrequency(note);
}

Voice.prototype.noteOff = function() {
	this.osc.stop(0);
}

Voice.prototype.setParam = function(param_id, val) {
}
