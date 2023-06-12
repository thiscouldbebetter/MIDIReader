
class MidiFileEventDefn_Meta_EndOfTrack
{
	static MetaTypeCode = 47;

	// bytes

	static fromBytes(byteStream)
	{
		var zero = byteStream.readByte();
		var eventDefn = new MidiFileEventDefn_Meta_EndOfTrack();
		return eventDefn;
	}

	statusCode()
	{
		return MidiFileEventDefn_Meta.StatusCode;
	}

	toBytes(byteStream)
	{
		byteStream.writeByte(MidiFileEventDefn_Meta_EndOfTrack.MetaTypeCode);
		byteStream.writeByte(0);
	}
}
