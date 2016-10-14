var thirdPartyUnderscore = require("TiTools2_a/ThirdParty/underscore")._;
var thirdPartyUnderscoreString = require("TiTools2_a/ThirdParty/underscore.string");
var thirdPartyMoment = require("TiTools2_a/ThirdParty/moment");

//---------------------------------------------//

//var GA = require("analytics.google");
	//GA.dispatchInterval = 1;
	
//var tracker = GA.getTracker("UA-76843045-1");

function analyticsTrackEvent(params){
	//tracker.trackEvent(params);
}
function analyticsTrackScreen(name){
	//tracker.trackScreen(name);
}
function analyticsTrackTiming(params){
	//tracker.trackTiming(params);
}

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

var lastActiveTime = 0;

function checkActiveTime(){
	var sleepedTime = t2.Date.interval(lastActiveTime);
	var user = t2.Global.get("user");
	
	//t2.Utils.info('sleep ' + sleepedTime/1000 + ' seconds.');
	
	if(sleepedTime > 1000 * 60 * globalGet('sessionTime') && user != undefined){
		var loginWin = t2.Project.createWindow("login", {
			preset: "Window",
			style: {
				titleid: "EntranceToBank"
			},
			args: {
				onSuccessCallback: function(){},
				onCloseCallback: function(){
					Ti.App.fireEvent('globalLogout');
					t2.Global.set("user", undefined);
				},
				//sessionCheck: true
			}
		});
		
		loginWin.open();
	}
}

function storeActiveTime() {
	lastActiveTime = t2.Date.interval();
}

//---------------------------------------------//

if (coreIsIPhone == true) {
	if ((screenWidth == 320) && (screenHeight == 480)) {
		screenMode = SCREEN_SMALL;
	} else if ((screenWidth == 640) && (screenHeight == 960)) {
		screenMode = SCREEN_NORMAL;
		screenIsRetina = true;
	} else if ((screenWidth == 640) && (screenHeight == 1036)) {
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
	switch(Ti.Platform.Android.physicalSizeCategory) {
		case Ti.Platform.Android.PHYSICAL_SIZE_CATEGORY_SMALL:
			screenMode = SCREEN_SMALL;
			break;
		case Ti.Platform.Android.PHYSICAL_SIZE_CATEGORY_NORMAL:
			screenMode = SCREEN_NORMAL;
			break;
		case Ti.Platform.Android.PHYSICAL_SIZE_CATEGORY_LARGE:
			screenMode = SCREEN_LARGE;
			break;
		case Ti.Platform.Android.PHYSICAL_SIZE_CATEGORY_XLARGE:
			screenMode = SCREEN_EXTRA_LARGE;
			break;
	}
}

//---------------------------------------------//
// TODO:NAMESPACE:CORE
//---------------------------------------------//

var _module = {
	underscore : thirdPartyUnderscore,
	underscoreString : thirdPartyUnderscoreString,
	moment : thirdPartyMoment
};

//---------------------------------------------//

var _tr = L;
if (_tr != undefined) {
	if (Ti.Locate != undefined) {
		if (Ti.Locate.getString != undefined) {
			_tr = Ti.Locate.getString;
		}
	}
}

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
	if (object != undefined) {
		if (object.toString() == "[object Object]") {
			return true;
		}
	}
	return false;
}

function coreIsTiObject(object, type) {
	if (object != undefined) {
		var string = object.toString();
		if (type == undefined) {
			if ((stringIsPrefix(string, "[object Ti") == true) && (stringIsSuffix(string, "]") == true)) {
				return true;
			}
		} else {
			var pattern = "[object Ti" + type + "]";
			if (string == pattern) {
				return true;
			}
			pattern = "[object Ti" + type + "Proxy]";
			if (string == pattern) {
				return true;
			}
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
		if ((lastTime + timeout) <= now) {
			result = func.apply(context, args);
			lastTime = now;
		}
		return result;
	};
}

function coreTr(key, defaults) {
	return _tr(key, defaults);
}

function coreLoadJS(filename) {
	if (stringIsSuffix(filename, ".js") == true) {
		filename = filename.replace(".js", "");
	}
	return require(filename);
}

function coreGetModule(name) {
	return _module[name];
}

function coreLoadModule(name, namespace) {
	var module = _module[name];
	if (module == undefined) {
		module = coreLoadJS(name);
		if (namespace != undefined) {
			name = namespace;
		}
		_module[name] = module;
	}
	return module;
}

function avoidDoubleTap(func, clicked, delay) {
	var delay = delay || 1000;
	return function() {
		if(!clicked.value) {
			clicked.value = true;
			func.call();
			setTimeout(function() {
				clicked.value = false;
			}, delay);
		}
	};
}

function getClickedParam() {
	return {value: false};
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
var stringCapitalize = thirdPartyUnderscoreString.capitalize;

function stringIsInt(value) {
	if (coreIsString(value) == true) {
		return /^\d+$/.test(value);
	}
	return coreIsNumber(value);
}

function stringToInt(value) {
	if (coreIsString(value) == true) {
		return parseInt(value);
	} else if (coreIsNumber(value) == true) {
		return value;
	}
	return 0;
}

function stringIsFloat(value) {
	if (coreIsString(value) == true) {
		return /^\d+|\d*,\d+$|^\d+,\d*|\d*\.\d+$|^\d+\.\d*$/.test(value);
	}
	return coreIsNumber(value);
}

function stringToFloat(value) {
	if (coreIsString(value) == true) {
		return parseFloat(value.replace(',', '.'));
	} else if (coreIsNumber(value) == true) {
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
	if (base != undefined) {
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
	return date.format(format);
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
	if (params.message != undefined) {
		Ti.Geolocation.purpose = params.message;
	}
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
		try {
			if (event.success == true) {
				if (params.success != undefined) {
					var coords = event.coords;
					params.success({
						longitude : coords.longitude,
						latitude : coords.latitude
					});
				}
			} else if (event.error != undefined) {
				if (params.failure != undefined) {
					params.failure({
						code : event.code,
						message : event.error
					});
				}
			}
		} catch(error) {
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

var _paths = {
	"ResourcesPath" : pathResources(),
	"ControllersPath" : pathControllers(),
	"ScreenPath" : pathScreen()
};

//---------------------------------------------//

function pathResources() {
	return utilsAppropriatePlatform({
		ios : Ti.Filesystem.resourcesDirectory,
		android : "file:///android_asset/Resources/"
	});
}

function pathControllers() {
	return utilsAppropriatePlatform({
		ios : Ti.Filesystem.resourcesDirectory,
		android : ""
	});
}

function pathScreen() {
	return utilsAppropriateScreen({
		small : "Small/",
		normal : "Normal/",
		large : "Large/",
		extraLarge : "ExtraLarge/"
	});
}

function pathPreprocess(path) {
	if (stringIsPrefix(path, "%") == true) {
		return path.replace(/%([A-Za-z_]*)%/g, function(str, p1, p2, offset, s) {
			var value = _paths[p1];
			if (value != undefined) {
				return value;
			}
			return p1;
		});
	}
	return path;
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
}
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
}
networkUri.prototype.protocol = function(value) {
	if (value != undefined) {
		this.parts.protocol = value;
	}
	return this.parts.protocol;
}
networkUri.prototype.userInfo = function(value) {
	if (value != undefined) {
		this.parts.userInfo = value;
	}
	return this.parts.userInfo;
}
networkUri.prototype.host = function(value) {
	if (value != undefined) {
		this.parts.host = value;
	}
	return this.parts.host;
}
networkUri.prototype.port = function(value) {
	if (value != undefined) {
		this.parts.port = value;
	}
	return this.parts.port;
}
networkUri.prototype.path = function(value) {
	if (value != undefined) {
		this.parts.path = value;
	}
	return this.parts.path;
}
networkUri.prototype.query = function(value) {
	if (value != undefined) {
		this.queryObject = new networkUriQuery(value);
	}
	return this.queryObject;
}
networkUri.prototype.anchor = function(value) {
	if (value != undefined) {
		this.parts.anchor = value;
	}
	return this.parts.anchor;
}
networkUri.prototype.setAuthorityPrefix = function(value) {
	this.authorityPrefix(value);
	return this;
}
networkUri.prototype.setProtocol = function(value) {
	this.protocol(value);
	return this;
}
networkUri.prototype.setUserInfo = function(value) {
	this.userInfo(value);
	return this;
}
networkUri.prototype.setHost = function(value) {
	this.host(value);
	return this;
}
networkUri.prototype.setPort = function(value) {
	this.port(value);
	return this;
}
networkUri.prototype.setPath = function(value) {
	this.path(value);
	return this;
}
networkUri.prototype.setQuery = function(value) {
	this.query(value);
	return this;
}
networkUri.prototype.setAnchor = function(value) {
	this.anchor(value);
	return this;
}
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
};

networkUri.prototype.removeQueryItem = function(key, value) {
	if (arguments.length == 1) {
		this.queryObject.remove(key);
	} else if (arguments.length == 2) {
		this.queryObject.remove(key, value);
	}
	return this;
};

networkUri.prototype.clearQuery = function() {
	this.queryObject = new networkUriQuery("");
	this.parts.query = "";
	return this;
};

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
};

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
};

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
};
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
			this.params.push([this.decode(pair[0]), this.decode(pair[1])]);
		}
	}
};

