var thirdPartyUnderscore = require("TiTools2/ThirdParty/underscore")._;
var thirdPartyUnderscoreString = require("TiTools2/ThirdParty/underscore.string");
var thirdPartyMoment = require("TiTools2/ThirdParty/moment");

//---------------------------------------------//

var SCREEN_UNKNOWN = "Unknown";
var SCREEN_SMALL = "Small";
var SCREEN_NORMAL = "Normal";
var SCREEN_LARGE = "Large";
var SCREEN_EXTRA_LARGE = "ExtraLarge";

//---------------------------------------------//

var coreIsSimulator = ((Ti.Platform.model == "Simulator") || (Ti.Platform.model.indexOf("sdk") != -1));
var coreIsAndroid = (Ti.Platform.osname == "android");
var coreIsIPhone = (Ti.Platform.osname == "iphone");
var coreIsIPad = (Ti.Platform.osname == "ipad");
var coreIsIOS = (coreIsIPhone == true) || (coreIsIPad == true);

//---------------------------------------------//

var screenWidth = Ti.Platform.displayCaps.platformWidth;
var screenHeight = Ti.Platform.displayCaps.platformHeight;
var screenResolution = screenWidth * screenHeight;
var screenDpi = Ti.Platform.displayCaps.dpi;
var screenMode = SCREEN_UNKNOWN;
var screenIsRetina = false;

//---------------------------------------------//

if (coreIsIPhone == true) {
	if ((screenWidth == 320) && (screenHeight == 480)) {
		screenMode = SCREEN_SMALL;
	} else if ((screenWidth == 640) && (screenHeight == 960)) {
		screenMode = SCREEN_NORMAL;
		screenIsRetina = true;
	} else if ((screenWidth == 640) && (screenHeight == 1136)) {
		screenMode = SCREEN_LARGE;
		screenIsRetina = true;
	}
} else if (coreIsIPad == true) {
	if ((screenWidth == 1024) && (screenHeight == 768)) {
		screenMode = SCREEN_SMALL;
	} else if ((screenWidth == 2048) && (screenHeight == 1536)) {
		screenMode = SCREEN_NORMAL;
		screenIsRetina = true;
	}
} else if (coreIsAndroid == true) {
	if (screenDpi <= 120) {
		screenMode = SCREEN_SMALL;
	} else if (screenDpi <= 160) {
		screenMode = SCREEN_NORMAL;
	} else if (screenDpi <= 240) {
		screenMode = SCREEN_LARGE;
	} else if (screenDpi <= 320) {
		screenMode = SCREEN_EXTRA_LARGE;
	}
}

//---------------------------------------------//
// TODO:NAMESPACE:CORE
//---------------------------------------------//

var coreIsBoolean = thirdPartyUnderscore.isBoolean;
var coreIsNumber = thirdPartyUnderscore.isNumber;
var coreIsString = thirdPartyUnderscore.isString;
var coreIsDate = thirdPartyUnderscore.isDate;
var coreIsArray = thirdPartyUnderscore.isArray;
var coreIsRegExp = thirdPartyUnderscore.isRegExp;
var coreIsFunction = thirdPartyUnderscore.isFunction;
var coreIsEqual = thirdPartyUnderscore.isEqual;
var coreIsEmpty = thirdPartyUnderscore.isEmpty;
var coreIsNaN = thirdPartyUnderscore.isNaN;

function coreIsObject(object) {
	if(object != undefined) {
		if(object.toString() == "[object Object]") {
			return true;
		}
	}
	return false;
}

function coreIsTiObject(object) {
	if(object != undefined) {
		var string = object.toString();
		if((stringIsPrefix(string, "[object Ti") == true) && (stringIsSuffix(string, "]") == true)) {
			return true;
		}
	}
	return false;
}

function coreDebounce(func, timeout) {
	var lastTime = 0;
	return function() {
		var context = this;
		var args = arguments;
		var now = dateInterval();
		var result = undefined;
		if((lastTime + timeout) <= now) {
			result = func.apply(context, args);
			lastTime = now;
		}
		return result;
	};
}

function coreTr(key, defaults) {
	if (coreIsFunction(L) == true) {
		return L(key, defaults);
	} else if (Ti.Locate != undefined) {
		if (coreIsFunction(Ti.Locate.getString) == true) {
			return Ti.Locate.getString(key, defaults);
		}
	}
	return defaults;
}

function coreLoadJS(filename) {
	if(stringIsSuffix(filename, ".js") == true) {
		filename = filename.replace(".js", "");
	}
	return require(filename);
}

//---------------------------------------------//
// TODO:NAMESPACE:STRING
//---------------------------------------------//

var stringIsPrefix = thirdPartyUnderscoreString.startsWith;
var stringIsSuffix = thirdPartyUnderscoreString.endsWith;
var stringTrim = thirdPartyUnderscoreString.trim;
var stringTrimLeft = thirdPartyUnderscoreString.ltrim;
var stringTrimRight = thirdPartyUnderscoreString.rtrim;
var stringPaddingLeft = thirdPartyUnderscoreString.lpad;
var stringPaddingRight = thirdPartyUnderscoreString.rpad;
var stringRepeat = thirdPartyUnderscoreString.repeat;
var stringFormat = thirdPartyUnderscoreString.sprintf;
var stringLines = thirdPartyUnderscoreString.lines;

function stringIsInt(value) {
	if(coreIsString(value) == true) {
		return /^\d+$/.test(value);
	}
	return coreIsNumber(value);
}

function stringToInt(value) {
	if(coreIsString(value) == true) {
		return parseInt(value);
	} else if(coreIsNumber(value) == true) {
		return value;
	}
	return 0;
}

function stringIsFloat(value) {
	if(coreIsString(value) == true) {
		return /^\d+|\d*,\d+$|^\d+,\d*|\d*\.\d+$|^\d+\.\d*$/.test(value);
	}
	return coreIsNumber(value);
}

function stringToFloat(value) {
	if(coreIsString(value) == true) {
		return parseFloat(value.replace(',', '.'));
	} else if(coreIsNumber(value) == true) {
		return value;
	}
	return 0;
}

function stringReplace(str, search, replace) {
	return str.split(search).join(replace);
}

//---------------------------------------------//
// TODO:NAMESPACE:DATE
//---------------------------------------------//

function dateInterval(base) {
	var interval = new Date().getTime();
	if(base != undefined) {
		return (interval - base);
	}
	return interval;
}

function dateNow(offset) {
	var date = thirdPartyMoment();
	if (offset != undefined) {
		date.add(offset);
	}
	return date;
}

function dateMake(params) {
	var date = thirdPartyMoment();
	if (params != undefined) {
		if (params.year != undefined) {
			date.year(params.year);
		}
		if (params.month != undefined) {
			date.month(params.month);
		}
		if (params.day != undefined) {
			date.date(params.day);
		}
		if (params.hour != undefined) {
			date.hour(params.hour);
		}
		if (params.minute != undefined) {
			date.minute(params.minute);
		}
		if (params.second != undefined) {
			date.second(params.second);
		}
	}
	return date;
}

function dateFormat(date, format) {
	if (date == undefined) {
		date = thirdPartyMoment();
	}
	return date.format(String);
}

//---------------------------------------------//
// TODO:NAMESPACE:GLOBAL
//---------------------------------------------//

var _global = {};

//---------------------------------------------//

function globalSet(name, value) {
	_global[name] = value;
}

function globalGet(name) {
	return _global[name];
}

//---------------------------------------------//
// TODO:NAMESPACE:GEO
//---------------------------------------------//

function geoConfigure(params) {
	if (params.provider != undefined) {
		Ti.Geolocation.preferredProvider = params.provider;
	}
	if (params.accuracy != undefined) {
		Ti.Geolocation.accuracy = params.accuracy;
	}
	if (params.distanceFilter != undefined) {
		Ti.Geolocation.distanceFilter = params.distanceFilter;
	}
}

function geoCurrentPosition(params) {
	function geoCurrentPositionCallback(event) {
		utilsInfo(event);
		try {
			if (event != undefined) {
				if (event.success == true) {
					if (params.success != undefined) {
						var coords = event.coords;
						params.success({
							longitude: coords.longitude,
							latitude: coords.latitude
						});
					}
				} else if (event.error != undefined) {
					if (params.failure != undefined) {
						params.failure({
							code: event.code,
							message: event.error
						});
					}
				}
			} else {
				if (params.failure != undefined) {
					params.failure();
				}
			}
		} catch(error) {
			utilsInfo(error);
			if (params.except != undefined) {
				params.except(error);
			}
		}
		Ti.Geolocation.removeEventListener("location", geoCurrentPositionCallback);
	}

	if (Ti.Geolocation.locationServicesEnabled == true) {
		Ti.Geolocation.getCurrentPosition(geoCurrentPositionCallback);
	} else {
		geoCurrentPositionCallback();
	}
}

function geoDistance(a, b) {
	var radius = 6372795.0;
	var cl1 = Math.cos(a.latitude * Math.PI / 180.0);
	var sl1 = Math.sin(a.latitude * Math.PI / 180.0);
	var cl2 = Math.cos(b.latitude * Math.PI / 180.0);
	var sl2 = Math.sin(b.latitude * Math.PI / 180.0);
	var dc = Math.cos((b.longitude - a.longitude) * Math.PI / 180.0);
	var ds = Math.sin((b.longitude - a.longitude) * Math.PI / 180.0);
	var yy = Math.sqrt(Math.pow(cl2 * ds, 2.0) + Math.pow(cl1 * sl2 - sl1 * cl2 * dc, 2.0));
	var xx = sl1 * sl2 + cl1 * cl2 * dc;
	return Math.atan2(yy, xx) * radius;
}

//---------------------------------------------//
// TODO:NAMESPACE:PATH
//---------------------------------------------//

function pathResources() {
	return utilsAppropriatePlatform({
		ios: Ti.Filesystem.resourcesDirectory,
		android: "file:///android_asset/Resources/"
	});
}

function pathControllers() {
	return utilsAppropriatePlatform({
		ios: Ti.Filesystem.resourcesDirectory,
		android: ""
	});
}

function pathPreprocess(path) {
	if(stringIsPrefix(path, "%") == true) {
		var keys = {
			"ResourcesPath": TiTools.Path.resources,
			"ControllersPath": TiTools.Path.controllers
		};
		return path.replace(/%([A-Za-z_]*)%/g, function(str, p1, p2, offset, s) {
			var value = keys[p1];
			if(value != undefined) {
				return value;
			}
			return p1;
		});
	}
	return path;
}

function pathImgUrl(imgPath){
	if(stringIsPrefix(imgPath, t2.Global.get("rootUrl"))){
		return imgPath;
	} else {
		return t2.Global.get("rootUrl") + imgPath;
	}
}

//---------------------------------------------//
// TODO:NAMESPACE:FILESYSTEM
//---------------------------------------------//

function fileSystemGetFile(filename) {
	return Ti.Filesystem.getFile(pathPreprocess(filename));
}

//---------------------------------------------//
// TODO:NAMESPACE:NETWORK
//---------------------------------------------//

function networkUri(string) {
	this.parts = {};
	this.queryObject = new networkUriQuery();
	this.hasAuthorityPrefix = null;

	if (string != undefined) {
		this.parse(string);
	}
}

networkUri.prototype.parse = function(string) {
	var uriParser = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
	var uriKeys = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];

	this.parts = {};

	var uri = uriParser.exec(string);
	if (uri.length > 0) {
		var length = uriKeys.length;
		for (var i = 0; i < length; i++) {
			var item = uri[i];
			var key = uriKeys[i];
			if (item != undefined) {
				this.parts[key] = item;
			} else {
				this.parts[key] = "";
			}
		}
	}
	this.queryObject = new networkUriQuery(this.parts.query);
	this.hasAuthorityPrefix = null;
};

networkUri.prototype.authorityPrefix = function(value) {
	if (value != undefined) {
		this.hasAuthorityPrefix = value;
	}
	if (this.hasAuthorityPrefix === null) {
		if (this.parts.source.indexOf("//") !== -1) {
			return true;
		}
		return false;
	} else {
		return this.hasAuthorityPrefix;
	}
};

networkUri.prototype.protocol = function(value) {
	if (value != undefined) {
		this.parts.protocol = value;
	}
	return this.parts.protocol;
};

networkUri.prototype.userInfo = function(value) {
	if (value != undefined) {
		this.parts.userInfo = value;
	}
	return this.parts.userInfo;
};

networkUri.prototype.host = function(value) {
	if (value != undefined) {
		this.parts.host = value;
	}
	return this.parts.host;
};

networkUri.prototype.port = function(value) {
	if (value != undefined) {
		this.parts.port = value;
	}
	return this.parts.port;
};

networkUri.prototype.path = function(value) {
	if (value != undefined) {
		this.parts.path = value;
	}
	return this.parts.path;
};

networkUri.prototype.query = function(value) {
	if (value != undefined) {
		this.queryObject = new networkUriQuery(value);
	}
	return this.queryObject;
};

networkUri.prototype.anchor = function(value) {
	if (value != undefined) {
		this.parts.anchor = value;
	}
	return this.parts.anchor;
};

networkUri.prototype.setAuthorityPrefix = function(value) {
	this.authorityPrefix(value);
	return this;
};

networkUri.prototype.setProtocol = function(value) {
	this.protocol(value);
	return this;
};

networkUri.prototype.setUserInfo = function(value) {
	this.userInfo(value);
	return this;
};

networkUri.prototype.setHost = function(value) {
	this.host(value);
	return this;
};

networkUri.prototype.setPort = function(value) {
	this.port(value);
	return this;
};

networkUri.prototype.setPath = function(value) {
	this.path(value);
	return this;
};

networkUri.prototype.setQuery = function(value) {
	this.query(value);
	return this;
};

networkUri.prototype.setAnchor = function(value) {
	this.anchor(value);
	return this;
};

networkUri.prototype.setQueryItem = function(key, value, index) {
	if (arguments.length == 2) {
		this.queryObject.set(key, value);
	} else if (arguments.length == 3) {
		this.queryObject.set(key, value, index);
	}
	return this;
};

networkUri.prototype.getQueryItem = function(key) {
	return this.queryObject.get(key);
}
networkUri.prototype.removeQueryItem = function(key, value) {
	if (arguments.length == 1) {
		this.queryObject.remove(key);
	} else if (arguments.length == 2) {
		this.queryObject.remove(key, value);
	}
	return this;
}
networkUri.prototype.clearQuery = function() {
	this.queryObject = new networkUriQuery("");
	this.parts.query = "";
	return this;
}
networkUri.prototype.scheme = function() {
	var scheme = "";
	var protocol = this.parts.protocol;
	if (protocol.length > 0) {
		scheme += protocol;
		if (stringIsSuffix(protocol, ":") == false) {
			scheme += ":";
		}
		scheme += "//";
	} else {
		if (this.authorityPrefix() == true) {
			if (this.parts.host.length > 0) {
				scheme += "//";
			}
		}
	}
	return scheme;
}
networkUri.prototype.origin = function() {
	var scheme = this.scheme();
	var userInfo = this.parts.userInfo;
	var host = this.parts.host;
	if ((userInfo.length > 0) && (host.length > 0)) {
		scheme += userInfo;
		if (stringIsSuffix(userInfo, "@") == false) {
			scheme += "@";
		}
	}
	if (host.length > 0) {
		scheme += this.parts.host;
		var port = this.parts.port;
		if (port.length > 0) {
			scheme += ":" + port;
		}
	}
	return scheme;
}
networkUri.prototype.toString = function() {
	var string = this.origin();
	var path = this.parts.path;
	var query = this.queryObject.toString();
	var anchor = this.parts.anchor;
	if (path.length > 0) {
		string += path;
	} else {
		var host = this.parts.host;
		if (host.length > 0) {
			if ((query.length > 0) || (anchor.length > 0)) {
				string += "/";
			}
		}
	}
	if (query.length > 0) {
		if (query.indexOf("?") != 0) {
			string += "?";
		}
		string += query;
	}
	if (anchor.length > 0) {
		if (anchor.indexOf("#") != 0) {
			string += "#";
		}
		string += anchor;
	}
	return string;
}
//---------------------------------------------//

function networkUriQuery(query) {
	this.params = [];

	if (query != undefined) {
		this.parse(query);
	}
}

networkUriQuery.prototype.encode = function(string) {
	return networkEncodeURIComponent(string);
};

networkUriQuery.prototype.decode = function(string) {
	return networkDecodeURIComponent(string);
};

networkUriQuery.prototype.parse = function(query) {
	this.params = [];

	if (query.length > 0) {
		if (query.indexOf("?") === 0) {
			query = query.substring(1);
		}
		var list = query.split(/[&;]/);
		var length = list.length;
		for ( i = 0; i < length; i++) {
			var item = list[i];
			var pair = item.split("=");
			this.params.push([
				this.decode(pair[0]),
				this.decode(pair[1])
			]);
		}
	}
};

