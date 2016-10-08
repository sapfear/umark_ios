module.exports = [
	{
		name: "Die.TextRow.H",
		prefab: {
			"class": "View",
			style: {
				height: Ti.UI.SIZE,
			},
			subviews: [
				{
					"class": "View",
					style: {
						height: Ti.UI.SIZE,
						top: 10,
						left: 10,
						right: 10,
						bottom: 10
					},
					subviews: [
						{
							"class": "Label",
							preset: "<% leftPreset | string(L.Die.Left) %>",
							style: {
								touchEnabled: false,
								width: "<% leftWidth | string(50%) %>",
								text: "<% left %>",
								left: 0
							}
						},
						{
							"class": "Label",
							preset: "<% rightPreset | string(L.Die.Right) %>",
							style: {
								touchEnabled: false,
								width: "<% rightWidth | string(50%) %>",
								textAlign: "right",
								text: "<% right %>",
								right: 0
							}
						}
					]
				}
			]
		}
	},
	{
		name: "Die.TextRow.V",
		prefab: {
			"class": "View",
			style: {
				height: Ti.UI.SIZE,
			},
			subviews: [
				{
					"class": "View",
					style: {
						layout: "vertical",
						height: Ti.UI.SIZE,
						top: 10,
						left: 10,
						right: 10,
						bottom: 10
					},
					subviews: [
						{
							"class": "Label",
							preset: "L.Die.Top",
							style: {
								touchEnabled: false,
								text: "<% top %>",
								left: 0
							}
						},
						{
							"class": "Label",
							preset: "L.Die.Bottom",
							name: "bottomLabel",
							target: "parent",
							style: {
								touchEnabled: false,
								text: "<% bottom %>",
								top: 5,
								left: 0
							}
						}
					]
				}
			]
		}
	},
	{
		name: "Die.TextRow.H.Budget",
		prefab: {
			"class": "View",
			style: {
				title: "<% left %>",
				height: Ti.UI.SIZE,
			},
			subviews: [
				{
					"class": "View",
					style: {
						touchEnabled: false,
						height: Ti.UI.SIZE,
						top: 10,
						left: 10,
						right: 10,
						bottom: 10
					},
					subviews: [
						{
							"class": "Label",
							preset: "L.Die.Right",							
							style: {
								touchEnabled: false,
								width: "70%",
								text: "<% left %>",
								left: 0
							}
						},
						{
							name: "id",
							target: "parent",
							"class": "Label",
							preset: "L.Die.Left",
							style: {
								touchEnabled: false,
								width: "30%",
								textAlign: "right",
								text: "<% right %>",
								right: 0
							}
						}
					]
				}
			],
			bind: {
				click: "onClick"
			}
		}
	},
	{
		name: "Die.Separator",
		prefab: {
			"class": "View",
			style: {
				height: 1,
				backgroundColor: "#d0cdc0"
			}
		}
	},
	{
		name: "Die.SeparatorMe",
		prefab: {
			"class": "TableViewRow",
			style: {
				height: 1,
				backgroundColor: "#d0cdc0"
			}
		}
	}
];
