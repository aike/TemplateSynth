$(function() {
	$("#key")
	.change(function(e) {
		if (e.originalEvent.note[0] === 1)
			synth.noteOn(e.originalEvent.note[1], 100);
		else
			synth.noteOff(e.originalEvent.note[1]);
	});

	////////////////////////
	var elem_id;

	elem_id = "#mvol";
	synth.controls.push(elem_id);
	$(elem_id)
	.attr({
		value: 50,
		defvalue: 50
	})
	.change(function(e) {
		synth.setParam(synth.param.MasterVolume, e.target.value);
		//console.log($('#mvol')[0].value);
	});

});
