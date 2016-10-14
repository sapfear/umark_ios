var t2 = require("TiTools2/TiTools");

//---------------------------------------------//
// TODO:NAMESPACE:XMLUI:HOOK
//---------------------------------------------//

var xmluiHookPreprocess = xmluiDefaultHookPreprocess;
var xmluiHookVBox = xmluiDefaultHookVBox;
var xmluiHookHBox = xmluiDefaultHookHBox;
var xmluiHookTBox = xmluiDefaultHookTBox;
var xmluiHookLabel = xmluiDefaultHookLabel;
var xmluiHookDate = xmluiDefaultHookDate;
var xmluiHookTextField = xmluiDefaultHookTextField;
var xmluiHookCheckBox = xmluiDefaultHookCheckBox;
var xmluiHookListBox = xmluiDefaultHookListBox;
var xmluiHookDropDownList = xmluiDefaultHookDropDownList;

//---------------------------------------------//
// TODO:NAMESPACE:XMLUI:EXTENSION
//---------------------------------------------//

function TiToolsFormLoad(parent, data, params) {
	var result = undefined;
	if (t2.String.isSuffix(data, ".xmlui") == true) {
		var file = t2.FileSystem.getFile(data);
		if (file.exists() == true) {
			var blob = file.read();
			if (blob != undefined) {
				var xml = t2.XML.deserialize(blob.text);
				if (xml != undefined) {
					var source = convertXMLUI(xml);
					// t2.Utils.info("XMLUI", [ xml, source ]);
					result = t2.Form.create(source, parent, undefined, params);
				}
			}
		}
	}
	return result;
}

function TiToolsFormParse(parent, data, format, params) {
	var result = undefined;
	if (format == "xmlui") {
		var xml = t2.XML.deserialize(data);
		if (xml != undefined) {
			var source = convertXMLUI(xml);
			// t2.Utils.info("XMLUI", [ xml, source ]);
			result = t2.Form.create(source, parent, undefined, params);
		}
	}
	return result;
}

function xmluiGetHook(name) {
	switch(name) {
		case "xmlui":
			return xmluiHookPreprocess;
		break;
		case "vbox":
			return xmluiHookVBox;
		break;
		case "hbox":
			return xmluiHookHBox;
		break;
		case "tbox":
			return xmluiHookTBox ;
		break;
		case "label":
			return xmluiHookLabel;
		break;
		case "date":
			return xmluiHookDate;
		break;
		case "textField":
			return xmluiHookTextField;
		break;
		case "checkBox":
			return xmluiHookCheckBox;
		break;
		case "listBox":
			return xmluiHookListBox;
		break;
		case "dropDownList":
			return xmluiHookDropDownList;
		break;
	}
}


function xmluiIstallHook(name, hook) {
	switch(name) {
		case "xmlui":
			xmluiHookPreprocess = hook;
			break;
		case "vbox":
			xmluiHookVBox = hook;
			break;
		case "hbox":
			xmluiHookHBox = hook;
			break;
		case "tbox":
			xmluiHookTBox = hook;
			break;
		case "label":
			xmluiHookLabel = hook;
			break;
		case "date":
			xmluiHookDate = hook;
			break;
		case "textField":
			xmluiHookTextField = hook;
			break;
		case "checkBox":
			xmluiHookCheckBox = hook;
			break;
		case "listBox":
			xmluiHookListBox = hook;
			break;
		case "dropDownList":
			xmluiHookDropDownList = hook;
			break;
	}
}

//---------------------------------------------//
// TODO:NAMESPACE:XMLUI:PRIVATE
//---------------------------------------------//

