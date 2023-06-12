
class MidiFileEventDefn_Controller
{
	constructor
	(
		channel, controllerNumber, controllerValue
	)
	{
		this.channel = channel;
		this.controllerNumber = controllerNumber; // See MidiFileEventDefn_Controller_Type.byCode().
		this.controllerValue = controllerValue;
	}

	static EventTypeCode = 11;

	// bytes

	static fromBytes(byteStream, channel)
	{
		var controllerNumber = byteStream.readByte();
		var controllerValue = byteStream.readByte();
		var eventDefn = new MidiFileEventDefn_Controller
		(
			channel, controllerNumber, controllerValue
		);
		return eventDefn;
	}

	statusCode()
	{
		return (MidiFileEventDefn_Controller.EventTypeCode << 4) | this.channel;
	}

	toBytes(byteStream)
	{
		byteStream.writeByte(this.controllerNumber);
		byteStream.writeByte(this.controllerValue);
	}
}
