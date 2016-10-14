if(Ti.Platform.osname == "iphone"){
	var t2 = require("TiTools2/TiTools");
} else {
	var t2 = require("TiTools2_a/TiTools");
}

var cmp = t2.Component,
	_ = t2.ThirdParty.underscore,
	_str = t2.ThirdParty.underscoreString,
	moment = t2.ThirdParty.moment,
	indicator = t2.Loading;
	indicator.init();
var authQuery = [];
//---------------------------------------------//

function request(type, customCode, args, successCallback, failureCallback, settings, hookUrl) {
	
	if(!Ti.Network.online) {
		return {
			run: function() {
				t2.Component.createAlertDialog(undefined, "Error_NetworkOffline").show();
				failureCallback();
			}
		};
	}
	
	//settings
	var rootUrl, 
		loging, 
		loading = true, 
		queue,
		contentType,
		post,
		put,
		timeout,
		notDecode;
	var settings = settings || {};	
	rootUrl = !!settings.rootUrl;
	loging  = !!settings.loging;
	notDecode = !!settings.notDecode;
	loging = true;
	queue   = settings.queue;
	contentType = (settings.contentType === undefined) ? "application/x-www-form-urlencoded" : settings.contentType;
	if(settings.loading !== undefined) {
		loading = !!settings.loading;
	}
	post = (settings.post !== undefined) ? settings.post : undefined;
	put = (settings.put !== undefined) ? settings.put : undefined;
	timeout = (settings.timeout !== undefined) ? settings.timeout : 30000;
	//headers
	var headers = {
		"Accept": "application/json",
		"Content-Type": contentType
	};
	if(t2.Global.get("user")) {
		headers["Auth-Token"] = t2.Global.get("user").token;
	}
	// url
	var url = (rootUrl) ? t2.Global.get("rootUrl") : t2.Global.get("url");
	if(hookUrl !== undefined) {
		url = hookUrl;
	}
	//request
	var requestObj = t2.Network.createClientHttp({
		queue: queue,
		options: {
			method: type,
			url: url + customCode,
			headers: headers,
			args: args,
			post: post,
			put: put,
			timeout: timeout,
			notDecode: notDecode
		},
		loading: function() {
			if(loading) {
				indicator.show();
			}
		},
		loaded: function() {
			if(loading) {
				indicator.hide();
			}
		},
		success: function(handle) {
			var result = t2.JSON.deserialize(handle.response("text"));
			if(loging) {
				Ti.API.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
				Ti.API.info("BANK SUCCESS: " + type + " " + url + customCode);
				if(!_.isEmpty(args)) {
					Ti.API.info("params");
					t2.Utils.info(args);	
				}
				if(post !== undefined) {
					Ti.API.info("post");
					t2.Utils.info(post);
				}
				if(put !== undefined) {
					Ti.API.info("put");
					t2.Utils.info(put);
				}
				Ti.API.info("result");
				t2.Utils.info(result);
				Ti.API.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
			}
			successCallback(result, handle);
		},
		failure: function(handle) {	
			if(handle.status === undefined) {
				t2.Component.createAlertDialog(undefined, "Error_NetworkOffline").show();
				return;
			}
			if(loging) {
				Ti.API.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
				Ti.API.info("BANK FAILURE: " + type + " " + url + customCode);
				Ti.API.info("status " + handle.status());
				if(!_.isEmpty(args)) {
					Ti.API.info("params");
					t2.Utils.info(args);	
				}
				if(post !== undefined) {
					Ti.API.info("post");
					t2.Utils.info(post);
				}
				if(put !== undefined) {
					Ti.API.info("put");
					t2.Utils.info(put);
				}
				Ti.API.info("response");
				t2.Utils.info(handle.response("text"));
				Ti.API.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
			}
			if(handle.status() === 403) {
				var navWin;
				var query = request(type, customCode, args, successCallback, failureCallback, settings);
				authQuery.push(query);
				if(authQuery.length == 1){
					var loginWin = t2.Project.createWindow("login", {
						preset: "Window",
						style: {
							titleid: "EntranceToBank"
						},
						args: {
							onSuccessCallback: function() {
								//if(query != undefined) {
								//	query.run(0);
								//}
								if (authQuery.length > 0){
									_.each(authQuery, function(element, index){Ti.API.info(index);element.run(0);});
								}
								authQuery = [];
							},
							closeCallback: function(){ 
								navWin.close(); 
							}
						}
					});
				
					navWin = Ti.UI.iOS.createNavigationWindow({
					    modal: true,
						window: loginWin
					});
					
					navWin.open();
				}
				return;
			}
			try {
				var result = t2.JSON.deserialize(handle.response("text"));	
			} catch(e) {
				
			}		
			var failure = failureCallback(handle, result);
			if(!!result && result.restrict_message !== undefined) {
				if(_.isArray(result.restrict_message) && !_.isEmpty(result.restrict_message)) {
					cmp.createAlertDialog(undefined, _.first(result.restrict_message)).show();	
				}
				if(_.isString(result.restrict_message)) {
					cmp.createAlertDialog(undefined, result.restrict_message).show();
				}
			} else {
				if(_.isString(failure)) {
					cmp.createAlertDialog(undefined, failure).show();
				}	
			}
		}
	});	
	
	return requestObj;	
}

