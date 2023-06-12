
class MidiFileEventDefn_NoteOn
{
	constructor(channel, keyCode, velocity)
	{
		this.channel = channel;
		this.keyCode = keyCode;
		this.velocity = velocity;
	}

	static EventTypeCode = 9;

	static fromBytes(byteStream, channel)
	{
		var keyCode = byteStream.readByte();
		var velocity = byteStream.readByte();
		var eventDefn = new MidiFileEventDefn_NoteOn(channel, keyCode, velocity);
		return eventDefn;
	}

	statusCode()
	{
		return (MidiFileEventDefn_NoteOn.EventTypeCode << 4) | this.channel;
	}

	toBytes(byteStream)
	{
		byteStream.writeByte(this.keyCode);
		byteStream.writeByte(this.velocity);
	}
}
