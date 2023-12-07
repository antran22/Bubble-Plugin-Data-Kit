function(instance, properties, context) {
	const segments = properties.segments ? properties.segments.get(0, properties.segments.length()) : [];
	
    
    function decodeSegment(index) {
        const segment = segments[index];
        const type = properties[`type${index}`];
        const field = properties[`field${index}`];
        
		if (!type) {
            instance.publishState(`value${index}`, null);
            return;
        }
        
		const value = window.DataKit.lookupValueID(type, field, segment);
        instance.publishState(`value${index}`, value);
    }
    
    for (let index = 1; index <= 6; ++index) {
        decodeSegment(index);
    }

    
    if (!instance.data.initialized) {
        instance.data.initialized = true;
	    instance.publishState("initialized", true);
        instance.triggerEvent("initialized");
    }
}