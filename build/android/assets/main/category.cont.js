function onInitController(e,t){if("iphone"==Ti.Platform.osname)var r=require("TiTools2/TiTools");else var r=require("TiTools2_a/TiTools");cmp=r.Component,win=e,request=r.TxRx,parentID=void 0,storeID=void 0,categoryID=void 0,brandID=void 0,t.parentID&&(parentID=t.parentID),t.categoryID&&(categoryID=t.categoryID),t.storeID&&(storeID=t.storeID),clicked=!1,Ti.Network.online||(offline=!0)}function onWindowOpen(e,t){form=t2.Form.load(e,"main/category.form.js",{}),parentID?request.getCategoryies(parentID,function(e){e&&e.length>0?_.each(e,function(e,t){var r;e.parrent_id==t2.Global.get("mainCatalogID")?(t2.Utils.info("load brands"),r=t2.Form.load(void 0,"templates/list/brand.form.js",{title:e.name,img:t2.Path.imgUrl(e.img),right:0})):r=t2.Form.load(void 0,"templates/list/category.form.js",{title:e.name,img:t2.Path.imgUrl(e.img),right:0});var n=r.me,i={preset:"Window",style:{title:e.name},args:{parentID:e.id}};n.addEventListener("click",function(){if(!clicked){clicked=!0;var e=t2.Project.createWindow("category",i);t2.UI.currentTab.open(e)}_.delay(function(){clicked=!1},1e3)}),form.me.add(n),t2.Form.load(form.me,{prefab:"List.Separator"})}):request.getElements(parentID,function(e){_.each(e,function(e,t){var r=t2.Form.load(void 0,"templates/list/category.form.js",{title:e.name,img:t2.Path.imgUrl(e.img),right:40}),n=r.me,i={preset:"Window",style:{title:e.name},args:{element:e,instore:!1}};n.addEventListener("click",function(){if(!clicked){clicked=!0;var e=t2.Project.createWindow("element",i);t2.UI.currentTab.open(e)}_.delay(function(){clicked=!1},1e3)}),form.me.add(n),t2.Form.load(form.me,{prefab:"List.Separator"})})})}):storeID&&!categoryID?(t2.Utils.info(storeID),request.getCategoryiesInStore(storeID,function(e){t2.Utils.info(e),e&&e.length>0?_.each(e,function(e,t){var r=t2.Form.load(void 0,"templates/list/category.form.js",{title:e.name,img:"",right:0}),n=r.me,i={preset:"Window",style:{title:e.name},args:{categoryID:e.id,storeID:storeID}};n.addEventListener("click",function(){if(!clicked){clicked=!0;var e=t2.Project.createWindow("category",i);t2.UI.currentTab.open(e)}_.delay(function(){clicked=!1},1e3)}),form.me.add(n),t2.Form.load(form.me,{prefab:"List.Separator"})}):form.me.add(t2.UI.createLabel("L.Large.Blue",{left:10,right:10,height:150,text:"Ничего не найдено\n\nПопробуйте выбрать другой склад как основной",textAlign:Titanium.UI.TEXT_ALIGNMENT_CENTER}))})):categoryID&&storeID&&request.getElementsInStore(categoryID,storeID,function(e){_.each(e,function(e,t){var r=t2.Form.load(void 0,"templates/list/category.form.js",{title:e.name,img:t2.Path.imgUrl(e.img),right:40}),n=r.me,i={preset:"Window",style:{title:e.name},args:{element:e,instore:!0}};n.addEventListener("click",function(){if(!clicked){clicked=!0;var e=t2.Project.createWindow("element",i);t2.UI.currentTab.open(e)}_.delay(function(){clicked=!1},1e3)}),form.me.add(n),t2.Form.load(form.me,{prefab:"List.Separator"})})})}function onWindowClose(e,t){}var t2,bank,cmp,win_main,form,mod,parentID,request,storeID,brandID,categoryID,clicked;module.exports={onInitController:onInitController,onWindowOpen:onWindowOpen,onWindowClose:onWindowClose};