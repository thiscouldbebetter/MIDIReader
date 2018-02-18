
// classes

function ByteStream(bytes)
{
	this.bytes = bytes;
	this.byteOffset = 0;
}

{
	ByteStream.prototype.hasMoreBytes = function()
	{
		return (this.byteOffset < this.bytes.length);
	}

	ByteStream.prototype.readByte = function()
	{
		var returnValue = this.bytes[this.byteOffset];
		this.byteOffset++;
		return returnValue;
	}

	ByteStream.prototype.readBytes = function(numberOfBytes)
	{
		var bytes = [];

		for (var i = 0; i < numberOfBytes; i++)
		{
			var byte = this.readByte();
			bytes.push(byte);
		}

		return bytes;
	}

	ByteStream.prototype.readIntegerBE = function(numberOfBytes)
	{
		var returnValue = 0;

		// "BE" == "Big-Endian".
		for (var i = 0; i < numberOfBytes; i++)
		{
			var byte = this.readByte();
			returnValue = (returnValue << 8) | byte;
		}

		return returnValue;
	}

	ByteStream.prototype.readString = function(numberOfBytes)
	{
		var returnValue = "";
		for (var i = 0; i < numberOfBytes; i++)
		{
			var byte = this.readByte();
			var char = String.fromCharCode(byte);
			returnValue += char;
		}
		return returnValue;
	}

	ByteStream.prototype.readVariableLengthQuantity = function()
	{
		returnValue = 0;
		while (true)
		{
			returnValue = returnValue << 7;

			var byte = this.readByte();
			var bits0To6 = byte & 127;
			returnValue |= bits0To6;

			var bit7 = (byte >> 7) & 1;
			if (bit7 == 0)
			{
				break;
			}
		}

		return returnValue;
	}

	ByteStream.prototype.seek = function(byteOffset)
	{
		this.byteOffset = byteOffset;
		return this;
	}

	ByteStream.prototype.writeByte = function(byte)
	{
		this.bytes.push(byte);
		this.byteOffset++;
		return this;
	}

	ByteStream.prototype.writeBytes = function(bytes)
	{
		for (var i = 0; i < bytes.length; i++)
		{
			var byte = bytes[i];
			this.writeByte(byte);
		}
		return this;
	}

	ByteStream.prototype.writeIntegerBE = function(value, numberOfBytes)
	{
		// "BE" == "Big-Endian".
		for (var i = 0; i < numberOfBytes; i++)
		{
			var iReversed = numberOfBytes - i - 1;
			var byte = ( value >> (8 * iReversed) ) & 255;
			this.writeByte(byte);
		}

		return this;
	}

	ByteStream.prototype.writeString = function(value)
	{
		for (var i = 0; i < value.length; i++)
		{
			var byte = value.charCodeAt(i);
			this.writeByte(byte);
		}

		return this;
	}

	ByteStream.prototype.writeVariableLengthQuantity = function(value)
	{
		var bytes = [];
		do
		{
			var byte = value & 127;
			if (bytes.length > 0)
			{
				byte |= 128;
			}
			bytes.splice(0, 0, byte);
			value = value >> 7;
		} while (value > 0)

		this.writeBytes(bytes);

		return this;
	}
}
