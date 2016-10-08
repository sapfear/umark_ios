var t2,
	bank,
	cmp,
	win_main,
	form,
	mod,
	parentID,
	request,
	storeID,
	brandID,
	categoryID;
	
//---------------------------------------------//

var clicked;
//---------------------------------------------//

function onInitController(window, params) {
	t2 = require("TiTools2/TiTools");
	cmp = t2.Component;
	win = window;
	request = t2.TxRx;
	
	parentID = undefined;
	storeID = undefined;
	categoryID = undefined;
	brandID = undefined;
	
	if(!!params.parentID)
		parentID = params.parentID;
		
	if(!!params.categoryID){
		categoryID = params.categoryID;
	}
		
	if(!!params.storeID){
		storeID = params.storeID;
	}
		
	clicked = false;
	if(!Ti.Network.online) {
		offline = true;
	}
}

//---------------------------------------------//

function onWindowOpen(window, event) {
	
	form = t2.Form.load(window, "main/category.form.js", {
		//showBrandCategories: showBrandCategories
	});
	
	if(!!parentID){
		
		request.getCategoryies(parentID, function(result){
			if(!!result && result.length > 0){
			
				_.each(result, function(category, i) {
					var elemForm;
					
					if (category.parrent_id == t2.Global.get("mainCatalogID")){
						elemForm = t2.Form.load(undefined, "templates/list/brand.form.js", {title: category.name, img: t2.Path.imgUrl(category.img), right: 0});
					} else {
						elemForm = t2.Form.load(undefined, "templates/list/category.form.js", {title: category.name, img: t2.Path.imgUrl(category.img), right: 0});
					}
					
					var elem = elemForm.me;
					
					var winParams = {
						preset: "Window",
						style: {
							title: category.name
						},
						args: {
							parentID: category.id
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
				
			} else {
				request.getElements(parentID, function(result){
					_.each(result, function(element, i) {
						var elemForm = t2.Form.load(undefined, "templates/list/category.form.js", {title: element.name, img: t2.Path.imgUrl(element.img), right: 40});
						var elem = elemForm.me;
					
						var winParams = {
							preset: "Window",
							style: {
								title: element.name
							},
							args: {
								element: element,
								instore: false
							}
						};
						elem.addEventListener("click", function() {
							if(!clicked) {
								clicked = true;
								var elemWin = t2.Project.createWindow("element", winParams);
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
		});
		
	} else if(!!storeID && !categoryID){
		t2.Utils.info(storeID);
		request.getCategoryiesInStore(storeID, function(result){
			t2.Utils.info(result);
			if(!!result && result.length > 0){
				_.each(result, function(category, i) {
					var elemForm = t2.Form.load(undefined, "templates/list/category.form.js", {title: category.name, img: '', right: 0});
					var elem = elemForm.me;
					
					var winParams = {
						preset: "Window",
						style: {
							title: category.name
						},
						args: {
							categoryID: category.id,
							storeID: storeID
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
			} else {
				form.me.add(t2.UI.createLabel("L.Large.Blue", {
					left: 10,
					right: 10,
					height: 150,
					text: "Ничего не найдено\n\nПопробуйте выбрать другой склад как основной",
					textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
				}));
			}
		});
	} else if(!!categoryID && !!storeID){
		request.getElementsInStore(categoryID, storeID, function(result){
			_.each(result, function(element, i) {
				var elemForm = t2.Form.load(undefined, "templates/list/category.form.js", {title: element.name, img: t2.Path.imgUrl(element.img), right: 40});
				var elem = elemForm.me;
					
				var winParams = {
					preset: "Window",
					style: {
						title: element.name
					},
					args: {
						element: element,
						instore: true
					}
				};
				elem.addEventListener("click", function() {
					if(!clicked) {
						clicked = true;
						var elemWin = t2.Project.createWindow("element", winParams);
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
//---------------------------------------------//

//---------------------------------------------//

module.exports = {
	onInitController: onInitController,
	onWindowOpen: onWindowOpen,
	onWindowClose: onWindowClose
};