var t2,
	bank,
	cmp,
	win_main,
	form,
	mod;
	
//---------------------------------------------//

var clicked,
	offline;
//---------------------------------------------//

function onInitController(window, params) {
	if(Ti.Platform.osname == "iphone"){
		t2 = require("TiTools2/TiTools");
	} else {
		t2 = require("TiTools2_a/TiTools");
	}
	cmp = t2.Component;
	if(Ti.Platform.osname == "iphone"){
		win_main = window;
	}
	
	clicked = false;
	offline = false;
	if(!Ti.Network.online) {
		offline = true;
	}
}

function onFormPreLoad(parent) {
	if(Ti.Platform.osname != "iphone"){
		win_main = parent;
	}
}
//---------------------------------------------//

function onWindowOpen(window, event) {
	
	var imageLogo = Ti.UI.createImageView({
		image: (t2.isIOS) ? '/DefaultIcon-ios.png' : Ti.Filesystem.resourcesDirectory + '/iphone/DefaultIcon-ios.png',
		top: '5%',
		height: '22%'
	});
	win_main.add(imageLogo);
	
	var tab = Titanium.UI.createTab({
	    window: win_main,
	    bottom: -50
	});
	
	var catalog_label = Titanium.UI.createLabel({
		color:'#fff',
		text:'Каталог',
		font:{fontSize:20,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
		backgroundColor: '#0c8ccd',
		textAlign:'center',
		width:'65%',
		height: '10%',
		top: '32%'
	});
	
	catalog_label.addEventListener("click", showCatalogWin);
		
		
	var stores_label = Titanium.UI.createLabel({
		color:'#fff',
		text:'Склады',
		font:{fontSize:20,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
		backgroundColor: '#0c8ccd',
		textAlign:'center',
		width:'65%',
		height: '10%',
		top: '50%'
	});
	stores_label.addEventListener("click", showStoresWin);
	
	
	var instore_label = Titanium.UI.createLabel({
		color:'#fff',
		text:'В наличии',
		font:{fontSize:20,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
		backgroundColor: '#0c8ccd',
		textAlign:'center',
		width:'65%',
		height: '10%',
		top: '68%'
	});
	instore_label.addEventListener("click", showCurrentStoreWin);
	
	
	
	
	win_main.add(catalog_label);
	win_main.add(stores_label);
	win_main.add(instore_label);




}

function onWindowClose(window, event) {
}

//---------------------------------------------//
function showCatalogWin(event) {
	
	if(!clicked) {
		clicked = true;
		if(!Ti.Network.online) {
			cmp.createAlertDialog(undefined, "Error_NetworkOffline").show();
			clicked = false;
			return;
		}
		var catalogWin = t2.Project.createWindow("category", {
			preset: "Window",
			style: {
				title: "Каталог"
			},
			args: {
				parentID: t2.Global.get("mainCatalogID")
			}
		});
		
		//cmp.setBackBtn(catalogWin, "Марка");
		
		if(t2.isIOS){
			t2.UI.currentTab.open(catalogWin);
		} else {
			catalogWin.open();
		}
		setTimeout(function() {
			clicked = false;
		}, 1000);
	}
}

// validate user token and show my bank window
function showCurrentStoreWin(event) {
	
	if(!clicked) {
		clicked = true;
		if(!Ti.Network.online) {
			cmp.createAlertDialog(undefined, "Error_NetworkOffline").show();
			clicked = false;
			return;
		}
		var catalogWin = t2.Project.createWindow("category", {
			preset: "Window",
			style: {
				title: t2.Global.get("mainStoreCity")
			},
			args:{
				storeID: t2.Global.get("mainStoreID")
			}
		});
		
		//cmp.setBackBtn(catalogWin, "Марка");
		
		if(t2.isIOS){
			t2.UI.currentTab.open(catalogWin);
		} else {
			catalogWin.open();
		}
		setTimeout(function() {
			clicked = false;
		}, 1000);
	}
}


// validate user token and show my bank window
function showStoresWin(event) {
	
	if(!clicked) {
		clicked = true;
		if(!Ti.Network.online) {
			cmp.createAlertDialog(undefined, "Error_NetworkOffline").show();
			clicked = false;
			return;
		}
		
		var storesWin = t2.Project.createWindow("stores", {
			preset: "Window",
			style: {
				title: "Склады"
			}
		});
		
		//cmp.setBackBtn(storesWin, "Марка");
		
		if(t2.isIOS){
			t2.UI.currentTab.open(storesWin);
		} else {
			storesWin.open();
		}
		setTimeout(function() {
			clicked = false;
		}, 1000);
	}
}

//---------------------------------------------//

module.exports = {
	onInitController: onInitController,
	onWindowOpen: onWindowOpen,
	onWindowClose: onWindowClose,
	onFormPreLoad: onFormPreLoad
};