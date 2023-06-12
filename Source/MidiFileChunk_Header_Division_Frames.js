
class MidiFileChunk_Header_Division_Frames
{
	constructor(framesPerSecond, ticksPerFrame)
	{
		this.framesPerSecond = framesPerSecond;
		this.ticksPerFrame = ticksPerFrame;
	}

	toBytes(byteStream)
	{
		throw new Error("todo");
	}
}
