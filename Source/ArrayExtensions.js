
// extensions

function ArrayExtensions()
{
	// Extension class.
}

{
	Array.prototype.addLookups = function(keyName)
	{
		for (var i = 0; i < this.length; i++)
		{
			var element = this[i];
			if (element != null)
			{
				var key = element[keyName];
				this[key] = element;
			}
		}
		return this;
	}
}
