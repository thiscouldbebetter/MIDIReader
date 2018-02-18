
function MIDIFileEvent(delta, defn)
{
	this.delta = delta;
	this._typeName = 
		defn.constructor.name.split("_").slice(1).join("_");
	this.defn = defn;
}

{
	MIDIFileEvent.prototype.statusCode = function()
	{
		return this.defn.statusCode();
	}
	
	MIDIFileEvent.prototype.toBytes = function(byteStream, statusCode)
	{
		byteStream.writeVariableLengthQuantity(this.delta);
		if (statusCode != null)
		{
			byteStream.writeByte(statusCode);
		}
		this.defn.toBytes(byteStream);
	}
}
