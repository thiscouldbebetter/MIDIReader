
class MidiFileEventDefn_Meta_KeySignature
{
	constructor
	(
		numberOfSharpsOrFlats, majorOrMinor
	)
	{
		this.numberOfSharpsOrFlats = numberOfSharpsOrFlats; // -7 to 7.
		this.majorOrMinor = majorOrMinor; // 0 for major, 1 for minor
	}

	static MetaTypeCode = 89;

	statusCode()
	{
		return MidiFileEventDefn_Meta.StatusCode;
	}

	toBytes(byteStream)
	{
		byteStream.writeByte(MidiFileEventDefn_Meta_KeySignature.MetaTypeCode);
		byteStream.writeByte(2);
		byteStream.writeByte(this.numberOfSharpsOrFlats);
		byteStream.writeByte(this.majorOrMinor);
	}
}
