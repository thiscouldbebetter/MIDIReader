
function MIDIFileEventDefn_Controller_Type(code, name)
{
	this.code = code;
	this.name = name;
}

{
	MIDIFileEventDefn_Controller_Type.Instances = 
		new MIDIFileEventDefn_Controller_Type_Instances();

	function MIDIFileEventDefn_Controller_Type_Instances()
	{
		var ControllerType = MIDIFileEventDefn_Controller_Type;
		this.BankSelect = new ControllerType(0, "BankSelect");
		this.ModulationWheel = new ControllerType(1, "ModulationWheel");
		this.BreathControl = new ControllerType(2, "BreathControl");
		this.FootController = new ControllerType(3, "FootController");
		this.PortamentoTime = new ControllerType(5, "PortamentoTime");
		// 6 - data entry
		this.ChannelVolume = new ControllerType(7, "ChannelVolume");
		// 8 - balance
		this.Pan = new ControllerType(10, "Pan");
		// 11 - expression controller
		// 12-13 - effect control 1
		// 16-19 - general purpose controller 1-4
		// repeats from 32-63?
		// 64 - damper pedal on/off
		// 65 - portamento on/off
		// 66 - sostenuto on/off
		// 67 - soft pedal on/off
		// 68 - legato footswitch
		// 69 - hold 2
		// 70 - sound variation (sound controller 1)
		// 71 - timbre
		// 72 - release time
		// 73 - attack time
		// 74 - brightness
		// 75-79 - sound controllers 6-10
		// 80-83 - general purpose controllers 5-8
		this.EffectDepth1 = new ControllerType(91, "EffectDepth1");
		this.EffectDepth2 = new ControllerType(92, "EffectDepth2");
		this.EffectDepth3 = new ControllerType(93, "EffectDepth3");
		this.EffectDepth4 = new ControllerType(94, "EffectDepth4");
		this.EffectDepth5 = new ControllerType(95, "EffectDepth5");
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
	}
}
