function onInitController(e,t){if("iphone"==Ti.Platform.osname)var r=require("TiTools2/TiTools");else var r=require("TiTools2_a/TiTools");cmp=r.Component,win_main=e,clicked=!1,offline=!1,Ti.Network.online||(offline=!0)}function onWindowOpen(e,t){var r=Ti.UI.createImageView({image:Ti.Filesystem.resourcesDirectory+"/DefaultIcon-ios.png",top:"10dp",width:"40%"});win_main.add(r);var n=(Titanium.UI.createTab({window:win_main,bottom:-50}),Titanium.UI.createLabel({color:"#fff",text:"Каталог",font:{fontSize:20,fontFamily:"Helvetica Neue",fontWeight:"bold"},backgroundColor:"#0c8ccd",textAlign:"center",width:"200dp",height:"50dp",top:"140dp"}));n.addEventListener("click",showCatalogWin);var i=Titanium.UI.createLabel({color:"#fff",text:"Склады",font:{fontSize:20,fontFamily:"Helvetica Neue",fontWeight:"bold"},backgroundColor:"#0c8ccd",textAlign:"center",width:"200dp",height:"50dp",top:"230dp"});i.addEventListener("click",showStoresWin);var o=Titanium.UI.createLabel({color:"#fff",text:"В наличии",font:{fontSize:20,fontFamily:"Helvetica Neue",fontWeight:"bold"},backgroundColor:"#0c8ccd",textAlign:"center",width:"200dp",height:"50dp",top:"320dp"});o.addEventListener("click",showCurrentStoreWin),win_main.add(n),win_main.add(i),win_main.add(o)}function onWindowClose(e,t){}function showCatalogWin(e){if(!clicked){if(clicked=!0,!Ti.Network.online)return cmp.createAlertDialog(void 0,"Error_NetworkOffline").show(),void(clicked=!1);var t=t2.Project.createWindow("category",{preset:"Window",style:{title:"Каталог"},args:{parentID:t2.Global.get("mainCatalogID")}});t2.isIOS?t2.UI.currentTab.open(t):t.open(),setTimeout(function(){clicked=!1},1e3)}}function showCurrentStoreWin(e){if(!clicked){if(clicked=!0,!Ti.Network.online)return cmp.createAlertDialog(void 0,"Error_NetworkOffline").show(),void(clicked=!1);var t=t2.Project.createWindow("category",{preset:"Window",style:{title:t2.Global.get("mainStoreCity")},args:{storeID:t2.Global.get("mainStoreID")}});t2.isIOS?t2.UI.currentTab.open(t):t.open(),setTimeout(function(){clicked=!1},1e3)}}function showStoresWin(e){if(!clicked){if(clicked=!0,!Ti.Network.online)return cmp.createAlertDialog(void 0,"Error_NetworkOffline").show(),void(clicked=!1);var t=t2.Project.createWindow("stores",{preset:"Window",style:{title:"Склады"}});t2.isIOS?t2.UI.currentTab.open(t):t.open(),setTimeout(function(){clicked=!1},1e3)}}var t2,bank,cmp,win_main,form,mod,clicked,offline;module.exports={onInitController:onInitController,onWindowOpen:onWindowOpen,onWindowClose:onWindowClose};