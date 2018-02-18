

function MIDIFileEventDefn_Controller
(
	channel, controllerNumber, controllerValue
)
{
	this.channel = channel;
	this.controllerNumber = controllerNumber;
	this.controllerValue = controllerValue;
}

{
	MIDIFileEventDefn_Controller.EventTypeCode = 11;

	// bytes

	MIDIFileEventDefn_Controller.fromBytes = function(byteStream, channel)
	{
		var controllerNumber = byteStream.readByte();
		var controllerValue = byteStream.readByte();
		var eventDefn = new MIDIFileEventDefn_Controller
		(
			channel, controllerNumber, controllerValue
		);
		return eventDefn;
	}

	MIDIFileEventDefn_Controller.prototype.statusCode = function()
	{
		return (MIDIFileEventDefn_Controller.EventTypeCode << 4) | this.channel;
	}

	MIDIFileEventDefn_Controller.prototype.toBytes = function(byteStream)
	{
		byteStream.writeByte(this.controllerNumber);
		byteStream.writeByte(this.controllerValue);
	}
}