networkUriQuery.prototype.set = function(key, value, index) {
	var params = this.params;
	key = this.decode(key);
	value = this.decode(value);
	if (arguments.length == 3) {
		if(index != -1) {
			index = Math.min(index, params.length);
			params.splice(index, 0, [key, value]);
		} else {
			params.push([key, value]);
		}
	} else if (arguments.length > 0) {
		params.push([key, value]);
	}
	return this;
};
networkUriQuery.prototype.get = function(key) {
	var params = this.params;
	var find = this.decode(key);
	var length = params.length;
	for (var i = 0; i < length; i++) {
		var item = params[i];
		if (find == item[0]) {
			return item[1];
		}
	}
};
networkUriQuery.prototype.remove = function(key, value) {
	var params = this.params;
	var find = this.decode(key);
	var length = params.length;
	for (var i = 0; i < length; i++) {
		var item = params[i];
		if (find == item[0]) {
			params.splice(i, 1);
			break;
		}
	}
	return this;
};
networkUriQuery.prototype.toString = function() {
	var string = "";
	var params = this.params;
	var length = params.length;
	for (var i = 0; i < length; i++) {
		var item = params[i];
		if (string.length > 0) {
			string += "&";
		}
		string += this.encode(item[0]) + "=" + this.encode(item[1]);
		//string += item[0] + "=" + item[1];
	}
	if (string.length > 0) {
		return "?" + string;
	}
	return string;
};

//---------------------------------------------//

function networkHttpClient(queue, params) {
	this.handle = undefined;
	this.queue = queue;
	this.options = params.options;
	this.success = params.success;
	this.failure = params.failure;
	this.loading = params.loading;
	this.loaded = params.loaded;
	this.sendProgress = params.sendProgress;
	this.readProgress = params.readProgress;
}

networkHttpClient.prototype.run = function(index) {
	var queue = this.queue;
	if (queue != undefined) {
		if(queue.length > 0) {
			if(coreIsNumber(index) == true) {
				queue.splice(index, 0, this);
			} else {
				queue.push(this);
			}
			return;
		}
	}
	if (this.handle == undefined) {
		this.request();
	}
};

networkHttpClient.prototype.nextRequest = function(needsRemove, needsRun) {
	if (this.queue != undefined) {
		if(needsRemove == true) {
			if(this.queue.length > 0) {
				if(this.queue[0] == self) {
					this.queue.splice(0, 1);
				}
			}
		}
		if(needsRun == true) {
			if(this.queue.length > 0) {
				this.queue[0].request();
			}
		}
	}
};

networkHttpClient.prototype.request = function() {
	var self = this;
	var queue = self.queue;
	var options = self.options;
	var method = options.method;
	var url = options.url;
	var args = options.args;
	var headers = options.headers;
	var responced = false;
	
	var timeout = getValue(options.timeout, 0);
	
	function getValue(value, def) {
		if(value != undefined) {
			return value;
		}
		return def;
	}
	
	self.handle = Ti.Network.createHTTPClient({
		cache: getValue(options.cache, false),
		tlsVersion: getValue(options.tlsVersion),
		autoRedirect: getValue(options.autoRedirect, true),
		enableKeepAlive: getValue(options.enableKeepAlive, false),
		validatesSecureCertificate: getValue(options.validatesSecureCertificate, false),
		withCredentials: getValue(options.withCredentials, false),
		username: getValue(options.username, ""),
		password: getValue(options.password, ""),
		timeout: timeout,
		onload: function(event) {
			responced = true;
			if (coreIsFunction(self.loaded) == true) {
				self.loaded(self);
			}
			if (coreIsFunction(self.success) == true) {
				self.success(self);
			}
			self.handle = undefined;
			self.nextRequest(true, true);
		},
		onerror: function(event) {
			responced = true;
			if (coreIsFunction(self.loaded) == true) {
				self.loaded(self);
			}
			if (coreIsFunction(self.failure) == true) {
				self.failure(self);
			}
			self.handle = undefined;
			self.nextRequest(true, false);
		},
		onsendstream: function(event) {
			if (coreIsFunction(self.sendProgress) == true) {
				self.sendProgress(self, event.progress);
			}
		},
		ondatastream: function(event) {
			if (coreIsFunction(self.readProgress) == true) {
				self.readProgress(self, event.progress);
			}
		}
	});
	
	self.handle.autoEncodeUrl = getValue(options.autoEncodeUrl, false);
	
	if (coreIsObject(args) == true) {
		var uri = new networkUri(url);
		if (args != undefined) {
			for (var i in args) {
				uri.setQueryItem(i, args[i]);
			}
		}
		url = uri.toString();
	}
	
	// Dirty iOS hack
	if(options.notDecode !== true)
		self.handle.open(method, decodeURI(url));
	else
		self.handle.open(method, url);

	if (headers != undefined) {
		for (var i in headers) {
			self.handle.setRequestHeader(i, headers[i]);
		}
	}
	switch(method) {
		case "GET":
			self.handle.send();
			break;
		case "DELETE":
			self.handle.send();
			break;
		case "PUT":
			if(options.put != undefined) {
				self.handle.send(options.put);
			} else {
				self.handle.send();
			}
			break;
		case "POST":
			if(options.post != undefined) {
				self.handle.send(options.post);
			} else {
				self.handle.send();
			}
			break;
	}
	
	if(timeout > 0) {
		setTimeout(function() {
			if(responced == false) {
				self.abort();
			}
		}, timeout);
	}
	if (coreIsFunction(self.loading) == true) {
		self.loading(self, self);
	}
};

networkHttpClient.prototype.abort = function() {
	if (this.handle != undefined) {
		this.handle.abort();
		if (coreIsFunction(this.loaded) == true) {
			this.loaded(this);
		}
		if (coreIsFunction(this.failure) == true) {
			this.failure(this);
		}
		this.handle = undefined;
		this.nextRequest(true, false);
	}
};

networkHttpClient.prototype.method = function() {
	if (this.handle != undefined) {
		return this.handle.connectionType;
	}
	return "";
};

networkHttpClient.prototype.location = function() {
	if (this.handle != undefined) {
		return this.handle.location;
	}
	return "";
};

networkHttpClient.prototype.status = function() {
	if (this.handle != undefined) {
		return this.handle.status;
	}
	return 0;
};

networkHttpClient.prototype.response = function(as) {
	if (this.handle != undefined) {
		switch(as) {
			case "text":
				return this.handle.responseText;
			case "json":
				return jsonDeserialize(this.handle.responseText);
			case "xml":
				return xmlDeserialize(this.handle.responseXML);
			case "raw:xml":
				return this.handle.responseXML;
		}
		return this.handle.responseData;
	}
	return undefined;
};

//---------------------------------------------//

var _networkQueue = {
};

//---------------------------------------------//

function networkCreateUri(params) {
	return new networkUri(params);
}

function networkCreateHttpClient(params) {
	var handle = undefined;
	if (Ti.Network.online == true) {
		var options = params.options;
		if (coreIsObject(options) == true) {
			switch(options.method) {
				case "GET":
				case "PUT":
				case "POST":
				case "DELETE":
					break;
				default:
					errorUnknownMethod("networkCreateHttpClient", options.method);
					return;
			}
			var queueList = undefined;
			var queueName = params.queue;
			if(coreIsString(queueName) == true) {
				if(coreIsArray(_networkQueue[queueName]) == false) {
					_networkQueue[queueName] = [];
				}
				queueList = _networkQueue[queueName];
			}
			handle = new networkHttpClient(queueList, params);
		}
	} else {
		if (params.failure != undefined) {
			params.failure(handle);
		}
	}
	return handle;
}

function networkDecodeURIComponent(string) {
	try {
		string = Ti.Network.decodeURIComponent(string);
	} catch(error) {
	}
	return string;
}

function networkEncodeURIComponent(string) {
	try {
		string = Ti.Network.encodeURIComponent(string);
	} catch(error) {
	}
	return string;
}

//---------------------------------------------//
// TODO:NAMESPACE:JSON
//---------------------------------------------//

function jsonSerialize(node) {
	return JSON.stringify(node);
}

function jsonDeserialize(string) {
	return JSON.parse(string);
}

//---------------------------------------------//
// TODO:NAMESPACE:XML
//---------------------------------------------//

function xmlSerialize(node) {
	return "";
}

function xmlDeserialize(data) {
	if (coreIsString(data) == true) {
		var xml = Ti.XML.parseString(data);
		if (xml != undefined) {
			return xmlDeserializeNode(xml.documentElement);
		}
	} else {
		return xmlDeserializeNode(data);
	}
	return undefined;
}

function xmlDeserializeNode(node) {
	var result = {
		name: node.nodeName,
		value: stringTrim(node.nodeValue),
		attributes: {},
		childs: []
	};
	switch(node.nodeType) {
		case node.ELEMENT_NODE:
			var attributes = node.attributes;
			if (attributes != undefined) {
				for (var i = 0; i < attributes.length; i++) {
					var attribute = attributes.item(i);
					result.attributes[attribute.nodeName] = attribute.nodeValue;
				}
			}
			break;
	}
	var child = node.firstChild;
	while (child != undefined) {
		switch(child.nodeType) {
			case child.TEXT_NODE:
				result.value += stringTrim(child.nodeValue);
				break;
			default:
				result.childs.push(xmlDeserializeNode(child));
				break;
		}
		child = child.nextSibling;
	}
	return result;
}

function xmlGetNode(node, nodeName) {
	var childs = node.childs;
	var count = childs.length;
	for (var i = 0; i < count; i++) {
		var child = childs[i];
		if (child.name == nodeName) {
			return child;
		}
	}
	return undefined;
}

function xmlFindNode(node, nodeName) {
	var result = [];
	var childs = node.childs;
	var count = childs.length;
	for (var i = 0; i < count; i++) {
		var child = childs[i];
		if (child.name == nodeName) {
			result.push(child);
		}
	}
	return result;
}

function xmlMergeNodeAttributes(nodes) {
	var result = {};
	var count = nodes.length;
	for (var i = 0; i < count; i++) {
		result = utilsCombine(nodes[i].attributes, result);
	}
	return result;
}

//---------------------------------------------//
// TODO:NAMESPACE:CSV
//---------------------------------------------//

function csvSerialize(csv) {
	function needsQuoting(str) {
		return /^\s|\s$|,|"|\n/.test(str);
	}

	var out = "";
	for (var i = 0; i < csv.length; ++i) {
		var row = csv[i];
		for (var j = 0; j < row.length; ++j) {
			var cur = row[j];
			if (coreIsString(cur) == true) {
				cur = cur.replace(/"/g, "\"\"");
				if ((needsQuoting(cur) == true) || (stringIsInt(cur) == true) || (stringIsFloat(cur) == true)) {
					cur = "\"" + cur + "\"";
				} else if (cur == "") {
					cur = "\"\"";
				}
			} else if (coreIsNumber(cur) == true) {
				cur = cur.toString(10);
			} else if (cur == null) {
				cur = "";
			} else {
				cur = cur.toString();
			}
			out += (j < row.length - 1) ? cur + ",": cur;
		}
		out += "\n";
	}
	return out;
}

function csvDeserialize(str, trim) {
	var inQuote = false;
	var fieldQuoted = false;
	var field = "";
	var row = [];
	var out = [];

	function csvDeserializeField(field) {
		if (fieldQuoted != true) {
			if (field == "") {
				field = null;
			} else if (trim == true) {
				field = stringTrim(field);
			}
			if (stringIsInt(field) == true) {
				field = parseInt(field, 10);
			} else if (stringIsFloat(field) == true) {
				field = parseFloat(field, 10);
			}
		}
		return field;
	}

	function chomp(str) {
		var last = str.length - 1;
		if (str.charAt(last) != "\n") {
			return str;
		} else {
			return str.substring(0, last);
		}
	}

	str = chomp(str);
	for (var i = 0; i < str.length; ++i) {
		var cur = str.charAt(i);
		if ((inQuote == false) && ((cur == ",") || (cur == "\n"))) {
			field = csvDeserializeField(field);
			row.push(field);
			if (cur == "\n") {
				out.push(row);
				row = [];
			}
			field = "";
			fieldQuoted = false;
		} else {
			if (cur != "\"") {
				field += cur;
			} else {
				if (inQuote == false) {
					inQuote = true;
					fieldQuoted = true;
				} else {
					if (str.charAt(i + 1) == "\"") {
						field += "\"";
						i += 1;
					} else {
						inQuote = false;
					}
				}
			}
		}
	}
	field = csvDeserializeField(field);
	row.push(field);
	out.push(row);
	return out;
}

//---------------------------------------------//
// TODO:NAMESPACE:UI
//---------------------------------------------//

function uiCreateParams(preset, params, tiClassName) {
	var combined = {};
	if (coreIsArray(params) == true) {
		var count = params.length;
		for (var i = 0; i < count; i++) {
			var item = params[i];
			if (coreIsObject(item) == true) {
				combined = utilsCombine(item, combined);
			}
		}
	} else if (coreIsObject(params) == true) {
		combined = params;
	}
	return presetMerge(preset, combined, {
		uid: utilsUnigueID(),
		tiClassName: tiClassName
	});
}

function uiRegExpValidate(control, value) {
	var result = false;
	if(control.regexp != undefined) {
		var regexp = new RegExp(control.regexp, "g");
		if (regexp.test(value) == true) {
			result = true;
		}
	} else {
		result = true;
	}
	return result;
}

function uiCreateTabGroup(preset, params) {
	var self = Ti.UI.createTabGroup(uiCreateParams(preset, params, "TabGroup"));
	self.addEventListener("focus", function(event) {
		TiTools.UI.currentTab = self.activeTab;
	});
	return self;
}

function uiTabGroupWindowOpen(window) {
	TiTools.UI.currentTab.open(window);
	TiTools.UI.currentWindow.push(window);
}

function getCurrentWindow(){
	return TiTools.UI.currentWindow[TiTools.UI.currentWindow.length - 1];
}

function setCurrentView(view){
	TiTools.UI.currentViews.push(view);
}

function getCurrentView(){
	return TiTools.UI.currentViews[TiTools.UI.currentViews.length - 1];
}

function uiCreateTab(preset, params, window) {
	var args = undefined;
	if (window != undefined) {
		args = [params, {
			window: window
		}];
	} else {
		args = params;
	}
	return Ti.UI.createTab(uiCreateParams(preset, args, "Tab"));
}

function uiCreateNavigationGroup(preset, params, window) {
	var self = undefined;
	if (coreIsIPhone == true) {
		var args = [params, {
			window: window
		}];
		self = Ti.UI.iPhone.createNavigationGroup(uiCreateParams(preset, args, "NavigationGroup"));
	} else {
		errorUnsupportedPlatform("uiCreateNavigationGroup", "only iOS");
	}
	return self;
}

function uiCreateWindow(preset, params) {
	var self = Ti.UI.createWindow(uiCreateParams(preset, params, "Window"));
	self.initialized = false;
	self.initialize = function(args) {
		if (self.initialized == false) {
			if (coreIsString(params.main) == true) {
				var controller = coreLoadJS(params.main);
				if (coreIsFunction(controller) == true) {
					controller(self, args);
				} else if (coreIsObject(controller) == true) {
					if (coreIsFunction(controller.onInitController) == true) {
						controller.onInitController(self, args);
					}
					if (coreIsFunction(controller.onWindowOpen) == true) {
						self.addEventListener("open", function(event) {
							controller.onWindowOpen(self, event);
						});
					}
					if (coreIsFunction(controller.onWindowClose) == true) {
						self.addEventListener("close", function(event) {
							controller.onWindowClose(self, event);
							TiTools.UI.currentWindow.pop();
						});
					}
				}
			} else if (coreIsObject(params.main) == true) {
				if (coreIsFunction(params.main.onInitController) == true) {
					params.main.onInitController(self, args);
				}
				if (coreIsFunction(params.main.onWindowOpen) == true) {
					self.addEventListener("open", function(event) {
						params.main.onWindowOpen(self, event);
					});
				}
				if (coreIsFunction(params.main.onWindowClose) == true) {
					self.addEventListener("close", function(event) {
						params.main.onWindowClose(self, event);
						TiTools.UI.currentWindow.pop();
					});
				}
			} else if (coreIsFunction(params.main) == true) {
				params.main(self, args);
			}
			self.initialized = true;
		}
	};
	return self;
}

function uiCreateView(preset, params) {
	return Ti.UI.createView(uiCreateParams(preset, params, "View"));
}

function uiCreateScrollView(preset, params) {
	return Ti.UI.createScrollView(uiCreateParams(preset, params, "ScrollView"));
}

function uiCreateScrollableView(preset, params) {
	return Ti.UI.createScrollableView(uiCreateParams(preset, params, "ScrollableView"));
}

function uiCreateImageView(preset, params) {
	return Ti.UI.createImageView(uiCreateParams(preset, params, "ImageView"));
}

function uiCreateMaskedImage() {
	return Ti.UI.createMaskedImage(uiCreateParams(preset, params, "MaskedImage"));
}

function uiCreateButton(preset, params) {
	return Ti.UI.createButton(uiCreateParams(preset, params, "Button"));
}

function uiCreateButtonBar(preset, params) {
	return Ti.UI.createButtonBar(uiCreateParams(preset, params, "ButtonBar"));
}

function uiCreateToolbar(preset, params, views) {
	var self = undefined;
	if (coreIsIOS == true) {
		var args = utilsCombine(params, { items: views });
		self = Ti.UI.iOS.createToolbar(uiCreateParams(preset, args, "Toolbar"));
	} else {
		errorUnsupportedPlatform("uiCreateToolbar", "only iOS");
	}
	return self;
}

function uiCreateLabel(preset, params) {
	return Ti.UI.createLabel(uiCreateParams(preset, params, "Label"));
}

function uiCreateSwitch(preset, params) {
	return Ti.UI.createSwitch(uiCreateParams(preset, params, "Switch"));
}

function uiCreateSlider(preset, params) {
	return Ti.UI.createSlider(uiCreateParams(preset, params, "Slider"));
}

function uiCreateSearchBar(preset, params) {
	return Ti.UI.createSearchBar(uiCreateParams(preset, params, "SearchBar"));
}

