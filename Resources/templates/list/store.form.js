exports = {
	name: "me",
	"class": "View",
	preset: "List.Row",
	subviews: [
		{
			"class": "View",
			preset: "List.Row.ContentArea",
			style: {
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
						right: "<% rightOffset %>",
					}
				},
				{
					"class": "Label",
					preset: "L.Normal.DarkGray",
					style: {
						text: "<% dist %>",
						height: 25,
						width: Ti.UI.FILL,
						top: 2,
						right: 0,
						textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
					}
				}
			]
		}
	]
};