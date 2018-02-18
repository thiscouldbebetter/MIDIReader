
function MIDIFileChunk_Header_Division_Ticks(ticksPerQuarterNote)
{
	this.ticksPerQuarterNote = ticksPerQuarterNote;
}

{
	MIDIFileChunk_Header_Division_Ticks.prototype.toBytes = function(byteStream)
	{
		byteStream.writeIntegerBE(this.ticksPerQuarterNote, 2);
	}
}
