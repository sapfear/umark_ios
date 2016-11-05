var t2,
	bank,
	cmp,
	win_main,
	form,
	mod;
	
//---------------------------------------------//

var clicked;
//---------------------------------------------//

function onInitController(window, params) {
	if(Ti.Platform.osname == "iphone"){
		t2 = require("TiTools2/TiTools");
	} else {
		t2 = require("TiTools2_a/TiTools");
	}
	win_main = window;
	
	clicked = false;
	if(!Ti.Network.online) {
		offline = true;
	}
}

//---------------------------------------------//

function onWindowOpen(window, event) {
	



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