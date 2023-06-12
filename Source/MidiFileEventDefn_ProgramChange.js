
class MidiFileEventDefn_ProgramChange
{
	constructor(channel, programNumber)
	{
		this.channel = channel;
		this.programNumber = programNumber;
	}

	static EventTypeCode = 12;

	static fromBytes(byteStream, channel)
	{
		var programNumber = byteStream.readByte();
		var eventDefn = new MidiFileEventDefn_ProgramChange(channel, programNumber);
		return eventDefn;
	}

	statusCode()
	{
		return (MidiFileEventDefn_ProgramChange.EventTypeCode << 4) | this.channel;
	}

	toBytes(byteStream)
	{
		byteStream.writeByte(this.programNumber);
	}
}
