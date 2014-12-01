//
// This is a proof of concept on how to monitor 
// nested attributes inside of a Backbone model
// without the need of any 3rd party addons
// 

// Create your model; inside create a new method that will
// set nested attributes (ie: setNestedAttr())
var nestedBackboneAttributeSample = Backbone.Model.extend({
	defaults: {
		id: null,
		nestedProperties: {
			name: null,
			age: null,
			email: null
		}
	},
	/**
	 * [setNestedAttr Set nested attribute and fire change event]
	 * @param {[type]} nestedObj [object inside of this.attributes]
	 * @param {[type]} property  [property inside of nestedObj]
	 * @param {[type]} value     [value to replace nestedObj[property] with]
	 */
	setNestedAttr: function(nestedObj, property, value) {

		// get current nested obj from this.attributes
		var ref = this.get(nestedObj)
			triggerString = "change:" + nestedObj + "." + property;

		console.log("Nested Object retrieved =>");
		console.log(ref);

		// if this.attributes.nestedObj has the property and
		// value is defined
		if (ref.hasOwnProperty(property) && value != undefined) {

			ref[property] = value;
			this.set({ nestedObj: ref });
			// manually trigger.. backbone doesn't monitor nested attrs
			this.trigger(triggerString);

		}

	}
});

// now, let's run some sampel code to give you 
// an idea of how to use this.

var x = new nestedBackboneAttributeSample();

// setup event handler for on change w/specific nested attr
x.on("change:nestedProperties.name", function() {
	console.log("this event was fired!");
});

x.setNestedAttr("nestedProperties", "name", "Github")
// output => "this event was fired!"
