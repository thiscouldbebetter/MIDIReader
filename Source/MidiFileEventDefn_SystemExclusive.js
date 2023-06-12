
class MidiFileEventDefn_SystemExclusive
{
	constructor(data)
	{
		this.data = data;
	}

	static StatusCode = 0xF0; // ?

	static fromBytes(byteStream)
	{
		var length = byteStream.readVariableLengthQuantity();
		var data = byteStream.readBytes(length);
		var eventDefn = new MidiFileEventDefn_SystemExclusive(data);
		return eventDefn;
	}

	statusCode()
	{
		return MidiFileEventDefn_SystemExclusive.StatusCode;
	}

	toBytes(byteStream)
	{
		byteStream.writeVariableLengthQuantity(this.data.length);
		byteStream.writeBytes(this.data);
	}
}
