##Deep Model setting & triggering model.on("change")##

Out of the box, Backbone doesn't give us the ability to properly monitor state change of model attributes beyond the *model.attributes* object. This can cause annoyance if you would like use <code>model.on("change:someObject.property", function(evt) { } );_</code>

So how do we go about adding this functionality ourselves to any model that we like? 

First, we need to define a new model and give ourselves a new function to handle the settings/manual triggering. We'll call the new method <code>setNestedAttr(nestedObj, property, value)</code>. *nestedObj* is an object inside of *this.attributes*. *property* is the property/attribute inside of *nestedObj*. And *value* is the value that you'd like to set this attribute/property to.

Inside of our method, we need to define a *triggerString* as well as a reference to our nestedObj. Such as:

<code>
var ref = this.get(nestedObj),
triggerString = "change:" + nestedObj + "." + property;
</code>

Next, we just need to set the property's value inside of nestedObj. We can then set this using the default <code>model.set()</code> method:

<code>
ref[property] = value;
this.set({ nestedObj: ref });
</code>

Finally, before the function ends, we just call a manual trigger - this allows us to use <code>model.on("change:nestedObj.property", function(evt) { /* your code here */ });</code>

Voila! You now can easily call <code>model.setNestedAttr(myObj, myProperty, "updatedValue");</code> and have an appropriate trigger like you would on the base _model.attributes_.

If you have any questions let me know or feel free to fork this/make pull requests.