//---------------------------------------------//

function blankFailure(error) {
	return t2.tr("Error_Common");
}

function getBrands(storeID, success){
	function getBrands(result){
		t2.Utils.info(storeID);
		_.each(result, function(store, i) {
			if(!!store.location && !!store.location.lon && !!store.location.lat && (store.location.lon + '' + store.location.lat == storeID)){
				t2.Utils.info(store.location.lon + '' + store.location.lat);
				success(store.brands);
			}
		});
		
	}
	request("GET", "stores/", {}, getBrands, function(){}, {}).run();
}

function getStoresList(success){
	request("GET", "stores/", {}, success, function(){}, {}).run();
}

function getElements(id, success){
	request("GET", "items/?category_id=" + id, {}, success, function(){}, {}).run();
}

function getElementsInStore(categoryID, storeID, success){
	request("GET", "category/?category_id=" + categoryID + '&store_id=' + storeID, {}, success, function(){}, {}).run();
}

function getCategoryiesInStore(storeID, success){
	
	function getCategories(result){
		_.each(result, function(store, i) {
			if(!!store.id && store.id == storeID){
				success(store.categories);
			}
		});
		
	}
	
	request("GET", "stores/", {}, getCategories, function(){}, {}).run();
	//request("GET", "brand/?brand_id=" + storeID + "&store_id=" + brandID, {}, success, function(){}, {}).run();
}

function getCategoryies(id, success){
	function getCats(result){
		var catList = [];
		_.each(result, function(category, i) {
			if(category.parrent_id-0 == id){
				catList.push(category);
			}
		});
		success(catList);
	}
	
	request("GET", "group/", {}, getCats, function(){}, {}).run();	
}
//---------------------------------------------//
// ------------- XXX: MOBILE BANK -------------//
//---------------------------------------------//

// XXX: INDEX

function checkVersion(success){
	request("GET", "/assets/mobile_version.json", {}, success, function(){}, {loading: false, rootUrl: true}).run();
}

// get announcements
function getAnnouncements(success, failure) {
	request("GET", "announcements/login_page", {}, success, failure, {loading: false}).run();
}

//---------------------------------------------//

// XXX: MOBILE BANK -> LOGIN

// login
function login(email, password, confirmationType, success, failure) {
	if (typeof(failure) !== 'function'){
		failure = function(error, result) {
			if(error.status() === 401 || (error.status() === 422 && result.error != undefined)) {
				return result.error;	
				//return "Error_Unauthorized";			
			} else {
				return t2.tr("Error_Common");
			}
		};
	}
	
	var params = {
		email: email.toLowerCase(),
		password: password,
		confirmation_type: confirmationType
	};
	
	request("POST", "session", {}, success, failure, { 
		post: JSON.stringify(params), 
		contentType: "application/json",
		loging: false 
	}).run();
}


//---------------------------------------------//

module.exports = {
	request: request,
	getStoresList: getStoresList,
	getCategoryies: getCategoryies,
	getElements: getElements,
	getBrands: getBrands,
	getCategoryiesInStore: getCategoryiesInStore,
	getElementsInStore: getElementsInStore,

};