
class MidiFileChunk_Header_Division_Ticks
{
	constructor(ticksPerQuarterNote)
	{
		this.ticksPerQuarterNote = ticksPerQuarterNote;
	}

	toBytes(byteStream)
	{
		byteStream.writeIntegerBE(this.ticksPerQuarterNote, 2);
	}
}
