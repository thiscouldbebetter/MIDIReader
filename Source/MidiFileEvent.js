
class MidiFileEvent
{
	constructor(delta, defn)
	{
		this.delta = delta;
		this._typeName = 
			defn.constructor.name.split("_").slice(1).join("_");
		this.defn = defn;
	}

	statusCode()
	{
		return this.defn.statusCode();
	}

	toBytes(byteStream, statusCode)
	{
		byteStream.writeVariableLengthQuantity(this.delta);
		if (statusCode != null)
		{
			byteStream.writeByte(statusCode);
		}
		this.defn.toBytes(byteStream);
	}
}
