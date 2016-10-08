var t2 = require("TiTools2/TiTools");

module.exports = {
	visible: false,
	init: function(message) {
		this.win = t2.UI.createWindow();

		// black view
		this.view = t2.UI.createView(undefined, {
			width: t2.Screen.width - 50,
			height: Ti.UI.SIZE,
			backgroundColor: "#000",
			borderRadius: 10,
			opacity: 0.8,
			layout: "vertical"
		});
		
		// this indicator
		this.activity = Ti.UI.createActivityIndicator({
			style: Ti.UI.iPhone && Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
			top: 25,
			height: 30,
			width: 30
		});
		this.view.add(this.activity);
		this.activity.show();
	
		// message			
		this.view.add(t2.UI.createLabel(undefined, {
			text: t2.tr("Wait"),
			color: "#fff",
			font: {
				fontSize: 20,
				fontWeight: "bold"
			},
			top: 25
		}));
		
		// empty view
		this.view.add(t2.UI.createView(undefined, {
			height: 20	
		}));
		
		// add black container view
		this.win.add(this.view);
	},
	show: function() {
		if(!this.visible) {
			this.win.open();
		}
		
		this.visible = true;
	},
	hide: function() {
		if(this.visible) {
			this.win.close();
		}
		
		this.visible = false;
	},
	getActivity: function() {
		return this.view;
	}
};