function convertXMLUI(content) {
	var result = undefined;
	var atts = content.attributes;
	switch(content.name) {
		case "xmlui":
			var root = xmluiHookPreprocess(content);
			if(root != undefined) {
				result = convertXMLUI(root);
			}
			break;
		case "vbox":
			result = xmluiHookVBox(content, {
				xmlui : {
					type : content.name,
					name : xmluiGetValue(atts.name, undefined)
				},
				width : xmluiGetValue(atts.width, Ti.UI.FILL),
				height : xmluiGetValue(atts.height, Ti.UI.SIZE),
				layout : "vertical"
			});
			break;
		case "hbox":
			result = xmluiHookHBox(content, {
				xmlui : {
					type : content.name,
					name : xmluiGetValue(atts.name, undefined)
				},
				width : xmluiGetValue(atts.width, Ti.UI.FILL),
				height : xmluiGetValue(atts.height, Ti.UI.SIZE),
				horizontalWrap : false,
				layout : "horizontal"
			});
			break;
		case "tbox":
			result = xmluiHookTBox(content, {
				xmlui : {
					type : content.name,
					name : xmluiGetValue(atts.name, undefined),
					columns : atts.columns
				},
				width : xmluiGetValue(atts.width, Ti.UI.FILL),
				height : xmluiGetValue(atts.height, Ti.UI.SIZE),
				layout : "vertical"
			});
			break;
		case "label":
			result = xmluiHookLabel(content, {
				xmlui : {
					type : content.name,
					name : xmluiGetValue(atts.name, undefined),
					interactive : xmluiGetBool(atts.interactive, false),
					required : xmluiGetBool(atts.required, false)
				},
				width : xmluiGetValue(atts.width, null),
				height : xmluiGetValue(atts.height, null),
				touchEnabled : xmluiGetBool(atts.enabled, false),
				text : xmluiGetValue(atts.value, ""),
				font : {
					color : xmluiGetColor(atts.color, "black")
				}
			});
			break;
		case "date":
			result = xmluiHookDate(content, {
				xmlui : {
					type : content.name,
					name : xmluiGetValue(atts.name, undefined),
					interactive : xmluiGetBool(atts.interactive, false),
					required : xmluiGetBool(atts.required, false)
				},
				width : xmluiGetValue(atts.width, undefined),
				height : xmluiGetValue(atts.height, undefined),
				enabled : atts.enabled,
				touchEnabled : xmluiGetBool(atts.enabled, true),
				hintText : xmluiGetValue(atts.tip, undefined),
				value : xmluiGetValue(atts.value, new Date()),
				font : {
					color : xmluiGetColor(atts.color, "black")
				}
			});
			break;
		case "textField":
			result = xmluiHookTextField(content, {
				xmlui : {
					type : content.name,
					name : xmluiGetValue(atts.name, undefined),
					interactive : xmluiGetBool(atts.interactive, false),
					required : xmluiGetBool(atts.required, false)
				},
				width : xmluiGetValue(atts.width, undefined),
				height : xmluiGetValue(atts.height, undefined),
				enabled : atts.enabled,
				touchEnabled : xmluiGetBool(atts.enabled, true),
				maxLength : xmluiGetValue(atts.maxLength, 300),
				hintText : xmluiGetValue(atts.tip, undefined),
				regexp : xmluiGetValue(atts.regex, undefined),
				value : xmluiGetValue(atts.value, undefined),
				font : {
					color : xmluiGetColor(atts.color, "black")
				}
			});
			break;
		case "checkBox":
			result = xmluiHookCheckBox(content, {
				xmlui : {
					type : content.name,
					name : xmluiGetValue(atts.name, undefined),
					interactive : xmluiGetBool(atts.interactive, false),
					required : xmluiGetBool(atts.required, false)
				},
				width : xmluiGetValue(atts.width, undefined),
				height : xmluiGetValue(atts.height, undefined),
				touchEnabled : xmluiGetBool(atts.enabled, true),
				title : xmluiGetValue(atts.tip, undefined),
				value : xmluiGetBool(atts.value, false),
				font : {
					color : xmluiGetColor(atts.color, "black")
				}
			});
			break;
		case "listBox":
			result = xmluiHookListBox(content, {
				xmlui : {
					type : content.name,
					name : xmluiGetValue(atts.name, undefined),
					interactive : xmluiGetBool(atts.interactive, false),
					required : xmluiGetBool(atts.required, false),
					items : xmluiListChild(content),
					value : xmluiGetValue(atts.value, undefined)
				},
				width : xmluiGetValue(atts.width, undefined),
				height : xmluiGetValue(atts.height, undefined),
				enabled : atts.enabled,
				touchEnabled : xmluiGetBool(atts.enabled, true),
				hintText : xmluiGetValue(atts.tip, undefined),
				font : {
					color : xmluiGetColor(atts.color, "black")
				}
			});
			break;
		case "dropDownList":
			result = xmluiHookDropDownList(content, {
				xmlui : {
					type : content.name,
					name : xmluiGetValue(atts.name, undefined),
					interactive : xmluiGetBool(atts.interactive, false),
					required : xmluiGetBool(atts.required, false),
					items : xmluiListChild(content),
					value : xmluiGetValue(atts.value, undefined)
				},
				width : xmluiGetValue(atts.width, undefined),
				height : xmluiGetValue(atts.height, undefined),
				enabled : atts.enabled,
				touchEnabled : xmluiGetBool(atts.enabled, true),
				hintText : xmluiGetValue(atts.tip, undefined),
				font : {
					color : xmluiGetColor(atts.color, "black")
				}
			});
			break;
		// default:
			// result = xmluiHookUnknownElement(content); // TODO
			// break;
	}
	return result;
}

