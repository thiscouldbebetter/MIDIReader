
class MidiFileEventDefn_NoteOff
{
	constructor(channel, keyCode, velocity)
	{
		this.channel = channel;
		this.keyCode = keyCode;
		this.velocity = velocity;
	}

	static EventTypeCode = 8;

	static fromBytes(byteStream, channel)
	{
		var keyCode = byteStream.readByte();
		var velocity = byteStream.readByte();
		var eventDefn = new MidiFileEventDefn_NoteOff(channel, keyCode, velocity);
		return eventDefn;
	}

	statusCode()
	{
		return (MidiFileEventDefn_NoteOff.EventTypeCode << 4) | this.channel;
	}

	toBytes(byteStream)
	{
		byteStream.writeByte(this.keyCode);
		byteStream.writeByte(this.velocity);
	}
}
