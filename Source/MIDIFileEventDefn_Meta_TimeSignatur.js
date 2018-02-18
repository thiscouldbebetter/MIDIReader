
function MIDIFileEventDefn_Meta_TimeSignature
(
	numerator, 
	denominator, 
	midiClocksPerMetronomeClick, 
	numberOf32ndNotesPer24MIDIClocks
)
{
	this.numerator = numerator;
	this.denominator = denominator;
	this.midiClocksPerMetronomeClick = midiClocksPerMetronomeClick;
	this.numberOf32ndNotesPer24MIDIClocks = numberOf32ndNotesPer24MIDIClocks;
}

{
	MIDIFileEventDefn_Meta_TimeSignature.MetaTypeCode = 88;

	MIDIFileEventDefn_Meta_TimeSignature.prototype.statusCode = function()
	{
		return MIDIFileEventDefn_Meta.StatusCode;
	}

	MIDIFileEventDefn_Meta_TimeSignature.prototype.toBytes = function
	(
		byteStream
	)
	{
		byteStream.writeByte(MIDIFileEventDefn_Meta_TimeSignature.MetaTypeCode);
		byteStream.writeByte(4);
		byteStream.writeByte(this.numerator);
		var denominatorAsPowerOf2 = Math.round
		(
			Math.log(this.denominator) / Math.log(2)
		);
		byteStream.writeByte(denominatorAsPowerOf2);
		byteStream.writeByte(this.midiClocksPerMetronomeClick);
		byteStream.writeByte(this.numberOf32ndNotesPer24MIDIClocks);
	}
}
