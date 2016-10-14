function onTouchstart(e) {
	//e.source.backgroundImage = e.source.backgroundImage.replace("Normal", "Pressed");
}

function onTouchend(e) {
	//e.source.backgroundImage = e.source.backgroundImage.replace("Pressed", "Normal");
}

function onTouchcancel(e) {
	//e.source.backgroundImage = e.source.backgroundImage.replace("Pressed", "Normal");
}

module.exports = [
	// SIMPLE BUTTON
	{
		name: "Button.Simple",
		prefab: {
			"class": "View",
			style: {
				backgroundImage: "%ResourcesPath%Media/Button/Small.Normal.png",
				backgroundLeftCap: 20,
				width: Ti.UI.FILL,
				height: 46,
				enable: function() {
					this.opacity = 1;
					this.title.opacity = 1;
					this.touchEnabled = true;
				},
				disable: function() {
					this.opacity = 0.5;
					this.title.opacity = 0.5;
					this.touchEnabled = false;
				}
			},
			subviews: [
				{
					name: "title",
					target: "parent",
					"class": "Label",
					preset: "L.Button.Small",
					style: {
						touchEnabled: false,
						text: "<% text %>"
					}
				}
			],
			bind: {
				disable: function(e) {
					var me = e.source;
					me.opacity = 0.5;
					me.title.opacity = 0.5;
					me.touchEnabled = false;
				},
				singletap: "debounce(onSingletap, 1000)",
				touchstart: onTouchstart,
				touchend: onTouchend,
				touchcancel: onTouchcancel
			}
		}
	},
	// MENU BUTTON
	{
		name: "Button.Menu",
		prefab: {
			"class": "View",
			style: {
				top: 5,
				left: 5,
				right: 5,
				backgroundImage: "%ResourcesPath%Media/Button/Middle.Normal.png",
				backgroundLeftCap: 25,
				width: Ti.UI.FILL,
				height: 60,
			},
			subviews: [
				{
					"class": "Label",
					preset: "L.Button.Big",
					style: {
						top: "30%",
						left: 15,
						text: "<% text %>"
					}
				},
				{
					"class": "ImageView",
					style: {
						touchEnabled: false,
						right: 20,
						image: "%ResourcesPath%Media/Button/Arrow.png",
						width: 16,
						height: 16
					}
				}
			],
			bind: {
				singletap: "debounce(onSingletap, 1000)",
				touchstart: onTouchstart,
				touchend: onTouchend,
				touchcancel: onTouchcancel
			}
		}
	},
	// INDEX SCREEN BUTTON
	{
		name: "Button.Icon",
		prefab: {
			"class": "View",
			style: {
				top: 5,
				left: 10,
				right: 10,
				width: Ti.UI.FILL,
				backgroundImage: "%ResourcesPath%Media/Button/Big.Normal.png",
				backgroundLeftCap: 40,
				height: 84
			},
			subviews: [
				{
					"class": "ImageView",
					style: {
						touchEnabled: false,
						left: 10,
						image: "<% icon %>",
						width: 48,
						height: 48
					}
				},
				{
					"class": "Label",
					preset: "L.Button.Big",
					style: {
						left: 80,
						text: "<% text %>"
					}
				},
				{
					"class": "ImageView",
					style: {
						touchEnabled: false,
						right: 20,
						image: "%ResourcesPath%Media/Button/Arrow.png",
						width: 16,
						height: 16
					}
				}
			],
			bind: {
				singletap: "debounce(onSingletap, 1000)",
				touchstart: onTouchstart,
				touchend: onTouchend,
				touchcancel: onTouchcancel
			}
		}
	},
	// BAR LEFT BUTTON
	{
		name: "Button.Bar.Left",
		prefab: {
			"class": "View",
			style: {
				backgroundImage: "%ResourcesPath%Media/Button/Bar.Left.Normal.png",
				backgroundLeftCap: 20,
				width: "<% width %>",
				height: 35,
				left: 0
			},
			subviews: [
				{
					"class": "Label",
					preset: "L.Button.Bar",
					style: {
						text: "<% text %>"
					}
				}
			],
			bind: {
				click: "onClick"
			}
		}
	},
	// BAR CENTER BUTTON
	{
		name: "Button.Bar.Center",
		prefab: {
			"class": "View",
			style: {
				backgroundImage: "%ResourcesPath%Media/Button/Bar.Center.Normal.png",
				backgroundLeftCap: 20,
				width: "<% width %>",
				height: 35,
				left: 0
			},
			subviews: [
				{
					"class": "Label",
					preset: "L.Button.Bar",
					style: {
						text: "<% text %>"
					}
				}
			],
			bind: {
				click: "onClick"
			}
		}
	},
	// BAR RIGHT BUTTON
	{
		name: "Button.Bar.Right",
		prefab: {
			"class": "View",
			style: {
				backgroundImage: "%ResourcesPath%Media/Button/Bar.Right.Normal.png",
				backgroundLeftCap: 20,
				width: "<% width %>",
				height: 35,
				right: 0
			},
			subviews: [
				{
					"class": "Label",
					preset: "L.Button.Bar",
					style: {
						text: "<% text %>"
					}
				}
			],
			bind: {
				click: "onClick"
			}
		}
	},
	// ADD NEW MSG TO DIALOGUE BUTTON
	{
		name: "Button.Msg",
		prefab: {
			"class": "View",
			style: {
				backgroundImage: "%ResourcesPath%Media/Button/Msg.Normal.png",
				backgroundLeftCap: 10,
				width: Ti.UI.FILL,
				height: 32,
			},
			subviews: [
				{
					"class": "Label",
					preset: "L.Button.Small",
					style: {
						text: "<% text %>"
					}
				}
			],
			bind: {
				singletap: "debounce(onSingletap, 1000)",
				touchstart: onTouchstart,
				touchend: onTouchend
			}
		}
	},
	// NAV BAR BUTTON
	{
		name: "Button.Nav",
		prefab: {
			"class": "View",
			style: {
				// touchEnabled: false,
				backgroundImage: "%ResourcesPath%Media/Button/Nav.Normal.png",
				backgroundLeftCap: 10,
				width: Ti.UI.SIZE,
				height: 32
			},
			subviews: [
				{
					"class": "Label",
					preset: "L.Small.White",
					style: {
						touchEnabled: false,
						top: 7,
						left: 7,
						right: 7,
						width: Ti.UI.SIZE,
						text: "<% text %>"
					}
				}
			],
			bind: {
				singletap: "debounce(onSingletap, 1000)",
				touchstart: onTouchstart,
				touchend: onTouchend
			}
		}
	},
	// SPECIAL FILTER NAV BAR BUTTON
	{
		name: "Button.Nav.Filter",
		prefab: {
			"class": "View",
			style: {
				// touchEnabled: false,
				backgroundImage: "%ResourcesPath%Media/Button/Nav.Normal.png",
				backgroundLeftCap: 10,
				width: Ti.UI.SIZE,
				height: 32,
				changeTypes: function(newTypes) {
					this.choosenWrapper.removeAllChildren();
					if(newTypes.length !== 0) {
						for(var i = 0; i < newTypes.length; i++) {
							t2.Form.load(this.choosenWrapper, {
								"class": "ImageView",
								style: {
									touchEnabled: false,
									image: "%ResourcesPath%Media/Icon/Geo/Point."+newTypes[i]+".png",
									width: 7,
									height: 7	
								}
							});
						}	
					}
				}
			},
			subviews: [
				{
					name: "choosenWrapper",
					target: "parent",
					"class": "View",
					style: {
						touchEnabled: false,
						bottom: 2,
						layout: "horizontal",
						height: Ti.UI.SIZE,
						width: Ti.UI.SIZE,
					}
				},
				{
					"class": "Label",
					preset: "L.Small.White",
					style: {
						touchEnabled: false,
						top: 7,
						left: 7,
						right: 7,
						width: Ti.UI.SIZE,
						text: "<% text %>"
					}
				}
			],
			bind: {
				singletap: "debounce(onSingletap, 1000)",
				touchstart: onTouchstart,
				touchend: onTouchend
			}
		}
	},
	// BACK
	{
		name: "Button.Back",
		prefab: {
			"class": "View",
			style: {
				// touchEnabled: false,
				backgroundLeftCap: 15,
				width: Ti.UI.SIZE,
				height: 32
			},
			subviews: [
				{
					"class": "Label",
					preset: "L.Blue",
					style: {
						touchEnabled: false,
						top: 5,
						left: 0,
						right: 7,
						width: Ti.UI.SIZE,
						height: Ti.UI.SIZE,
						text: "<% text %>"
					}
				}
			],
			bind: {
				singletap: "debounce(onSingletap, 1000)",
				touchstart: onTouchstart,
				touchend: onTouchend
			}
		}
	}
];
