exports = {
	name: "me",
	"class": "View",
	preset: "List.Row",
	subviews: [
		{
			"class": "View",
			preset: "List.Row.ContentArea",
			style: {
				layout: "vertical",
				left: 0,
				right: 0,
			},
			subviews: [
				{
					"class": "Label",
					preset: "L.Large.Blue",
					style: {
						text: "<% title %>",
						height: 25,
						width: Ti.UI.FILL,
						top: 2,
						left: 0,
						right: 0,
					}
				}
			]
		}
	]
};