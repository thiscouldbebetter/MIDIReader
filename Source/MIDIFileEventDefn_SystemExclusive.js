
function MIDIFileEventDefn_SystemExclusive(data)
{
	this.data = data;
}

{
	MIDIFileEventDefn_SystemExclusive.StatusCode = 0xF0; // ?

	MIDIFileEventDefn_SystemExclusive.fromBytes = function(byteStream)
	{
		var length = byteStream.readVariableLengthQuantity();
		var data = byteStream.readBytes(length);
		var eventDefn = new MIDIFileEventDefn_SystemExclusive(data);
		return eventDefn;
	}

	MIDIFileEventDefn_SystemExclusive.prototype.statusCode = function()
	{
		return MIDIFileEventDefn_SystemExclusive.StatusCode;
	}

	MIDIFileEventDefn_SystemExclusive.prototype.toBytes = function
	(
		byteStream
	)
	{
		byteStream.writeVariableLengthQuantity(this.data.length);
		byteStream.writeBytes(this.data);
	}
}
