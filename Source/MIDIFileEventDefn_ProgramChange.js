
function MIDIFileEventDefn_ProgramChange(channel, programNumber)
{
	this.channel = channel;
	this.programNumber = programNumber;
}

{
	MIDIFileEventDefn_ProgramChange.EventTypeCode = 12;

	MIDIFileEventDefn_ProgramChange.fromBytes = function(byteStream, channel)
	{
		var programNumber = byteStream.readByte();
		var eventDefn = new MIDIFileEventDefn_ProgramChange(channel, programNumber);	
		return eventDefn;
	}

	MIDIFileEventDefn_ProgramChange.prototype.statusCode = function()
	{
		return (MIDIFileEventDefn_ProgramChange.EventTypeCode << 4) | this.channel;
	}

	MIDIFileEventDefn_ProgramChange.prototype.toBytes = function
	(
		byteStream
	)
	{
		byteStream.writeByte(this.programNumber);
	}
}
