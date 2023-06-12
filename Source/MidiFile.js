
class MidiFile
{
		constructor(chunks)
	{
		// Based on file specifications found at the URLs
		// https://www.csie.ntu.edu.tw/~r92092/ref/midi/
		// and
		// http://www.music.mcgill.ca/~ich/classes/mumt306/StandardMidifileformat.html.

		this.chunks = chunks;
	}

	// bytes

	static fromBytes(bytes)
	{
		var byteStream = new ByteStream(bytes);

		var chunks = [];

		while (byteStream.hasMoreBytes() == true)
		{
			var chunkTypeCode = byteStream.readString(4);
			var chunkDataLengthInBytes = byteStream.readIntegerBE(4);

			var chunk;

			if (chunkTypeCode == MidiFileChunk_Header.ChunkTypeCode)
			{
				chunk = MidiFileChunk_Header.fromBytes(byteStream, chunkDataLengthInBytes);
			}
			else if (chunkTypeCode == MidiFileChunk_Track.ChunkTypeCode)
			{
				chunk = MidiFileChunk_Track.fromBytes(byteStream, chunkDataLengthInBytes);
			}
			else
			{
				chunk = MidiFileChunk_Other.fromBytes
				(
					byteStream, chunkTypeCode, chunkDataLengthInBytes
				);
			}

			chunks.push(chunk);
		}

		var returnValue = new MidiFile(chunks);

		return returnValue;
	}

	toBytes()
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

	toStringJSON()
	{
		var returnValue = JSON.stringify(this, null, 4);
		return returnValue;
	}
}
