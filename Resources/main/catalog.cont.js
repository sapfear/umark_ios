var t2,
	bank,
	cmp,
	win_main,
	form,
	mod,
	storeID;
	
//---------------------------------------------//

var clicked;
//---------------------------------------------//

function onInitController(window, params) {
	t2 = require("TiTools2/TiTools");
	cmp = t2.Component;
	win = window;
	request = t2.TxRx;
	
	if(!!params.storeID)
		storeID = params.storeID;
		
	t2.Utils.info(params.storeID);
	
	clicked = false;
	if(!Ti.Network.online) {
		offline = true;
	}
}

//---------------------------------------------//

function onWindowOpen(window, event) {
	
	form = t2.Form.load(window, "main/catalog.form.js", {
		//showBrandView: showBrandView
	});
	
	if(!!storeID){
		request.getBrands(storeID, function(result){
			t2.Utils.info(result);
			_.each(result, function(brand, i) {
				var elemForm = t2.Form.load(undefined, "templates/list/brand.form.js", {img: brand.img});
				var elem = elemForm.me;
			
				var winParams = {
					preset: "Window",
					style: {
						title: brand.name
					},
					args: {
						storeID: 4,
						brandID: brand.id
					}
				};
				elem.addEventListener("click", function() {
					if(!clicked) {
						clicked = true;
						var elemWin = t2.Project.createWindow("category", winParams);
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
			});
		});
	}
	

}

function onWindowClose(window, event) {
}

function showBrandView(event){
	if(!clicked) {
		clicked = true;
		if(0 && !Ti.Network.online) {
			cmp.createAlertDialog(undefined, "Error_NetworkOffline").show();
			clicked = false;
			return;
		}
		var brandsWin = t2.Project.createWindow("brands", {
			preset: "Window",
			style: {
				title: "ЧТЗ - Уралтрак"
			}
		});
		cmp.setBackBtn(brandsWin, "Каталог");
		
		t2.UI.currentTab.open(brandsWin);
		setTimeout(function() {
			clicked = false;
		}, 1000);
	}
	
}
//---------------------------------------------//

//---------------------------------------------//

module.exports = {
	onInitController: onInitController,
	onWindowOpen: onWindowOpen,
	onWindowClose: onWindowClose
};