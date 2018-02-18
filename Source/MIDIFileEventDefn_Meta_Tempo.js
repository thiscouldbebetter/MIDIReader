
function MIDIFileEventDefn_Meta_Tempo(microsecondsPerQuarterNote)
{
	this.microsecondsPerQuarterNote = microsecondsPerQuarterNote;
}

{
	MIDIFileEventDefn_Meta_Tempo.MetaTypeCode = 81;

	MIDIFileEventDefn_Meta_Tempo.fromBytes = function(byteStream)
	{
		var three = byteStream.readByte();
		var microsecondsPerQuarterNote = byteStream.readIntegerBE(3);
		var eventDefn = new MIDIFileEventDefn_Meta_Tempo(microsecondsPerQuarterNote);
		return eventDefn;
	}

	MIDIFileEventDefn_Meta_Tempo.prototype.statusCode = function()
	{
		return MIDIFileEventDefn_Meta.StatusCode;
	}
	
	MIDIFileEventDefn_Meta_Tempo.prototype.toBytes = function
	(
		byteStream
	)
	{
		byteStream.writeByte(MIDIFileEventDefn_Meta_Tempo.MetaTypeCode);
		byteStream.writeByte(3);
		byteStream.writeIntegerBE(this.microsecondsPerQuarterNote, 3);
	}
}
