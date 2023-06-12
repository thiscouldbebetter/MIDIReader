
class MidiFileEventDefn_Meta_TimeSignature
{
	constructor
	(
		numerator, 
		denominator, 
		midiClocksPerMetronomeClick, 
		numberOf32ndNotesPer24MidiClocks
	)
	{
		this.numerator = numerator;
		this.denominator = denominator;
		this.midiClocksPerMetronomeClick = midiClocksPerMetronomeClick;
		this.numberOf32ndNotesPer24MidiClocks = numberOf32ndNotesPer24MidiClocks;
	}

	static MetaTypeCode = 88;

	statusCode()
	{
		return MidiFileEventDefn_Meta.StatusCode;
	}

	toBytes(byteStream)
	{
		byteStream.writeByte(MidiFileEventDefn_Meta_TimeSignature.MetaTypeCode);
		byteStream.writeByte(4);
		byteStream.writeByte(this.numerator);
		var denominatorAsPowerOf2 = Math.round
		(
			Math.log(this.denominator) / Math.log(2)
		);
		byteStream.writeByte(denominatorAsPowerOf2);
		byteStream.writeByte(this.midiClocksPerMetronomeClick);
		byteStream.writeByte(this.numberOf32ndNotesPer24MidiClocks);
	}
}
