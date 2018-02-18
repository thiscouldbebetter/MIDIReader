
function MIDIFileEventDefn_Meta_EndOfTrack()
{
	// Do nothing.
}

{
	MIDIFileEventDefn_Meta_EndOfTrack.MetaTypeCode = 47;

	// bytes

	MIDIFileEventDefn_Meta_EndOfTrack.fromBytes = function(byteStream)
	{
		var zero = byteStream.readByte();
		var eventDefn = new MIDIFileEventDefn_Meta_EndOfTrack();
		return eventDefn;
	}

	MIDIFileEventDefn_Meta_EndOfTrack.prototype.statusCode = function()
	{
		return MIDIFileEventDefn_Meta.StatusCode;
	}

	MIDIFileEventDefn_Meta_EndOfTrack.prototype.toBytes = function
	(
		byteStream
	)
	{
		byteStream.writeByte(MIDIFileEventDefn_Meta_EndOfTrack.MetaTypeCode);
		byteStream.writeByte(0);
	}
}
