var Voice = function(ctx) {
	this.ctx = ctx;
	this.next_node = null;
	this.noteNoToSpeed = function(noteno) {
		return Math.pow(2.0, (noteno - 69.0) / 12.0); 
	}
	var self = this;
	this.loadwav('sampler.wav', function(buf) { self.buf = buf; });
}

Voice.prototype.loadwav = function(file, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", file, true);
	xhr.responseType = "arraybuffer";
	var self = this;
	xhr.onload = function() {
		self.ctx.decodeAudioData(xhr.response,function(buf){
			callback(buf);
		}, function(){});
	};
	xhr.send();
}


Voice.prototype.connect = function(node) {
	this.next_node = node;
}

Voice.prototype.noteOn = function(note, velocity) {
	this.sample = this.ctx.createBufferSource();
	this.sample.buffer = this.buf;
	this.sample.playbackRate.value = this.noteNoToSpeed(note);
	this.sample.connect(this.next_node);
	this.sample.start(0);
}

Voice.prototype.changeNote = function(note) {
	this.sample = ctx.createBufferSource();
	this.sample = this.buf;
	this.sample.playbackRate.value = this.noteNoToSpeed(note);
	this.sample.connect(this.next_node);
	this.sample.start(0);
}

Voice.prototype.noteOff = function() {
	this.sample.stop(0);
}

Voice.prototype.setParam = function(param_id, val) {
}