//---------------------------------------------//

function xmluiGetValue(value, def) {
	if (value != undefined) {
		return value;
	}
	return def;
}

function xmluiGetColor(value, def) {
	if (value != undefined) {
		return value;
	}
	return def;
}

function xmluiGetBool(value) {
	if (value == false) {
		return false;
	}
	return true;
}

//---------------------------------------------//

function xmluiContainerChild(container, content) {
	var childs = content.childs;
	var length = childs.length;
	for (var i = 0; i < length; i++) {
		var subview = convertXMLUI(childs[i]);
		if (subview != undefined) {
			container.subviews.push(subview);
		}
	}
}

function xmluiContainerTableChild(container, content, columns) {
	var childs = content.childs;
	var length = childs.length;
	for (var i = 0; i < length; i += columns) {
		xmluiContainerTableRow(container, childs, i, i + columns);
	}
}

function xmluiContainerTableRow(container, items, index, length) {
	function validateSize(size) {
		if (t2.isNumber(size) == false) {
			return false;
		}
		if (t2.isNaN(size) == true) {
			return false;
		}
		return true;
	}

	var self = undefined;
	var row = {
		"class" : "View",
		preset : "xmlui::tbox::row",
		style : {
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE,
			horizontalWrap : false,
			layout : "horizontal"
		},
		bind : {
			"titools::create" : function(event) {
				self = event.source;
			},
			postlayout : function(event) {
				if (self == event.source) {
					var subviews = self.children;
					if (subviews != undefined) {
						var width = 0;
						var count = 0;
						for (var i in subviews) {
							var view = subviews[i];
							if (validateSize(view.width) == true) {
								width += view.width;
							} else {
								count++;
							}
						}
						if (count > 0) {
							var image = self.toImage();
							if (image != undefined) {
								var size = Number(image.width - width) / count;
								if (validateSize(size) == true) {
									for (var i in subviews) {
										var view = subviews[i];
										if (validateSize(view.width) == false) {
											view.applyProperties({
												width : size
											});
										}
									}
								}
							}
						}
					}
				}
			}
		},
		subviews : []
	};
	for (var i = index; i < length; i++) {
		var subview = convertXMLUI(items[i]);
		if (subview != undefined) {
			row.subviews.push(subview);
		}
	}
	container.subviews.push(row);
}

