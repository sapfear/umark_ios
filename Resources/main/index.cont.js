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
	t2 = require("TiTools2/TiTools");
	cmp = t2.Component;
	win_main = window;
	
	clicked = false;
	offline = false;
	if(!Ti.Network.online) {
		offline = true;
	}
}

//---------------------------------------------//

function onWindowOpen(window, event) {
	
	
	var imageLogo = Ti.UI.createImageView({
		image: Ti.Filesystem.resourcesDirectory + '/DefaultIcon-ios.png',
		top: '10dp',
		width: '40%'
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
		width:'200dp',
		height: '50dp',
		top: '140dp'
	});
	
	catalog_label.addEventListener("click", showCatalogWin);
		
		
	var stores_label = Titanium.UI.createLabel({
		color:'#fff',
		text:'Склады',
		font:{fontSize:20,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
		backgroundColor: '#0c8ccd',
		textAlign:'center',
		width:'200dp',
		height: '50dp',
		top: '230dp'
	});
	stores_label.addEventListener("click", showStoresWin);
	
	
	var instore_label = Titanium.UI.createLabel({
		color:'#fff',
		text:'В наличии',
		font:{fontSize:20,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
		backgroundColor: '#0c8ccd',
		textAlign:'center',
		width:'200dp',
		height: '50dp',
		top: '320dp'
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
		
		t2.UI.currentTab.open(catalogWin);
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
		
		t2.UI.currentTab.open(catalogWin);
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
		
		t2.UI.currentTab.open(storesWin);
		setTimeout(function() {
			clicked = false;
		}, 1000);
	}
}

//---------------------------------------------//

module.exports = {
	onInitController: onInitController,
	onWindowOpen: onWindowOpen,
	onWindowClose: onWindowClose
};