function uiCreateProgressBar(preset, params) {
	return Ti.UI.createProgressBar(uiCreateParams(preset, params, "ProgressBar"));
}

function uiCreateTextField(preset, params) {
	var self = Ti.UI.createTextField(uiCreateParams(preset, params, "TextField"));
	if(self != undefined) {
		self.validate = function() {
			self.valid = uiRegExpValidate(self, self.value);
			return self.valid;
		};
		
		self.addEventListener("focus", function(event) {
			TiTools.UI.currentFocus = event.source;
		});
		self.addEventListener("change", function(event) {
			self.validate();
		});
		self.addEventListener("blur", function(event) {
			TiTools.UI.currentFocus = undefined;
		});
	}
	return self;
}

function uiCreateTextArea(preset, params) {
	var self = Ti.UI.createTextArea(uiCreateParams(preset, params, "TextArea"));
	if(self != undefined) {
		self.validate = function() {
			self.valid = uiRegExpValidate(self, self.value);
			return self.valid;
		};
		self.addEventListener("focus", function(event) {
			TiTools.UI.currentFocus = event.source;
		});
		self.addEventListener("change", function(event) {
			self.validate();
		});
		self.addEventListener("blur", function(event) {
			TiTools.UI.currentFocus = undefined;
		});
	}
	return self;
}

function uiCreateTableView(preset, params) {
	return Ti.UI.createTableView(uiCreateParams(preset, params, "TableView"));
}

function uiCreateTableViewSection(preset, params) {
	return Ti.UI.createTableViewSection(uiCreateParams(preset, params, "TableViewSection"));
}

function uiCreateTableViewRow(preset, params) {
	return Ti.UI.createTableViewRow(uiCreateParams(preset, params, "TableViewRow"));
}

function uiCreateListView(preset, params) {
	return Ti.UI.createListView(uiCreateParams(preset, params, "ListView"));
}

function uiCreateListSection(preset, params) {
	return Ti.UI.createListSection(uiCreateParams(preset, params, "ListSection"));
}

function uiCreatePicker(preset, params) {
	return Ti.UI.createPicker(uiCreateParams(preset, params, "Picker"));
}

function uiCreatePickerColumn(preset, params) {
	return Ti.UI.createPickerColumn(uiCreateParams(preset, params, "PickerColumn"));
}

function uiCreatePickerRow(preset, params) {
	return Ti.UI.createPickerRow(uiCreateParams(preset, params, "PickerRow"));
}

function uiCreateWebView(preset, params) {
	return Ti.UI.createWebView(uiCreateParams(preset, params, "WebView"));
}

function uiCreateMapView(preset, params) {
	return Ti.Map.createView(uiCreateParams(preset, params, "MapView"));
}

function uiCreateMapViewAnnotation(preset, params) {
	return Ti.Map.createAnnotation(uiCreateParams(preset, params, "MapAnnotation"));
}

function uiCreateFacebookLoginButton(preset, params) {
	return Ti.Facebook.createLoginButton(uiCreateParams(preset, params, "FacebookLoginButton"));
}

function uiCreateAlertDialog(preset, params) {
	return Ti.UI.createAlertDialog(uiCreateParams(preset, params, "AlertDialog"));
}

function uiCreateEmailDialog(preset, params) {
	return Ti.UI.createEmailDialog(uiCreateParams(preset, params, "EmailDialog"));
}

function uiCreateOptionDialog(preset, params) {
	return Ti.UI.createOptionDialog(uiCreateParams(preset, params, "OptionDialog"));
}

function uiCreatePhoneCallDialog(params) {
	var message = params.message;
	var buttonYes = params.buttonYes;
	var buttonNo = params.buttonNo;
	if (message == undefined) {
		message = coreTr("TITOOLS_ALERT_REQUEST_CALL", "Call to phone?") + "\n" + params.phone;
	}
	if (buttonYes == undefined) {
		buttonYes = coreTr("TITOOLS_ALERT_YES", "Yes");
	}
	if (buttonNo == undefined) {
		buttonNo = coreTr("TITOOLS_ALERT_NO", "No");
	}
	var alert = uiCreateAlertDialog(undefined, {
		message: message,
		buttonNames: [buttonYes, buttonNo],
		cancel: 1
	});
	alert.addEventListener("click", function(event) {
		if (event.index == 0) {
			var number = params.phone.replace(/([^0-9])+/g, "");
			if (number.length > 0) {
				Ti.Platform.openURL("tel:" + number);
			}
		}
	});
	return alert;
}

function uiCreateActivityIndicator(preset, params) {
	return Ti.UI.createActivityIndicator(uiCreateParams(preset, params, "ActivityIndicator"));
}

function uiThirdPartyCreatePaintView(preset, params) {
	var module = coreLoadJS("ti.paint");
	if (module != undefined) {
		return TiPaint.createPaintView(createStdParams(preset, params, "PaintView"));
	}
}

//---------------------------------------------//
// TODO:NAMESPACE:LOADER
//---------------------------------------------//

function loaderWithParams(params, callbackJs, callbackXml, callbackX) {
	function loadPlatformSingle(data) {
		if (coreIsObject(data) == true) {
			loadScreen(data);
		} else {
			loaderWithParams(data, callbackJs, callbackXml, callbackX);
		}
	}

	function loadPlatform(data) {
		var platform = utilsAppropriatePlatform(data);
		if (platform != undefined) {
			loadPlatformSingle(platform);
		}
		var any = utilsAppropriateAny(data);
		if (any != undefined) {
			loadPlatformSingle(any);
		}
	}

	function loadScreen(data) {
		var screen = utilsAppropriateScreen(data);
		if (screen != undefined) {
			loaderWithParams(screen, callbackJs, callbackXml, callbackX);
		}
		var any = utilsAppropriateAny(data);
		if (any != undefined) {
			loaderWithParams(any, callbackJs, callbackXml, callbackX);
		}
	}

	if (coreIsArray(params) == true) {
		for (var i = 0; i < params.length; i++) {
			loaderWithParams(params[i], callbackJs, callbackXml, callbackX);
		}
	} else if (coreIsObject(params) == true) {
		var platform = params.platform;
		var screen = params.screen;
		if ((coreIsObject(platform) == true) || (coreIsObject(screen) == true)) {
			if (coreIsObject(platform) == true) {
				loadPlatform(platform);
			}
			if (coreIsObject(screen) == true) {
				loadScreen(screen);
			}
		} else {
			loadPlatform(params);
		}
	} else if (coreIsString(params) == true) {
		loaderWithFileName(params, callbackJs, callbackXml, callbackX);
	}
}

function loaderWithFileName(filename, callbackJs, callbackXml, callbackX) {
	if (stringIsSuffix(filename, ".js") == true) {
		var module = coreLoadJS(filename);
		if (callbackJs != undefined) {
			callbackJs(module);
		}
	} else if (stringIsSuffix(filename, ".json") == true) {
		var file = fileSystemGetFile(filename);
		if (file.exists() == true) {
			var blob = file.read();
			var content = jsonDeserialize(blob.text);
			if (callbackJs != undefined) {
				callbackJs(content);
			}
		} else {
			errorNotFound("loaderWithFileName", filename);
		}
	} else if (stringIsSuffix(filename, ".xml") == true) {
		var file = fileSystemGetFile(filename);
		if (file.exists() == true) {
			var blob = file.read();
			var content = xmlDeserialize(blob.text);
			if (callbackXml != undefined) {
				callbackXml(content);
			}
		} else {
			errorNotFound("loaderWithFileName", filename);
		}
	} else {
		if (callbackX != undefined) {
			callbackX(filename)
		} else {
			errorUnknownExtension("loaderWithFileName", filename);
		}
	}
}

function loaderWithString(format, data, callbackJs, callbackXml, callbackX) {
	switch(format) {
		case "js":
			if (callbackJs != undefined) {
				callbackJs(data);
			}
			break;
		case "json":
			var content = jsonDeserialize(data);
			if (callbackXml != undefined) {
				callbackXml(content);
			}
			break;
		case "xml":
			var content = xmlDeserialize(data);
			if (callbackXml != undefined) {
				callbackXml(content);
			}
			break;
		default:
			if (callbackX != undefined) {
				callbackX(data);
			} else {
				errorUnknownExtension("loaderWithFileName", data);
			}
			break;
	}
}

function loaderWithData(format, data, callbackJs, callbackXml, callbackX) {
	switch(format) {
		case "js":
			if (callbackJs != undefined) {
				callbackJs(data);
			}
			break;
		case "json":
			if (callbackXml != undefined) {
				callbackXml(data);
			}
			break;
		case "xml":
			if (callbackXml != undefined) {
				callbackXml(data);
			}
			break;
		default:
			if (callbackX != undefined) {
				callbackX(data);
			} else {
				errorUnknownExtension("loaderWithData", data);
			}
			break;
	}
}

//---------------------------------------------//
// TODO:NAMESPACE:PRESET
//---------------------------------------------//

var _preset = {};

//---------------------------------------------//

function presetSet(name, value) {
	_preset[name] = presetPreprocess(value);
}

function presetGet(name) {
	return _preset[name];
}

function presetRemove(name) {
	delete _preset[name];
}

function presetMerge(preset, paramsA, paramsB) {
	var result = utilsClone(paramsA);
	if (preset != undefined) {
		if (coreIsArray(preset) == true) {
			var storage = {};
			var count = preset.length;
			for (var i = 0; i < count; i++) {
				var name = preset[i];
				if (coreIsString(name) == true) {
					var item = presetGet(name);
					if (item != undefined) {
						storage = utilsCombine(item, storage);
					} else {
						errorPresetNotFound("presetMerge", name);
					}
				}
			}
			result = utilsCombine(storage, result);
		} else if (coreIsString(preset) == true) {
			var storage = presetGet(preset);
			if (storage != undefined) {
				result = utilsCombine(storage, result);
			} else {
				errorPresetNotFound("presetMerge", preset);
			}
		}
	}
	if (paramsB != undefined) {
		result = utilsCombine(paramsB, result);
	}
	return presetPreprocess(result);
}

function presetPreprocess(params) {
	var ids = {
		textid: "text",
		titleid: "title",
		promptid: "prompt",
		messageid: "message",
		titlepromptid: "titleprompt"
	};
	for (var i in params) {
		var value = params[i];
		if (coreIsArray(value) == true) {
			params[i] = presetPreprocess(value);
		} else if (coreIsObject(value) == true) {
			params[i] = presetPreprocess(value);
		} else if (coreIsString(value) == true) {
			if(ids[i] != undefined) {
				params[ids[i]] = t2.tr(value);
				delete params[i];
			} else {
				params[i] = presetPreprocessValue(value);
			}
		}
	}
	return params;
}

function presetPreprocessValue(string) {
	if (coreIsString(string) == true) {
		if((stringIsPrefix(string, "tr(") == true) && (stringIsSuffix(string, ")") == true)) {
			string = string.replace(/tr\(([A-Za-z0-9_\.]*)\)/g, function(str, p1, p2, offset, s) {
				return coreTr(p1, p1);
			});
		}
		return utilsStringToConst(string, pathPreprocess);
	}
	return string;
}

function presetApplyByName(object, name) {
	var params = {};
	if (coreIsArray(name) == true) {
		for (var i = 0; i < name.length; i++) {
			if (coreIsString(name[i]) == true) {
				params = utilsCombine(presetGet(name[i]), params);
			}
		}
	} else if (coreIsString(name) == true) {
		params = presetGet(name);
	}
	presetApply(object, presetPreprocess(params));
}

function presetApply(object, params) {
	for (var i in params) {
		if (coreIsArray(params[i]) == true) {
			presetApply(object[i], params[i]);
		} else if (coreIsObject(params[i]) == true) {
			presetApply(object[i], params[i]);
		} else {
			object[i] = params[i];
		}
	}
}

function presetLoad(params) {
	loaderWithParams(params, presetLoadJS, presetLoadXML, presetLoadX);
}

function presetParse(format, data) {
	loaderWithString(params, data, presetLoadJS, presetLoadXML, presetLoadX);
}

function presetLoadJS(content) {
	if (coreIsArray(content) == true) {
		for (var i = 0; i < content.length; i++) {
			presetLoadJS(content[i]);
		}
	} else if (coreIsObject(content) == true) {
		var name = content.name;
		var parent = content.parent;
		var style = content.style;
		if ((coreIsString(name) == false) || ((parent == undefined) && (coreIsObject(style) == false))) {
			errorPresetUnsupportedFormat("presetLoadJS", content);
		}
		if(parent != undefined) {
			style = presetMerge(parent, style);
		}
		presetSet(name, style);
	} else {
		errorPresetUnsupportedFormat("presetLoadJS", content);
	}
}

function presetLoadXML(content) {
	switch(content.name) {
		case "Presets":
			var items = xmlFindNode(content, "Preset");
			for (var i = 0; i < items.length; i++) {
				var item = presetLoadItemXML(items[i]);
				if (item != undefined) {
					presetLoadJS({
						name: item.name,
						parent: item.parent,
						style: item.style
					});
				}
			}
			break;
		case "Preset":
			var item = presetLoadItemXML(content);
			if (item != undefined) {
				presetLoadJS({
					name: item.name,
					parent: item.parent,
					style: item.style
				});
			}
			break;
	}
}

function presetLoadItemXML(content) {
	if (coreIsString(content.attributes.name) == true) {
		var styles = xmlFindNode(content, "Style");
		if (styles.length > 0) {
			return {
				name: content.attributes.name,
				parent: content.attributes.parent,
				style: xmlMergeNodeAttributes(styles)
			};
		} else {
			errorPresetUnsupportedFormat("presetLoadItemXML", preset);
		}
	} else {
		errorPresetUnsupportedFormat("presetLoadItemXML", preset);
	}
	return undefined;
}

function presetLoadX(filename) {
	pluginInvokeMethod("presetLoad", [filename]);
}

//---------------------------------------------//
// TODO:NAMESPACE:PREFAB
//---------------------------------------------//

var _prefab = {};

//---------------------------------------------//

function prefabSet(name, value) {
	_prefab[name] = value;
}

function prefabGet(name) {
	return _prefab[name];
}

function prefabRemove(name) {
	delete _prefab[name];
}

function prefabLoad(params) {
	loaderWithParams(params, prefabLoadJS, prefabLoadXML, prefabLoadX);
}

function prefabParse(format, data) {
	loaderWithString(params, data, prefabLoadJS, prefabLoadXML, prefabLoadX);
}

function prefabLoadJS(content) {
	if (coreIsArray(content) == true) {
		for (var i = 0; i < content.length; i++) {
			prefabLoadJS(content[i]);
		}
	} else if (coreIsObject(content) == true) {
		if ((coreIsString(content.name) == false) || (coreIsObject(content.prefab) == false)) {
			errorPrefabUnsupportedFormat("prefabLoadJS", content);
		}
		prefabSet(content.name, content.prefab);
	}
}

function prefabLoadXML(content) {
	switch(content.name) {
		case "Prefabs":
			var items = xmlFindNode(content, "Prefab");
			for (var i = 0; i < items.length; i++) {
				var item = prefabLoadItemXML(items[i]);
				if (item != undefined) {
					prefabLoadJS(item.name, item.prefab);
				}
			}
			break;
		case "Prefab":
			var item = prefabLoadItemXML(content);
			if (item != undefined) {
				prefabLoadJS(item.name, item.prefab);
			}
			break;
	}
}

function prefabLoadItemXML(content) {
	if (coreIsString(content.attributes.name) == true) {
		var items = content.childs;
		if (items.length > 0) {
			var data = [];
			for (var i = 0; i < items.length; i++) {
				var item = formCacheLoadItemXML(items[i]);
				data.push(item);
			}
			return {
				name: content.attributes.name,
				prefab: data
			};
		} else {
			errorPresetUnsupportedFormat("prefabLoadItemXML", preset);
		}
	} else {
		errorPresetUnsupportedFormat("prefabLoadItemXML", preset);
	}
	return undefined;
}

function prefabLoadX(filename) {
	pluginInvokeMethod("prefabLoad", [filename]);
}

//---------------------------------------------//
// TODO:NAMESPACE:FORM:PRELOAD
//---------------------------------------------//

var _formPreload = {};

//---------------------------------------------//

function formCacheSet(name, value, needPreprocessing) {
	if (needPreprocessing == true) {
		value = formCacheLoadJS(value);
		if (value != undefined) {
			_formPreload[name] = value;
		}
	} else {
		_formPreload[name] = value;
	}
}

function formCacheGet(name) {
	return _formPreload[name];
}

function formCacheRemove(name) {
	delete _formPreload[name];
}

function formCacheLoad(data, params) {
	var result = undefined;
	if (coreIsString(data) == true) {
		result = formCacheGet(data);
		if (result == undefined) {
			var cached = true;
			loaderWithFileName(data, function(content) {
				result = formCacheLoadJS(content, params, cached);
			}, function(content) {
				result = formCacheLoadXML(content);
			}, function(content) {
				result = formCacheLoadX(content);
			});
			if ((cached == true) && (result != undefined)) {
				formCacheSet(data, result);
			}
		}
	} else if (coreIsFunction(data) == true) {
		result = formCacheLoadJS(data(params), params);
	} else if (coreIsArray(data) == true) {
		result = formCacheLoadJS(data, params);
	} else if (coreIsObject(data) == true) {
		result = formCacheLoadJS(data, params);
	}
	return result;
}

