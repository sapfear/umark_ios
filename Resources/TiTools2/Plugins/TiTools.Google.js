var TiTools2 = require("TiTools2/TiTools");

//---------------------------------------------//

function googleMapCurrentLocation(params) {
	var lang = "ru";
	var sensor = "false";
	var latlng = "";
	if(params != undefined) {
		if(params.lang != undefined) {
			lang = params.lang;
		}
		if(params.sensor != undefined) {
			sensor = params.sensor;
		}
		if(params.position != undefined) {
			if(params.position.latitude != undefined) {
				latlng += String(params.position.latitude);
			}
			latlng += ",";
			if(params.position.longitude != undefined) {
				latlng += String(params.position.longitude);
			}
		}
	}
	var http = TiTools2.Network.createClientHttp({
		options: {
			method: "GET",
			url: "http://maps.googleapis.com/maps/api/geocode/json",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				"Cache-Control": "no-cache, must-revalidate"
			},
			args: {
				latlng: latlng,
				sensor: sensor,
				language: lang
			}
		},
		loading: params.loading,
		loaded: params.loaded,
		success: function(handle) {
			json = handle.response("json");
			switch(json.status) {
				case "OK":
					var location = {};
					var results = json.results;
					if(results != undefined) {
						if(results.length > 0) {
							var row = json.results[0];
							location = {
								address: row.formatted_address,
								componet: {}
							};
							var addresses = row.address_components;
							for(var i = 0; i < addresses.length; i++) {
								var address = addresses[i];
								if(address.types.length > 0) {
									location.componet[address.types[0]] = address.long_name;
								}
							}
						}
					}
					if(params.success != undefined) {
						params.success(json.status, location);
					}
				break;
				default:
					if(params.success != undefined) {
						params.success(json.status);
					}
				break;
			}
		},
		failure: params.failure
	});
	if(http != undefined) {
		http.run();
	}
	return http;
}
function googleMapPaveRoute(params) {
	var output = "kml";
	var doflg = "ptk";
	var dirflg = "w";
	var hl = "en";
	var latitudeA = 0;
	var longitudeA = 0;
	var latitudeB = 0;
	var longitudeB = 0;
	if(params != undefined) {
		if(params.output != undefined) {
			output = params.output;
		}
		if(params.doflg != undefined) {
			doflg = params.doflg;
		}
		if(params.dirflg != undefined) {
			dirflg = params.dirflg;
		}
		if(params.hl != undefined) {
			hl = params.hl;
		}
		if(params.a != undefined) {
			var position = params.position;
			latitudeA = position.latitude;
			longitudeA = position.longitude;
		}
		if(params.b != undefined) {
			var position = params.b;
			latitudeB = position.latitude;
			longitudeB = position.longitude;
		}
	}
	var http = TiTools2.Network.createClientHttp({
		options: {
			method: "GET",
			url: "http://maps.google.com/",
			args: {
				saddr: String(latitudeA) + "," + String(longitudeA),
				daddr: String(latitudeB) + "," + String(longitudeB),
				output: output,
				doflg: doflg,
				dirflg: dirflg,
				hl: hl
			}
		},
		loading: params.loading,
		loaded: params.loaded,
		success: function(handle) {
			var route = {
				name: params.name,
				points: []
			};
			var xml = handle.response("raw:xml");
			if(xml != undefined) {
				var coords = xml.documentElement.getElementsByTagName("LineString");
				for(var i = 0; i < coords.length; i++) {
					var lines = coords.item(i).firstChild.text.split(" ");
					for(var j = 0; j < lines.length; j++) {
						var points = lines[j].split(",");
						if((points[0] != undefined) && (points[1] != undefined)) {
							route.points.push({
								longitude: points[0],
								latitude: points[1]
							});
						}
					}
				}
			}
			if(params.success != undefined) {
				params.success(route);
			}
		},
		failure: params.failure
	});
	if(http != undefined) {
		http.run();
	}
	return http;
}

//---------------------------------------------//

module.exports = {
	Map: {
		currentLocation: googleMapCurrentLocation,
		paveRoute: googleMapPaveRoute
	}
};
