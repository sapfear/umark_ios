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
		var t2 = require("TiTools2/TiTools");
	} else {
		var t2 = require("TiTools2_a/TiTools");
	}
	cmp = t2.Component;
	win = window;
	
	clicked = false;
	if(!Ti.Network.online) {
		offline = true;
	}
}

//---------------------------------------------//

function onWindowOpen(window, event) {
	
	form = t2.Form.load(window, "main/brands.form.js", {
		//showBrandCategories: showBrandCategories
	});
	
	for(i = 0; i < 5; i++){
		
		var elemForm = t2.Form.load(undefined, "templates/list/default.form.js", {title: 'Грейдеры - ' + i});
		var elem = elemForm.me;
		
		var winParams = {
			preset: "Window",
			style: {
				title: "Грейдеры"
			}
		};
		elem.addEventListener("click", function() {
			if(!clicked) {
				clicked = true;
				var elemWin = t2.Project.createWindow("category", winParams);
				cmp.setBackBtn(elemWin, "ЧТЗ - Уралтрак");
				t2.UI.currentTab.open(elemWin);	
			} 
			_.delay(function() {
				clicked = false;
			}, 1000);
		});
		
		form.me.add(elem);
		t2.Form.load(form.me, {
			prefab: "List.Separator"
		});
		
	}

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