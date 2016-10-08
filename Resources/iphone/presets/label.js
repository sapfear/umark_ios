module.exports = [
	{
		name: "Label.Row",
		style: {
			height: 30
		}
	},
	// XXX: COLORS
	{
		name: "L.Brown",
		style: {
			color: "#7b6f47"
		}
	},
	{
		name: "L.Yellow",
		style: {
			color: "#e5db78"
		}
	},
	{
		name: "L.Green",
		style: {
			color: "#1aa124"
		}
	},
	{
		name: "L.Gray",
		style: {
			color: "#868484"
		}
	},
	{
		name: "L.DarkGray",
		style: {
			color: "#555"
		}
	},
	{
		name: "L.Red",
		style: {
			color: "#a11a1a"
		}
	},
	{
		name: "L.White",
		style: {
			color: "#fff"
		}
	},
	{
		name: "L.Black",
		style: {
			color: "#000"
		}
	},
	{
		name: "L.Blue",
		style: {
			color: "#0c8ccd"
		}
	},
	// XXX: WEIGHT
	{
		name: "L.Bold",
		style: {
			font: {
				fontWeight: "bold"
			}
		}
	},
	{
		name: "L.NormalFont",
		style: {
			font: {
				fontWeight: "normal"
			}
		}
	},
	// XXX: SIZES
	{
		name: "L.11",
		style: {
			font: {
				fontSize: 11
			}
		}
	},
	{
		name: "L.12",
		style: {
			font: {
				fontSize: 12
			}
		}
	},
	{
		name: "L.13",
		style: {
			font: {
				fontSize: 13
			}
		}
	},
	{
		name: "L.14",
		style: {
			font: {
				fontSize: 14
			}
		}
	},
	{
		name: "L.15",
		style: {
			font: {
				fontSize: 15
			}
		}
	},
	{
		name: "L.16",
		style: {
			font: {
				fontSize: 16
			}
		}
	},
	{
		name: "L.17",
		style: {
			font: {
				fontSize: 17
			}
		}
	},
	{
		name: "L.18",
		style: {
			font: {
				fontSize: 18
			}
		}
	},
	{
		name: "L.19",
		style: {
			font: {
				fontSize: 19
			}
		}
	},
	{
		name: "L.20",
		style: {
			font: {
				fontSize: 20
			}
		}
	},
	{
		name: "L.21",
		style: {
			font: {
				fontSize: 21
			}
		}
	},
	{
		name: "L.22",
		style: {
			font: {
				fontSize: 22
			}
		}
	},
	{
		name: "L.23",
		style: {
			font: {
				fontSize: 23
			}
		}
	},
	{
		name: "L.24",
		style: {
			font: {
				fontSize: 24
			}
		}
	},
	{
		name: "L.25",
		style: {
			font: {
				fontSize: 25
			}
		}
	},
    // XXX: Buttons
	{
		name: "L.Button",
		parent: ["L.Bold", "L.White"],
		style: {
			touchEnabled: false,
			shadowColor: "#000",
			shadowOffset: {
				x: 0,
				y: -1
			}
		}
	},
	{
		name: "L.Button.Normal",
		parent: ["L.NormalFont", "L.White"],
		style: {
			touchEnabled: false,
			shadowColor: "#000",
			shadowOffset: {
				x: 0,
				y: -1
			}
		}
	},
	{
		name: "L.Button.Big",
		parent: ["L.Button", "L.18"]
	},
	{
		name: "L.Button.Small",
		parent: ["L.Button", "L.16"]
	},
	{
		name: "L.Button.Bar",
		parent: ["L.Button.Normal", "L.16"]
	},
	// XXX: Label
	{
		name: "L.Common",
		parent: ["L.Bold"]
	},
	{
		name: "L.Small",
		parent: ["L.13"]
	},
	{
		name: "L.Small.Bold",
		parent: ["L.Small", "L.Bold"]
	},
	{
		name: "L.Small.Brown",
		parent: ["L.Small.Bold", "L.Brown"]
	},
	{
		name: "L.Small.Yellow",
		parent: ["L.Small.Bold", "L.Yellow"]
	},
	{
		name: "L.Small.Gray",
		parent: ["L.Small.Bold", "L.Gray"]
	},
	{
		name: "L.Small.Blue",
		parent: ["L.Small.Bold", "L.Blue"]
	},
	{
		name: "L.Small.DarkGray",
		parent: ["L.Small.Bold", "L.DarkGray"]
	},
	{
		name: "L.Small.Black",
		parent: ["L.Small.Bold", "L.Black"]
	},
	{
		name: "L.Small.Red",
		parent: ["L.Small.Bold", "L.Red"]
	},
	{
		name: "L.Small.Green",
		parent: ["L.Small.Bold", "L.Green"]
	},
	{
		name: "L.Small.White",
		parent: ["L.Small.Bold", "L.White"]
	},
	//
	{
		name: "L.Small.Brown.Reg",
		parent: ["L.Small", "L.Brown"]
	},
	{
		name: "L.Small.Gray.Reg",
		parent: ["L.Small", "L.Gray"]
	},
	{
		name: "L.Small.Black.Reg",
		parent: ["L.Small", "L.Black"]
	},
	{
		name: "L.Small.Red.Reg",
		parent: ["L.Small", "L.Red"]
	},
	//
	{
		name: "L.Normal",
		parent: ["L.Bold", "L.15"]
	},
	{
		name: "L.Normal.Black",
		parent: ["L.Normal", "L.Black"]
	},
	{
		name: "L.Normal.Brown",
		parent: ["L.Normal", "L.Brown"]
	},
	{
		name: "L.Normal.Green",
		parent: ["L.Normal", "L.Green"]
	},
	{
		name: "L.Normal.Blue",
		parent: ["L.Normal", "L.Blue"]
	},
	{
		name: "L.Normal.Red",
		parent: ["L.Normal", "L.Red"]
	},
	{
		name: "L.Normal.DarkGray",
		parent: ["L.Normal", "L.DarkGray"]
	},
	{
		name: "L.Normal.White",
		parent: ["L.Normal", "L.White"]
	},
	//
	{
		name: "L.Large",
		parent: ["L.Bold", "L.17"]
	},
	{
		name: "L.MegaLarge",
		parent: ["L.Bold", "L.21"]
	},
	{
		name: "L.Large.Black",
		parent: ["L.Large", "L.Black"]
	},
	{
		name: "L.Large.Blue",
		parent: ["L.Large", "L.Blue"]
	},
	{
		name: "L.Large.Brown",
		parent: ["L.Large", "L.Brown"]
	},
	{
		name: "L.Large.Red",
		parent: ["L.Large", "L.Red"]
	},
	{
		name: "L.MegaLarge.Blue",
		parent: ["L.MegaLarge", "L.Blue"]
	},
	// XXX: DIE
	{
		name: "L.Die.Header",
		parent: ["L.Bold", "L.18"]
	},
	{
		name: "L.Die.Top",
		parent: ["L.Normal.Black"]
	},
	{
		name: "L.Die.Left",
		parent: ["L.Normal.Brown"]
	},
	{
		name: "L.Die.Right",
		parent: ["L.Normal.Black"]
	},
	{
		name: "L.Die.Bottom",
		parent: ["L.Large.Black"]
	},
];