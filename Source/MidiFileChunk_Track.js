
class MidiFileChunk_Track
{
	constructor(dataLengthInBytes, events)
	{
		this._chunkTypeName = "Track";
		this.dataLengthInBytes = dataLengthInBytes; // hack
		this.events = events;
	}

	static ChunkTypeCode = "MTrk";

	// bytes

	static fromBytes(byteStream, chunkDataLengthInBytes)
	{
		var chunkDataBytes = byteStream.readBytes(chunkDataLengthInBytes);
		var byteStreamEvents = new ByteStream(chunkDataBytes);
		var events = [];
		var statusByte = null;

		while (byteStreamEvents.hasMoreBytes() )
		{
			var delta = byteStreamEvents.readVariableLengthQuantity();

			var statusByteNext = byteStreamEvents.readByte();
			if (statusByteNext >= 128)
			{
				statusByte = statusByteNext;
			}
			else
			{
				// We're in "running status" mode, 
				// so it's not really a status byte.
				// Use the same statusByte as last time,
				// and back up the byteStream so no data is lost.
				byteStreamEvents.byteOffset--;
			}
			var eventTypeCode = (statusByte >> 4) & 15;
			
			var eventDefn
			if (eventTypeCode < 15)
			{
				eventDefn = MidiFileChunk_Track.fromBytes_EventChannel
				(
					byteStreamEvents, statusByte, eventTypeCode
				);
			}
			else if (eventTypeCode == 15)
			{
				eventDefn = MidiFileChunk_Track.fromBytes_EventNonChannel
				(
					byteStreamEvents, statusByte
				);
			}

			var event = new MidiFileEvent(delta, eventDefn);

			events.push(event);
		}

		var chunk = new MidiFileChunk_Track(chunkDataLengthInBytes, events);

		return chunk;
	}

	static fromBytes_EventNonChannel
	(
		byteStreamEvents, statusByte
	)
	{
		var eventDefn = null;

		var eventSubTypeCode = statusByte & 15;

		if (eventSubTypeCode == 0) 
		{
			eventDefn = MidiFileEventDefn_SystemExclusive.fromBytes(byteStreamEvents);
		}
		else if (eventSubTypeCode == 2)
		{
			// song position pointer
		}
		else if (eventSubTypeCode == 3)
		{
			// song select
		}
		else if (eventSubTypeCode == 6)
		{
			// tune request
		}
		else if (eventSubTypeCode == 7)
		{
			// "f7 sysex event"
			// "escape"
			var length = byteStreamEvents.readVariableLengthQuantity();
			var data = byteStreamEvents.readBytes(length);
		}
		else if (eventSubTypeCode == 8)
		{
			// timing clock
		}
		else if (eventSubTypeCode == 10)
		{
			// "start"
		}
		else if (eventSubTypeCode == 11)
		{
			// "continue"
		}
		else if (eventSubTypeCode == 12)
		{
			// "stop"
		}
		else if (eventSubTypeCode == 14)
		{
			// active sensing
		}
		else if (eventSubTypeCode == 15)
		{
			// "reset"
			// meta
			eventDefn = MidiFileChunk_Track.fromBytes_EventMeta
			(
				byteStreamEvents
			);
		}

		if (eventDefn == null)
		{
			throw "todo";
		}

		return eventDefn;
	}

