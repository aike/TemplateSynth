var OscPool = function(ctx, voice) {
	this.ctx = ctx;
	this.max_voice = voice;
	this.osc = new Array(voice);
	this.osc_note = new Array(voice);
	this.osc_busy = new Array(voice);
	for (var i = 0; i < this.osc.length; i++) {
		this.osc[i] = new Voice(this.ctx);
		this.osc_busy[i] = false;
	}
	this.next_node = null;
	this.pressedNotes = [];
}

OscPool.prototype.debug = function() {
	var s = ">>>> ";
	for (var i = 0; i < this.pressedNotes.length; i++) {
		if (i < this.max_voice)
			s += "[" + this.pressedNotes[i] + "] "
		else
			s += this.pressedNotes[i] + " "
	}
	console.log(s);
}


OscPool.prototype.connect = function(node) {
	for (var i = 0; i < this.osc.length; i++) {
		this.osc[i].connect(node);
	}
}

OscPool.prototype.noteOn = function(note, velocity) {
	if (this.pressedNotes.indexOf(note) >= 0)
		return;
	this.pressedNotes.unshift(note);
	//this.debug();
	if (this.pressedNotes.length > this.max_voice) {
		var mute = this.pressedNotes[this.max_voice];
		for (var i = 0; i < this.max_voice; i++) {
			if (this.osc_note[i] === mute) {
				this.osc[i].noteOff();
				this.osc_note[i] = note;
				this.osc[i].noteOn(note, velocity);
			}
		}

	} else {
		for (var i = 0; i < this.osc.length; i++) {
			if (!this.osc_busy[i]) {
				this.osc_note[i] = note;
				this.osc[i].noteOn(note, velocity);
				this.osc_busy[i] = true;
				return true;
			}
		}
	}
}

OscPool.prototype.noteOff = function(note) {
	var index = this.pressedNotes.indexOf(note);
	this.pressedNotes.splice(index, 1);
	//this.debug();
	if ((index < this.max_voice) && (this.pressedNotes.length >= this.max_voice)) {
		var pop_note = this.pressedNotes[this.max_voice - 1];
		console.log('pop_note ' + pop_note);
		for (var i = 0; i < this.max_voice; i++) {
			if (this.osc_note[i] === note) {
				this.osc_note[i] = pop_note;
				this.osc[i].changeNote(pop_note);
			}
		}
	}

	for (var i = 0; i < this.osc.length; i++) {
		if ((this.osc_busy[i]) && (this.osc_note[i] === note)) {
			this.osc[i].noteOff();
			this.osc_busy[i] = false;
		}
	}
}

OscPool.prototype.setParam = function(param, val) {
	for (var i = 0; i < this.osc.length; i++) {
		this.osc[i].setParam(param, val);
	}
}


