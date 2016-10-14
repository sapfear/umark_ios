module.exports = [
	{
		name: "Window",
		style: {
			backgroundColor: "#FFFFFF",
			barColor: "#FFFFFF"
		}
	},
	{
		name: "Table",
		style: {
			backgroundColor: "#FCFBF7",
			separatorColor: "#e2e2e2"
		}
	},
	{
		name: "TableRow",
		style: {
			selectedBackgroundColor: "#c2b58a"
		}
	},
	{
		name: "TableRowTransparent",
		style: {
			selectedBackgroundColor: "transparent"
		}
	},
	{
		name: "CommonBackground",
		style: {
			backgroundColor: "#FCFBF7"
		}
	},
	{
		name: "CardImage",
		style: {
			left: 0,
			image: "<% image %>",
			width: 50,
			height: 30
		}
	},
	{
		name: "CardImageX_AVAILABLE",
		style: {
			left: 10,
			image: "<% image %>",
			width: 30,
			height: 30
		}
	},
	{
		name: "Die",
		style: {
			height: Ti.UI.SIZE,
			top: 5,
			left: 5,
			right: 5,
			bottom: 5,
			backgroundImage: "%ResourcesPath%Media/Die.png",
			backgroundLeftCap: 40,
			backgroundTopCap: 40
		}
	},
	{
		name: "Die.Sub",
		style: {
			layout: "vertical",
			height: Ti.UI.SIZE,
			top: 10,
			left: 5,
			right: 5,
			bottom: 10
		}
	},
	{
		name: "Waiting.Small",
		style: {
			image: "%ResourcesPath%Media/Icon/Warning.Small.png",
			width: 21,
			height: 21,
			left: 5
		}
	}
];