networkUriQuery.prototype.set = function(key, value, index) {
	var params = this.params;
	key = this.decode(key);
	value = this.decode(value);
	if (arguments.length == 3) {
		if (index != -1) {
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
		if (queue.length > 0) {
			if (coreIsNumber(index) == true) {
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

	function next(needsRemove, needsRun) {
		if (queue != undefined) {
			if (needsRemove == true) {
				if (queue.length > 0) {
					if (queue[0] == self) {
						queue.splice(0, 1);
					}
				}
			}
			if (needsRun == true) {
				if (queue.length > 0) {
					queue[0].request();
				}
			}
		}
	}

	function getValue(value, def) {
		if (value != undefined) {
			return value;
		}
		return def;
	}

	self.handle = Ti.Network.createHTTPClient({
		cache : getValue(options.cache, false),
		tlsVersion : getValue(options.tlsVersion),
		autoEncodeUrl : getValue(options.autoEncodeUrl, true),
		autoRedirect : getValue(options.autoRedirect, true),
		enableKeepAlive : getValue(options.enableKeepAlive, false),
		validatesSecureCertificate : getValue(options.validatesSecureCertificate, false),
		withCredentials : getValue(options.withCredentials, false),
		username : getValue(options.username, ""),
		password : getValue(options.password, ""),
		timeout: timeout,
		onload : function(event) {
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
		onerror : function(event) {
			responced = true;
			if (coreIsFunction(self.loaded) == true) {
				self.loaded(self);
			}
			if (coreIsFunction(self.failure) == true) {
				self.failure(self, event.code, event.error);
			}
			self.handle = undefined;
			self.nextRequest(true, false);
		},
		onsendstream : function(event) {
			if (coreIsFunction(self.sendProgress) == true) {
				self.sendProgress(self, event.progress);
			}
		},
		ondatastream : function(event) {
			if (coreIsFunction(self.readProgress) == true) {
				self.readProgress(self, event.progress);
			}
		}
	});
	if (coreIsObject(args) == true) {
		var uri = new networkUri(url);
		if (args != undefined) {
			for (var i in args) {
				uri.setQueryItem(i, args[i]);
			}
		}
		url = uri.toString(); 
	}
	self.handle.open(method, decodeURI(url));
	if (headers != undefined) {
		for (var i in headers) {
			self.handle.setRequestHeader(i, headers[i]);
		}
	}
	switch(method) {
		case "GET":
			self.handle.send();
			break;
		case "PUT":
			if (options.put != undefined) {
				self.handle.send(options.put);
			} else {
				self.handle.send();
			}
			break;
		case "POST":
			if (options.post != undefined) {
				self.handle.send(options.post);
			} else {
				self.handle.send();
			}
			break;
		case "DELETE":
			self.handle.send();
			break;
	}
	
	if (timeout > 0) {
		setTimeout(function() {
			if (responced == false) {
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
				return xmlDeserialize(this.handle.responseText);
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

function networkIsOnline() {
	return Ti.Network.online;
}

function networkCreateUri(params) {
	return new networkUri(params);
}

function networkCreateHttpClient(params) {
	var handle = undefined;
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
		var queueName = params.queue;
		if (coreIsString(queueName) == false) {
			queueName = "titools";
		}
		if (coreIsArray(_networkQueue[queueName]) == false) {
			_networkQueue[queueName] = [];
		}
		handle = new networkHttpClient(_networkQueue[queueName], params);
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
		name : node.nodeName,
		value : stringTrim(node.nodeValue),
		attributes : {},
		childs : []
	};
	switch(node.nodeType) {
		case node.ELEMENT_NODE:
			var attributes = node.attributes;
			if (attributes != undefined) {
				var length = attributes.length;
				for (var i = 0; i < length; i++) {
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
	for (var i in childs) {
		var child = childs[i]
		if (child.name == nodeName) {
			return child;
		}
	}
	return undefined;
}

function xmlFindNode(node, nodeName) {
	var result = [];
	var childs = node.childs;
	for (var i in childs) {
		var child = childs[i]
		if (child.name == nodeName) {
			result.push(child);
		}
	}
	return result;
}

function xmlMergeNodeAttributes(nodes) {
	var result = {};
	for (var i in nodes) {
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
	var csvLength = csv.length;
	for (var i = 0; i < csvLength; ++i) {
		var row = csv[i];
		var rowLength = row.length;
		for (var j = 0; j < rowLength; ++j) {
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
			out += (j < rowLength - 1) ? cur + "," : cur;
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
	var strLength = str.length;
	for (var i = 0; i < strLength; ++i) {
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

function uiCreateParams(params, tiClassName) {
	var combined = {};
	if (coreIsArray(params) == true) {
		var length = params.length;
		for (var i = 0; i < length; i++) {
			var item = params[i];
			if (coreIsObject(item) == true) {
				combined = utilsCombine(item, combined);
			}
		}
	} else if (coreIsObject(params) == true) {
		combined = params;
	}
	return utilsCombine(combined, {
		uid : utilsUnigueID(),
		tiClassName : tiClassName
	});
}

function uiRegExpValidate(control, value) {
	var result = false;
	var pattern = control.regexp;
	if (pattern != undefined) {
		var regexp = new RegExp(pattern, "g");
		if (regexp.test(value) == true) {
			result = true;
		}
	} else {
		result = true;
	}
	return result;
}

//---------------------------------------------//

function uiCreateTabGroup(params) {
	var self = Ti.UI.createTabGroup(uiCreateParams(params, "TabGroup"));
	self.addEventListener("focus", function(event) {
		TiTools.UI.currentTab = self.activeTab;
	});
	return self;
}

function uiCreateTab(params, window) {
	var args = undefined;
	if (window != undefined) {
		args = [params, {
			window : window
		}];
	} else {
		args = params;
	}
	return Ti.UI.createTab(uiCreateParams(args, "Tab"));
}

function uiCreateNavigationGroup(params, window) {
	var self = undefined;
	if (coreIsIPhone == true) {
		var args = [params, {
			window : window
		}];
		self = Ti.UI.iPhone.createNavigationGroup(uiCreateParams(args, "NavigationGroup"));
	} else {
		errorUnsupportedPlatform("uiCreateNavigationGroup", "only iOS");
	}
	return self;
}

function uiCreateWindow(params, controller, args) {
	var self = Ti.UI.createWindow(uiCreateParams(utilsCombine({flagSecure: true}, params), "Window"));
	
	self.addEventListener("open", function(e) {
	    self.activity.addEventListener("resume", checkActiveTime);
	    self.activity.addEventListener("pause", storeActiveTime);
	});
	
	if(controller != 'main/index.cont.js')
		Ti.App.addEventListener("globalLogout", function(){
			if (!!self) self.close();
		});
	
	if (coreIsString(controller) == true) {
		uiCreateWindowController(controller, self, args);
	}
	return self;
}

function uiCreateWindowController(controller, window, args) {
	var module = coreLoadJS(controller);
	if (coreIsFunction(module) == true) {
		module(window, args);
	} else if (coreIsObject(module) == true) {
		if (coreIsFunction(module.onInitController) == true) {
			module.onInitController(args);
		}
		if (coreIsFunction(module.onFormPreLoad) == true) {
			module.onFormPreLoad(window);
		}
		window.addEventListener("open", function(event) {
			if (coreIsFunction(module.onFormLoad) == true) {
				module.onFormLoad(window);
			}
			if (coreIsFunction(module.onWindowOpen) == true) {
				module.onWindowOpen(window, event);
			}
		});
		window.addEventListener("close", function(event) {
			if (coreIsFunction(module.onFormUnload) == true) {
				module.onFormUnload(window);
			}
			if (coreIsFunction(module.onWindowClose) == true) {
				module.onWindowClose(window, event);
			}
		});
		if (coreIsAndroid == true) {
			if (coreIsFunction(module.onBack) == true) {
				window.addEventListener("androidback", function(event) {
					module.onBack(window);
				});
			}
		}
	}
	return module;
}

function uiCreateView(params) {
	return Ti.UI.createView(uiCreateParams(params, "View"));
}

function uiCreateViewController(controller, view, args) {
	var module = coreLoadJS(controller);
	if (coreIsFunction(module) == true) {
		module(view, args);
	} else if (coreIsObject(module) == true) {
		if (coreIsFunction(module.onInitController) == true) {
			module.onInitController(args);
		}
		if (coreIsFunction(module.onFormPreLoad) == true) {
			module.onFormPreLoad(view);
		}
		if (coreIsFunction(module.onFormLoad) == true) {
			module.onFormLoad(view);
		}
	}
	return module;
}

function uiCreateScrollView(params) {
	return Ti.UI.createScrollView(uiCreateParams(params, "ScrollView"));
}

function uiCreateScrollableView(params) {
	return Ti.UI.createScrollableView(uiCreateParams(params, "ScrollableView"));
}

function uiCreateImageView(params) {
	return Ti.UI.createImageView(uiCreateParams(params, "ImageView"));
}

function uiCreateMaskedImage() {
	return Ti.UI.createMaskedImage(uiCreateParams(params, "MaskedImage"));
}

function uiCreateButton(params) {
	return Ti.UI.createButton(uiCreateParams(params, "Button"));
}

function uiCreateButtonBar(params) {
	return Ti.UI.createButtonBar(uiCreateParams(params, "ButtonBar"));
}

function uiCreateToolbar(params, views) {
	var self = undefined;
	if (coreIsIOS == true) {
		var args = [params, {
			items : views
		}];
		self = Ti.UI.iOS.createToolbar(uiCreateParams(args, "Toolbar"));
	} else {
		errorUnsupportedPlatform("uiCreateToolbar", "only iOS");
	}
	return self;
}

function uiCreateLabel(params) {
	return Ti.UI.createLabel(uiCreateParams(params, "Label"));
}

function uiCreateSwitch(params) {
	return Ti.UI.createSwitch(uiCreateParams(params, "Switch"));
}

function uiCreateSlider(params) {
	return Ti.UI.createSlider(uiCreateParams(params, "Slider"));
}

function uiCreateSearchBar(params) {
	return Ti.UI.createSearchBar(uiCreateParams(params, "SearchBar"));
}

function uiCreateProgressBar(params) {
	return Ti.UI.createProgressBar(uiCreateParams(params, "ProgressBar"));
}

function uiCreateTextField(params) {
	var self = Ti.UI.createTextField(uiCreateParams(params, "TextField"));
	//utilsInfo(uiCreateParams(params, "TextField"));
	if (self != undefined) {
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

function uiCreateTextArea(params) {
	var self = Ti.UI.createTextArea(uiCreateParams(params, "TextArea"));
	if (self != undefined) {
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

function uiCreateTableView(params) {
	return Ti.UI.createTableView(uiCreateParams(params, "TableView"));
}

function uiCreateTableViewSection(params) {
	return Ti.UI.createTableViewSection(uiCreateParams(params, "TableViewSection"));
}

function uiCreateTableViewRow(params) {
	return Ti.UI.createTableViewRow(uiCreateParams(params, "TableViewRow"));
}

function uiCreateListView(params) {
	return Ti.UI.createListView(uiCreateParams(params, "ListView"));
}

function uiCreateListSection(params) {
	return Ti.UI.createListSection(uiCreateParams(params, "ListSection"));
}

function uiCreatePicker(params) {
	return Ti.UI.createPicker(uiCreateParams(params, "Picker"));
}

function uiCreatePickerColumn(params) {
	return Ti.UI.createPickerColumn(uiCreateParams(params, "PickerColumn"));
}

function uiCreatePickerRow(params) {
	return Ti.UI.createPickerRow(uiCreateParams(params, "PickerRow"));
}

function uiCreateWebView(params) {
	return Ti.UI.createWebView(uiCreateParams(params, "WebView"));
}

function uiCreateMapView(params) {
	return Ti.Map.createView(uiCreateParams(params, "MapView"));
}

function uiCreateMapViewAnnotation(params) {
	return Ti.Map.createAnnotation(uiCreateParams(params, "MapAnnotation"));
}

function uiCreateFacebookLoginButton(params) {
	return Ti.Facebook.createLoginButton(uiCreateParams(params, "FacebookLoginButton"));
}

function uiCreateAlertDialog(params) {
	return Ti.UI.createAlertDialog(uiCreateParams(params, "AlertDialog"));
}

function uiCreateEmailDialog(params) {
	return Ti.UI.createEmailDialog(uiCreateParams(params, "EmailDialog"));
}

function uiCreateOptionDialog(params) {
	return Ti.UI.createOptionDialog(uiCreateParams(params, "OptionDialog"));
}

function uiCreatePhoneCallDialog(params) {
	var phone = params.phone;
	var message = params.message;
	var buttonYes = params.buttonYes;
	var buttonNo = params.buttonNo;
	if (message == undefined) {
		message = coreTr("TITOOLS_ALERT_REQUEST_CALL", "Call to phone?") + "\n" + phone;
	}
	if (buttonYes == undefined) {
		buttonYes = coreTr("TITOOLS_ALERT_YES", "Yes");
	}
	if (buttonNo == undefined) {
		buttonNo = coreTr("TITOOLS_ALERT_NO", "No");
	}
	var alert = uiCreateAlertDialog(undefined, {
		message : message,
		buttonNames : [buttonYes, buttonNo],
		cancel : 1
	});
	alert.addEventListener("click", function(event) {
		if (event.index == 0) {
			var number = phone.replace(/([^0-9])+/g, "");
			if (number.length > 0) {
				Ti.Platform.openURL("tel:" + number);
			}
		}
	});
	return alert;
}

function uiCreateActivityIndicator(params) {
	return Ti.UI.createActivityIndicator(uiCreateParams(params, "ActivityIndicator"));
}

function uiThirdPartyCreatePaintView(params) {
	var module = coreGetModule("ti.paint");
	if (module != undefined) {
		return module.createPaintView(uiCreateParams(params, "PaintView"));
	}
	return undefined;
}

//---------------------------------------------//
// TODO:NAMESPACE:LOADER
//---------------------------------------------//

function loaderWithParams(params, callback, unknown) {
	function loadPlatformSingle(data) {
		if (coreIsObject(data) == true) {
			loadScreen(data);
		} else {
			loaderWithParams(data, callback, unknown);
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
			loaderWithParams(screen, callback, unknown);
		}
		var any = utilsAppropriateAny(data);
		if (any != undefined) {
			loaderWithParams(any, callback, unknown);
		}
	}

	if (coreIsArray(params) == true) {
		var length = params.length;
		for (var i = 0; i < length; i++) {
			loaderWithParams(params[i], callback, unknown);
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
		loaderWithFileName(params, callback, unknown);
	}
}

function loaderWithFileName(filename, callback, unknown) {
	if (stringIsSuffix(filename, ".js") == true) {
		var module = coreLoadJS(filename);
		if (callback != undefined) {
			callback(module);
		}
	} else if (stringIsSuffix(filename, ".json") == true) {
		var file = fileSystemGetFile(filename);
		if (file.exists() == true) {
			var blob = file.read();
			var content = jsonDeserialize(blob.text);
			if (callback != undefined) {
				callback(content);
			}
		} else {
			errorNotFound("loaderWithFileName", filename);
		}
	} else {
		if (unknown != undefined) {
			unknown(filename)
		} else {
			errorUnknownExtension("loaderWithFileName", filename);
		}
	}
}

function loaderWithString(format, data, callback, unknown) {
	switch(format) {
		case "js":
			callback(data);
			break;
		case "json":
			callback(jsonDeserialize(data));
			break;
		default:
			unknown(data);
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
			var length = preset.length;
			for (var i = 0; i < length; i++) {
				var name = preset[i];
				if (coreIsString(name) == true) {
					var item = presetGet(name);
					if (item != undefined) {
						storage = utilsCombine(item, storage);
					} else {
						errorPresetNotFound("presetMerge", name);
					}
				} else {
					errorPresetNotFound("presetMerge", name);
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
		textid : "text",
		titleid : "title",
		promptid : "prompt",
		messageid : "message",
		titlepromptid : "titleprompt"
	};
	for (var i in params) {
		var value = params[i];
		if ((coreIsArray(value) == true) || (coreIsObject(value) == true)) {
			params[i] = presetPreprocess(value);
		} else if (coreIsString(value) == true) {
			if (ids[i] != undefined) {
				params[ids[i]] = coreTr(value);
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
		if ((stringIsPrefix(string, "tr(") == true) && (stringIsSuffix(string, ")") == true)) {
			string = string.replace(/tr\(([A-Za-z0-9_\.]*)\)/g, function(str, p1, p2, offset, s) {
				return coreTr(p1, p1);
			});
		}
		return utilsStringToConst(string, pathPreprocess);
	}
	return string;
}

function presetLoad(params) {
	loaderWithParams(params, presetLoadWithObject, presetLoadWithPlugin);
}

function presetParse(format, data) {
	loaderWithString(format, data, presetLoadWithObject, presetLoadWithPlugin);
}

function presetLoadWithObject(content) {
	if (coreIsArray(content) == true) {
		var length = content.length;
		for (var i = 0; i < length; i++) {
			presetLoadWithObject(content[i]);
		}
	} else if (coreIsObject(content) == true) {
		if ((coreIsString(content.name) == false) || ((content.parent == undefined) && (coreIsObject(content.style) == false))) {
			errorPresetUnsupportedFormat("presetLoadWithObject", content);
		}
		var style = content.style;
		if (content.parent != undefined) {
			style = presetMerge(content.parent, style);
		}
		presetSet(content.name, style);
	} else {
		errorPresetUnsupportedFormat("presetLoadWithObject", content);
	}
}

function presetLoadWithPlugin(params) {
	pluginInvokeMethod("TiToolsPresetLoad", [params]);
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
	loaderWithParams(params, prefabLoadWithObject, prefabLoadWithPlugin);
}

function prefabParse(format, data) {
	loaderWithString(format, data, prefabLoadWithObject, prefabLoadWithPlugin);
}

function prefabLoadWithObject(content) {
	if (coreIsArray(content) == true) {
		var length = content.length;
		for (var i = 0; i < length; i++) {
			prefabLoadWithObject(content[i]);
		}
	} else if (coreIsObject(content) == true) {
		if ((coreIsString(content.name) == false) || ((coreIsObject(content.prefab) == false) && (coreIsArray(content.prefab) == false))) {
			errorPrefabUnsupportedFormat("prefabLoadWithObject", content);
		}
		prefabSet(content.name, content.prefab);
	}
}

function prefabLoadWithPlugin(params) {
	pluginInvokeMethod("TiToolsPrefabLoad", [params]);
}

//---------------------------------------------//
// TODO:NAMESPACE:FORM
//---------------------------------------------//

var _formComponents = {
	"TabGroup" : {
		append : formTabGroupAppend,
		create : formTabGroupCreate
	},
	"Tab" : {
		append : formTabAppend,
		create : formTabCreate
	},
	"NavigationGroup" : {
		append : formNavigationGroupAppend,
		create : formNavigationGroupCreate
	},
	"Window" : {
		append : formWindowAppend,
		create : formWindowCreate
	},
	"View" : {
		append : formViewAppend,
		create : formViewCreate
	},
	"ScrollView" : {
		append : formScrollViewAppend,
		create : formScrollViewCreate
	},
	"ScrollableView" : {
		append : formScrollableViewAppend,
		create : formScrollableViewCreate
	},
	"TableView" : {
		append : formTableViewAppend,
		create : formTableViewCreate
	},
	"TableViewSection" : {
		append : formTableViewSectionAppend,
		create : formTableViewSectionCreate
	},
	"TableViewRow" : {
		append : formTableViewRowAppend,
		create : formTableViewRowCreate
	},
	"ListView" : {
		append : formListViewAppend,
		create : formListViewCreate
	},
	"ListSection" : {
		append : formListSectionAppend,
		create : formListSectionCreate
	},
	"Picker" : {
		append : formPickerAppend,
		create : formPickerCreate
	},
	"PickerColumn" : {
		append : formPickerColumnAppend,
		create : formPickerColumnCreate
	},
	"PickerRow" : {
		append : formPickerRowAppend,
		create : formPickerRowCreate
	},
	"Toolbar" : {
		append : undefined,
		create : formToolbarCreate
	},
	"Label" : {
		append : undefined,
		create : formLabelCreate
	},
	"TextField" : {
		append : undefined,
		create : formTextFieldCreate
	},
	"TextArea" : {
		append : undefined,
		create : formTextAreaCreate
	},
	"ImageView" : {
		append : undefined,
		create : formImageViewCreate
	},
	"MaskedImage" : {
		append : undefined,
		create : formMaskedImageCreate
	},
	"Button" : {
		append : undefined,
		create : formButtonCreate
	},
	"ButtonBar" : {
		append : undefined,
		create : formButtonBarCreate
	},
	"Switch" : {
		append : undefined,
		create : formSwitchCreate
	},
	"Slider" : {
		append : undefined,
		create : formSliderCreate
	},
	"SearchBar" : {
		append : undefined,
		create : formSearchBarCreate
	},
	"ProgressBar" : {
		append : undefined,
		create : formProgressBarCreate
	},
	"WebView" : {
		append : undefined,
		create : formWebViewCreate
	},
	"MapView" : {
		append : undefined,
		create : formMapViewCreate
	},
	"ActivityIndicator" : {
		append : undefined,
		create : formActivityIndicatorCreate
	},
	"FacebookLoginButton" : {
		append : undefined,
		create : formFacebookLoginButtonCreate
	},
	"PaintView" : {
		append : undefined,
		create : formPaintViewCreate
	},
	"AlertDialog" : {
		append : undefined,
		create : formAlertDialogCreate
	},
	"EmailDialog" : {
		append : undefined,
		create : formEmailDialogCreate
	},
	"OptionDialog" : {
		append : undefined,
		create : formOptionDialogCreate
	},
	"PhoneCallDialog" : {
		append : undefined,
		create : formPhoneCallDialogCreate
	},
	"PaintView" : {
		append : undefined,
		create : formPaintViewCreate
	}
};

//---------------------------------------------//

function formComponentInstall(name, callback) {
	_formComponents[name] = callback;
}

function formComponentUninstall(name) {
	delete _formComponents[name];
}

//---------------------------------------------//

function formAppendCallbackWithParent(parent) {
	if (parent != undefined) {
		var className = parent.tiClassName;
		var component = _formComponents[className];
		if (component != undefined) {
			return component.append;
		} else {
			component = pluginInvokeMethod("TiToolsFormAppendCallbackWithParent", [parent]);
			if (component == undefined) {
				errorUnknownClassName("formAppendCallbackWithParent", className);
			}
		}
	}
	return undefined;
}

function formLoad(parent, data, params) {
	var controller = undefined;
	loaderWithParams(data, function(content) {
		controller = formCreate(content, parent, undefined, params);
	}, function() {
		controller = pluginInvokeMethod("TiToolsFormLoad", [parent, data, params]);
	});
	return controller;
}

function formParse(parent, data, format, params) {
	var controller = undefined;
	loaderWithString(format, data, function(content) {
		controller = formCreate(content, parent, undefined, params);
	}, function(content) {
		controller = pluginInvokeMethod("TiToolsFormParse", [parent, data, format, params]);
	});
	return controller;
}

function formCreate(content, parent, append, params) {
	function loadWith(content) {
		var control = undefined;
		if (coreIsArray(content) == true) {
			control = [];
			var length = content.length;
			for (var i = 0; i < length; i++) {
				control.push(loadWith(content[i]));
			}
		} else if (coreIsObject(content) == true) {
			control = formLoadControl(content, parent, append, args);
		}
		return control;
	}

	var controller = {};
	var args = {
		params : params,
		owner : parent,
		controller : controller,
		links : []
	};
	if (append == undefined) {
		append = formAppendCallbackWithParent(parent);
	}
	var control = loadWith(content);
	if (control != undefined) {
		controller["titools::root"] = control;
	}
	formLoadExplicitLink(args);
	return controller;
}

function formLoadControl(content, parent, append, args) {
	var control = undefined;
	var params = args.params;
	var enabled = content.enabled;
	if (coreIsString(enabled) == true) {
		if (formBindString(enabled, params) != true) {
			return control;
		}
	}
	var oldParams = undefined;
	var userParams = content.params;
	if (userParams != undefined) {
		oldParams = params;
		params = utilsCombine(params, userParams);
		args.params = params;
	}
	var className = content["class"];
	if (className != undefined) {
		var preset = content.preset;
		var style = content.style;
		if (style != undefined) {
			style = formBindStyle(style, params);
		}
		if (coreIsArray(preset) == true) {
			args.style = presetMerge(preset, style);
		} else if (coreIsString(preset) == true) {
			if(formIsBindString(preset) == true) {
				args.style = presetMerge(formBindString(preset, params), style);
			} else {
				args.style = presetMerge(preset, style);
			}
		} else {
			args.style = style;
		}
		var component = _formComponents[className];
		if (component != undefined) {
			control = component.create(content, parent, args);
		} else {
			control = pluginInvokeMethod("TiToolsFormLoadControl", [content, parent, args]);
			if (control == undefined) {
				errorUnknownClassName("formLoadControl", className);
			}
		}
		if (control != undefined) {
			var bind = content.bind;
			if (coreIsObject(bind) == true) {
				formBindFunction(bind, params, control);
			}
			if (coreIsFunction(append) == true) {
				append(parent, control);
			}
			control.fireEvent("titools::create");
		}
	} else {
		var prefab = content.prefab;
		if (coreIsString(prefab) == true) {
			var prefabContent = prefabGet(prefab);
			if (coreIsObject(prefabContent) == true) {
				var contoller = formCreate(prefabContent, parent, append, params);
				if (contoller != undefined) {
					control = contoller["titools::root"];
				}
			} else {
				errorPrefabNotFound("formLoadControl", prefab);
			}
		}
	}
	if (control != undefined) {
		formLoadImplicitLink(content, control, parent, args);
	}
	if (oldParams != undefined) {
		args.params = oldParams;
	}
	return control;
}

function formLoadSubControl(content, name, parent, append, args) {
	var subControl = undefined;
	var items = content[name];
	if (coreIsString(items) == true) {
		items = formBindString(items, args.params);
	}
	if (coreIsArray(items) == true) {
		subControl = [];
		var length = items.length;
		for (var i = 0; i < length; i++) {
			var control = formLoadControl(items[i], parent, append, args);
			if (coreIsArray(control) == true) {
				var subLength = control.length;
				for (var j = 0; j < subLength; j++) {
					subControl.push(control[j]);
				}
			} else if (coreIsTiObject(control) == true) {
				subControl.push(control);
			}
		}
	} else if (coreIsObject(items) == true) {
		subControl = formLoadControl(items, parent, append, args);
	}
	return subControl;
}

//---------------------------------------------//

function formLoadLink(args) {
	var store = args.store;
	var name = args.name;
	var control = args.control;
	if (store[name] == undefined) {
		store[name] = control;
		return control;
	} else {
		errorControllerOverride("formLoadLink", name);
	}
	return undefined;
}

function formLoadImplicitLink(content, control, parent, args) {
	var name = content.name;
	if (coreIsString(name) == true) {
		var target = content.target;
		var links = args.links;
		if (coreIsString(target) == true) {
			var explicit = true;
			switch(target) {
				case "parent":
					if (parent != undefined) {
						formLoadLink({
							store : parent,
							name : name,
							control : control
						});
						explicit = false;
					}
					break;
			}
			if (explicit == true) {
				links.push({
					name : name,
					target : target,
					control : control,
					parent : parent
				});
			}
		} else {
			formLoadLink({
				store : args.controller,
				name : name,
				control : control
			});
		}
	}
}

function formLoadExplicitLink(args) {
	var links = args.links;
	if (links.length > 0) {
		while (true) {
			var link = links.pop();
			if (link == undefined) {
				break;
			}
			formLoadExplicitControlLink(link, args);
		}
	}
}

function formLoadExplicitControlLink(link, args) {
	var result = undefined;
	var name = link.name;
	var target = link.target;
	var control = link.control;
	var parent = link.parent;
	switch(target) {
		case "parent":
			var superview = control.superview;
			if (superview != undefined) {
				result = formLoadLink({
					store : superview,
					name : name,
					control : control
				});
			}
			break;
		case "owner":
			var owner = args.owner;
			if (owner != undefined) {
				result = formLoadLink({
					store : owner,
					name : name,
					control : control
				});
			}
			break;
		default:
			var store = args.controller[target];
			if (store == undefined) {
				var links = args.links;
				var length = links.length;
				for (var i = 0; i < length; i++) {
					var parent = links[i];
					if (parent.name == target) {
						links.splice(i, 1);
						store = formLoadExplicitControlLink(args);
						break;
					}
				}
			}
			if (store != undefined) {
				result = formLoadLink({
					store : store,
					name : name,
					control : control
				});
			}
			break;
	}
	return result;
}

//---------------------------------------------//

function formIsBindString(string) {
	if ((stringIsPrefix(string, "<% ") == true) && (stringIsSuffix(string, " %>") == true)) {
		return true;
	}
	return false;
}

function formBindValue(name, params, unsafe) {
	var value = undefined;
	if(params != undefined) {
		value = params[name];
	}
	if (value != undefined) {
		if (coreIsFunction(value) == true) {
			value = value(params);
		} else if (coreIsString(value) == true) {
			value = formBindValue(value, params, true);
		}
	} else {
		if (unsafe != true) {
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
				switch(name) {
					case "int":
						var value = formBindValue(func[2], params, true);
						if (value != undefined) {
							if (stringIsInt(value) == true) {
								return stringToInt(value);
							}
						}
						break;
					case "float":
						var value = formBindValue(func[2], params, true);
						if (value != undefined) {
							if (stringIsFloat(value) == true) {
								return stringToFloat(value);
							}
						}
						break;
					case "string":
						var value = formBindValue(func[2], params, true);
						if (value != undefined) {
							return String(value);
						}
						break;
					case "const":
						var value = formBindValue(func[2], params, true);
						if (value != undefined) {
							return utilsStringToConst(value);
						}
						break;
					case "not":
						var value = formBindValue(func[2], params, false);
						if (value == true) {
							return false;
						}
						return true;
					case "exists":
						var value = formBindValue(func[2], params, false);
						if (value != undefined) {
							return true;
						}
						return false;
					case "notExists":
						var value = formBindValue(func[2], params, false);
						if (value == undefined) {
							return true;
						}
						return false;
					default:
						errorUnknownMethod("formBindString", name, tag);
						break;
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
		if (newBind == undefined) {
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
						if ((coreIsFunction(arg1) == true) && (coreIsNumber(arg2) == true)) {
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
		if (coreIsObject(data) == true) {
			for (var i in data) {
				var bind = formFindFunction(data[i], params);
				if (coreIsFunction(bind) == true) {
					control.addEventListener(i, bind);
				} else {
					bindFunction(bind, i);
				}
			}
		} else if (coreIsArray(data) == true) {
			if (coreIsString(name) != true) {
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

function formTabGroupAppend(parent, control) {
	control.superview = parent;
	parent.addTab(control);
}

function formTabGroupCreate(content, parent, args) {
	var control = uiCreateTabGroup(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "tabs", control, formTabGroupAppend, args);
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formTabAppend(parent, control) {
	control.superview = parent;
	control.window = parent;
}

function formTabCreate(content, parent, args) {
	var window = undefined;
	if (coreIsObject(content.window) == true) {
		window = formLoadControl(content.window, undefined, undefined, args);
	}
	var control = uiCreateTab(args.style, window);
	if (control != undefined) {
		if (window != undefined) {
			window.superview = control;
		}
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formNavigationGroupAppend(parent, control) {
	control.superview = parent;
	parent.open(control);
}

function formNavigationGroupCreate(content, parent, args) {
	var window = undefined;
	if (coreIsObject(content.window) == true) {
		window = formLoadControl(content.window, undefined, undefined, args);
	}
	var control = uiCreateNavigationGroup(args.style, window);
	if (control != undefined) {
		if (window != undefined) {
			window.superview = control;
		}
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formWindowAppend(parent, control) {
	control.superview = parent;
	parent.add(control);
}

function formWindowCreate(content, parent, args) {
	var control = uiCreateWindow(args.style, args.controller, args.args);
	if (control != undefined) {
		formLoadSubControl(content, "subviews", control, formWindowAppend, args);
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formViewAppend(parent, control) {
	control.superview = parent;
	parent.add(control);
}

function formViewCreate(content, parent, args) {
	var control = uiCreateView(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "subviews", control, formViewAppend, args);
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formScrollViewAppend(parent, control) {
	control.superview = parent;
	parent.add(control);
}

function formScrollViewCreate(content, parent, args) {
	var control = uiCreateScrollView(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "subviews", control, formScrollViewAppend, args);
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formScrollableViewAppend(parent, control) {
	control.superview = parent;
	parent.addView(control);
}

function formScrollableViewCreate(content, parent, args) {
	var control = uiCreateScrollableView(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "subviews", control, formScrollableViewAppend, args);
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formTableViewAppend(parent, control) {
	switch(control.tiClassName) {
		case "SearchBar":
			formTableViewAppendSearchBar(parent, control);
			break;
		case "TableViewSection":
			formTableViewAppendSection(parent, control);
			break;
		case "TableViewRow":
			formTableViewAppendRow(parent, control);
			break;
	}
}

function formTableViewAppendSearchBar(parent, control) {
	control.superview = parent;
	parent.search = control;
}

function formTableViewAppendHeader(parent, control) {
	control.superview = parent;
	parent.headerView = control;
}

function formTableViewAppendFooter(parent, control) {
	control.superview = parent;
	parent.footerView = control;
}

function formTableViewAppendSection(parent, control) {
	control.superview = parent;
	var sections = parent.data;
	sections.push(control);
	parent.data = sections;
}

function formTableViewAppendRow(parent, control) {
	control.superview = parent;
	parent.appendRow(control);
}

function formTableViewCreate(content, parent, args) {
	var control = uiCreateTableView(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "search", control, formTableViewAppendSearchBar, args);
		formLoadSubControl(content, "header", control, formTableViewAppendHeader, args);
		formLoadSubControl(content, "footer", control, formTableViewAppendFooter, args);
		if (coreIsArray(content.sections) == true) {
			control.data = formLoadSubControl(content, "sections", control, undefined, args);
		} else if (coreIsArray(content.rows) == true) {
			control.appendRow(formLoadSubControl(content, "rows", control, undefined, args));
		}
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formTableViewSectionAppend(parent, control) {
	control.superview = parent;
	parent.add(control);
}

function formTableViewSectionAppendHeader(parent, control) {
	control.superview = parent;
	parent.headerView = control;
}

function formTableViewSectionAppendFooter(parent, control) {
	control.superview = parent;
	parent.footerView = control;
}

function formTableViewSectionCreate(content, parent, args) {
	var control = uiCreateTableViewSection(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "header", control, formTableViewSectionAppendHeader, args);
		formLoadSubControl(content, "footer", control, formTableViewSectionAppendFooter, args);
		formLoadSubControl(content, "rows", control, formTableViewSectionAppend, args);
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formTableViewRowAppend(parent, control) {
	control.superview = parent;
	parent.add(control);
}

function formTableViewRowCreate(content, parent, args) {
	var control = uiCreateTableViewRow(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "subviews", control, formTableViewRowAppend, args);
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formListViewAppend(parent, control) {
	control.superview = parent;
	parent.appendSection(control);
}

function formListViewCreate(content, parent, args) {
	var control = uiCreateListView(args.style);
	if (control != undefined) {
		control.setSections(formLoadSubControl(content, "sections", control, undefined, args));
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formListSectionAppend(parent, control) {
	parent.appendItems([control]);
}

function formListSectionCreate(content, parent, args) {
	var control = uiCreateListSection(args.style);
	if (control != undefined) {
		var datasets = content.datasets;
		if (coreIsArray(datasets) == true) {
			datasets = formBindStyle(datasets, args.params);
			datasets = presetMerge(undefined, datasets);
			control.setItems(datasets);
		}
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formPickerAppend(parent, control) {
	switch(control.tiClassName) {
		case "PickerColumn":
			formPickerAppendColumn(parent, control);
			break;
		case "PickerRow":
			formPickerAppendRow(parent, control);
			break;
	}
}

function formPickerAppendColumn(parent, control) {
	control.superview = parent;
	parent.add(control);
}

function formPickerAppendRow(parent, control) {
	control.superview = parent;
	parent.add(control);
}

function formPickerCreate(content, parent, args) {
	var control = uiCreatePicker(args.style);
	if (control != undefined) {
		if (coreIsArray(content.sections) == true) {
			formLoadSubControl(content, "sections", control, formPickerAppendColumn, args);
		} else if (coreIsArray(content.rows) == true) {
			formLoadSubControl(content, "rows", control, formPickerAppendRow, args);
		}
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formPickerColumnAppend(parent, control) {
	control.superview = parent;
	parent.addRow(control);
}

function formPickerColumnCreate(content, parent, args) {
	var control = uiCreatePickerColumn(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "rows", control, formPickerColumnAppend, args);
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formPickerRowAppend(parent, control) {
	control.superview = parent;
	parent.add(control);
}

function formPickerRowCreate(content, parent, args) {
	var control = uiCreatePickerRow(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formToolbarCreate(content, parent, args) {
	var views = formLoadSubControl(content, "subviews", undefined, undefined, args);
	var control = uiCreateToolbar(args.style, views);
	if (control != undefined) {
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formLabelCreate(content, parent, args) {
	var control = uiCreateLabel(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formTextFieldCreate(content, parent, args) {
	var control = uiCreateTextField(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formTextAreaCreate(content, parent, args) {
	var control = uiCreateTextArea(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formImageViewCreate(content, parent, args) {
	var control = uiCreateImageView(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formMaskedImageCreate(content, parent, args) {
	var control = uiCreateMaskedImage(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formButtonAppendLeftButton(parent, control) {
	control.superview = parent;
	parent.leftButton = control;
}

function formButtonAppendRightButton(parent, control) {
	control.superview = parent;
	parent.rightButton = control;
}

function formButtonCreate(content, parent, args) {
	var control = uiCreateButton(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "leftButton", control, formButtonAppendLeftButton, args);
		formLoadSubControl(content, "rightButton", control, formButtonAppendRightButton, args);
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formButtonBarCreate(content, parent, args) {
	var control = uiCreateButtonBar(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formSwitchCreate(content, parent, args) {
	var control = uiCreateSwitch(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formSliderCreate(content, parent, args) {
	var control = uiCreateSlider(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formSearchBarCreate(content, parent, args) {
	var control = uiCreateSearchBar(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formProgressBarCreate(content, parent, args) {
	var control = uiCreateProgressBar(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formWebViewCreate(content, parent, args) {
	var control = uiCreateWebView(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formMapViewCreate(content, parent, args) {
	var control = uiCreateMapView(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formActivityIndicatorCreate(content, parent, args) {
	var control = uiCreateActivityIndicator(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formFacebookLoginButtonCreate(content, parent, args) {
	var control = uiCreateFacebookLoginButton(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formPaintViewCreate(content, parent, args) {
	var control = uiCreatePaintView(args.style);
	if (control != undefined) {
		formLoadSubControl(content, "items", control, undefined, args);
	}
	return control;
}

function formAlertDialogCreate(content, parent, args) {
	return uiCreateAlertDialog(args.style);
}

function formEmailDialogCreate(content, parent, args) {
	return uiCreateEmailDialog(args.style);
}

function formOptionDialogCreate(content, parent, args) {
	return uiCreateOptionDialog(args.style);
}

function formPhoneCallDialogCreate(content, parent, args) {
	return uiCreatePhoneCallDialog(args.style);
}

function formPaintViewCreate(content, parent, args) {
	return uiThirdPartyCreatePaintView(args.style);
}

//---------------------------------------------//
// TODO:NAMESPACE:PROJECT
//---------------------------------------------//

var _project = {
	controllers : {},
	forms : {}
};

//---------------------------------------------//

function projectInitialize(params) {
	if (params != undefined) {
		if (params.geo != undefined) {
			geoConfigure(params.geo);
		}
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
	}
}

function projectLoadPreset(presets) {
	presetLoad(presets);
}

function projectLoadPrefab(prefabs) {
	prefabLoad(prefabs);
}

function projectLoadWith(name, list) {
	if (coreIsArray(list) == true) {
		var length = list.length;
		for (var i = 0; i < length; i++) {
			projectLoadWith(name, list[i]);
		}
	} else if (coreIsObject(list) == true) {
		var store = _project[name];
		for (var i in list) {
			store[i] = list[i];
		}
	}
}

function projectLoadController(controllers) {
	if (coreIsObject(controllers) == true) {
		var list = utilsAppropriatePlatform(controllers, controllers);
		if (list != undefined) {
			projectLoadWith("controllers", list);
		} else {
			errorUnknownPlatform("projectLoadController", controllers);
		}
	} else if (coreIsArray(controllers) == true) {
		projectLoadWith("controllers", controllers);
	}
}

function projectLoadForm(forms) {
	if (coreIsObject(forms) == true) {
		var list = utilsAppropriatePlatform(forms, forms);
		if (list != undefined) {
			projectLoadWith("forms", list);
		} else {
			errorUnknownPlatform("projectLoadForm", forms);
		}
	} else if (coreIsArray(forms) == true) {
		projectLoadWith("forms", forms);
	}
}

function projectCreateTabGroup(params) {
	var style = {};
	var tabs = [];
	if (coreIsObject(params) == true) {
		if (coreIsObject(params.style) == true) {
			style = params.style;
		}
		if (coreIsArray(params.preset) == true) {
			style = presetMerge(params.preset, style);
		} else if (coreIsString(params.preset) == true) {
			style = presetMerge(params.preset, style);
		}
		if (coreIsArray(params.tabs) != undefined) {
			tabs = params.tabs;
		}
	}
	var tabgroup = uiCreateTabGroup(style);
	var length = tabs.length;
	for (var i = 0; i < length; i++) {
		var item = tabs[i];
		var window = undefined;
		if (coreIsObject(item.window) == true) {
			window = projectCreateWindow(item.window.controller, item.window.params);
			window.superview = tabgroup;
		}
		var tab = uiCreateTab(item.style, window);
		if (window != undefined) {
			window.superview = tab;
		}
		tabgroup.addTab(tab);
	}
	return tabgroup;
}

function projectCreateNavigationGroup(params) {
	var style = {};
	var window = undefined;
	var navigationGroup = undefined;
	if (coreIsObject(params) == true) {
		if (coreIsObject(params.style) == true) {
			style = params.style;
		}
		if (coreIsArray(params.preset) == true) {
			style = presetMerge(params.preset, style);
		} else if (coreIsString(params.preset) == true) {
			style = presetMerge(params.preset, style);
		}
		if (coreIsObject(params.window) == true) {
			window = projectCreateWindow(params.window.controller, params.window.params);
		}
	}
	navigationGroup = uiCreateNavigationGroup(style, window);
	if (window != undefined) {
		window.superview = navigationGroup;
	}
	return navigationGroup;
}

function projectCreateWindow(controller, params) {
	analyticsTrackScreen('android - ' + controller);
	var style = {};
	var args = {};
	if (params != undefined) {
		if (params.style != undefined) {
			style = params.style;
		}
		if (coreIsArray(params.preset) == true) {
			style = presetMerge(params.preset, style);
		} else if (coreIsString(params.preset) == true) {
			style = presetMerge(params.preset, style);
		}
		if (params.args != undefined) {
			args = params.args;
		}
	}
	var name = _project.controllers[controller];
	return uiCreateWindow(style, name, args);
}

function projectCreateForm(form, parent, params) {
	return formLoad(parent, _project.forms[form], params);
}

function projectCreateController(controller, view, params) {
	return uiCreateViewController(_project.controllers[controller], view, params);
}

//---------------------------------------------//
// TODO:NAMESPACE:UTILS
//---------------------------------------------//

var _constTiUI = {
	"Ti.UI.FILL" : Ti.UI.FILL,
	"Ti.UI.SIZE" : Ti.UI.SIZE,
	"Ti.UI.PORTRAIT" : Ti.UI.PORTRAIT,
	"Ti.UI.UPSIDE_PORTRAIT" : Ti.UI.UPSIDE_PORTRAIT,
	"Ti.UI.LANDSCAPE_LEFT" : Ti.UI.LANDSCAPE_LEFT,
	"Ti.UI.LANDSCAPE_RIGHT" : Ti.UI.LANDSCAPE_RIGHT,
	"Ti.UI.INPUT_BORDERSTYLE_NONE" : Ti.UI.INPUT_BORDERSTYLE_NONE,
	"Ti.UI.INPUT_BORDERSTYLE_BEZEL" : Ti.UI.INPUT_BORDERSTYLE_BEZEL,
	"Ti.UI.INPUT_BORDERSTYLE_LINE" : Ti.UI.INPUT_BORDERSTYLE_LINE,
	"Ti.UI.INPUT_BORDERSTYLE_ROUNDED" : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	"Ti.UI.INPUT_BUTTONMODE_ALWAYS" : Ti.UI.INPUT_BUTTONMODE_ALWAYS,
	"Ti.UI.INPUT_BUTTONMODE_NEVER" : Ti.UI.INPUT_BUTTONMODE_NEVER,
	"Ti.UI.INPUT_BUTTONMODE_ONBLUR" : Ti.UI.INPUT_BUTTONMODE_ONBLUR,
	"Ti.UI.INPUT_BUTTONMODE_ONFOCUS" : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
	"Ti.UI.PICKER_TYPE_PLAIN" : Ti.UI.PICKER_TYPE_PLAIN,
	"Ti.UI.PICKER_TYPE_DATE" : Ti.UI.PICKER_TYPE_DATE,
	"Ti.UI.PICKER_TYPE_TIME" : Ti.UI.PICKER_TYPE_TIME,
	"Ti.UI.PICKER_TYPE_DATE_AND_TIME" : Ti.UI.PICKER_TYPE_DATE_AND_TIME,
	"Ti.UI.PICKER_TYPE_COUNT_DOWN_TIMER" : Ti.UI.PICKER_TYPE_COUNT_DOWN_TIMER,
	"Ti.UI.TEXT_ALIGNMENT_LEFT" : Ti.UI.TEXT_ALIGNMENT_LEFT,
	"Ti.UI.TEXT_ALIGNMENT_CENTER" : Ti.UI.TEXT_ALIGNMENT_CENTER,
	"Ti.UI.TEXT_ALIGNMENT_RIGHT" : Ti.UI.TEXT_ALIGNMENT_RIGHT,
	"Ti.UI.TEXT_AUTOCAPITALIZATION_NONE" : Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
	"Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES" : Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
	"Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS" : Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS,
	"Ti.UI.TEXT_AUTOCAPITALIZATION_ALL" : Ti.UI.TEXT_AUTOCAPITALIZATION_ALL,
	"Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP" : Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
	"Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER" : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
	"Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM" : Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
	"Ti.UI.KEYBOARD_DEFAULT" : Ti.UI.KEYBOARD_DEFAULT,
	"Ti.UI.KEYBOARD_ASCII" : Ti.UI.KEYBOARD_ASCII,
	"Ti.UI.KEYBOARD_EMAIL" : Ti.UI.KEYBOARD_EMAIL,
	"Ti.UI.KEYBOARD_URL" : Ti.UI.KEYBOARD_URL,
	"Ti.UI.KEYBOARD_APPEARANCE_ALERT" : Ti.UI.KEYBOARD_APPEARANCE_ALERT,
	"Ti.UI.KEYBOARD_APPEARANCE_DEFAULT" : Ti.UI.KEYBOARD_APPEARANCE_DEFAULT,
	"Ti.UI.KEYBOARD_NAMEPHONE_PAD" : Ti.UI.KEYBOARD_NAMEPHONE_PAD,
	"Ti.UI.KEYBOARD_NUMBER_PAD" : Ti.UI.KEYBOARD_NUMBER_PAD,
	"Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION" : Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
	"Ti.UI.KEYBOARD_DECIMAL_PAD" : Ti.UI.KEYBOARD_DECIMAL_PAD,
	"Ti.UI.KEYBOARD_PHONE_PAD" : Ti.UI.KEYBOARD_PHONE_PAD
};
if (coreIsIOS == true) {
	var _constTiUIIOS = {
		"Ti.UI.iOS.AD_SIZE_LANDSCAPE" : Ti.UI.iOS.AD_SIZE_LANDSCAPE,
		"Ti.UI.iOS.AD_SIZE_PORTRAIT" : Ti.UI.iOS.AD_SIZE_PORTRAIT,
		"Ti.UI.iOS.AUTODETECT_ADDRESS" : Ti.UI.iOS.AUTODETECT_ADDRESS,
		"Ti.UI.iOS.AUTODETECT_ALL" : Ti.UI.iOS.AUTODETECT_ALL,
		"Ti.UI.iOS.AUTODETECT_CALENDAR" : Ti.UI.iOS.AUTODETECT_CALENDAR,
		"Ti.UI.iOS.AUTODETECT_LINK" : Ti.UI.iOS.AUTODETECT_LINK,
		"Ti.UI.iOS.AUTODETECT_NONE" : Ti.UI.iOS.AUTODETECT_NONE,
		"Ti.UI.iOS.AUTODETECT_PHONE" : Ti.UI.iOS.AUTODETECT_PHONE,
		"Ti.UI.iOS.BLEND_MODE_CLEAR" : Ti.UI.iOS.BLEND_MODE_CLEAR,
		"Ti.UI.iOS.BLEND_MODE_COLOR" : Ti.UI.iOS.BLEND_MODE_COLOR,
		"Ti.UI.iOS.BLEND_MODE_COLOR_BURN" : Ti.UI.iOS.BLEND_MODE_COLOR_BURN,
		"Ti.UI.iOS.BLEND_MODE_COLOR_DODGE" : Ti.UI.iOS.BLEND_MODE_COLOR_DODGE,
		"Ti.UI.iOS.BLEND_MODE_COPY" : Ti.UI.iOS.BLEND_MODE_COPY,
		"Ti.UI.iOS.BLEND_MODE_DARKEN" : Ti.UI.iOS.BLEND_MODE_DARKEN,
		"Ti.UI.iOS.BLEND_MODE_DESTINATION_ATOP" : Ti.UI.iOS.BLEND_MODE_DESTINATION_ATOP,
		"Ti.UI.iOS.BLEND_MODE_DESTINATION_IN" : Ti.UI.iOS.BLEND_MODE_DESTINATION_IN,
		"Ti.UI.iOS.BLEND_MODE_DESTINATION_OUT" : Ti.UI.iOS.BLEND_MODE_DESTINATION_OUT,
		"Ti.UI.iOS.BLEND_MODE_DESTINATION_OVER" : Ti.UI.iOS.BLEND_MODE_DESTINATION_OVER,
		"Ti.UI.iOS.BLEND_MODE_DIFFERENCE" : Ti.UI.iOS.BLEND_MODE_DIFFERENCE,
		"Ti.UI.iOS.BLEND_MODE_EXCLUSION" : Ti.UI.iOS.BLEND_MODE_EXCLUSION,
		"Ti.UI.iOS.BLEND_MODE_HARD_LIGHT" : Ti.UI.iOS.BLEND_MODE_HARD_LIGHT,
		"Ti.UI.iOS.BLEND_MODE_HUE" : Ti.UI.iOS.BLEND_MODE_HUE,
		"Ti.UI.iOS.BLEND_MODE_LIGHTEN" : Ti.UI.iOS.BLEND_MODE_LIGHTEN,
		"Ti.UI.iOS.BLEND_MODE_LUMINOSITY" : Ti.UI.iOS.BLEND_MODE_LUMINOSITY,
		"Ti.UI.iOS.BLEND_MODE_MULTIPLY" : Ti.UI.iOS.BLEND_MODE_MULTIPLY,
		"Ti.UI.iOS.BLEND_MODE_NORMAL" : Ti.UI.iOS.BLEND_MODE_NORMAL,
		"Ti.UI.iOS.BLEND_MODE_OVERLAY" : Ti.UI.iOS.BLEND_MODE_OVERLAY,
		"Ti.UI.iOS.BLEND_MODE_PLUS_DARKER" : Ti.UI.iOS.BLEND_MODE_PLUS_DARKER,
		"Ti.UI.iOS.BLEND_MODE_PLUS_LIGHTER" : Ti.UI.iOS.BLEND_MODE_PLUS_LIGHTER,
		"Ti.UI.iOS.BLEND_MODE_SATURATION" : Ti.UI.iOS.BLEND_MODE_SATURATION,
		"Ti.UI.iOS.BLEND_MODE_SCREEN" : Ti.UI.iOS.BLEND_MODE_SCREEN,
		"Ti.UI.iOS.BLEND_MODE_SOFT_LIGHT" : Ti.UI.iOS.BLEND_MODE_SOFT_LIGHT,
		"Ti.UI.iOS.BLEND_MODE_SOURCE_ATOP" : Ti.UI.iOS.BLEND_MODE_SOURCE_ATOP,
		"Ti.UI.iOS.BLEND_MODE_SOURCE_IN" : Ti.UI.iOS.BLEND_MODE_SOURCE_IN,
		"Ti.UI.iOS.BLEND_MODE_SOURCE_OUT" : Ti.UI.iOS.BLEND_MODE_SOURCE_OUT,
		"Ti.UI.iOS.BLEND_MODE_XOR" : Ti.UI.iOS.BLEND_MODE_XOR,
		"Ti.UI.iOS.COLOR_GROUP_TABLEVIEW_BACKGROUND" : Ti.UI.iOS.COLOR_GROUP_TABLEVIEW_BACKGROUND,
		"Ti.UI.iOS.COLOR_SCROLLVIEW_BACKGROUND" : Ti.UI.iOS.COLOR_SCROLLVIEW_BACKGROUND,
		"Ti.UI.iOS.COLOR_UNDER_PAGE_BACKGROUND" : Ti.UI.iOS.COLOR_UNDER_PAGE_BACKGROUND,
		"Ti.UI.iOS.COLOR_VIEW_FLIPSIDE_BACKGROUND" : Ti.UI.iOS.COLOR_VIEW_FLIPSIDE_BACKGROUND,
		// iPhone
		"Ti.UI.iPhone.MODAL_PRESENTATION_CURRENT_CONTEXT" : Ti.UI.iPhone.MODAL_PRESENTATION_CURRENT_CONTEXT,
		"Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET" : Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET,
		"Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN" : Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
		"Ti.UI.iPhone.MODAL_PRESENTATION_PAGESHEET" : Ti.UI.iPhone.MODAL_PRESENTATION_PAGESHEET,
		"Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL" : Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
		"Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE" : Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE,
		"Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL" : Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
		"Ti.UI.iPhone.MODAL_TRANSITION_STYLE_PARTIAL_CURL" : Ti.UI.iPhone.MODAL_TRANSITION_STYLE_PARTIAL_CURL,
		"Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN" : Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN,
		"Ti.UI.iPhone.ActivityIndicatorStyle.DARK" : Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		"Ti.UI.iPhone.ActivityIndicatorStyle.BIG" : Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
		"Ti.UI.iPhone.AnimationStyle.NONE" : Ti.UI.iPhone.AnimationStyle.NONE,
		"Ti.UI.iPhone.AnimationStyle.CURL_UP" : Ti.UI.iPhone.AnimationStyle.CURL_UP,
		"Ti.UI.iPhone.AnimationStyle.CURL_DOWN" : Ti.UI.iPhone.AnimationStyle.CURL_DOWN,
		"Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT" : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT,
		"Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT" : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT,
		"Ti.UI.iPhone.ProgressBarStyle.DEFAULT" : Ti.UI.iPhone.TableViewSeparatorStyle.DEFAULT,
		"Ti.UI.iPhone.ProgressBarStyle.PLAIN" : Ti.UI.iPhone.TableViewSeparatorStyle.PLAIN,
		"Ti.UI.iPhone.ProgressBarStyle.BAR" : Ti.UI.iPhone.TableViewSeparatorStyle.BAR,
		"Ti.UI.iPhone.RowAnimationStyle.NONE" : Ti.UI.iPhone.RowAnimationStyle.NONE,
		"Ti.UI.iPhone.RowAnimationStyle.FADE" : Ti.UI.iPhone.RowAnimationStyle.FADE,
		"Ti.UI.iPhone.RowAnimationStyle.TOP" : Ti.UI.iPhone.RowAnimationStyle.TOP,
		"Ti.UI.iPhone.RowAnimationStyle.RIGHT" : Ti.UI.iPhone.RowAnimationStyle.RIGHT,
		"Ti.UI.iPhone.RowAnimationStyle.BOTTOM" : Ti.UI.iPhone.RowAnimationStyle.BOTTOM,
		"Ti.UI.iPhone.RowAnimationStyle.LEFT" : Ti.UI.iPhone.RowAnimationStyle.LEFT,
		"Ti.UI.iPhone.ScrollIndicatorStyle.DEFAULT" : Ti.UI.iPhone.ScrollIndicatorStyle.DEFAULT,
		"Ti.UI.iPhone.ScrollIndicatorStyle.BLACK" : Ti.UI.iPhone.ScrollIndicatorStyle.BLACK,
		"Ti.UI.iPhone.ScrollIndicatorStyle.WHITE" : Ti.UI.iPhone.ScrollIndicatorStyle.WHITE,
		"Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_NONE" : Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_NONE,
		"Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_FADE" : Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_FADE,
		"Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_SLIDE" : Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_SLIDE,
		"Ti.UI.iPhone.StatusBar.DEFAULT" : Ti.UI.iPhone.StatusBar.DEFAULT,
		"Ti.UI.iPhone.StatusBar.GRAY" : Ti.UI.iPhone.StatusBar.GRAY,
		"Ti.UI.iPhone.StatusBar.GREY" : Ti.UI.iPhone.StatusBar.GREY,
		"Ti.UI.iPhone.StatusBar.OPAQUE_BLACK" : Ti.UI.iPhone.StatusBar.OPAQUE_BLACK,
		"Ti.UI.iPhone.StatusBar.TRANSLUCENT_BLACK" : Ti.UI.iPhone.StatusBar.TRANSLUCENT_BLACK,
		"Ti.UI.iPhone.SystemButton.ACTION" : Ti.UI.iPhone.SystemButton.ACTION,
		"Ti.UI.iPhone.SystemButton.ACTIVITY" : Ti.UI.iPhone.SystemButton.ACTIVITY,
		"Ti.UI.iPhone.SystemButton.ADD" : Ti.UI.iPhone.SystemButton.ADD,
		"Ti.UI.iPhone.SystemButton.BOOKMARKS" : Ti.UI.iPhone.SystemButton.BOOKMARKS,
		"Ti.UI.iPhone.SystemButton.CAMERA" : Ti.UI.iPhone.SystemButton.CAMERA,
		"Ti.UI.iPhone.SystemButton.CANCEL" : Ti.UI.iPhone.SystemButton.CANCEL,
		"Ti.UI.iPhone.SystemButton.COMPOSE" : Ti.UI.iPhone.SystemButton.COMPOSE,
		"Ti.UI.iPhone.SystemButton.CONTACT_ADD" : Ti.UI.iPhone.SystemButton.CONTACT_ADD,
		"Ti.UI.iPhone.SystemButton.DISCLOSURE" : Ti.UI.iPhone.SystemButton.DISCLOSURE,
		"Ti.UI.iPhone.SystemButton.DONE" : Ti.UI.iPhone.SystemButton.DONE,
		"Ti.UI.iPhone.SystemButton.EDIT" : Ti.UI.iPhone.SystemButton.EDIT,
		"Ti.UI.iPhone.SystemButton.FAST_FORWARD" : Ti.UI.iPhone.SystemButton.FAST_FORWARD,
		"Ti.UI.iPhone.SystemButton.FIXED_SPACE" : Ti.UI.iPhone.SystemButton.FIXED_SPACE,
		"Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE" : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
		"Ti.UI.iPhone.SystemButton.INFO_DARK" : Ti.UI.iPhone.SystemButton.INFO_DARK,
		"Ti.UI.iPhone.SystemButton.INFO_LIGHT" : Ti.UI.iPhone.SystemButton.INFO_LIGHT,
		"Ti.UI.iPhone.SystemButton.ORGANIZE" : Ti.UI.iPhone.SystemButton.ORGANIZE,
		"Ti.UI.iPhone.SystemButton.PAUSE" : Ti.UI.iPhone.SystemButton.PAUSE,
		"Ti.UI.iPhone.SystemButton.PLAY" : Ti.UI.iPhone.SystemButton.PLAY,
		"Ti.UI.iPhone.SystemButton.REFRESH" : Ti.UI.iPhone.SystemButton.REFRESH,
		"Ti.UI.iPhone.SystemButton.REPLY" : Ti.UI.iPhone.SystemButton.REPLY,
		"Ti.UI.iPhone.SystemButton.REWIND" : Ti.UI.iPhone.SystemButton.REWIND,
		"Ti.UI.iPhone.SystemButton.SAVE" : Ti.UI.iPhone.SystemButton.SAVE,
		"Ti.UI.iPhone.SystemButton.SPINNER" : Ti.UI.iPhone.SystemButton.SPINNER,
		"Ti.UI.iPhone.SystemButton.STOP" : Ti.UI.iPhone.SystemButton.STOP,
		"Ti.UI.iPhone.SystemButton.TRASH" : Ti.UI.iPhone.SystemButton.TRASH,
		"Ti.UI.iPhone.SystemButtonStyle.PLAIN" : Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		"Ti.UI.iPhone.SystemButtonStyle.DONE" : Ti.UI.iPhone.SystemButtonStyle.DONE,
		"Ti.UI.iPhone.SystemButtonStyle.BAR" : Ti.UI.iPhone.SystemButtonStyle.BAR,
		"Ti.UI.iPhone.SystemButtonStyle.BORDERED" : Ti.UI.iPhone.SystemButtonStyle.BORDERED,
		"Ti.UI.iPhone.TableViewScrollPosition.NONE" : Ti.UI.iPhone.TableViewScrollPosition.NONE,
		"Ti.UI.iPhone.TableViewScrollPosition.TOP" : Ti.UI.iPhone.TableViewScrollPosition.TOP,
		"Ti.UI.iPhone.TableViewScrollPosition.MIDDLE" : Ti.UI.iPhone.TableViewScrollPosition.MIDDLE,
		"Ti.UI.iPhone.TableViewScrollPosition.BOTTOM" : Ti.UI.iPhone.TableViewScrollPosition.BOTTOM,
		"Ti.UI.iPhone.TableViewStyle.GROUPED" : Ti.UI.iPhone.TableViewStyle.GROUPED,
		"Ti.UI.iPhone.TableViewStyle.PLAIN" : Ti.UI.iPhone.TableViewStyle.PLAIN,
		"Ti.UI.iPhone.TableViewSeparatorStyle.NONE" : Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
		"Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE" : Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE,
		// iPad
		"Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UNKNOWN" : Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UNKNOWN,
		"Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UP" : Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UP,
		"Ti.UI.iPad.POPOVER_ARROW_DIRECTION_RIGHT" : Ti.UI.iPad.POPOVER_ARROW_DIRECTION_RIGHT,
		"Ti.UI.iPad.POPOVER_ARROW_DIRECTION_DOWN" : Ti.UI.iPad.POPOVER_ARROW_DIRECTION_DOWN,
		"Ti.UI.iPad.POPOVER_ARROW_DIRECTION_LEFT" : Ti.UI.iPad.POPOVER_ARROW_DIRECTION_LEFT,
		"Ti.UI.iPad.POPOVER_ARROW_DIRECTION_ANY" : Ti.UI.iPad.POPOVER_ARROW_DIRECTION_ANY
	};
} else if (coreIsAndroid == true) {
	var _constTiUIAndroid = {
		"Ti.UI.ActivityIndicatorStyle.PLAIN" : Ti.UI.ActivityIndicatorStyle.PLAIN,
		"Ti.UI.ActivityIndicatorStyle.DARK" : Ti.UI.ActivityIndicatorStyle.DARK,
		"Ti.UI.ActivityIndicatorStyle.BIG" : Ti.UI.ActivityIndicatorStyle.BIG,
		"Ti.UI.ActivityIndicatorStyle.BIG_DARK" : Ti.UI.ActivityIndicatorStyle.BIG_DARK,
		"Ti.UI.Android.LINKIFY_ALL" : Ti.UI.Android.LINKIFY_ALL,
		"Ti.UI.Android.LINKIFY_EMAIL_ADDRESSES" : Ti.UI.Android.LINKIFY_EMAIL_ADDRESSES,
		"Ti.UI.Android.LINKIFY_MAP_ADDRESSES" : Ti.UI.Android.LINKIFY_MAP_ADDRESSES,
		"Ti.UI.Android.LINKIFY_PHONE_NUMBERS" : Ti.UI.Android.LINKIFY_PHONE_NUMBERS,
		"Ti.UI.Android.LINKIFY_WEB_URLS" : Ti.UI.Android.LINKIFY_WEB_URLS,
		"Ti.UI.Android.PIXEL_FORMAT_A_8" : Ti.UI.Android.PIXEL_FORMAT_A_8,
		"Ti.UI.Android.PIXEL_FORMAT_LA_88" : Ti.UI.Android.PIXEL_FORMAT_LA_88,
		"Ti.UI.Android.PIXEL_FORMAT_L_8" : Ti.UI.Android.PIXEL_FORMAT_L_8,
		"Ti.UI.Android.PIXEL_FORMAT_OPAQUE" : Ti.UI.Android.PIXEL_FORMAT_OPAQUE,
		"Ti.UI.Android.PIXEL_FORMAT_RGBA_4444" : Ti.UI.Android.PIXEL_FORMAT_RGBA_4444,
		"Ti.UI.Android.PIXEL_FORMAT_RGBA_5551" : Ti.UI.Android.PIXEL_FORMAT_RGBA_5551,
		"Ti.UI.Android.PIXEL_FORMAT_RGBA_8888" : Ti.UI.Android.PIXEL_FORMAT_RGBA_8888,
		"Ti.UI.Android.PIXEL_FORMAT_RGBX_8888" : Ti.UI.Android.PIXEL_FORMAT_RGBX_8888,
		"Ti.UI.Android.PIXEL_FORMAT_RGB_332" : Ti.UI.Android.PIXEL_FORMAT_RGB_332,
		"Ti.UI.Android.PIXEL_FORMAT_RGB_565" : Ti.UI.Android.PIXEL_FORMAT_RGB_565,
		"Ti.UI.Android.PIXEL_FORMAT_RGB_888" : Ti.UI.Android.PIXEL_FORMAT_RGB_888,
		"Ti.UI.Android.PIXEL_FORMAT_TRANSLUCENT" : Ti.UI.Android.PIXEL_FORMAT_TRANSLUCENT,
		"Ti.UI.Android.PIXEL_FORMAT_TRANSPARENT" : Ti.UI.Android.PIXEL_FORMAT_TRANSPARENT,
		"Ti.UI.Android.PIXEL_FORMAT_UNKNOWN" : Ti.UI.Android.PIXEL_FORMAT_UNKNOWN,
		"Ti.UI.Android.SOFT_INPUT_ADJUST_PAN" : Ti.UI.Android.SOFT_INPUT_ADJUST_PAN,
		"Ti.UI.Android.SOFT_INPUT_ADJUST_RESIZE" : Ti.UI.Android.SOFT_INPUT_ADJUST_RESIZE,
		"Ti.UI.Android.SOFT_INPUT_ADJUST_UNSPECIFIED" : Ti.UI.Android.SOFT_INPUT_ADJUST_UNSPECIFIED,
		"Ti.UI.Android.SOFT_INPUT_STATE_ALWAYS_HIDDEN" : Ti.UI.Android.SOFT_INPUT_STATE_ALWAYS_HIDDEN,
		"Ti.UI.Android.SOFT_INPUT_STATE_ALWAYS_VISIBLE" : Ti.UI.Android.SOFT_INPUT_STATE_ALWAYS_VISIBLE,
		"Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN" : Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
		"Ti.UI.Android.SOFT_INPUT_STATE_UNSPECIFIED" : Ti.UI.Android.SOFT_INPUT_STATE_UNSPECIFIED,
		"Ti.UI.Android.SOFT_INPUT_STATE_VISIBLE" : Ti.UI.Android.SOFT_INPUT_STATE_VISIBLE,
		"Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS" : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS,
		"Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS" : Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS,
		"Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS" : Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
		"Ti.UI.Android.SWITCH_STYLE_CHECKBOX" : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
		"Ti.UI.Android.SWITCH_STYLE_TOGGLEBUTTON" : Ti.UI.Android.SWITCH_STYLE_TOGGLEBUTTON,
		"Ti.UI.Android.WEBVIEW_PLUGINS_OFF" : Ti.UI.Android.WEBVIEW_PLUGINS_OFF,
		"Ti.UI.Android.WEBVIEW_PLUGINS_ON" : Ti.UI.Android.WEBVIEW_PLUGINS_ON,
		"Ti.UI.Android.WEBVIEW_PLUGINS_ON_DEMAND" : Ti.UI.Android.WEBVIEW_PLUGINS_ON_DEMAND
	};
}
var _constTiTools = {
	"TiTools.Screen.UNKNOWN" : SCREEN_UNKNOWN,
	"TiTools.Screen.SMALL" : SCREEN_SMALL,
	"TiTools.Screen.NORMAL" : SCREEN_NORMAL,
	"TiTools.Screen.LARGE" : SCREEN_LARGE,
	"TiTools.Screen.EXTRA_LARGE" : SCREEN_EXTRA_LARGE,
};

var utilsUnigueID = thirdPartyUnderscore.uniqueId;
var utilsClone = thirdPartyUnderscore.clone;

function utilsCombine(objectA, objectB) {
	objectA = utilsClone(objectA);
	if (objectB != undefined) {
		if (objectA == undefined) {
			if (coreIsArray(objectB) == true) {
				objectA = [];
			} else if (coreIsObject(objectB) == true) {
				objectA = {};
			}
		}
		for (var i in objectB) {
			var valueA = objectA[i];
			var valueB = objectB[i];
			if (coreIsArray(valueB) == true) {
				objectA[i] = utilsCombine(valueA, valueB);
			} else if (coreIsObject(valueB) == true) {
				if (coreIsTiObject(valueB) == true) {
					objectA[i] = valueB;
				} else {
					objectA[i] = utilsCombine(valueA, valueB);
				}
			} else if (valueB !== undefined) {
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
			var length = value.length;
			for (var i = 0; i < length; i++) {
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
		var length = lines.length - 1;
		for (var i = 0; i < length; i++) {
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
	var value = _constTiUI[string];
	if (value != undefined) {
		return value;
	}
	if (coreIsIOS == true) {
		value = _constTiUIIOS[string];
		if (value != undefined) {
			return value;
		}
	} else if (coreIsAndroid == true) {
		value = _constTiUIAndroid[string];
		if (value != undefined) {
			return value;
		}
	}
	value = _constTiTools[string];
	if (value != undefined) {
		return value;
	}
	value = pluginInvokeMethod("TiToolsStringToConst", [string]);
	if (value != undefined) {
		return value;
	}
	if (coreIsFunction(callbackDefault) == true) {
		value = callbackDefault(string);
	}
	return value;
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
	var length = path.length - 1;
	for (var i = 0; i < length; i++) {
		if (instance[path[i]] == undefined) {
			instance[path[i]] = {};
		}
		instance = instance[path[i]];
	}
	var module = coreLoadJS(plugin);
	if (module != undefined) {
		utilsInfo("Plugin loaded: \"" + plugin + "\"", module);
		instance[path[length]] = module;
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
	utilsInfo(coreTr("TITOOLS_ERROR_NOT_FOUND", "Resource not found"), stringFormat(" - In %s\n - File %s\n", func, file));
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
	utilsInfo(coreTr("TITOOLS_ERROR_PREFAB_UNSUPPORTED_FORMAT", "Unsupported prefab format"), stringFormat(" - In %s\n - File %s\n", prefab, jsonSerialize(prefab)));
}

function errorThisNotValue(func, name) {
	utilsInfo(coreTr("TITOOLS_ERROR_THIS_NOT_VALUE", "This is not value"), stringFormat(" - In %s\n - Value name %s\n", func, name));
}

function errorThisNotFunction(func, name) {
	utilsInfo(coreTr("TITOOLS_ERROR_THIS_NOT_FUNCTION", "This is not function"), stringFormat(" - In %s\n - Function name %s\n", func, name));
}

function errorControllerOverride(func, field) {
	utilsInfo(coreTr("TITOOLS_ERROR_CONTROLLER_OVERRIDE", "Controller override"), stringFormat(" - In %s\n - Function field %s\n", func, field));
}

//---------------------------------------------//
// TODO:NAMESPACE:RESULT
//---------------------------------------------//

var TiTools = {
	tr : coreTr,
	loadJS : coreLoadJS,
	getModule : coreGetModule,
	loadModule : coreLoadModule,
	debounce : coreDebounce,
	isSimulator : coreIsSimulator,
	isAndroid : coreIsAndroid,
	isIOS : coreIsIOS,
	isIPhone : coreIsIPhone,
	isIPad : coreIsIPad,
	isBoolean : coreIsBoolean,
	isNumber : coreIsNumber,
	isString : coreIsString,
	isDate : coreIsDate,
	isTiObject : coreIsTiObject,
	isObject : coreIsObject,
	isArray : coreIsArray,
	isRegExp : coreIsRegExp,
	isFunction : coreIsFunction,
	isEqual : coreIsEqual,
	isEmpty : coreIsEmpty,
	isNaN : coreIsNaN,
	avoidDoubleTap: avoidDoubleTap,
	getClickedParam: getClickedParam,
	Session : {
		lastActiveTime: lastActiveTime,
		checkActiveTime: checkActiveTime
	},
	Analytics: {
		trackEvent: analyticsTrackEvent,
		trackScreen: analyticsTrackScreen,
		trackTiming: analyticsTrackTiming
	},
	String : {
		isInt : stringIsInt,
		toInt : stringToInt,
		isFloat : stringIsFloat,
		toFloat : stringToFloat,
		replace : stringReplace,
		isPrefix : stringIsPrefix,
		isSuffix : stringIsSuffix,
		trim : stringTrim,
		trimLeft : stringTrimLeft,
		trimRight : stringTrimRight,
		paddingLeft : stringPaddingLeft,
		paddingRight : stringPaddingRight,
		repeat : stringRepeat,
		format : stringFormat,
		lines : stringLines,
		capitalize : stringCapitalize
	},
	Date : {
		interval : dateInterval,
		now : dateNow,
		make : dateMake,
		format : dateFormat
	},
	Global : {
		set : globalSet,
		get : globalGet
	},
	Screen : {
		UNKNOWN : SCREEN_UNKNOWN,
		SMALL : SCREEN_SMALL,
		NORMAL : SCREEN_NORMAL,
		LARGE : SCREEN_LARGE,
		EXTRA_LARGE : SCREEN_EXTRA_LARGE,
		width : screenWidth,
		height : screenHeight,
		resolution : screenResolution,
		dpi : screenDpi,
		mode : screenMode,
		isRetina : screenIsRetina
	},
	Geo : {
		configure : geoConfigure,
		currentPosition : geoCurrentPosition,
		distance : geoDistance
	},
	Path : {
		resources : pathResources(),
		controllers : pathControllers(),
		preprocess : pathPreprocess
	},
	FileSystem : {
		getFile : fileSystemGetFile
	},
	Network : {
		isOnline : networkIsOnline,
		createUri : networkCreateUri,
		createClientHttp : networkCreateHttpClient,
		decodeURIComponent : networkDecodeURIComponent,
		encodeURIComponent : networkEncodeURIComponent
	},
	JSON : {
		serialize : jsonSerialize,
		deserialize : jsonDeserialize
	},
	XML : {
		serialize : xmlSerialize,
		deserialize : xmlDeserialize,
		getNode : xmlGetNode,
		findNode : xmlFindNode,
		mergeNodeAttributes : xmlMergeNodeAttributes
	},
	CSV : {
		serialize : csvSerialize,
		deserialize : csvDeserialize
	},
	UI : {
		currentTab : undefined,
		currentFocus : undefined,
		createTabGroup : uiCreateTabGroup,
		createTab : uiCreateTab,
		createNavigationGroup : uiCreateNavigationGroup,
		createWindow : uiCreateWindow,
		createView : uiCreateView,
		createScrollView : uiCreateScrollView,
		createScrollableView : uiCreateScrollableView,
		createImageView : uiCreateImageView,
		createMaskedImage : uiCreateMaskedImage,
		createButton : uiCreateButton,
		createButtonBar : uiCreateButtonBar,
		createToolbar : uiCreateToolbar,
		createLabel : uiCreateLabel,
		createSwitch : uiCreateSwitch,
		createSlider : uiCreateSlider,
		createSearchBar : uiCreateSearchBar,
		createProgressBar : uiCreateProgressBar,
		createTextField : uiCreateTextField,
		createTextArea : uiCreateTextArea,
		createTableView : uiCreateTableView,
		createTableViewSection : uiCreateTableViewSection,
		createTableViewRow : uiCreateTableViewRow,
		createListView : uiCreateListView,
		createListSection : uiCreateListSection,
		createPicker : uiCreatePicker,
		createPickerColumn : uiCreatePickerColumn,
		createPickerRow : uiCreatePickerRow,
		createWebView : uiCreateWebView,
		createMapView : uiCreateMapView,
		createMapViewAnnotation : uiCreateMapViewAnnotation,
		createFacebookLoginButton : uiCreateFacebookLoginButton,
		createAlertDialog : uiCreateAlertDialog,
		createEmailDialog : uiCreateEmailDialog,
		createOptionDialog : uiCreateOptionDialog,
		createPhoneCallDialog : uiCreatePhoneCallDialog,
		createActivityIndicator : uiCreateActivityIndicator,
		ThirdParty : {
			createPaintView : uiThirdPartyCreatePaintView
		}
	},
	Preset : {
		set : presetSet,
		get : presetGet,
		remove : presetRemove,
		merge : presetMerge,
		load : presetLoad,
		parse : presetParse
	},
	Prefab : {
		set : prefabSet,
		get : prefabGet,
		remove : prefabRemove,
		load : prefabLoad,
		parse : prefabParse
	},
	Form : {
		Component : {
			install : formComponentInstall,
			uninstall : formComponentUninstall
		},
		load : formLoad,
		parse : formParse,
		create : formCreate,
		loadControl : formLoadControl
	},
	Project : {
		initialize : projectInitialize,
		loadPreset : projectLoadPreset,
		loadPrefab : projectLoadPrefab,
		loadController : projectLoadController,
		loadForm : projectLoadForm,
		createTabGroup : projectCreateTabGroup,
		createNavigationGroup : projectCreateNavigationGroup,
		createWindow : projectCreateWindow,
		createForm : projectCreateForm,
		createController : projectCreateController
	},
	Utils : {
		info : utilsInfo,
		sleep : utilsSleep,
		unigueID : utilsUnigueID,
		clone : utilsClone,
		combine : utilsCombine,
		appropriateAny : utilsAppropriateAny,
		appropriatePlatform : utilsAppropriatePlatform,
		appropriateScreen : utilsAppropriateScreen,
		stringToConst : utilsStringToConst
	},
	Plugin : {
		isLoad : pluginIsLoad,
		load : pluginLoad
	},
	ThirdParty : {
		underscore : thirdPartyUnderscore,
		underscoreString : thirdPartyUnderscoreString,
		moment : thirdPartyMoment
	},
	Module : _module
};

//---------------------------------------------//

module.exports = TiTools;

//---------------------------------------------//