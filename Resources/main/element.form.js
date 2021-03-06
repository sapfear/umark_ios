exports = {
	name: "me",
	"class": "ScrollView",
	style: {
		top: 0,
		layout: "vertical",
		backgroundColor: "#fff",
		left: 10,
		right: 10
	},
	subviews: [
		{
			"class": "View",
			style: {
				top: 10,
				layout: "vertical"
			},
			subviews: [
				{
					"class": "ImageView",
					style: {
						top: 10,
						left: 0,
						right: 0,
						bottom: 10,
						image: "<% img %>",
						width: "<% imageWidth %>",
						height: Ti.UI.SIZE
					}
				},
				{
					"class": "View",
					style: {
						top: 10,
						layout: "vertical",
						backgroundColor: '#ebeaea',
						borderRadius: 10,
						height: Ti.UI.SIZE,
						bottom: 20,
					},
					subviews: [
						{
							"class": "Label",
							preset: "L.Normal.DarkGray",
							style: {
								text: "<% ptext %>",
								textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
								top: 20,
								left: 20,
								right: 20,
								bottom: 20,
								height: Ti.UI.SIZE
							}
						}
					]
				},
				{
					"class": "View",
					name: 'inStore',
					style: {
						top: 10,
						layout: "vertical",
						backgroundColor: '#0c8ccd',
						borderRadius: 10,
						height: "<% instoreHeight %>",
						bottom: 20,
					},
					subviews: [
						{
							"class": "Label",
							preset: "L.Normal.White",
							style: {
								text: "<% storeLine %>",
								textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
								top: 20,
								left: 20,
								right: 20,
								bottom: 20,
								height: Ti.UI.SIZE
							}
						}
					]
				},
				{
					"class": "Label",
					preset: "L.Normal.DarkGray",
					style: {
						text: "<% detail %>",
						textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
						top: 0,
						left: 10,
						right: 10,
						bottom: 20,
						height: Ti.UI.SIZE
					}
				}
			]
		}
	]
};