function formCacheParse(key, data, format, params) {
	function formCacheParseCallback(callback) {
		if (coreIsFunction(data) == true) {
			result = callback(data(params));
		} else if (coreIsObject(data) == true) {
			result = callback(data);
		}
	}
	
	var result = undefined;
	if (coreIsString(data) == true) {
		if (key != undefined) {
			result = formCacheGet(key);
		}
		if (result == undefined) {
			var cached = true;
			loaderWithString(format, data, function(content) {
				result = formCacheLoadJS(content, params, cached);
			}, function(content) {
				result = formCacheLoadXML(content);
			}, function(content) {
				result = formCacheLoadX(content, format);
			});
			if ((cached == true) && (result != undefined)) {
				formCacheSet(key, result);
			}
		}
	} else {
		loaderWithData(format, data, function() {
			formCacheParseCallback(formCacheLoadJS);
		}, function() {
			formCacheParseCallback(formCacheLoadXML);
		}, function() {
			formCacheParseCallback(function(data) {
				return formCacheLoadX(data, format);
			});
		});
	}
	return result;
}

function formCacheLoadJS(content, params, cached) {
	if (coreIsArray(content) == true) {
		var result = [];
		for (var i = 0; i < content.length; i++) {
			var item = formCacheLoadItemJS(content[i]);
			result.push(item);
		}
		return result;
	} else if (coreIsFunction(content) == true) {
		if (cached != undefined) {
			cached = false;
		}
		return formCacheLoadJS(content(params), params, cached);
	} else if (coreIsObject(content) == true) {
		return formCacheLoadItemJS(content);
	}
	return undefined;
}

function formCacheLoadItemJS(content) {
	function prefabWithName(name) {
		var result = content;
		if (coreIsString(name) == true) {
			var prefab = prefabGet(name);
			if (prefab != undefined) {
				content = utilsCombine(content, prefab);
			} else {
				errorPrefabNotFound("formCacheLoadItemJS", name);
			}
		}
		return content;
	}
	function cacheItem(name) {
		var source = content[name];
		if (source != undefined) {
			content[name] = formCacheLoadItemJS(source);
		}
	}
	function cacheItems(name) {
		var source = content[name];
		if (source != undefined) {
			var dest = [];
			var count = source.length;
			for (var i = 0; i < count; i++) {
				dest.push(formCacheLoadItemJS(source[i]));
			}
			content[name] = dest;
		}
	}
	
	if (coreIsObject(content) == true) {
		var prefab = content.prefab;
		if (prefab != undefined) {
			if (coreIsObject(prefab) == true) {
				content = prefabWithName(prefab.name);
				content.params = prefab.params;
			} else if (coreIsString(prefab) == true) {
				content = prefabWithName(prefab);
			} else {
				errorPrefabUnsupportedFormat("formCacheLoadItemJS", prefab);
			}
			delete content.prefab;
		}
		var style = content.style;
		if (style != undefined) {
			content.style = presetPreprocess(style);
		}
		var preset = content.preset;
		if (preset != undefined) {
			if(formIsBindString(preset) == false) {
				content.style = presetMerge(preset, content.style);
				delete content.preset;
			}
		}
		cacheItem("root");
		cacheItem("header");
		cacheItem("footer");
		cacheItem("search");
		cacheItems("tabs");
		cacheItems("sections");
		cacheItems("columns");
		cacheItems("rows");
		cacheItems("datasets");
		cacheItems("subviews");
		
		pluginInvokeMethod("formCacheItem", [content]);
	}
	return content;
}

function formCacheLoadXML(content) {
	var result = {};
	switch(content.name) {
		case "Form":
			var presets = xmlFindNode(content, "Presets");
			if (presets.length == 1) {
				var items = xmlFindNode(content, "Preset");
				if (items.length > 0) {
					result.presets = [];
					for (var i = 0; i < items.length; i++) {
						var item = presetLoadItemXML(items[i]);
						if (item != undefined) {
							result.presets.push(item);
						}
					}
				}
			}
			var prefabs = xmlFindNode(content, "Prefabs");
			if (prefabs.length == 1) {
				var items = xmlFindNode(content, "Prefab");
				if (items.length > 0) {
					result.prefabs = [];
					for (var i = 0; i < items.length; i++) {
						var item = prefabLoadItemXML(items[i]);
						if (item != undefined) {
							result.prefabs.push(item);
						}
					}
				}
			}
			var views = xmlFindNode(content, "Views");
			if (views.length == 1) {
				var childs = views.childs;
				var count = childs.length;
				if (count == 1) {
					result.views = formCacheLoadItemXML(childs[0]);
				} else {
					for (var i = 0; i < count; i++) {
						var item = formCacheLoadItemXML(childs[i]);
						if (item != undefined) {
							result.views.push(item);
						}
					}
				}
			}
			break;
		default:
			var temp = formCacheLoadItemXML(content);
			if (temp == undefined) {
				var temp = pluginInvokeMethod("formLoadXML", [content]);
			}
			if (temp != undefined) {
				result = temp;
			}
			break;
	}
	return result;
}

function formCacheLoadItemXML(content) {
	function getItems(node, group) {
		var result = [];
		var item = xmlGetNode(node, group);
		if (item != undefined) {
			var childs = item.childs;
			var count = childs.length;
			for (var i = 0; i < count; i++) {
				result.push(formCacheLoadItemXML(childs[i]));
			}
		}
		return result;
	}

	function getItem(node, name) {
		var item = xmlGetNode(node, name);
		if (item != undefined) {
			return formCacheLoadItemXML(item)
		}
		return undefined;
	}

	var result = {};
	var attributes = content.attributes;
	if (coreIsString(attributes.class) == true) {
		result.class = attributes.class;
		delete attributes.class;
	} else {
		result.class = content.name;
	}
	if (coreIsString(attributes.name) == true) {
		result.name = attributes.name;
		delete attributes.name;
	}
	if (coreIsString(attributes.preset) == true) {
		result.preset = attributes.preset;
		delete attributes.preset;
	}
	var styles = xmlFindNode(content, "Style");
	if (styles.length > 0) {
		result.style = utilsCombine(attributes, xmlMergeNodeAttributes(styles));
	} else {
		result.style = attributes;
	}
	if (result.preset != undefined) {
		result.style = presetMerge(result.preset, result.style);
		delete result.preset;
	}
	if (result.style != undefined) {
		result.style = presetPreprocess(result.style);
	}
	var binds = xmlFindNode(content, "Bind");
	if (binds.length > 0) {
		result.bind = xmlMergeNodeAttributes(binds);
	} else {
		result.bind = {};
	}
	switch(result.class) {
		case "TabGroup":
			result.tabs = getItems(content, "Tabs");
			break;
		case "Tab":
			result.window = getItem(content, "Window");
			result.subviews = getItems(content, "SubViews");
			break;
		case "NavigationGroup":
			result.window = getItem(content, "Window");
			result.windows = getItems(content, "Windows");
			break;
		case "TableView":
			result.header = getItem(content, "Header");
			result.footer = getItem(content, "Footer");
			result.search = getItem(content, "Search");
			result.sections = getItems(content, "Sections");
			result.rows = getItems(content, "Rows");
			break;
		case "TableViewSection":
			result.header = getItem(content, "Header");
			result.footer = getItem(content, "Footer");
			result.rows = getItems(content, "Rows");
			break;
		case "ListView":
			result.sections = getItems(content, "Sections");
			break;
		case "ListSection":
			result.datasets = getItems(content, "DataSets");
			break;
		case "Picker":
			result.columns = getItems(content, "Columns");
			result.rows = getItems(content, "Rows");
			break;
		case "PickerColumn":
			result.rows = getItems(content, "Rows");
			break;
		default:
			result.subviews = getItems(content, "SubViews");
			break;
	}
	result.items = getItems(content, "Items");
	return result;
}

function formCacheLoadX(filename, format) {
	return pluginInvokeMethod("formCacheLoad", [filename, format]);
}

//---------------------------------------------//
// TODO:NAMESPACE:FORM
//---------------------------------------------//

function formLoadAppendCallback(parent) {
	var result = undefined;
	if (parent != undefined) {
		switch(parent.tiClassName) {
			case "TabGroup":
				result = formAppendTabGroup;
				break;
			case "Tab":
				result = formAppendTab;
				break;
			case "NavigationGroup":
				result = formAppendNavigationGroup;
				break;
			case "Window":
				result = formAppendWindow;
				break;
			case "ScrollableView":
				result = formAppendScrollableView;
				break;
			case "TableView":
				result = formAppendTableView;
				break;
			case "TableViewSection":
				result = formAppendTableViewSection;
				break;
			case "Picker":
				result = formAppendPicker;
				break;
			case "PickerColumn":
				result = formAppendPickerColumn;
				break;
			case "HttpClient":
				break;
			default:
				var temp = pluginInvokeMethod("formLoadAppendCallback", parent);
				if (coreIsFunction(temp) == true) {
					result = temp;
				} else {
					result = formAppendOther;
				}
				break;
		}
	}
	return result;
}

function formLoad(parent, data, params, controller) {
	var result = {};
	// var interval = dateInterval();
	if(controller != undefined) {
		result = controller;
	}
	var content = formCacheLoad(data, params);
	if (content != undefined) {
		var links = [];
		formLoadJS(content, params, result, links, parent, formLoadAppendCallback(parent));
		formLoadExplicitLink(result, links, parent);
	} else {
		errorNotFound("formLoad", data);
	}
	// utilsInfo("FormLoad: " + dateInterval(interval) + " ms");
	return result;
}

function formParse(parent, key, data, format, params, controller) {
	var result = {};
	// var interval = dateInterval();
	if(controller != undefined) {
		result = controller;
	}
	var content = formCacheParse(key, data, format, params);
	if (content != undefined) {
		var links = [];
		formLoadJS(content, params, result, links, parent, formLoadAppendCallback(parent));
		formLoadExplicitLink(result, links, parent);
	} else {
		errorNotFound("formParse", data);
	}
	// utilsInfo("FormParse: " + dateInterval(interval) + " ms");
	return result;
}

function formLoadJS(content, params, controller, links, parent, callback) {
	if (coreIsArray(content) == true) {
		for (var i = 0; i < content.length; i++) {
			formLoadJS(content[i], params, controller, links, parent, callback);
		}
	} else if (coreIsObject(content) == true) {
		if (content.views != undefined) {
			if (content.presets != undefined) {
				presetLoadJS(content.presets);
			}
			if (content.prefabs != undefined) {
				prefabLoadJS(content.prefabs);
			}
			formLoadItemJS(content.views, params, controller, links, parent, callback);
		} else {
			formLoadItemJS(content, params, controller, links, parent, callback);
		}
	}
}

function formLoadLink(store, name, control) {
	if (store[name] == undefined) {
		store[name] = control;
	} else if (coreIsArray(store[name]) == true) {
		store[name].push(control);
	} else {
		store[name] = [store[name], control];
	}
}

function formLoadImplicitLink(controller, links, content, control, parent) {
	var name = content.name;
	if (coreIsString(name) == true) {
		var target = content.target;
		if (coreIsString(target) == true) {
			var explicit = true;
			switch(target) {
				case "parent":
					if(parent != undefined) {
						formLoadLink(parent, name, control);
						explicit = false;
					}
					break;
			}
			if(explicit == true) {
				links.push({
					name: name,
					target: target,
					control: control,
					parent: parent
				});
			}
		} else {
			formLoadLink(controller, name, control);
		}
	}
}

function formLoadExplicitLink(controller, links, owner) {
	if(links.length > 0) {
		while(true) {
			var link = links.pop();
			if(link == undefined) {
				break;
			}
			formLoadExplicitControlLink(controller, links, owner, link);
		}
	}
}

function formLoadExplicitControlLink(controller, links, owner, link) {
	var result = undefined;
	var name = link.name;
	var target = link.target;
	var control = link.control;
	var parent = link.parent;
	switch(target) {
		case "parent":
			var superview = control.superview;
			if(superview != undefined) {
				formLoadLink(superview, name, control);
				result = superview;
			}
			break;
		case "owner":
			explicit = false;
			if(owner != undefined) {
				formLoadLink(owner, name, control);
				result = owner;
			}
			break;
		default:
			var store = controller[target];
			if(store == undefined) {
				var length = links.length;
				for(var i = 0; i < length; i++) {
					var parent = links[i];
					if(parent.name == target) {
						links.splice(i, 1);
						store = formLoadExplicitControlLink(controller, links, parent);
						break;
					}
				}
			}
			if(store != undefined) {
				formLoadLink(store, name, control);
				result = store;
			}
			break;
	}
	return result;
}

