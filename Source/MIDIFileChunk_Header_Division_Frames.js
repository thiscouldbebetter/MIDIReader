
function MIDIFileChunk_Header_Division_Frames(framesPerSecond, ticksPerFrame)
{
	this.framesPerSecond = framesPerSecond;
	this.ticksPerFrame = ticksPerFrame;
}

{
	MIDIFileChunk_Header_Division_Frames.prototype.toBytes = function(byteStream)
	{
		throw "todo";
	}
}
