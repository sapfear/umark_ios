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
				right: 10
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
						right: "<% right %>",
					}
				},
				
				{
					"class": "ImageView",
					style: {
						height: 25,
						top: 2,
						right: 0,
						image: "<% img %>",
					}
				}
			]
		}
	]
};