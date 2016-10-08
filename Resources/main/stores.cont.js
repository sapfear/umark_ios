var t2,
	bank,
	cmp,
	win_main,
	form,
	mod,
	request,
	formsContainer,
	distView,
	mapLocation;
	
//---------------------------------------------//

var clicked;
//---------------------------------------------//

function onInitController(window, params) {
	t2 = require("TiTools2/TiTools");
	cmp = t2.Component;
	win = window;
	request = t2.TxRx;
	
	clicked = false;
	if(!Ti.Network.online) {
		offline = true;
	}
}

//---------------------------------------------//

function onWindowOpen(window, event) {
	
	form = t2.Form.load(window, "main/stores.form.js", {
		//showBrandCategories: showBrandCategories
	});
	var bb1 = Titanium.UI.iOS.createTabbedBar({
	    labels: ['Списком', 'На карте'],
	    backgroundColor: '#0c8ccd',
	    top: 10,
	    //style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
	    height: 25,
	    width: '100%',
	    index: 0
	});
	
	bb1.addEventListener("click", function(e){
		if(e.index == 0){
			showByDistance();
		}
		if(e.index == 1){
			showOnMap();
		}
	});
	
	form.me.add(bb1);
	
	distView = Ti.UI.createScrollView({
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		layout: "vertical"
	});
	
	formsContainer = Ti.UI.createScrollableView({
		scrollingEnabled: false,
		height: Ti.UI.FILL,
		bottom: 10,
		top: 10
	});
	
	form.me.add(formsContainer);
	
	
	var loaded = false;
	t2.Geo.currentPosition({
		success: function(location) {
			if(!loaded){
				showStores(location);
				loaded = true;
			}
		},
		failure: function() {
			if(!loaded){
				showStores(false);
				loaded = true;
			}
		}
	});
}

function createMapView(mapLocation, result) {
								
	var map = require("main/map.cont");
	mapView = new map(win, result);
		
	// set user location as center	
	mapView.setLocation({
		latitude: mapLocation.latitude,
		longitude: mapLocation.longitude,
		animate: true,
		latitudeDelta: 10,
		longitudeDelta: 10
	});
	
	return mapView;
}

function showStores(location){
	Ti.API.info('stores start ');
	t2.Utils.info(location);
	request.getStoresList(function(result){
		var storesList = result;
		
		if(!_.isEmpty(storesList)) {
			_.each(storesList, function(store, i) {
				var dist = '';
				if (!!location && !!store.location && !!store.location.lon && !!store.location.lat){
					dist = (+t2.Geo.distance({longitude: store.location.lat, latitude: store.location.lon}, location));
					dist = (dist/1000).toFixed(1);
					dist += ' км.';
				}
				
				var elemForm = t2.Form.load(undefined, "templates/list/store.form.js", {title: store.contacts.city.substring(0, !!dist ? 22 : 35), dist: dist, rightOffset: !!dist ? 80 : 0});
				var elem = elemForm.me;
		
				var winParams = {
					preset: "Window",
					style: {
						title: store.contacts.city.substring(0, 20)
					},
					args: {
						title: store.name,
						location: store.location,
						contacts: store.contacts,
						id: store.id
					}
				};
				elem.addEventListener("click", function() {
					if(!clicked) {
						clicked = true;
						var elemWin = t2.Project.createWindow("store", winParams);
						t2.UI.currentTab.open(elemWin);	
					} 
					_.delay(function() {
						clicked = false;
					}, 1000);
				});
				
				distView.add(elem);
				t2.Form.load(distView, {
					prefab: "List.Separator"
				});
			});
		}
		
		if(!!location){
			formsContainer.views = [distView, createMapView(location, storesList)];
		} else {
			formsContainer.views = [distView, createMapView({longitude:"55.16089", latitude:"61.492655"}, storesList)];
		}
		
	});

}

function onWindowClose(window, event) {
}
//---------------------------------------------//

function showByDistance() {
	formsContainer.scrollToView(0);
	if(mapView) {
		mapView.userLocation = false;		
	}
}

function showOnMap() {
	if(formsContainer.views.length === 2) {
		formsContainer.scrollToView(1);
		mapView.userLocation = true;
	}
}
//---------------------------------------------//

module.exports = {
	onInitController: onInitController,
	onWindowOpen: onWindowOpen,
	onWindowClose: onWindowClose
};