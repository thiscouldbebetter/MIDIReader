
class MidiFileChunk_Header
{
	constructor(formatCode, numberOfTracks, division)
	{
		this._chunkTypeName = "Header";
		this.formatCode = formatCode;
		// 0 - Single track chunk.
		// 1 - Tempo map track chunk & one or more track chunks, simultaneous.
		// 2 - One or more track chunks, independent sequences.
		
		this.numberOfTracks = numberOfTracks;
		this.division = division;
	}

	static ChunkTypeCode = "MThd";

	// bytes

	static fromBytes(byteStream, chunkDataLengthInBytes)
	{
		var formatCode = byteStream.readIntegerBE(2);
		var numberOfTracks = byteStream.readIntegerBE(2);
		var divisionCode = byteStream.readIntegerBE(2);
		var divisionTypeCode = (divisionCode >> 15) & 1;
		var division;
		if (divisionTypeCode == 0)
		{
			var ticksPerQuarterNote = divisionCode;
			division = new MidiFileChunk_Header_Division_Ticks
			(
				ticksPerQuarterNote
			);
		}
		else
		{
			var framesPerSecondCode = (divisionCode >> 8) & 127;
			var ticksPerFrame = divisionCode & 255;

			var framesPerSecond = framesPerSecondCode; // todo
			// -24 = 24 frames per second
			// -25 = 25 frames per second
			// -29 = 30 frames per second, drop frame
			// -30 = 30 frames per second, non-drop frame

			division = new MidiFileChunk_Header_Division_Frames
			(
				framesPerSecond, ticksPerFrame
			);
		}

		var chunk = new MidiFileChunk_Header
		(
			formatCode, numberOfTracks, division
		);

		return chunk;
	}

	toBytes(byteStream)
	{
		byteStream.writeString(MidiFileChunk_Header.ChunkTypeCode);
		var numberOfDataBytes = 6;
		byteStream.writeIntegerBE(numberOfDataBytes, 4);
		byteStream.writeIntegerBE(this.formatCode, 2);
		byteStream.writeIntegerBE(this.numberOfTracks, 2);
		this.division.toBytes(byteStream);
	}
}
