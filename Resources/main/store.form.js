exports = {
	name: "me",
	"class": "ScrollView",
	style: {
		top: 20,
		layout: "vertical",
		backgroundColor: "#fff",
		left: 10,
		right:10,
		height: Ti.UI.SIZE
	},
	subviews: [
		{
			"class": "View",
			style: {
				top: 0,
				layout: "vertical",
				height: Ti.UI.SIZE
			},
			subviews: [
				{
					"class": "Label",
					preset: "L.Large.Black",
					style: {
						text: "<% title %>",
						textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
					}
				},
				{
					"class": "Label",
					preset: "L.Large.Black",
					style: {
						top: 0,
						text: "<% adr %>",
						textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
					}
				},
				{
					"class": "Label",
					preset: "L.MegaLarge.Blue",
					name: "phones",
					style: {
						top: 0,
						text: "<% phone %>",
						textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
					},
					bind: {
						click: 'phoneClick'
					}
				},
				{
					"class": "Label",
					preset: "L.Large.Black",
					style: {
						top: 10,
						text: "Звонок бесплатный!",
						textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
					}
				},
				{
					"class": "Label",
					preset: "L.Large.Black",
					style: {
						top: 20,
						text: "Электронная почта:",
						textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
					}
				},
				{
					"class": "Label",
					preset: "L.MegaLarge.Blue",
					style: {
						top: 0,
						text: "<% email %>",
						textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
					},
					bind: {
						click: 'emailClick'
					}
				},
			]
		},
		{
			"class": "View",
			name: 'map',
			style: {
				left: 0,
				layout: "vertical",
				width: "<% mapWidth %>",
				height: "<% mapHeight %>",
			},
		},
		{
			"class": "View",
			name: 'storeBtn',
			style: {
				top: 10,
				layout: "vertical",
				backgroundColor: '#0c8ccd',
				borderRadius: 10,
				height: Ti.UI.SIZE,
				bottom: 20,
			},
			subviews: [
				{
					"class": "Label",
					preset: "L.Normal.White",
					style: {
						text: "Выбрать как основной",
						textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
						top: 20,
						left: 20,
						right: 20,
						bottom: 20,
						height: Ti.UI.SIZE
					}
				}
			],
			bind: {
				click: "storeBtnClick"
			}
		},
	]
};