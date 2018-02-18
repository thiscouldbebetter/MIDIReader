
function MIDIFileEventDefn_NoteOff(channel, keyCode, velocity)
{
	this.channel = channel;
	this.keyCode = keyCode;
	this.velocity = velocity;
}

{
	MIDIFileEventDefn_NoteOff.EventTypeCode = 8;

	MIDIFileEventDefn_NoteOff.fromBytes = function(byteStream, channel)
	{
		var keyCode = byteStream.readByte();
		var velocity = byteStream.readByte();
		var eventDefn = new MIDIFileEventDefn_NoteOff(channel, keyCode, velocity);
		return eventDefn;
	}

	MIDIFileEventDefn_NoteOff.prototype.statusCode = function()
	{
		return (MIDIFileEventDefn_NoteOff.EventTypeCode << 4) | this.channel;
	}

	MIDIFileEventDefn_NoteOff.prototype.toBytes = function
	(
		byteStream
	)
	{
		byteStream.writeByte(this.keyCode);
		byteStream.writeByte(this.velocity);
	}
}
