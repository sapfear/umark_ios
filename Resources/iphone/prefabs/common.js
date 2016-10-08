module.exports = [
	{
		name: "Check",
		prefab: {
			"class": "ImageView",
			style: {
				touchEnabled: false,
				image: "%ResourcesPath%Media/Checkbox/Check.png",
				width: 15,
				height: 15,
				right: 15
			}
		}
	},
	{
		name: "Warning.Big",
		prefab: {
			"class": "ImageView",
			style: {
				image: "%ResourcesPath%Media/Icon/Warning.Big.png",
				width: 31,
				height: 28,
				top: 0,
				right: 3
			}
		} 
	},
	{
		name: "ButtonMenuIndicator",
		prefab: {
			"class": "View",
			style: {
				touchEnabled: false,
				backgroundImage: "%ResourcesPath%Media/Icon/Indicator.Big.png",
				top: -8,
				right: 0,
				width: 41,
				height: 41,
			},
			subviews: [
				{
					"class": "Label",
					preset: "L.Normal.White",
					style: {
						touchEnabled: false,
						width: Ti.UI.SIZE,
						text: "<% count %>"						
					}
				}
			]
		}
	}
];