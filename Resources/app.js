// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//---------------------------------------------//

if(Ti.Platform.osname == "iphone"){
	var t2 = require("TiTools2/TiTools");
	var _ = t2.ThirdParty.underscore;
} else {
	var t2 = require("TiTools2_a/TiTools");
	var _ = t2.ThirdParty.underscore;
}

//---------------------------------------------//

t2.Plugin.load("Extension/Component", "Component");
t2.Plugin.load("Extension/Loading", "Loading");
t2.Plugin.load("Extension/TxRx", "TxRx");

t2.Global.set("rootUrl", "http://uralmarka.ru/");
t2.Global.set("url", "http://uralmarka.ru/mobile/api/");

t2.Global.set("mainCatalogID", 5);
t2.Global.set("mainStoreID", 14);
t2.Global.set("mainStoreCity", 'Челябинск');

t2.Geo.configure({
	provider: Titanium.Geolocation.PROVIDER_GPS,
	accuracy: Titanium.Geolocation.ACCURACY_BEST
});

//---------------------------------------------//


t2.Project.initialize({
	presets: {
		ios: [
			"presets/common.js",
			"presets/label.js",
			"presets/list.js"
		],
		android: [
			"presets/common.js",
			"presets/label.js",
			"presets/list.js"
		],
	},
	prefabs: {
		ios: [
			"prefabs/button.js",
			"prefabs/common.js",
			"prefabs/die.js",
			"prefabs/list.js"
		],
		android: [
			"prefabs/button.js",
			"prefabs/common.js",
			"prefabs/die.js",
			"prefabs/list.js"
		]
	},
	controllers: {
		"element": "main/element.cont.js",
		"category": "main/category.cont.js",
		"catalog": "main/catalog.cont.js",
		"brands": "main/brands.cont.js",
		"stores": "main/stores.cont.js",
		"store": "main/store.cont.js",
		"index": "main/index.cont.js",
	}
});

if(t2.isIOS){
	var titleControl = t2.UI.createView(undefined, {
		width: 187,
		height: 0,
		backgroundColor: '#fff'
	});
	
	Titanium.UI.setBackgroundColor('#fff');
	
	var tabgroup = t2.Project.createTabGroup({
		style: {
			bottom: -50
		},
		tabs: [
			{
				window: {
					controller: "index",
					params: {
						preset: "Window",
						style: {
							titleControl: titleControl,
							title: "МАРКА"
						},
						offline: false
					}
				}
			}
		]
	});
	
	setTimeout(function () {
		// open tab group
		tabgroup.open();
	}, 1 * 2500);
	
} else {
	
	var indexWin = t2.Project.createWindow("index", {
		preset: "Window",
		style: {
			titleControl: titleControl,
			title: "МАРКА",
			exitOnClose: true
		},
		offline: false
	});
	indexWin.open({modal: true});
}
