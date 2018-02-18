
function MIDIFile(chunks)
{
	// Based on file specifications found at the URLs
	// https://www.csie.ntu.edu.tw/~r92092/ref/midi/
	// and
	// http://www.music.mcgill.ca/~ich/classes/mumt306/StandardMIDIfileformat.html.

	this.chunks = chunks;
}

{
	// bytes

	MIDIFile.fromBytes = function(bytes)
	{
		var byteStream = new ByteStream(bytes);

		var chunks = [];

		while (byteStream.hasMoreBytes() == true)
		{
			var chunkTypeCode = byteStream.readString(4);
			var chunkDataLengthInBytes = byteStream.readIntegerBE(4);

			var chunk;

			if (chunkTypeCode == MIDIFileChunk_Header.ChunkTypeCode)
			{
				chunk = MIDIFileChunk_Header.fromBytes(byteStream, chunkDataLengthInBytes);
			}
			else if (chunkTypeCode == MIDIFileChunk_Track.ChunkTypeCode)
			{
				chunk = MIDIFileChunk_Track.fromBytes(byteStream, chunkDataLengthInBytes);
			}
			else
			{
				chunk = MIDIFileChunk_Other.fromBytes
				(
					byteStream, chunkTypeCode, chunkDataLengthInBytes
				);
			}

			chunks.push(chunk);
		}

		var returnValue = new MIDIFile(chunks);

		return returnValue;
	}

	MIDIFile.prototype.toBytes = function()
	{
		var byteStream = new ByteStream([]);

		for (var i = 0; i < this.chunks.length; i++)
		{
			var chunk = this.chunks[i];
			chunk.toBytes(byteStream);
		}

		var bytes = byteStream.bytes;
		
		var byteFinal = 10;
		bytes[bytes.length - 1] = byteFinal;

		return bytes;
	}

	// json

	MIDIFile.prototype.toStringJSON = function()
	{
		var returnValue = JSON.stringify(this, null, 4);
		return returnValue;
	}
}
