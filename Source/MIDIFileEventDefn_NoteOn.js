
function MIDIFileEventDefn_NoteOn(channel, keyCode, velocity)
{
	this.channel = channel;
	this.keyCode = keyCode;
	this.velocity = velocity;
}

{
	MIDIFileEventDefn_NoteOn.EventTypeCode = 9;

	MIDIFileEventDefn_NoteOn.fromBytes = function(byteStream, channel)
	{
		var keyCode = byteStream.readByte();
		var velocity = byteStream.readByte();
		var eventDefn = new MIDIFileEventDefn_NoteOn(channel, keyCode, velocity);
		return eventDefn;
	}

	MIDIFileEventDefn_NoteOn.prototype.statusCode = function()
	{
		return (MIDIFileEventDefn_NoteOn.EventTypeCode << 4) | this.channel;
	}

	MIDIFileEventDefn_NoteOn.prototype.toBytes = function
	(
		byteStream
	)
	{
		byteStream.writeByte(this.keyCode);
		byteStream.writeByte(this.velocity);
	}
}
