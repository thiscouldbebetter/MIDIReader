
class MidiFileEventDefn_Meta_Text
{
	constructor(metaTypeCode, text)
	{
		this.metaTypeCode = metaTypeCode;
		this.text = text;
	}

	static fromBytes(byteStream, metaTypeCode)
	{
		var textLength = byteStream.readVariableLengthQuantity();
		var text = byteStream.readString(textLength);
		var eventDefn = new MidiFileEventDefn_Meta_Text(metaTypeCode, text);

		if (metaTypeCode == 1)
		{
			// text
		}
		else if (metaTypeCode == 2)
		{
			// copyright
		}
		else if (metaTypeCode == 3)
		{
			// track/sequence name
		}
		else if (metaTypeCode == 4)
		{
			// instrument name
		}
		else if (metaTypeCode == 5)
		{
			// lyric
		}
		else if (metaTypeCode == 6)
		{
			// marker
		}
		else if (metaTypeCode == 7)
		{
			// cue point
		}

		return eventDefn;
	}

	statusCode()
	{
		return MidiFileEventDefn_Meta.StatusCode;
	}

	toBytes(byteStream)
	{
		byteStream.writeByte(this.metaTypeCode);
		byteStream.writeVariableLengthQuantity(this.text.length);
		byteStream.writeString(this.text);
	}
}
