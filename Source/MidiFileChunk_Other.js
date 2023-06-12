
class MidiFileChunk_Other
{
	constructor(chunkTypeCode, dataBytes)
	{
		this._chunkTypeName = "Other";
		this.chunkTypeCode = chunkTypeCode;
		this.dataBytes = dataBytes;
	}

	static fromBytes(byteStream, chunkTypeCode, chunkDataLengthInBytes)
	{
		var chunkDataBytes = byteStream.readBytes(chunkDataLengthInBytes);
		chunk = new MidiFileChunk_Other(chunkTypeCode, chunkDataBytes);
		return chunk;
	}

	toBytes(byteStream)
	{
		byteStream.writeVariableLengthQuantity(this.dataBytes.length);
		byteStream.writeBytes(this.dataBytes);
	}
}
