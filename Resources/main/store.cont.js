var t2,
	bank,
	cmp,
	win_main,
	form,
	mod,
	storeInfo,
	Map,
	cmp;
	
//---------------------------------------------//

var clicked;
//---------------------------------------------//

function onInitController(window, params) {
	t2 = require("TiTools2/TiTools");
	win_main = window;
	storeInfo = params;
	Map = require('ti.map');
	cmp = t2.Component;
	
	clicked = false;
	if(!Ti.Network.online) {
		offline = true;
	}
}

//---------------------------------------------//

function onWindowOpen(window, event) {
	
	prepareText = function(text){
		//text = text.replace(': +7', ':       +7');
		text = text.replace(/(\\r\\n|\n|\r|\t)/gm,"");
		text = text.replace(new RegExp('</td><td>', 'g'), ': ');
		text = text.replace(new RegExp('&nbsp;', 'g'), ' ');
		text = text.replace(new RegExp('&ndash;', 'g'), '-');
		text = text.replace(new RegExp('&quot;', 'g'), '"');
		text = text.replace(new RegExp('&deg;', 'g'), '°');
		text = text.replace(new RegExp('</tr><tr>', 'g'), "\n");
		
		text = text.replace(new RegExp(' ', 'g'), '');
		text = text.replace(new RegExp(',', 'g'), '\n');

		return text.replace(/<\/?[^>]+>/gi, '');
	};
	
	var mapScale = t2.Screen.width-20;
	
	form = t2.Form.load(window, "main/store.form.js", {
		//showBrandCategories: showBrandCategories
		title: storeInfo.title,
		adr: prepareText(storeInfo.contacts.adr),
		phone: prepareText(storeInfo.contacts.phone),
		email: prepareText(storeInfo.contacts.email),
		mapWidth: mapScale,
		mapHeight: mapScale,
		storeBtnClick: function(){
			t2.Utils.info(storeInfo);
			t2.Utils.info(storeInfo.id);
			t2.Global.set("mainStoreID", storeInfo.id);
			t2.Global.set("mainStoreCity", storeInfo.contacts.city);
			cmp.createAlertDialog(storeInfo.contacts.city, "Склад успешно выбран!").show();
		},
		phoneClick: function(){
			var phoneArray = prepareText(storeInfo.contacts.phone).split("\n");
			phoneArray.push('Отмена');
						
			var phoneDialog = Ti.UI.createOptionDialog({
			  cancel: phoneArray.length - 1,
			  options: phoneArray,
			  selectedIndex: phoneArray.length - 1
			});
			// handler
			phoneDialog.addEventListener("click", function(e) {
				if(e.index !== phoneArray.length - 1) {
					t2.Utils.info('call ' + phoneArray[e.index]);
					Ti.Platform.openURL('tel:'+ phoneArray[e.index]);				
				}
			});
			phoneDialog.show();
		},
		emailClick: function(){
			var emailDialog = Titanium.UI.createEmailDialog();
			emailDialog.toRecipients = [prepareText(storeInfo.contacts.email)];
			
			emailDialog.open();
		}
	});
	
	if(!!storeInfo.location && !!storeInfo.location.lat && !!storeInfo.location.lon){
		var annotation = Map.createAnnotation({
			latitude: storeInfo.location.lon,
			longitude: storeInfo.location.lat,
			title: storeInfo.title,
			subtitle: prepareText(storeInfo.contacts.adr),
			animate: true
		});
		var mapView = Map.createView({
			mapType: Map.STANDARD_TYPE,
			animate: false,
			userLocation: true,
			regionFit: true,
           	annotations:[annotation],
           	top: 10,
           	bottom: 20,
		});
		
		form.map.add(mapView);
		
		mapView.setLocation({
			latitude: storeInfo.location.lon,
			longitude: storeInfo.location.lat,
			animate: true,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01
		});
		mapView.selectAnnotation(annotation);
	}
	
	//form.add(titleLabel);
}

function onWindowClose(window, event) {
}

//---------------------------------------------//

//---------------------------------------------//

module.exports = {
	onInitController: onInitController,
	onWindowOpen: onWindowOpen,
	onWindowClose: onWindowClose
};