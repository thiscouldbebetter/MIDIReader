
class MidiFileEventDefn_Meta_Tempo
{
	constructor(microsecondsPerQuarterNote)
	{
		this.microsecondsPerQuarterNote = microsecondsPerQuarterNote;
	}

	static MetaTypeCode = 81;

	static fromBytes(byteStream)
	{
		var three = byteStream.readByte();
		var microsecondsPerQuarterNote = byteStream.readIntegerBE(3);
		var eventDefn = new MidiFileEventDefn_Meta_Tempo(microsecondsPerQuarterNote);
		return eventDefn;
	}

	statusCode()
	{
		return MidiFileEventDefn_Meta.StatusCode;
	}

	toBytes(byteStream)
	{
		byteStream.writeByte(MidiFileEventDefn_Meta_Tempo.MetaTypeCode);
		byteStream.writeByte(3);
		byteStream.writeIntegerBE(this.microsecondsPerQuarterNote, 3);
	}
}