	static fromBytes_EventMeta(byteStreamEvents)
	{
		var eventDefn = null;

		var metaTypeCode = byteStreamEvents.readByte();
		if (metaTypeCode == 0)
		{
			// sequence number
			var two = byteStreamEvents.readByte();
		}
		else if (metaTypeCode < 8)
		{
			eventDefn = MidiFileEventDefn_Meta_Text.fromBytes
			(
				byteStreamEvents, metaTypeCode
			);
		}
		else if (metaTypeCode == 0x20) // 32
		{
			// Midi channel prefix
			var one = byteStreamEvents.readByte();
		}
		else if (metaTypeCode == MidiFileEventDefn_Meta_EndOfTrack.MetaTypeCode) // 47
		{
			eventDefn = MidiFileEventDefn_Meta_EndOfTrack.fromBytes(byteStreamEvents);
		}
		else if (metaTypeCode == MidiFileEventDefn_Meta_Tempo.MetaTypeCode) // 81
		{
			eventDefn = MidiFileEventDefn_Meta_Tempo.fromBytes(byteStreamEvents);
		}
		else if (metaTypeCode == 0x54) // 84
		{
			// SMTPE offset
			var five = byteStreamEvents.readByte();
			var hours = byteStreamEvents.readByte();
			var minutes = byteStreamEvents.readByte();
			var seconds = byteStreamEvents.readByte();
			var frames = byteStreamEvents.readByte();
			var hundredthsOfFrame = byteStreamEvents.readByte();
			eventDefn = new MidiFileEventDefn_Meta_SMTPEOffset
			(
				hours, minutes, seconds, frames, hundredthsOfFrame
			);
		}
		else if (metaTypeCode == MidiFileEventDefn_Meta_TimeSignature.MetaTypeCode) // 88
		{
			// time signature
			var four = byteStreamEvents.readByte();
			var numerator = byteStreamEvents.readByte();
			var denominatorAsPowerOf2 = byteStreamEvents.readByte();
			// denominator values
			// "2" = quarter note,
			// "3" = eighth note, etc.
			var denominator = Math.pow(2, denominatorAsPowerOf2);
			var midiClocksPerMetronomeClick = byteStreamEvents.readByte();
			var numberOf32ndNotesPer24MidiClocks = byteStreamEvents.readByte();
			// 24 (hex or dec?) Midi clocks = "1 quarter note".
			eventDefn = new MidiFileEventDefn_Meta_TimeSignature
			(
				numerator, denominator, 
				midiClocksPerMetronomeClick, 
				numberOf32ndNotesPer24MidiClocks
			);
		}
		else if (metaTypeCode == MidiFileEventDefn_Meta_KeySignature.MetaTypeCode) // 89
		{
			// key signature
			var two = byteStreamEvents.readByte();
			var numberOfSharpsOrFlats = byteStreamEvents.readByte(); // -7 to 7
			var majorOrMinor = byteStreamEvents.readByte(); // 0 for major, 1 for minor
			eventDefn = new MidiFileEventDefn_Meta_KeySignature
			(
				numberOfSharpsOrFlats,
				majorOrMinor
			);
		}
		else if (metaTypeCode == 0x7F)
		{
			// sequencer-specific meta-event
		}
		else
		{
			throw "Unrecognized metaTypeCode!";
		}

		if (eventDefn == null)
		{
			throw "todo";
		}

		return eventDefn;
	}

	static fromBytes_EventChannel
	(
		byteStreamEvents, statusByte, eventTypeCode
	)
	{
		var channel = statusByte & 15;

		var eventDefn = null;

		if (eventTypeCode == MidiFileEventDefn_NoteOff.EventTypeCode) // 8
		{
			eventDefn = MidiFileEventDefn_NoteOff.fromBytes(byteStreamEvents, channel);
		}
		else if (eventTypeCode == MidiFileEventDefn_NoteOn.EventTypeCode) // 9
		{
			eventDefn = MidiFileEventDefn_NoteOn.fromBytes(byteStreamEvents, channel);
		}
		else if (eventTypeCode == 10)
		{
			// polyphonic key pressure
			var keyCode = byteStreamEvents.readByte();
			var pressure = byteStreamEvents.readByte();
			eventDefn = new MidiFileEventDefn_Pressure(channel, keyCode, pressure);
		}
		else if (eventTypeCode == MidiFileEventDefn_Controller.EventTypeCode) // 11
		{
			eventDefn = MidiFileEventDefn_Controller.fromBytes(byteStreamEvents, channel);
		}
		else if (eventTypeCode == MidiFileEventDefn_ProgramChange.EventTypeCode) // 12
		{
			eventDefn = MidiFileEventDefn_ProgramChange.fromBytes(byteStreamEvents, channel);
		}
		else if (eventTypeCode == MidiFileEventDefn_ChannelKeyPressure.EventTypeCode) // 13
		{
			// channel key pressure
			var channelPressure = byteStreamEvents.readByte();
			eventDefn = new MidiFileEventDefn_ChannelKeyPressure
			(
				channel, keyCode, channelPressure
			);
		}
		else if (eventTypeCode == 14)
		{
			// pitch bend
			var lsb = byteStreamEvents.readByte();
			var msb = byteStreamEvents.readByte();
			var value = (msb << 8) | lsb;
			eventDefn = new MidiFileEventDefn_PitchBend(channel, value);
		}
		else
		{
			throw "todo";
		}

		return eventDefn;
	}

	toBytes(byteStream)
	{
		byteStream.writeString(MidiFileChunk_Track.ChunkTypeCode);
		var byteStreamEvents = new ByteStream([]);
		var eventStatusCodeRunning = null;
		for (var i = 0; i < this.events.length; i++)
		{
			var event = this.events[i];
			var eventStatusCode = event.statusCode();
			if (eventStatusCode == eventStatusCodeRunning)
			{
				eventStatusCode = null;
			}
			else if (eventStatusCode < 128)
			{
				eventStatusCodeRunning = eventStatusCode;
			}
			else
			{
				eventStatusCodeRunning = null;
			}
			event.toBytes(byteStreamEvents, eventStatusCode);
		}

		var eventsAsBytes = byteStreamEvents.bytes;
		byteStream.writeIntegerBE(this.dataLengthInBytes, 4);
		byteStream.writeBytes(eventsAsBytes);
	}
}
