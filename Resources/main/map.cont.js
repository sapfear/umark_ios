function init(win, data) {
	var t2 = require("TiTools2/TiTools"),
		bank = t2.Bank,
		_ = t2.ThirdParty.underscore,
		_str = t2.ThirdParty.underscoreString,
		Map = require('ti.map');
	
	var map = Map.createView(undefined, {
		mapType: Map.STANDARD_TYPE,
		animate: true,
		regionFit: false,
		userLocation: true
	});
	
	// update map 
	map.updateData = function() {
		var annotations = [],
			path = t2.Path.preprocess("%ResourcesPath%/Media");
		this.removeAllAnnotations();
		
		
		if(!_.isEmpty(data)) {
			_.each(data, function(store, i) {
				var annotation = Map.createAnnotation({
					longitude: store.location.lat-0,
					latitude: store.location.lon-0,
					title: store.contacts.city.substring(0, 22),
					subtitle: store.name,
					image: path + "/Pin.png",
					animate: true
				});
				annotations.push(annotation);
			});
			this.annotations = annotations;
		}
	};
	// update map with all types first time
	map.updateData();
	
	map.addEventListener('click',function(evt){
	    
	});
	
	return map;
}

//---------------------------------------------//

module.exports = init;