function xmluiListChild(content) {
	var result = [];
	var items = t2.XML.findNode(content, "item");
	var length = items.length;
	for (var i = 0; i < length; i++) {
		var item = items[i];
		result.push({
			text : item.attributes.text,
			value : item.attributes.value
		});
	}
	return result;
}

//---------------------------------------------//

function xmluiDefaultHookPreprocess(content) {
	if(content.childs.length == 1) {
		return content.childs[0];
	}
	return undefined;
}

function xmluiDefaultHookVBox(content, style) {
	var container = {
		"class" : "View",
		name : style.xmlui.name,
		preset : "xmlui::vbox",
		style : style,
		subviews : []
	};
	xmluiContainerChild(container, content);
	return container;
}

function xmluiDefaultHookHBox(content, style) {
	var container = {
		"class" : "View",
		name : style.xmlui.name,
		preset : "xmlui::hbox",
		style : style,
		subviews : []
	};
	xmluiContainerChild(container, content);
	return container;
}

function xmluiDefaultHookTBox(content, style) {
	var container = {
		"class" : "View",
		name : style.xmlui.name,
		preset : "xmlui::tbox",
		style : style,
		subviews : []
	};
	xmluiContainerTableChild(container, content, Number(style.xmlui.columns));
	return container;
}

//---------------------------------------------//

function xmluiDefaultHookLabel(content, style) {
	return {
		"class" : "Label",
		name : style.xmlui.name,
		preset : "xmlui::label",
		style : style
	};
}

function xmluiDefaultHookDate(content, style) {
	return {
		"class" : "TextField",
		name : style.xmlui.name,
		preset : "xmlui::date",
		style : style
	};
}

function xmluiDefaultHookTextField(content, style) {
	var self = undefined;
	return {
		"class" : "TextField",
		name : style.xmlui.name,
		preset : "xmlui::textfield",
		style : style,
		bind : {
			"titools::create" : function(event) {
				self = event.source;
			}
		}
	};
}

function xmluiDefaultHookCheckBox(content, style) {
	return {
		"class" : "Switch",
		name : style.xmlui.name,
		preset : "xmlui::checkbox",
		style : style
	};
}

function xmluiDefaultHookListBox(content, style) {
	var list = {
		"class" : "TextField",
		name : style.xmlui.name,
		preset : "xmlui::listbox",
		style : style
	};
	return list;
}

function xmluiDefaultHookDropDownList(content, style) {
	var subviews = [{
		"class" : "TextField",
		name : style.xmlui.name,
		preset : "xmlui::dropdownlist",
		style : style
	}];
	if(Ti.Platform.version[0] !== "2") {
		subviews.push({
			"class": "ImageView",
			style: {
				image: "%ResourcesPath%Media/%ScreenPath%Icon/SelectFieldArrow.png",
				width: "15dp",
				height: "15dp",
				right: 0,
				bottom: "4dp"
			}
		});
	} 
	
	var list = {
		"class": "View",
		style: {
			height: Ti.UI.SIZE
		},
		subviews: subviews
	};
	return list;
}

//---------------------------------------------//

module.exports = {
	Private : {
		containerChild : xmluiContainerChild,
		containerTableChild : xmluiContainerTableChild,
		containerTableRow : xmluiContainerTableRow,
		listChild : xmluiListChild,
		// xmlui : xmluiDefaultHookPreprocess,
		vbox : xmluiDefaultHookVBox,
		hbox : xmluiDefaultHookHBox,
		tbox : xmluiDefaultHookTBox,
		label : xmluiDefaultHookLabel,
		date : xmluiDefaultHookDate,
		textField : xmluiDefaultHookTextField,
		checkBox : xmluiDefaultHookCheckBox,
		listBox : xmluiDefaultHookListBox,
		dropDownList : xmluiDefaultHookDropDownList
	},
	TiToolsFormLoad : TiToolsFormLoad,
	TiToolsFormParse : TiToolsFormParse,
	getHook: xmluiGetHook,
	installHook : xmluiIstallHook
};
