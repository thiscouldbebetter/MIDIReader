
class MidiFileEventDefn_Controller_Type
{
	constructor(code, name)
	{
		this.code = code;
		this.name = name;
	}

	static Instances()
	{ 
		if (MidiFileEventDefn_Controller_Type._instances == null)
		{
			MidiFileEventDefn_Controller_Type._instances =
				new MidiFileEventDefn_Controller_Type_Instances();
		}
		return MidiFileEventDefn_Controller_Type._instances;
	}

	static byCode(code)
	{
		return MidiFileEventDefn_Controller_Type.Instances().byCode(code);
	}

}

class MidiFileEventDefn_Controller_Type_Instances
{
	constructor()
	{
		// See: https://www.whippedcreamsounds.com/midi-cc-list/

		// MSB = "most significant byte"
		// LSB = "least significant byte"

		var ControllerType = MidiFileEventDefn_Controller_Type;
		var ct = (a, b) = new ControllerType(a, b);

		this.BankSelect 		= ct(0, "BankSelect");
		this.ModulationWheel 	= ct(1, "ModulationWheel");
		this.BreathControl 		= ct(2, "BreathControl");
		// 3 - undefined
		this.FootController 	= ct(4, "FootController");
		this.PortamentoTime 	= ct(5, "PortamentoTime");
		// 6 - data entry
		this.ChannelVolume 		= ct(7, "ChannelVolume");
		// 8 - balance // Sometimes used instead of pan, with same values.
		// 9 - undefined
		this.Pan 				= ct(10, "Pan"); // 0 = left, 64 = center, 127 = right.
		// 11 - expression controller ("Pedal used for live performance modulation. Map to parameters inside your instrument to modulate while playing.")
		// 12-13 - effect control 1-2 "(MSB)"
		// 14-15 - "undefined (MSB)"
		// 16-19 - general purpose controller 1-4 // "slider, knob, or ribbon"
		// 20 - not listed
		// 21-31 - undefined
		// 32 - bank select - lsb
		// 33 - modulation wheel lsb
		// 34 - breath control lsb
		// 35 - undefined
		// 36 - foot pedal lsb
		// 37 - portamento time lsb
		// 38 - data entry lsb
		// 39 - volume lsb
		// 40 - balance lsb
		// 41 - undefined
		// 42-45 - "used with 10-13 to send modulation commands for instruments with higher mod resolution"
		// 46 - 63 - undefined
		// 64 - damper pedal on/off
		// 65 - portamento on/off
		// 66 - sostenuto on/off
		// 67 - soft pedal on/off
		// 68 - legato footswitch (toggle?)
		// 69 - hold 2
		// 70 - sound variation (sound controller 1) "Used for filters, effects, etc."
		// 71 - timbre ("filter resonance/Q")
		// 72 - release time (how long until note fades out)
		// 73 - attack time (keypress to max volume)
		// 74 - brightness ("filter cutoff frequency Hz")
		// 75-79 - Sound controllers 6-10.  "Used for filters, effects, etc."
		// 80-83 - general purpose controllers 5-8
		this.EffectDepth1 = new ControllerType(91, "EffectDepth1"); // "Usually reverb."
		this.EffectDepth2 = new ControllerType(92, "EffectDepth2"); // "Usually tremolo."
		this.EffectDepth3 = new ControllerType(93, "EffectDepth3"); // "Usually chorus."
		this.EffectDepth4 = new ControllerType(94, "EffectDepth4"); // "Usually detuning."
		this.EffectDepth5 = new ControllerType(95, "EffectDepth5"); // "Usually phasing."
		// 96 - data entry +1
		// 97 - data entry -1
		// 98 - non-registered parm number lsb
		// 99 - non-registered parm number msb
		// 100 - registered parm number lsb
		// 101 - registered parm number msb
		// 120 - all sound off
		this.ResetAllControllers = new ControllerType(121, "ResetAllControllers");
		// 122 - local control on/off
		// 123 - all notes off
		// 124 - omni mode off (+ all notes off)
		// 125 - omni mode on (+ all notes off)
		// 126 - poly mode on/off (+ all notes off)
		// 127 - poly mode on (incl moni=off + all notes off)

		this._All = 
		[
			this.BankSelect,
			this.ModulationWheel,
			this.BreathControl,
			this.FootController,
			null, // 4
			this.PortamentoTime,
			null, // 6 - data entry
			this.ChannelVolume,
			null, // 8 - balance
			null, // 9
			this.Pan,
		];

		this._All.addLookups("name");

		this._AllByCode = new Map(this._All.map(x => [x.code, x]) );
	}

	byCode(code)
	{
		return this._AllByCode.get(code);
	}
}