function formLoadItemJS(content, params, controller, links, parent, callback) {
	var control = undefined;
	var finalStyle = content.style;
	var finalParams = params;
	if (content.enabled != undefined) {
		var enabled = formBindString(content.enabled, params);
		if(enabled == false) {
			return control;
		}
	}
	if (content.params != undefined) {
		finalParams = utilsCombine(params, content.params);
	}
	var preset = content.preset;
	if (preset != undefined) {
		preset = formBindString(preset, finalParams);
		finalStyle = presetMerge(preset, finalStyle);
	}
	finalStyle = formBindStyle(finalStyle, finalParams);
	switch(content.class) {
		case "TabGroup":
			control = formControlTabGroup(content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "Tab":
			control = formControlTab(content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "NavigationGroup":
			control = formControlNavigationGroup(content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "Window":
			control = formControlWindow(content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "View":
			control = formControlView(content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "ScrollView":
			control = formControlScrollView(content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "ScrollableView":
			control = formControlScrollableView(content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "TableView":
			control = formControlTableView(content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "TableViewSection":
			control = formControlTableViewSection(content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "TableViewRow":
			control = formControlTableViewRow(content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "ListView":
			control = formControlListView(content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "ListSection":
			control = formControlListSection(content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "Picker":
			control = formControlPicker(content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "PickerColumn":
			control = formControlPickerColumn(content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "PickerRow":
			control = formControlOther(uiCreatePickerRow, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "Label":
			control = formControlOther(uiCreateLabel, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "TextField":
			control = formControlOther(uiCreateTextField, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "TextArea":
			control = formControlOther(uiCreateTextArea, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "ImageView":
			control = formControlOther(uiCreateImageView, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "MaskedImage":
			control = formControlOther(uiCreateMaskedImage, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "Button":
			control = formControlOther(uiCreateButton, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "ButtonBar":
			control = formControlOther(uiCreateButtonBar, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "Toolbar":
			control = formControlToolbar(content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "Switch":
			control = formControlOther(uiCreateSwitch, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "Slider":
			control = formControlOther(uiCreateSlider, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "SearchBar":
			control = formControlOther(uiCreateSearchBar, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "ProgressBar":
			control = formControlOther(uiCreateProgressBar, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "WebView":
			control = formControlOther(uiCreateWebView, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "MapView":
			control = formControlOther(uiCreateMapView, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "ActivityIndicator":
			control = formControlOther(uiCreateActivityIndicator, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "FacebookLoginButton":
			control = formControlOther(uiCreateFacebookLoginButton, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "PaintView":
			control = formControlOther(uiThirdPartyCreatePaintView, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "AlertDialog":
			control = formControlOther(uiCreateAlertDialog, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "EmailDialog":
			control = formControlOther(uiCreateEmailDialog, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "OptionDialog":
			control = formControlOther(uiCreateOptionDialog, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "PhoneCallDialog":
			control = formControlOther(uiCreatePhoneCallDialog, content, finalStyle, finalParams, controller, links, parent, callback);
			break;
		case "HttpClient":
			control = formControlHttpClient(content, finalStyle, finalParams, controller, links, parent);
			break;
		default:
			var temp = pluginInvokeMethod("formLoadItem", [content, finalStyle, finalParams, controller, links, parent, callback]);
			if (temp != undefined) {
				control = temp;
			} else {
				errorUnknownClassName("formLoadItemJS", content.class);
			}
			break;
	}
	if(control != undefined) {
		var bind = content.bind;
		if (coreIsObject(bind) == true) {
			formBindFunction(bind, finalParams, control);
		}
		var items = content.items;
		if (coreIsArray(items) == true) {
			var count = items.length;
			for (var i = 0; i < count; i++) {
				formLoadItemJS(items[i], finalParams, controller, links, control);
			}
		}
		formLoadImplicitLink(controller, links, content, control, parent);
		control.fireEvent("titools::create");
	}
	return control;
}

//---------------------------------------------//

function formIsBindString(string) {
	if ((stringIsPrefix(string, "<% ") == true) && (stringIsSuffix(string, " %>") == true)) {
		return true;
	}
	return false;
}

function formBindValue(name, params, unsafe) {
	var value = params[name];
	if (value != undefined) {
		if (coreIsFunction(value) == true) {
			value = value(params);
		} else if (coreIsString(value) == true) {
			value = formBindValue(value, params, true);
		}
	} else {
		if(unsafe != true) {
			return undefined;
		}
		value = name;
	}
	return presetPreprocessValue(value);
}

function formBindString(string, params) {
	var tagRegExp = /^<%\s+([A-Za-z0-9_,"'\.\(\)\|\s%]*)\s+%>$/g;
	var tags = tagRegExp.exec(string);
	if (tags != null) {
		var tag = tags[1];
		var stmts = tag.split(/\s*\|\s*/g);
		if(stmts.length > 1) {
			stmts = stmts;
		}
		for (var i = 0; i < stmts.length; i++) {
			var stmt = stmts[i];
			var funcRegExp = /([A-Za-z0-9_]*)\(([A-Za-z0-9_,"'\.\s%]*)\)/g;
			var func = funcRegExp.exec(stmt);
			if (coreIsArray(func) == false) {
				var value = formBindValue(stmt, params, false);
				if (value != undefined) {
					return value;
				}
			} else {
				var name = func[1];
				var args = func[2];
				if ((name != undefined) && (args != undefined)) {
					var value = formBindValue(args, params, true);
					switch(name) {
						case "int":
							if (stringIsInt(value) == true) {
								return stringToInt(value);
							}
							break;
						case "float":
							if (stringIsFloat(value) == true) {
								return stringToFloat(value);
							}
							break;
						case "string":
							if(value != undefined) {
								return String(value);
							}
							break;
						case "const":
							if(value != undefined) {
								return utilsStringToConst(value);
							}
							break;
						case "exists":
							if(value != undefined) {
								return true;
							}
							return false;
						case "notExists":
							if(value == undefined) {
								return true;
							}
							return false;
						default:
							errorUnknownMethod("formBindString", name, tag);
							break;
					}
				}
			}
		}
		errorThisNotValue("formBindString", string);
		string = undefined;
	} else {
		string = presetPreprocessValue(string);
	}
	return string;
}

function formBindStyle(styles, params) {
	var result = undefined;
	if (coreIsObject(params) == true) {
		if (coreIsArray(styles) == true) {
			result = [];
		} else if (coreIsObject(styles) == true) {
			result = {};
		}
		if (result != undefined) {
			for (var i in styles) {
				var style = styles[i];
				if ((coreIsArray(style) == true) || (coreIsObject(style) == true)) {
					result[i] = formBindStyle(style, params);
				} else if (coreIsString(style) == true) {
					result[i] = formBindString(style, params);
				} else {
					result[i] = style;
				}
			}
		}
	} else {
		result = styles;
	}
	return result;
}

function formFindFunction(bind, params) {
	while (bind != undefined) {
		if ((coreIsArray(bind) == true) || (coreIsFunction(bind) == true)) {
			break;
		}
		var newBind = params[bind];
		if(newBind == undefined) {
			var funcRegExp = /([A-Za-z0-9_]*)\(([A-Za-z0-9_,"'\.\s%]*)\)/g;
			var tokens = funcRegExp.exec(bind);
			if (coreIsArray(tokens) == true) {
				var name = tokens[1];
				var args = tokens[2];
				switch(name) {
					case "debounce":
						var arg = args.split(/\s*\,\s*/g);
						var arg1 = formFindFunction(arg[0], params);
						var arg2 = formBindValue(arg[1], params, true);
						if (stringIsInt(arg2) == true) {
							arg2 = stringToInt(arg2);
						} else if (stringIsFloat(arg2) == true) {
							arg2 = stringToFloat(arg2);
						}
						if((coreIsFunction(arg1) == true) && (coreIsNumber(arg2) == true)) {
							return coreDebounce(arg1, arg2);
						} else {
							errorUnknownMethod("formFindFunction", name, bind);
							return undefined;
						}
						break;
					default:
						errorUnknownMethod("formFindFunction", name, bind);
						return undefined;
				}
			} else {
				return undefined;
			}
		} else {
			bind = newBind;
		}
	}
	return bind;
}

function formBindFunction(binds, params, control) {
	function bindFunction(data, name) {
		if(coreIsObject(data) == true) {
			for (var i in data) {
				var bind = formFindFunction(data[i], params);
				if (coreIsFunction(bind) == true) {
					control.addEventListener(i, bind);
				} else {
					bindFunction(bind, i);
				}
			}
		} else if(coreIsArray(data) == true) {
			if(coreIsString(name) != true) {
				// ERROR
				return;
			}
			for (var i in data) {
				var bind = formFindFunction(data[i], params);
				if (coreIsFunction(bind) == true) {
					control.addEventListener(name, bind);
				} else {
					bindFunction(bind, name);
				}
			}
		} else {
			// ERROR
		}
	}
	if (binds != undefined) {
		bindFunction(binds);
	}
}

//---------------------------------------------//
// TODO:NAMESPACE:FORM:CONTROL
//---------------------------------------------//

function formControlTabGroup(content, style, params, controller, links, parent, callback) {
	var control = uiCreateTabGroup(undefined, style);
	if (control != undefined) {
		var tabs = content.tabs;
		if (coreIsArray(tabs) == true) {
			var count = tabs.length;
			for (var i = 0; i < count; i++) {
				formLoadItemJS(tabs[i], params, controller, links, control, formAppendTabGroup);
			}
		}
		var subviews = content.subviews;
		if (coreIsArray(subviews) == true) {
			var count = subviews.length;
			for (var i = 0; i < count; i++) {
				formLoadItemJS(subviews[i], params, controller, links, control, formAppendOther);
			}
		}
		if (coreIsFunction(callback) == true) {
			callback(parent, control);
		}
	}
	return control;
}

function formAppendTabGroup(parent, child) {
	switch(child.tiClassName) {
		case "Tab":
			child.superview = parent;
			parent.addTab(child);
			break;
		default:
			child.superview = parent;
			parent.add(child);
			break;
	}
}

function formControlTab(content, style, params, controller, links, parent, callback) {
	var window = content.window;
	if (coreIsObject(window) == true) {
		window = formLoadItemJS(root, params, controller, links);
	}
	var control = uiCreateTab(undefined, style, window);
	if (control != undefined) {
		var subviews = content.subviews;
		if (coreIsArray(subviews) == true) {
			var count = subviews.length;
			for (var i = 0; i < count; i++) {
				formLoadItemJS(subviews[i], params, controller, links, control, formAppendTab);
			}
		}
		if (coreIsFunction(callback) == true) {
			callback(parent, control);
		}
	}
	return control;
}

function formAppendTab(parent, child) {
	switch(child.tiClassName) {
		case "Window":
			child.superview = parent;
			child.window = parent;
			break;
		default:
			child.superview = parent;
			parent.add(child);
			break;
	}
}

function formControlNavigationGroup(content, style, params, controller, links, parent, callback) {
	var window = content.window;
	if (coreIsObject(window) == true) {
		window = formLoadItemJS(root, params, controller, links);
	}
	var control = uiCreateNavigationGroup(undefined, style, window);
	if (control != undefined) {
		if(window != undefined) {
			window.superview = control;
		}
		var windows = content.windows;
		if (coreIsArray(windows) == true) {
			var count = windows.length;
			for (var i = 0; i < count; i++) {
				formLoadItemJS(windows[i], params, controller, links, control, formAppendNavigationGroup);
			}
		}
		if (coreIsFunction(callback) == true) {
			callback(parent, control);
		}
	}
	return control;
}

function formAppendNavigationGroup(parent, child) {
	switch(child.tiClassName) {
		case "Window":
			child.superview = parent;
			parent.open(child);
			break;
	}
}

function formControlWindow(content, style, params, controller, links, parent, callback) {
	var control = uiCreateWindow(undefined, style);
	if (control != undefined) {
		var subviews = content.subviews;
		if (coreIsArray(subviews) == true) {
			var count = subviews.length;
			for (var i = 0; i < count; i++) {
				formLoadItemJS(subviews[i], params, controller, links, control, formAppendWindow);
			}
		}
		if (coreIsFunction(callback) == true) {
			callback(parent, control);
		}
	}
	return control;
}

function formAppendWindow(parent, child) {
	child.superview = parent;
	parent.add(child);
}

function formControlView(content, style, params, controller, links, parent, callback) {
	var control = uiCreateView(undefined, style);
	if (control != undefined) {
		var subviews = content.subviews;
		if (coreIsArray(subviews) == true) {
			var count = subviews.length;
			for (var i = 0; i < count; i++) {
				formLoadItemJS(subviews[i], params, controller, links, control, formAppendOther);
			}
		}
		if (coreIsFunction(callback) == true) {
			callback(parent, control);
		}
	}
	return control;
}

function formControlScrollView(content, style, params, controller, links, parent, callback) {
	var control = uiCreateScrollView(undefined, style);
	if (control != undefined) {
		var subviews = content.subviews;
		if (coreIsArray(subviews) == true) {
			var count = subviews.length;
			for (var i = 0; i < count; i++) {
				formLoadItemJS(subviews[i], params, controller, links, control, formAppendOther);
			}
		}
		if (coreIsFunction(callback) == true) {
			callback(parent, control);
		}
	}
	return control;
}

function formControlScrollableView(content, style, params, controller, links, parent, callback) {
	var control = uiCreateScrollableView(undefined, style);
	if (control != undefined) {
		var subviews = content.subviews;
		if (coreIsArray(subviews) == true) {
			var count = subviews.length;
			for (var i = 0; i < count; i++) {
				formLoadItemJS(subviews[i], params, controller, links, control, formAppendScrollableView);
			}
		}
		if (coreIsFunction(callback) == true) {
			callback(parent, control);
		}
	}
	return control;
}

function formAppendScrollableView(parent, child) {
	child.superview = parent;
	parent.addView(child);
}

function formControlTableView(content, style, params, controller, links, parent, callback) {
	var control = uiCreateTableView(undefined, style);
	if (control != undefined) {
		var header = content.header;
		if (coreIsObject(header) == true) {
			formLoadItemJS(header, params, controller, links, control, formAppendTableViewHeader);
		}
		var footer = content.footer;
		if (coreIsObject(footer) == true) {
			formLoadItemJS(footer, params, controller, links, control, formAppendTableViewFooter);
		}
		var search = content.search;
		if (coreIsObject(search) == true) {
			formLoadItemJS(search, params, controller, links, control, formAppendTableView);
		}
		var sections = content.sections;
		var rows = content.rows;
		if (coreIsArray(sections) == true) {
			var data = control.data;
			var count = sections.length;
			for (var i = 0; i < count; i++) {
				data.push(formLoadItemJS(sections[i], params, controller, links, control));
			}
			control.data = data;
		} else if (coreIsArray(rows) == true) {
			var data = [];
			var count = rows.length;
			for (var i = 0; i < count; i++) {
				data.push(formLoadItemJS(rows[i], params, controller, links, control));
			}
			control.appendRow(data);
		}
		if (coreIsFunction(callback) == true) {
			callback(parent, control);
		}
	}
	return control;
}

function formAppendTableView(parent, child) {
	switch(child.tiClassName) {
		case "SearchBar":
			child.superview = parent;
			parent.search = child;
			break;
		case "TableViewSection":
			child.superview = parent;
			var sections = parent.data;
			sections.push(child);
			parent.data = sections;
			break;
		case "TableViewRow":
			child.superview = parent;
			parent.appendRow(child);
			break;
		default:
			errorUnsupportedClassName("formAppendTableView", child.tiClassName);
			break;
	}
}

function formAppendTableViewHeader(parent, child) {
	switch(child.tiClassName) {
		default:
			child.superview = parent;
			parent.headerView = child;
			break;
	}
}

function formAppendTableViewFooter(parent, child) {
	child.superview = parent;
	parent.footerView = child;
}

function formControlTableViewSection(content, style, params, controller, links, parent, callback) {
	var control = uiCreateTableViewSection(undefined, style);
	if (control != undefined) {
		var header = content.header;
		if (coreIsObject(header) == true) {
			formLoadItemJS(header, params, controller, links, control, formAppendTableViewSectionHeader);
		}
		var footer = content.footer;
		if (coreIsObject(footer) == true) {
			formLoadItemJS(footer, params, controller, links, control, formAppendTableViewSectionFooter);
		}
		var rows = content.rows;
		if (coreIsArray(rows) == true) {
			var count = rows.length;
			for (var i = 0; i < count; i++) {
				formLoadItemJS(rows[i], params, controller, links, control, formAppendTableViewSection);
			}
		}
		if (coreIsFunction(callback) == true) {
			callback(parent, control);
		}
	}
	return control;
}

function formAppendTableViewSection(parent, child) {
	switch(child.tiClassName) {
		case "TableViewRow":
			child.superview = parent;
			parent.add(child);
			break;
		default:
			errorUnsupportedClassName("formAppendTableViewSection", child.tiClassName);
			break;
	}
}

function formAppendTableViewSectionHeader(parent, child) {
	switch(child.tiClassName) {
		default:
			child.superview = parent;
			parent.headerView = child;
			break;
	}
}

function formAppendTableViewSectionFooter(parent, child) {
	child.superview = parent;
	parent.footerView = child;
}

function formControlTableViewRow(content, style, params, controller, links, parent, callback) {
	var control = uiCreateTableViewRow(undefined, style);
	if (control != undefined) {
		var subviews = content.subviews;
		if (coreIsArray(subviews) == true) {
			var count = subviews.length;
			for (var i = 0; i < count; i++) {
				formLoadItemJS(subviews[i], params, controller, links, control, formAppendOther);
			}
		}
		if (coreIsFunction(callback) == true) {
			callback(parent, control);
		}
	}
	return control;
}

function formControlListView(content, style, params, controller, links, parent, callback) {
	var control = uiCreateListView(undefined, style);
	if (control != undefined) {
		var sections = content.sections;
		if (coreIsArray(sections) == true) {
			var data = [];
			var count = sections.length;
			for (var i = 0; i < count; i++) {
				data.push(formLoadItemJS(sections[i], params, controller, links, control));
			}
			control.setSections(data);
		}
		if (coreIsFunction(callback) == true) {
			callback(parent, control);
		}
	}
	return control;
}

function formAppendListView(parent, child) {
	switch(child.tiClassName) {
		case "ListSection":
			child.superview = parent;
			parent.appendSection(child);
			break;
		default:
			errorUnsupportedClassName("formAppendListView", child.tiClassName);
			break;
	}
}

function formControlListSection(content, style, params, controller, links, parent, callback) {
	var control = uiCreateListSection(undefined, style);
	if (control != undefined) {
		var datasets = content.datasets;
		if (coreIsArray(datasets) == true) {
			datasets = formBindStyle(datasets, params);
			datasets = presetMerge(undefined, datasets);
			control.setItems(datasets);
		}
		if (coreIsFunction(callback) == true) {
			callback(parent, control);
		}
	}
	return control;
}

function formAppendListSection(parent, child) {
	parent.appendItems([ child ]);
}

function formControlPicker(content, style, params, controller, links, parent, callback) {
	var control = uiCreatePicker(undefined, style);
	if (control != undefined) {
		var columns = content.columns;
		var rows = content.rows;
		if (coreIsArray(columns) == true) {
			var count = columns.length;
			for (var i = 0; i < count; i++) {
				formLoadItemJS(columns[i], params, controller, links, control, formAppendPicker);
			}
		} else if (coreIsArray(rows) == true) {
			var count = rows.length;
			for (var i = 0; i < count; i++) {
				formLoadItemJS(rows[i], params, controller, links, control, formAppendPicker);
			}
		}
		if (coreIsFunction(callback) == true) {
			callback(parent, control);
		}
	}
	return control;
}

function formAppendPicker(parent, child) {
	switch(child.tiClassName) {
		case "PickerColumn":
			child.superview = parent;
			parent.add(child);
			break;
		case "PickerRow":
			child.superview = parent;
			parent.add(child);
			break;
		default:
			errorUnsupportedClassName("formAppendPicker", child.tiClassName);
			break;
	}
}

function formControlPickerColumn(content, style, params, controller, links, parent, callback) {
	var control = uiCreatePickerColumn(undefined, style);
	if (control != undefined) {
		var rows = content.rows;
		if (coreIsArray(rows) == true) {
			var count = rows.length;
			for (var i = 0; i < count; i++) {
				formLoadItemJS(rows[i], params, controller, links, control, formAppendPickerColumn);
			}
		}
		if (coreIsFunction(callback) == true) {
			callback(parent, control);
		}
	}
	return control;
}

function formAppendPickerColumn(parent, child) {
	switch(child.tiClassName) {
		case "PickerRow":
			child.superview = parent;
			parent.addRow(child);
			break;
		default:
			errorUnsupportedClassName("formAppendPickerColumn", child.tiClassName);
			break;
	}
}

function formControlToolbar(content, style, params, controller, links, parent, callback) {
	var views = [];
	var subviews = content.subviews;
	if (coreIsArray(subviews) == true) {
		var count = subviews.length;
		for (var i = 0; i < count; i++) {
			views.push(formLoadItemJS(subviews[i], params, controller, links));
		}
	}
	var control = uiCreateToolbar(undefined, style, views);
	if (control != undefined) {
		if (coreIsFunction(callback) == true) {
			callback(parent, control);
		}
	}
	return control;
}

function formControlOther(createFunction, content, style, params, controller, links, parent, callback) {
	var control = createFunction(undefined, style);
	if (control != undefined) {
		if (coreIsFunction(callback) == true) {
			callback(parent, control);
		}
	}
	return control;
}

function formAppendOther(parent, child) {
	child.superview = parent;
	parent.add(child);
}

function formControlHttpClient(content, params, controller, links, parent) {
	function formControlHttpClientBind(names) {
		for(var i in names) {
			var name = names[i];
			if (coreIsFunction(binds[name]) == true) {
				args[name] = params[name];
			} else {
				errorThisNotFunction("formControlHttpClientBind", name);
			}
		}
	}

	var args = {
		queue: content.queue,
		options: content.options
	};
	
	var binds = content.bind;
	if (coreIsObject(binds) == true) {
		formControlHttpClientBind([
			"success", "failure",
			"loading", "loaded",
			"sendProgress", "readProgress"
		]);
	}
	return networkCreateHttpClient(args);
}

//---------------------------------------------//
// TODO:NAMESPACE:PROJECT
//---------------------------------------------//

var _project = {
	controllers: {}
};

//---------------------------------------------//

function projectInitialize(params) {
	if (params != undefined) {
		if (params.presets != undefined) {
			projectLoadPreset(params.presets);
		}
		if (params.prefabs != undefined) {
			projectLoadPrefab(params.prefabs);
		}
		if (params.controllers != undefined) {
			projectLoadController(params.controllers);
		}
		if (params.forms != undefined) {
			projectLoadForm(params.forms);
		}
		if (params.geo != undefined) {
			geoConfigure(params.geo);
		}
	}
}

function projectLoadPreset(presets) {
	presetLoad(presets);
}

function projectLoadPrefab(prefabs) {
	prefabLoad(prefabs);
}

function projectLoadController(controllers) {
	function initControllers(list) {
		if (coreIsArray(list) == true) {
			var count = list.length;
			for (var i = 0; i < count; i++) {
				var item = list[i];
				_project.controllers[item.name] = item.controller;
			}
		} else if (coreIsObject(list) == true) {
			_project.controllers = list;
		}
	}

	if (coreIsObject(controllers) == true) {
		var temp = utilsAppropriatePlatform(controllers, controllers);
		if (temp != undefined) {
			initControllers(temp);
		} else {
			errorUnknownPlatform("projectLoadController", controllers);
		}
	} else if (coreIsArray(controllers) == true) {
		initControllers(controllers);
	}
}

function projectLoadForm(forms) {
	function initForms(list) {
		var count = list.length;
		for (var i = 0; i < count; i++) {
			formCacheLoad(list[i]);
		}
	}

	if (coreIsObject(forms) == true) {
		var temp = utilsAppropriatePlatform(forms, forms);
		if (coreIsArray(temp) == true) {
			initForms(temp);
		} else {
			errorUnknownPlatform("projectLoadForm", forms);
		}
	} else if (coreIsArray(forms) == true) {
		initForms(forms);
	}
}

function projectCreateTabGroup(params) {
	var preset = undefined;
	var style = {};
	var tabs = [];
	if (coreIsObject(params) == true) {
		if (params.preset != undefined) {
			preset = params.preset;
		}
		if (coreIsObject(params.style) == true) {
			style = params.style;
		}
		if (coreIsArray(params.tabs) != undefined) {
			tabs = params.tabs;
		}
	}
	var tabgroup = uiCreateTabGroup(preset, style);
	var count = tabs.length;
	for (var i = 0; i < count; i++) {
		var tab = tabs[i];
		var window = undefined;
		if (coreIsObject(tab.window) == true) {
			window = projectCreateWindow(tab.window.controller, tab.window.params);
		}
		tabgroup.addTab(uiCreateTab(tab.preset, tab.style, window));
	}
	return tabgroup;
}

function projectCreateNavigationGroup(params) {
	var preset = undefined;
	var style = {};
	var window = undefined;
	var navigationGroup = undefined;
	if (coreIsObject(params) == true) {
		if (params.preset != undefined) {
			preset = params.preset;
		}
		if (coreIsObject(params.style) == true) {
			style = params.style;
		}
		if (coreIsObject(params.window) == true) {
			window = projectCreateWindow(params.window.controller, params.window.params)
		}
	}
	navigationGroup = uiCreateNavigationGroup(preset, style, window);
	return navigationGroup;
}

function projectCreateWindowStyle(controller, params) {
	var result = {};
	var style = undefined;
	if (params != undefined) {
		if (params.style != undefined) {
			style = params.style;
		}
	}
	if (coreIsString(controller) == true) {
		var cnt = _project.controllers[controller];
		if (coreIsString(cnt) == true) {
			result = presetMerge(undefined, style, {
				main: cnt
			});
		} else {
			projectCreateWindowStyle(cnt, params);
		}
	} else if (coreIsObject(controller) == true) {
		result = presetMerge(undefined, style, {
			main: controller
		});
	} else if (coreIsFunction(controller) == true) {
		result = presetMerge(undefined, style, {
			main: controller
		});
	}
	return result;
}

function projectCreateWindow(controller, params) {
	var window = undefined;
	var style = projectCreateWindowStyle(controller, params);
	if (coreIsEmpty(style) == false) {
		var preset = undefined;
		var args = undefined;
		if (params != undefined) {
			if (params.preset != undefined) {
				preset = params.preset;
			}
			if (params.args != undefined) {
				args = params.args;
			}
		}
		window = uiCreateWindow(preset, style);
		window.initialize(args);
	}
	return window;
}

//---------------------------------------------//
// TODO:NAMESPACE:UTILS
//---------------------------------------------//

var utilsUnigueID = thirdPartyUnderscore.uniqueId;
var utilsClone = thirdPartyUnderscore.clone;

function utilsCombine(objectA, objectB) {
	objectA = utilsClone(objectA);
	if(objectB != undefined) {
		if(objectA == undefined) {
			if(coreIsArray(objectB) == true) {
				objectA = [];
			} else if(coreIsObject(objectB) == true) {
				objectA = {};
			}
		}
		for(var i in objectB) {
			var valueA = objectA[i];
			var valueB = objectB[i];
			if(coreIsArray(valueB) == true) {
				objectA[i] = utilsCombine(valueA, valueB);
			} else if(coreIsObject(valueB) == true) {
				if(coreIsTiObject(valueB) == true) {
					objectA[i] = valueB;
				} else {
					objectA[i] = utilsCombine(valueA, valueB);
				}
			} else if(valueB !== undefined) {
				objectA[i] = valueB;
			}
		}
	}
	return objectA;
}

function utilsSleep(ms) {
	var start = new Date().getTime();
	while (true) {
		var delta = new Date().getTime() - start;
		if (delta >= ms) {
			break;
		}
	}
}

function utilsInfo(message, list) {
	function infoFormat(name, value, pad, inc) {
		function infoLine(name, value, end) {
			var empty = stringRepeat(" ", pad);
			if (name != undefined) {
				return empty + name + " = " + value + end;
			}
			return empty + value + end;
		}

		var text = "";
		if (coreIsArray(value) == true) {
			text += infoLine(name, "[", "\n");
			for (var i = 0; i < value.length; i++) {
				text += infoFormat(undefined, value[i], pad + inc, inc);
			}
			text += infoLine(undefined, "]", "\n");
		} else if (coreIsFunction(value) == true) {
			text += infoLine(name, "\"Function\"", "\n");
		} else if (coreIsObject(value) == true) {
			text += infoLine(name, "{", "\n");
			for (var i in value) {
				text += infoFormat(i, value[i], pad + inc, inc);
			}
			text += infoLine(undefined, "}", "\n");
		} else {
			text += infoLine(name, "\"" + value + "\"", "\n");
		}
		return text;
	}


	Ti.API.info("[TiTools]: " + stringRepeat("-", 50));
	if (coreIsArray(message) == true) {
		Ti.API.info("[TiTools]: " + jsonSerialize(message));
	} else if (coreIsObject(message) == true) {
		Ti.API.info("[TiTools]: " + jsonSerialize(message));
	} else {
		Ti.API.info("[TiTools]: " + message);
	}
	if (list != undefined) {
		Ti.API.info("[TiTools]: " + stringRepeat("-", 50));
		var text = infoFormat(undefined, list, 0, 2);
		var lines = stringLines(text);
		var count = lines.length - 1;
		for (var i = 0; i < count; i++) {
			var line = lines[i];
			if (line.length > 0) {
				Ti.API.info("[TiTools]: " + line);
			}
		}
	}
	Ti.API.info("[TiTools]: " + stringRepeat("-", 50));
}

function utilsAppropriateAny(params, defaults) {
	if (params.any != undefined) {
		return params.any;
	}
	return defaults;
}

function utilsAppropriatePlatform(params, defaults) {
	if (coreIsIOS == true) {
		if (params.ios != undefined) {
			return params.ios;
		} else {
			if (coreIsIPhone == true) {
				if (params.iphone != undefined) {
					return params.iphone;
				}
			} else if (coreIsIPad == true) {
				if (params.ipad != undefined) {
					return params.ipad;
				}
			}
		}
	} else if (coreIsAndroid == true) {
		if (params.android != undefined) {
			return params.android;
		}
	}
	return defaults;
}

function utilsAppropriateScreen(params, defaults) {
	if (params != undefined) {
		switch(screenMode) {
			case SCREEN_SMALL:
				if (params.small != undefined) {
					return params.small;
				}
				break;
			case SCREEN_NORMAL:
				if (params.normal != undefined) {
					return params.normal;
				}
				break;
			case SCREEN_LARGE:
				if (params.large != undefined) {
					return params.large;
				}
				break;
			case SCREEN_EXTRA_LARGE:
				if (params.extraLarge != undefined) {
					return params.extraLarge;
				}
				break;
			default:
				if (params.unknown != undefined) {
					return params.unknown;
				}
				break;
		}
	}
	return defaults;
}

function utilsStringToConst(string, callbackDefault) {
	if (stringIsPrefix(string, "Ti.UI.") == true) {
		switch(string) {
			case "Ti.UI.FILL":
				return Ti.UI.FILL;
			case "Ti.UI.SIZE":
				return Ti.UI.SIZE;
			case "Ti.UI.PORTRAIT":
				return Ti.UI.PORTRAIT;
			case "Ti.UI.UPSIDE_PORTRAIT":
				return Ti.UI.UPSIDE_PORTRAIT;
			case "Ti.UI.LANDSCAPE_LEFT":
				return Ti.UI.LANDSCAPE_LEFT;
			case "Ti.UI.LANDSCAPE_RIGHT":
				return Ti.UI.LANDSCAPE_RIGHT;
			case "Ti.UI.INPUT_BORDERSTYLE_NONE":
				return Ti.UI.INPUT_BORDERSTYLE_NONE;
			case "Ti.UI.INPUT_BORDERSTYLE_BEZEL":
				return Ti.UI.INPUT_BORDERSTYLE_BEZEL;
			case "Ti.UI.INPUT_BORDERSTYLE_LINE":
				return Ti.UI.INPUT_BORDERSTYLE_LINE;
			case "Ti.UI.INPUT_BORDERSTYLE_ROUNDED":
				return Ti.UI.INPUT_BORDERSTYLE_ROUNDED;
			case "Ti.UI.INPUT_BUTTONMODE_ALWAYS":
				return Ti.UI.INPUT_BUTTONMODE_ALWAYS;
			case "Ti.UI.INPUT_BUTTONMODE_NEVER":
				return Ti.UI.INPUT_BUTTONMODE_NEVER;
			case "Ti.UI.INPUT_BUTTONMODE_ONBLUR":
				return Ti.UI.INPUT_BUTTONMODE_ONBLUR;
			case "Ti.UI.INPUT_BUTTONMODE_ONFOCUS":
				return Ti.UI.INPUT_BUTTONMODE_ONFOCUS;
			case "Ti.UI.PICKER_TYPE_PLAIN":
				return Ti.UI.PICKER_TYPE_PLAIN;
			case "Ti.UI.PICKER_TYPE_DATE":
				return Ti.UI.PICKER_TYPE_DATE;
			case "Ti.UI.PICKER_TYPE_TIME":
				return Ti.UI.PICKER_TYPE_TIME;
			case "Ti.UI.PICKER_TYPE_DATE_AND_TIME":
				return Ti.UI.PICKER_TYPE_DATE_AND_TIME;
			case "Ti.UI.PICKER_TYPE_COUNT_DOWN_TIMER":
				return Ti.UI.PICKER_TYPE_COUNT_DOWN_TIMER;
			case "Ti.UI.TEXT_ALIGNMENT_LEFT":
				return Ti.UI.TEXT_ALIGNMENT_LEFT;
			case "Ti.UI.TEXT_ALIGNMENT_CENTER":
				return Ti.UI.TEXT_ALIGNMENT_CENTER;
			case "Ti.UI.TEXT_ALIGNMENT_RIGHT":
				return Ti.UI.TEXT_ALIGNMENT_RIGHT;
			case "Ti.UI.TEXT_AUTOCAPITALIZATION_NONE":
				return Ti.UI.TEXT_AUTOCAPITALIZATION_NONE;
			case "Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES":
				return Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES;
			case "Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS":
				return Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS;
			case "Ti.UI.TEXT_AUTOCAPITALIZATION_ALL":
				return Ti.UI.TEXT_AUTOCAPITALIZATION_ALL;
			case "Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP":
				return Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP;
			case "Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER":
				return Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER;
			case "Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM":
				return Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM;
			case "Ti.UI.KEYBOARD_DEFAULT":
				return Ti.UI.KEYBOARD_DEFAULT;
			case "Ti.UI.KEYBOARD_ASCII":
				return Ti.UI.KEYBOARD_ASCII;
			case "Ti.UI.KEYBOARD_EMAIL":
				return Ti.UI.KEYBOARD_EMAIL;
			case "Ti.UI.KEYBOARD_URL":
				return Ti.UI.KEYBOARD_URL;
			case "Ti.UI.KEYBOARD_APPEARANCE_ALERT":
				return Ti.UI.KEYBOARD_APPEARANCE_ALERT;
			case "Ti.UI.KEYBOARD_APPEARANCE_DEFAULT":
				return Ti.UI.KEYBOARD_APPEARANCE_DEFAULT;
			case "Ti.UI.KEYBOARD_NAMEPHONE_PAD":
				return Ti.UI.KEYBOARD_NAMEPHONE_PAD;
			case "Ti.UI.KEYBOARD_NUMBER_PAD":
				return Ti.UI.KEYBOARD_NUMBER_PAD;
			case "Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION":
				return Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION;
			case "Ti.UI.KEYBOARD_DECIMAL_PAD":
				return Ti.UI.KEYBOARD_DECIMAL_PAD;
			case "Ti.UI.KEYBOARD_PHONE_PAD":
				return Ti.UI.KEYBOARD_PHONE_PAD;
			case "Ti.UI.ActivityIndicatorStyle.PLAIN":
				return Ti.UI.ActivityIndicatorStyle.PLAIN;
			case "Ti.UI.ActivityIndicatorStyle.DARK":
				return Ti.UI.ActivityIndicatorStyle.DARK;
			case "Ti.UI.ActivityIndicatorStyle.BIG":
				return Ti.UI.ActivityIndicatorStyle.BIG;
			case "Ti.UI.ActivityIndicatorStyle.BIG_DARK":
				return Ti.UI.ActivityIndicatorStyle.BIG_DARK;
		}
		if (stringIsPrefix(string, "Ti.UI.iOS.") == true) {
			switch(string) {
				case "Ti.UI.iOS.AD_SIZE_LANDSCAPE":
					return Ti.UI.iOS.AD_SIZE_LANDSCAPE;
				case "Ti.UI.iOS.AD_SIZE_PORTRAIT":
					return Ti.UI.iOS.AD_SIZE_PORTRAIT;
				case "Ti.UI.iOS.AUTODETECT_ADDRESS":
					return Ti.UI.iOS.AUTODETECT_ADDRESS;
				case "Ti.UI.iOS.AUTODETECT_ALL":
					return Ti.UI.iOS.AUTODETECT_ALL;
				case "Ti.UI.iOS.AUTODETECT_CALENDAR":
					return Ti.UI.iOS.AUTODETECT_CALENDAR;
				case "Ti.UI.iOS.AUTODETECT_LINK":
					return Ti.UI.iOS.AUTODETECT_LINK;
				case "Ti.UI.iOS.AUTODETECT_NONE":
					return Ti.UI.iOS.AUTODETECT_NONE;
				case "Ti.UI.iOS.AUTODETECT_PHONE":
					return Ti.UI.iOS.AUTODETECT_PHONE;
				case "Ti.UI.iOS.BLEND_MODE_CLEAR":
					return Ti.UI.iOS.BLEND_MODE_CLEAR;
				case "Ti.UI.iOS.BLEND_MODE_COLOR":
					return Ti.UI.iOS.BLEND_MODE_COLOR;
				case "Ti.UI.iOS.BLEND_MODE_COLOR_BURN":
					return Ti.UI.iOS.BLEND_MODE_COLOR_BURN;
				case "Ti.UI.iOS.BLEND_MODE_COLOR_DODGE":
					return Ti.UI.iOS.BLEND_MODE_COLOR_DODGE;
				case "Ti.UI.iOS.BLEND_MODE_COPY":
					return Ti.UI.iOS.BLEND_MODE_COPY;
				case "Ti.UI.iOS.BLEND_MODE_DARKEN":
					return Ti.UI.iOS.BLEND_MODE_DARKEN;
				case "Ti.UI.iOS.BLEND_MODE_DESTINATION_ATOP":
					return Ti.UI.iOS.BLEND_MODE_DESTINATION_ATOP;
				case "Ti.UI.iOS.BLEND_MODE_DESTINATION_IN":
					return Ti.UI.iOS.BLEND_MODE_DESTINATION_IN;
				case "Ti.UI.iOS.BLEND_MODE_DESTINATION_OUT":
					return Ti.UI.iOS.BLEND_MODE_DESTINATION_OUT;
				case "Ti.UI.iOS.BLEND_MODE_DESTINATION_OVER":
					return Ti.UI.iOS.BLEND_MODE_DESTINATION_OVER;
				case "Ti.UI.iOS.BLEND_MODE_DIFFERENCE":
					return Ti.UI.iOS.BLEND_MODE_DIFFERENCE;
				case "Ti.UI.iOS.BLEND_MODE_EXCLUSION":
					return Ti.UI.iOS.BLEND_MODE_EXCLUSION;
				case "Ti.UI.iOS.BLEND_MODE_HARD_LIGHT":
					return Ti.UI.iOS.BLEND_MODE_HARD_LIGHT;
				case "Ti.UI.iOS.BLEND_MODE_HUE":
					return Ti.UI.iOS.BLEND_MODE_HUE;
				case "Ti.UI.iOS.BLEND_MODE_LIGHTEN":
					return Ti.UI.iOS.BLEND_MODE_LIGHTEN;
				case "Ti.UI.iOS.BLEND_MODE_LUMINOSITY":
					return Ti.UI.iOS.BLEND_MODE_LUMINOSITY;
				case "Ti.UI.iOS.BLEND_MODE_MULTIPLY":
					return Ti.UI.iOS.BLEND_MODE_MULTIPLY;
				case "Ti.UI.iOS.BLEND_MODE_NORMAL":
					return Ti.UI.iOS.BLEND_MODE_NORMAL;
				case "Ti.UI.iOS.BLEND_MODE_OVERLAY":
					return Ti.UI.iOS.BLEND_MODE_OVERLAY;
				case "Ti.UI.iOS.BLEND_MODE_PLUS_DARKER":
					return Ti.UI.iOS.BLEND_MODE_PLUS_DARKER;
				case "Ti.UI.iOS.BLEND_MODE_PLUS_LIGHTER":
					return Ti.UI.iOS.BLEND_MODE_PLUS_LIGHTER;
				case "Ti.UI.iOS.BLEND_MODE_SATURATION":
					return Ti.UI.iOS.BLEND_MODE_SATURATION;
				case "Ti.UI.iOS.BLEND_MODE_SCREEN":
					return Ti.UI.iOS.BLEND_MODE_SCREEN;
				case "Ti.UI.iOS.BLEND_MODE_SOFT_LIGHT":
					return Ti.UI.iOS.BLEND_MODE_SOFT_LIGHT;
				case "Ti.UI.iOS.BLEND_MODE_SOURCE_ATOP":
					return Ti.UI.iOS.BLEND_MODE_SOURCE_ATOP;
				case "Ti.UI.iOS.BLEND_MODE_SOURCE_IN":
					return Ti.UI.iOS.BLEND_MODE_SOURCE_IN;
				case "Ti.UI.iOS.BLEND_MODE_SOURCE_OUT":
					return Ti.UI.iOS.BLEND_MODE_SOURCE_OUT;
				case "Ti.UI.iOS.BLEND_MODE_XOR":
					return Ti.UI.iOS.BLEND_MODE_XOR;
				case "Ti.UI.iOS.COLOR_GROUP_TABLEVIEW_BACKGROUND":
					return Ti.UI.iOS.COLOR_GROUP_TABLEVIEW_BACKGROUND;
				case "Ti.UI.iOS.COLOR_SCROLLVIEW_BACKGROUND":
					return Ti.UI.iOS.COLOR_SCROLLVIEW_BACKGROUND;
				case "Ti.UI.iOS.COLOR_UNDER_PAGE_BACKGROUND":
					return Ti.UI.iOS.COLOR_UNDER_PAGE_BACKGROUND;
				case "Ti.UI.iOS.COLOR_VIEW_FLIPSIDE_BACKGROUND":
					return Ti.UI.iOS.COLOR_VIEW_FLIPSIDE_BACKGROUND;
			}
		} else if (stringIsPrefix(string, "Ti.UI.iPad.") == true) {
			switch(string) {
				case "Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UNKNOWN":
					return Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UNKNOWN;
				case "Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UP":
					return Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UP;
				case "Ti.UI.iPad.POPOVER_ARROW_DIRECTION_RIGHT":
					return Ti.UI.iPad.POPOVER_ARROW_DIRECTION_RIGHT;
				case "Ti.UI.iPad.POPOVER_ARROW_DIRECTION_DOWN":
					return Ti.UI.iPad.POPOVER_ARROW_DIRECTION_DOWN;
				case "Ti.UI.iPad.POPOVER_ARROW_DIRECTION_LEFT":
					return Ti.UI.iPad.POPOVER_ARROW_DIRECTION_LEFT;
				case "Ti.UI.iPad.POPOVER_ARROW_DIRECTION_ANY":
					return Ti.UI.iPad.POPOVER_ARROW_DIRECTION_ANY;
			}
		} else if (stringIsPrefix(string, "Ti.UI.iPhone.") == true) {
			switch(string) {
				case "Ti.UI.iPhone.MODAL_PRESENTATION_CURRENT_CONTEXT":
					return Ti.UI.iPhone.MODAL_PRESENTATION_CURRENT_CONTEXT;
				case "Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET":
					return Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET;
				case "Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN":
					return Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN;
				case "Ti.UI.iPhone.MODAL_PRESENTATION_PAGESHEET":
					return Ti.UI.iPhone.MODAL_PRESENTATION_PAGESHEET;
				case "Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL":
					return Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL;
				case "Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE":
					return Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE;
				case "Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL":
					return Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL;
				case "Ti.UI.iPhone.MODAL_TRANSITION_STYLE_PARTIAL_CURL":
					return Ti.UI.iPhone.MODAL_TRANSITION_STYLE_PARTIAL_CURL;
				case "Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN":
					return Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN;
				case "Ti.UI.iPhone.ActivityIndicatorStyle.DARK":
					return Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
				case "Ti.UI.iPhone.ActivityIndicatorStyle.BIG":
					return Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
				case "Ti.UI.iPhone.AnimationStyle.NONE":
					return Ti.UI.iPhone.AnimationStyle.NONE;
				case "Ti.UI.iPhone.AnimationStyle.CURL_UP":
					return Ti.UI.iPhone.AnimationStyle.CURL_UP;
				case "Ti.UI.iPhone.AnimationStyle.CURL_DOWN":
					return Ti.UI.iPhone.AnimationStyle.CURL_DOWN;
				case "Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT":
					return Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;
				case "Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT":
					return Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT;
				case "Ti.UI.iPhone.ProgressBarStyle.DEFAULT":
					return Ti.UI.iPhone.TableViewSeparatorStyle.DEFAULT;
				case "Ti.UI.iPhone.ProgressBarStyle.PLAIN":
					return Ti.UI.iPhone.TableViewSeparatorStyle.PLAIN;
				case "Ti.UI.iPhone.ProgressBarStyle.BAR":
					return Ti.UI.iPhone.TableViewSeparatorStyle.BAR;
				case "Ti.UI.iPhone.RowAnimationStyle.NONE":
					return Ti.UI.iPhone.RowAnimationStyle.NONE;
				case "Ti.UI.iPhone.RowAnimationStyle.FADE":
					return Ti.UI.iPhone.RowAnimationStyle.FADE;
				case "Ti.UI.iPhone.RowAnimationStyle.TOP":
					return Ti.UI.iPhone.RowAnimationStyle.TOP;
				case "Ti.UI.iPhone.RowAnimationStyle.RIGHT":
					return Ti.UI.iPhone.RowAnimationStyle.RIGHT;
				case "Ti.UI.iPhone.RowAnimationStyle.BOTTOM":
					return Ti.UI.iPhone.RowAnimationStyle.BOTTOM;
				case "Ti.UI.iPhone.RowAnimationStyle.LEFT":
					return Ti.UI.iPhone.RowAnimationStyle.LEFT;
				case "Ti.UI.iPhone.ScrollIndicatorStyle.DEFAULT":
					return Ti.UI.iPhone.ScrollIndicatorStyle.DEFAULT;
				case "Ti.UI.iPhone.ScrollIndicatorStyle.BLACK":
					return Ti.UI.iPhone.ScrollIndicatorStyle.BLACK;
				case "Ti.UI.iPhone.ScrollIndicatorStyle.WHITE":
					return Ti.UI.iPhone.ScrollIndicatorStyle.WHITE;
				case "Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_NONE":
					return Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_NONE;
				case "Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_FADE":
					return Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_FADE;
				case "Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_SLIDE":
					return Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_SLIDE;
				case "Ti.UI.iPhone.StatusBar.DEFAULT":
					return Ti.UI.iPhone.StatusBar.DEFAULT;
				case "Ti.UI.iPhone.StatusBar.GRAY":
					return Ti.UI.iPhone.StatusBar.GRAY;
				case "Ti.UI.iPhone.StatusBar.GREY":
					return Ti.UI.iPhone.StatusBar.GREY;
				case "Ti.UI.iPhone.StatusBar.OPAQUE_BLACK":
					return Ti.UI.iPhone.StatusBar.OPAQUE_BLACK;
				case "Ti.UI.iPhone.StatusBar.TRANSLUCENT_BLACK":
					return Ti.UI.iPhone.StatusBar.TRANSLUCENT_BLACK;
				case "Ti.UI.iPhone.SystemButton.ACTION":
					return Ti.UI.iPhone.SystemButton.ACTION;
				case "Ti.UI.iPhone.SystemButton.ACTIVITY":
					return Ti.UI.iPhone.SystemButton.ACTIVITY;
				case "Ti.UI.iPhone.SystemButton.ADD":
					return Ti.UI.iPhone.SystemButton.ADD;
				case "Ti.UI.iPhone.SystemButton.BOOKMARKS":
					return Ti.UI.iPhone.SystemButton.BOOKMARKS;
				case "Ti.UI.iPhone.SystemButton.CAMERA":
					return Ti.UI.iPhone.SystemButton.CAMERA;
				case "Ti.UI.iPhone.SystemButton.CANCEL":
					return Ti.UI.iPhone.SystemButton.CANCEL;
				case "Ti.UI.iPhone.SystemButton.COMPOSE":
					return Ti.UI.iPhone.SystemButton.COMPOSE;
				case "Ti.UI.iPhone.SystemButton.CONTACT_ADD":
					return Ti.UI.iPhone.SystemButton.CONTACT_ADD;
				case "Ti.UI.iPhone.SystemButton.DISCLOSURE":
					return Ti.UI.iPhone.SystemButton.DISCLOSURE;
				case "Ti.UI.iPhone.SystemButton.DONE":
					return Ti.UI.iPhone.SystemButton.DONE;
				case "Ti.UI.iPhone.SystemButton.EDIT":
					return Ti.UI.iPhone.SystemButton.EDIT;
				case "Ti.UI.iPhone.SystemButton.FAST_FORWARD":
					return Ti.UI.iPhone.SystemButton.FAST_FORWARD;
				case "Ti.UI.iPhone.SystemButton.FIXED_SPACE":
					return Ti.UI.iPhone.SystemButton.FIXED_SPACE;
				case "Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE":
					return Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE;
				case "Ti.UI.iPhone.SystemButton.INFO_DARK":
					return Ti.UI.iPhone.SystemButton.INFO_DARK;
				case "Ti.UI.iPhone.SystemButton.INFO_LIGHT":
					return Ti.UI.iPhone.SystemButton.INFO_LIGHT;
				case "Ti.UI.iPhone.SystemButton.ORGANIZE":
					return Ti.UI.iPhone.SystemButton.ORGANIZE;
				case "Ti.UI.iPhone.SystemButton.PAUSE":
					return Ti.UI.iPhone.SystemButton.PAUSE;
				case "Ti.UI.iPhone.SystemButton.PLAY":
					return Ti.UI.iPhone.SystemButton.PLAY;
				case "Ti.UI.iPhone.SystemButton.REFRESH":
					return Ti.UI.iPhone.SystemButton.REFRESH;
				case "Ti.UI.iPhone.SystemButton.REPLY":
					return Ti.UI.iPhone.SystemButton.REPLY;
				case "Ti.UI.iPhone.SystemButton.REWIND":
					return Ti.UI.iPhone.SystemButton.REWIND;
				case "Ti.UI.iPhone.SystemButton.SAVE":
					return Ti.UI.iPhone.SystemButton.SAVE;
				case "Ti.UI.iPhone.SystemButton.SPINNER":
					return Ti.UI.iPhone.SystemButton.SPINNER;
				case "Ti.UI.iPhone.SystemButton.STOP":
					return Ti.UI.iPhone.SystemButton.STOP;
				case "Ti.UI.iPhone.SystemButton.TRASH":
					return Ti.UI.iPhone.SystemButton.TRASH;
				case "Ti.UI.iPhone.SystemButtonStyle.PLAIN":
					return Ti.UI.iPhone.SystemButtonStyle.PLAIN;
				case "Ti.UI.iPhone.SystemButtonStyle.DONE":
					return Ti.UI.iPhone.SystemButtonStyle.DONE;
				case "Ti.UI.iPhone.SystemButtonStyle.BAR":
					return Ti.UI.iPhone.SystemButtonStyle.BAR;
				case "Ti.UI.iPhone.SystemButtonStyle.BORDERED":
					return Ti.UI.iPhone.SystemButtonStyle.BORDERED;
				case "Ti.UI.iPhone.TableViewScrollPosition.NONE":
					return Ti.UI.iPhone.TableViewScrollPosition.NONE;
				case "Ti.UI.iPhone.TableViewScrollPosition.TOP":
					return Ti.UI.iPhone.TableViewScrollPosition.TOP;
				case "Ti.UI.iPhone.TableViewScrollPosition.MIDDLE":
					return Ti.UI.iPhone.TableViewScrollPosition.MIDDLE;
				case "Ti.UI.iPhone.TableViewScrollPosition.BOTTOM":
					return Ti.UI.iPhone.TableViewScrollPosition.BOTTOM;
				case "Ti.UI.iPhone.TableViewStyle.GROUPED":
					return Ti.UI.iPhone.TableViewStyle.GROUPED;
				case "Ti.UI.iPhone.TableViewStyle.PLAIN":
					return Ti.UI.iPhone.TableViewStyle.PLAIN;
				case "Ti.UI.iPhone.TableViewSeparatorStyle.NONE":
					return Ti.UI.iPhone.TableViewSeparatorStyle.NONE;
				case "Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE":
					return Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE;
			}
		} else if (stringIsPrefix(string, "Ti.UI.Android.") == true) {
			switch(string) {
				case "Ti.UI.Android.LINKIFY_ALL":
					return Ti.UI.Android.LINKIFY_ALL;
				case "Ti.UI.Android.LINKIFY_EMAIL_ADDRESSES":
					return Ti.UI.Android.LINKIFY_EMAIL_ADDRESSES;
				case "Ti.UI.Android.LINKIFY_MAP_ADDRESSES":
					return Ti.UI.Android.LINKIFY_MAP_ADDRESSES;
				case "Ti.UI.Android.LINKIFY_PHONE_NUMBERS":
					return Ti.UI.Android.LINKIFY_PHONE_NUMBERS;
				case "Ti.UI.Android.LINKIFY_WEB_URLS":
					return Ti.UI.Android.LINKIFY_WEB_URLS;
				case "Ti.UI.Android.PIXEL_FORMAT_A_8":
					return Ti.UI.Android.PIXEL_FORMAT_A_8;
				case "Ti.UI.Android.PIXEL_FORMAT_LA_88":
					return Ti.UI.Android.PIXEL_FORMAT_LA_88;
				case "Ti.UI.Android.PIXEL_FORMAT_L_8":
					return Ti.UI.Android.PIXEL_FORMAT_L_8;
				case "Ti.UI.Android.PIXEL_FORMAT_OPAQUE":
					return Ti.UI.Android.PIXEL_FORMAT_OPAQUE;
				case "Ti.UI.Android.PIXEL_FORMAT_RGBA_4444":
					return Ti.UI.Android.PIXEL_FORMAT_RGBA_4444;
				case "Ti.UI.Android.PIXEL_FORMAT_RGBA_5551":
					return Ti.UI.Android.PIXEL_FORMAT_RGBA_5551;
				case "Ti.UI.Android.PIXEL_FORMAT_RGBA_8888":
					return Ti.UI.Android.PIXEL_FORMAT_RGBA_8888;
				case "Ti.UI.Android.PIXEL_FORMAT_RGBX_8888":
					return Ti.UI.Android.PIXEL_FORMAT_RGBX_8888;
				case "Ti.UI.Android.PIXEL_FORMAT_RGB_332":
					return Ti.UI.Android.PIXEL_FORMAT_RGB_332;
				case "Ti.UI.Android.PIXEL_FORMAT_RGB_565":
					return Ti.UI.Android.PIXEL_FORMAT_RGB_565;
				case "Ti.UI.Android.PIXEL_FORMAT_RGB_888":
					return Ti.UI.Android.PIXEL_FORMAT_RGB_888;
				case "Ti.UI.Android.PIXEL_FORMAT_TRANSLUCENT":
					return Ti.UI.Android.PIXEL_FORMAT_TRANSLUCENT;
				case "Ti.UI.Android.PIXEL_FORMAT_TRANSPARENT":
					return Ti.UI.Android.PIXEL_FORMAT_TRANSPARENT;
				case "Ti.UI.Android.PIXEL_FORMAT_UNKNOWN":
					return Ti.UI.Android.PIXEL_FORMAT_UNKNOWN;
				case "Ti.UI.Android.SOFT_INPUT_ADJUST_PAN":
					return Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
				case "Ti.UI.Android.SOFT_INPUT_ADJUST_RESIZE":
					return Ti.UI.Android.SOFT_INPUT_ADJUST_RESIZE;
				case "Ti.UI.Android.SOFT_INPUT_ADJUST_UNSPECIFIED":
					return Ti.UI.Android.SOFT_INPUT_ADJUST_UNSPECIFIED;
				case "Ti.UI.Android.SOFT_INPUT_STATE_ALWAYS_HIDDEN":
					return Ti.UI.Android.SOFT_INPUT_STATE_ALWAYS_HIDDEN;
				case "Ti.UI.Android.SOFT_INPUT_STATE_ALWAYS_VISIBLE":
					return Ti.UI.Android.SOFT_INPUT_STATE_ALWAYS_VISIBLE;
				case "Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN":
					return Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN;
				case "Ti.UI.Android.SOFT_INPUT_STATE_UNSPECIFIED":
					return Ti.UI.Android.SOFT_INPUT_STATE_UNSPECIFIED;
				case "Ti.UI.Android.SOFT_INPUT_STATE_VISIBLE":
					return Ti.UI.Android.SOFT_INPUT_STATE_VISIBLE;
				case "Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS":
					return Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS;
				case "Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS":
					return Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
				case "Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS":
					return Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS;
				case "Ti.UI.Android.SWITCH_STYLE_CHECKBOX":
					return Ti.UI.Android.SWITCH_STYLE_CHECKBOX;
				case "Ti.UI.Android.SWITCH_STYLE_TOGGLEBUTTON":
					return Ti.UI.Android.SWITCH_STYLE_TOGGLEBUTTON;
				case "Ti.UI.Android.WEBVIEW_PLUGINS_OFF":
					return Ti.UI.Android.WEBVIEW_PLUGINS_OFF;
				case "Ti.UI.Android.WEBVIEW_PLUGINS_ON":
					return Ti.UI.Android.WEBVIEW_PLUGINS_ON;
				case "Ti.UI.Android.WEBVIEW_PLUGINS_ON_DEMAND":
					return Ti.UI.Android.WEBVIEW_PLUGINS_ON_DEMAND;
			}
		}
	} else if (stringIsPrefix(string, "TiTools2.") == true) {
		if (stringIsPrefix(string, "TiTools2.Screen.") == true) {
			switch(string) {
				case "TiTools.Screen.UNKNOWN":
					return SCREEN_UNKNOWN;
				case "TiTools.Screen.SMALL":
					return SCREEN_SMALL;
				case "TiTools.Screen.NORMAL":
					return SCREEN_NORMAL;
				case "TiTools.Screen.LARGE":
					return SCREEN_LARGE;
				case "TiTools.Screen.EXTRA_LARGE":
					return SCREEN_EXTRA_LARGE;
			}
		}
	}
	var temp = pluginInvokeMethod("stringToConst", [string]);
	if (temp != undefined) {
		return temp;
	}
	return callbackDefault(string);
}

//---------------------------------------------//
// TODO:NAMESPACE:PLUGINS
//---------------------------------------------//

var _plugin = {};

//---------------------------------------------//

function pluginIsLoad(name) {
	if (_plugin[name] != undefined) {
		return true;
	}
	return false;
}

function pluginLoad(plugin, namespace) {
	var path = namespace.split(".");
	if (path.length > 0) {
		if (pluginIsLoad(path) == false) {
			pluginLoadWithPath(plugin, path);
		}
	}
}

function pluginLoadWithPath(plugin, path) {
	var instance = TiTools;
	var count = path.length - 1;
	for (var i = 0; i < count; i++) {
		if (instance[path[i]] == undefined) {
			instance[path[i]] = {};
		}
		instance = instance[path[i]];
	}
	var module = coreLoadJS(plugin);
	if (module != undefined) {
		utilsInfo("Plugin loaded: \"" + plugin + "\"", module);
		instance[path[count]] = module;
		_plugin[plugin] = module;
	}
}

function pluginInvokeMethod(name, args, defaults) {
	for (var i in _plugin) {
		var plugin = _plugin[i];
		var func = plugin[name];
		if (coreIsFunction(func) == true) {
			var result = func.apply(this, args);
			if (result != defaults) {
				return result;
			}
		}
	}
	return defaults;
}

//---------------------------------------------//
// TODO:NAMESPACE:ERROR
//---------------------------------------------//

function errorNotFound(func, file) {
	utilsInfo(coreTr("TITOOLS_ERROR_NOT_FOUND", "Not found"), stringFormat(" - In %s\n - File %s\n", func, file));
}

function errorUnknownExtension(func, file) {
	utilsInfo(coreTr("TITOOLS_ERROR_UNKNOWN_EXTENSION", "Unknown extension"), stringFormat(" - In %s\n - File %s\n", func, file));
}

function errorUnsupportedPlatform(func, platform) {
	utilsInfo(coreTr("TITOOLS_ERROR_UNSUPPORTED_PLATFORM", "Unsupported platform"), stringFormat(" - In %s\n - Platform %s\n", func, platform));
}

function errorUnknownPlatform(func, platform) {
	utilsInfo(coreTr("TITOOLS_ERROR_UNKNOWN_PLATFORM", "Unknown platform"), stringFormat(" - In %s\n - Platform %s\n", func, jsonSerialize(platform)));
}

function errorUnsupportedScreen(func, screen) {
	utilsInfo(coreTr("TITOOLS_ERROR_UNSUPPORTED_SCREEN", "Unsupported screen"), stringFormat(" - In %s\n - Screen %s\n", func, screen));
}

function errorUnknownScreen(func, screen) {
	utilsInfo(coreTr("TITOOLS_ERROR_UNKNOWN_SCREEN", "Unknown screen"), stringFormat(" - In %s\n - Screen %s\n", func, jsonSerialize(screen)));
}

function errorUnsupportedClassName(func, tiClassName) {
	utilsInfo(coreTr("TITOOLS_ERROR_UNSUPPORTED_CLASS_NAME", "Unsupported class name"), stringFormat(" - In %s\n - ClassName %s\n", func, tiClassName));
}

function errorUnknownClassName(func, tiClassName) {
	utilsInfo(coreTr("TITOOLS_ERROR_UNKNOWN_CLASS_NAME", "Unknown class name"), stringFormat(" - In %s\n - ClassName %s\n", func, tiClassName));
}

function errorUnknownMethod(func, method) {
	utilsInfo(coreTr("TITOOLS_ERROR_UNKNOWN_METHOD", "Unknown method"), stringFormat(" - In %s\n - Method %s\n", func, method));
}

function errorPresetNotFound(func, preset) {
	utilsInfo(coreTr("TITOOLS_ERROR_PRESET_NOT_FOUND", "Preset not found"), stringFormat(" - In %s\n - Preset %s\n", func, preset));
}

function errorPresetUnsupportedFormat(func, preset) {
	utilsInfo(coreTr("TITOOLS_ERROR_PRESET_UNSUPPORTED_FORMAT", "Unsupported preset format"), stringFormat(" - In %s\n - Preset %s\n", func, jsonSerialize(preset)));
}

function errorPrefabNotFound(func, prefab) {
	utilsInfo(coreTr("TITOOLS_ERROR_PREFAB_NOT_FOUND", "Prefab not found"), stringFormat(" - In %s\n - Prefab %s\n", func, prefab));
}

function errorPrefabUnsupportedFormat(func, prefab) {
	utilsInfo(coreTr("TITOOLS_ERROR_PREFAB_UNSUPPORTED_FORMAT", "Unsupported prefab format"), stringFormat(" - In %s\n - File %s\n", Prefab, jsonSerialize(prefab)));
}

function errorThisNotValue(func, name) {
	utilsInfo(coreTr("TITOOLS_ERROR_THIS_NOT_VALUE", "This is not value"), stringFormat(" - In %s\n - Value name %s\n", func, name));
}

function errorThisNotFunction(func, name) {
	utilsInfo(coreTr("TITOOLS_ERROR_THIS_NOT_FUNCTION", "This is not function"), stringFormat(" - In %s\n - Function name %s\n", func, name));
}

//---------------------------------------------//
// TODO:NAMESPACE:RESULT
//---------------------------------------------//

var TiTools = {
	tr: coreTr,
	loadJS: coreLoadJS,
	debounce: coreDebounce,
	isSimulator: coreIsSimulator,
	isAndroid: coreIsAndroid,
	isIOS: coreIsIOS,
	isIPhone: coreIsIPhone,
	isIPad: coreIsIPad,
	isBoolean: coreIsBoolean,
	isNumber: coreIsNumber,
	isString: coreIsString,
	isDate: coreIsDate,
	isTiObject: coreIsTiObject,
	isObject: coreIsObject,
	isArray: coreIsArray,
	isRegExp: coreIsRegExp,
	isFunction: coreIsFunction,
	isEqual: coreIsEqual,
	isEmpty: coreIsEmpty,
	isNaN: coreIsNaN,
	String: {
		isInt: stringIsInt,
		toInt: stringToInt,
		isFloat: stringIsFloat,
		toFloat: stringToFloat,
		replace: stringReplace,
		isPrefix: stringIsPrefix,
		isSuffix: stringIsSuffix,
		trim: stringTrim,
		trimLeft: stringTrimLeft,
		trimRight: stringTrimRight,
		paddingLeft: stringPaddingLeft,
		paddingRight: stringPaddingRight,
		repeat: stringRepeat,
		format: stringFormat,
		lines: stringLines
	},
	Date: {
		interval: dateInterval,
		now: dateNow,
		make: dateMake,
		format: dateFormat
	},
	Global: {
		set: globalSet,
		get: globalGet
	},
	Screen: {
		UNKNOWN: SCREEN_UNKNOWN,
		SMALL: SCREEN_SMALL,
		NORMAL: SCREEN_NORMAL,
		LARGE: SCREEN_LARGE,
		EXTRA_LARGE: SCREEN_EXTRA_LARGE,
		width: screenWidth,
		height: screenHeight,
		resolution: screenResolution,
		dpi: screenDpi,
		mode: screenMode,
		isRetina: screenIsRetina
	},
	Geo: {
		configure: geoConfigure,
		currentPosition: geoCurrentPosition,
		distance: geoDistance
	},
	Path: {
		resources: pathResources(),
		controllers: pathControllers(),
		preprocess: pathPreprocess,
		imgUrl: pathImgUrl,
	},
	FileSystem: {
		getFile: fileSystemGetFile
	},
	Network: {
		createUri: networkCreateUri,
		isOnline: Ti.Network.online,
		createClientHttp: networkCreateHttpClient,
		decodeURIComponent: networkDecodeURIComponent,
		encodeURIComponent: networkEncodeURIComponent
	},
	JSON: {
		serialize: jsonSerialize,
		deserialize: jsonDeserialize
	},
	XML: {
		Private: {
			deserializeNode: xmlDeserializeNode
		},
		serialize: xmlSerialize,
		deserialize: xmlDeserialize,
		getNode: xmlGetNode,
		findNode: xmlFindNode,
		mergeNodeAttributes: xmlMergeNodeAttributes
	},
	CSV: {
		serialize: csvSerialize,
		deserialize: csvDeserialize
	},
	UI: {
		Private: {
			createParams: uiCreateParams
		},
		currentTab: undefined,
		currentWindow: [],
		currentViews: [],
		currentFocus: undefined,
		getCurrentWindow: getCurrentWindow,
		getCurrentView: getCurrentView,
		setCurrentView: setCurrentView,
		openWinTabGroup: uiTabGroupWindowOpen,
		createTabGroup: uiCreateTabGroup,
		createTab: uiCreateTab,
		createNavigationGroup: uiCreateNavigationGroup,
		createWindow: uiCreateWindow,
		createView: uiCreateView,
		createScrollView: uiCreateScrollView,
		createScrollableView: uiCreateScrollableView,
		createImageView: uiCreateImageView,
		createMaskedImage: uiCreateMaskedImage,
		createButton: uiCreateButton,
		createButtonBar: uiCreateButtonBar,
		createToolbar: uiCreateToolbar,
		createLabel: uiCreateLabel,
		createSwitch: uiCreateSwitch,
		createSlider: uiCreateSlider,
		createSearchBar: uiCreateSearchBar,
		createProgressBar: uiCreateProgressBar,
		createTextField: uiCreateTextField,
		createTextArea: uiCreateTextArea,
		createTableView: uiCreateTableView,
		createTableViewSection: uiCreateTableViewSection,
		createTableViewRow: uiCreateTableViewRow,
		createListView: uiCreateListView,
		createListSection: uiCreateListSection,
		createPicker: uiCreatePicker,
		createPickerColumn: uiCreatePickerColumn,
		createPickerRow: uiCreatePickerRow,
		createWebView: uiCreateWebView,
		createMapView: uiCreateMapView,
		createMapViewAnnotation: uiCreateMapViewAnnotation,
		createFacebookLoginButton: uiCreateFacebookLoginButton,
		createAlertDialog: uiCreateAlertDialog,
		createEmailDialog: uiCreateEmailDialog,
		createOptionDialog: uiCreateOptionDialog,
		createPhoneCallDialog: uiCreatePhoneCallDialog,
		createActivityIndicator: uiCreateActivityIndicator,
		ThirdParty: {
			createPaintView: uiThirdPartyCreatePaintView
		}
	},
	Loader: {
		Private: {
			withParams: loaderWithParams,
			withFileName: loaderWithFileName,
			withString: loaderWithString
		}
	},
	Preset: {
		Private: {
			preprocess: presetPreprocess,
			loadJS: presetLoadJS,
			loadXML: presetLoadXML,
			loadItemXML: presetLoadItemXML,
			loadX: presetLoadX
		},
		set: presetSet,
		get: presetGet,
		remove: presetRemove,
		merge: presetMerge,
		applyByName: presetApplyByName,
		apply: presetApply,
		load: presetLoad,
		parse: presetParse
	},
	Prefab: {
		Private: {
			loadJS: prefabLoadJS,
			loadXML: prefabLoadXML,
			loadItemXML: prefabLoadItemXML,
			loadX: prefabLoadX
		},
		set: prefabSet,
		get: prefabGet,
		remove: prefabRemove,
		load: prefabLoad,
		parse: prefabParse
	},
	Form: {
		Private: {
			loadAppendCallback: formLoadAppendCallback,
			loadJS: formLoadJS,
			loadLink: formLoadLink,
			loadImplicitLink: formLoadImplicitLink,
			loadExplicitLink: formLoadExplicitLink,
			loadExplicitControlLink: formLoadExplicitControlLink,
			loadItemJS: formLoadItemJS,
			isBindString: formIsBindString,
			bindValue: formBindValue,
			bindString: formBindString,
			bindStyle: formBindStyle,
			bindFunction: formBindFunction,
			Control: {
				controlTabGroup: formControlTabGroup,
				appendTabGroup: formAppendTabGroup,
				controlTab: formControlTab,
				appendTab: formAppendTab,
				controlNavigationGroup: formControlNavigationGroup,
				appendNavigationGroup: formAppendNavigationGroup,
				controlWindow: formControlWindow,
				appendWindow: formAppendWindow,
				controlView: formControlView,
				controlScrollView: formControlScrollView,
				controlScrollableView: formControlScrollableView,
				appendScrollableView: formAppendScrollableView,
				controlTableView: formControlTableView,
				appendTableView: formAppendTableView,
				appendTableViewHeader: formAppendTableViewHeader,
				appendTableViewFooter: formAppendTableViewFooter,
				controlTableViewSection: formControlTableViewSection,
				appendTableViewSection: formAppendTableViewSection,
				appendTableViewSectionHeader: formAppendTableViewSectionHeader,
				appendTableViewSectionFooter: formAppendTableViewSectionFooter,
				controlTableViewRow: formControlTableViewRow,
				controlListView: formControlListView,
				appendListView: formAppendListView,
				controlListSection: formControlListSection,
				appendListSection: formAppendListSection,
				controlPicker: formControlPicker,
				appendPicker: formAppendPicker,
				controlPickerColumn: formControlPickerColumn,
				appendPickerColumn: formAppendPickerColumn,
				controlOther: formControlOther,
				appendOther: formAppendOther,
				controlHttpClient: formControlHttpClient
			}
		},
		Cache: {
			Private: {
				loadJS: formCacheLoadJS,
				loadItemJS: formCacheLoadItemJS,
				loadXML: formCacheLoadXML,
				loadItemXML: formCacheLoadItemXML,
				loadX: formCacheLoadX
			},
			set: formCacheSet,
			get: formCacheGet,
			remove: formCacheRemove,
			load: formCacheLoad,
			parse: formCacheParse
		},
		load: formLoad,
		parse: formParse
	},
	Project: {
		Private: {
			createWindowStyle: projectCreateWindowStyle
		},
		initialize: projectInitialize,
		loadPreset: projectLoadPreset,
		loadPrefab: projectLoadPrefab,
		loadController: projectLoadController,
		loadForm: projectLoadForm,
		createTabGroup: projectCreateTabGroup,
		createNavigationGroup: projectCreateNavigationGroup,
		createWindow: projectCreateWindow
	},
	Utils: {
		info: utilsInfo,
		sleep: utilsSleep,
		unigueID: utilsUnigueID,
		clone: utilsClone,
		combine: utilsCombine,
		appropriateAny: utilsAppropriateAny,
		appropriatePlatform: utilsAppropriatePlatform,
		appropriateScreen: utilsAppropriateScreen,
		stringToConst: utilsStringToConst
	},
	Plugin: {
		Private: {
			loadWithPath: pluginLoadWithPath,
			invokeMethod: pluginInvokeMethod
		},
		isLoad: pluginIsLoad,
		load: pluginLoad
	},
	Error: {
		notFound: errorNotFound,
		unknownExtension: errorUnknownExtension,
		unsupportedPlatform: errorUnsupportedPlatform,
		unknownPlatform: errorUnknownPlatform,
		unsupportedScreen: errorUnsupportedScreen,
		unsupportedClassName: errorUnsupportedClassName,
		unknownClassName: errorUnknownClassName,
		unknownScreen: errorUnknownScreen,
		unknownMethod: errorUnknownMethod,
		presetNotFound: errorPresetNotFound,
		presetUnsupportedFormat: errorPresetUnsupportedFormat,
		prefabNotFound: errorPrefabNotFound,
		prefabUnsupportedFormat: errorPrefabUnsupportedFormat,
		thisNotValue: errorThisNotValue,
		thisNotFunction: errorThisNotFunction
	},
	ThirdParty: {
		underscore: thirdPartyUnderscore,
		underscoreString: thirdPartyUnderscoreString,
		moment: thirdPartyMoment
	}
};

//---------------------------------------------//

module.exports = TiTools;

//---------------------------------------------//