module.exports = [
	{
		name: "List.Separator",
		prefab: {
			"class": "View",
			style: {
				height: "1px",
				backgroundColor: "#c8c8c8"
			}
		}
	},
	{
		name: "List.Bottom",
		prefab: {
			"class": "View",
			style: {
				bottom: 0,
				height: 11,
				wigth : Ti.UI.FILL
				//backgroundImage: "%ResourcesPath%Media/List/Bottom.png"
			}
		}
	},
	{
		name: "List.Arrow",
		prefab: {
			"class": "ImageView",
			style: {
				image: "%ResourcesPath%Media/List/Arrow.png",
				right: 10,
				width: 16,
				height: 16,
				zIndex: 10
			}
		}
	}
];