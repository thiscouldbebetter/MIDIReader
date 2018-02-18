
function MIDIFileChunk_Other(chunkTypeCode, dataBytes)
{
	this._chunkTypeName = "Other";
	this.chunkTypeCode = chunkTypeCode;
	this.dataBytes = dataBytes;
}

{
	MIDIFileChunk_Other.fromBytes = function(byteStream, chunkTypeCode, chunkDataLengthInBytes)
	{
		var chunkDataBytes = byteStream.readBytes(chunkDataLengthInBytes);
		chunk = new MIDIFileChunk_Other(chunkTypeCode, chunkDataBytes);
		return chunk;
	}

	MIDIFileChunk_Other.prototype.toBytes = function(byteStream)
	{
		byteStream.writeVariableLengthQuantity(this.dataBytes.length);
		byteStream.writeBytes(this.dataBytes);
	}
}
