var TiTools2 = require("TiTools2/TiTools");

//---------------------------------------------//
// TODO:NAMESPACE:VARIABLE
//---------------------------------------------//

var _styleSheet = {};

//---------------------------------------------//
// TODO:NAMESPACE:STYLESHEET
//---------------------------------------------//

function styleSheetSet(name, value) {
	_styleSheet[name] = value;
}
function styleSheetGet(name) {
	return _styleSheet[name];
}
function styleSheetRemove(name) {
	delete _styleSheet[name];
}
function styleSheetClear() {
	_styleSheet = {};
}
function styleSheetPrint() {
	if(_styleSheet[name] != undefined) {
		return " " + _styleSheet[name];
	}
	return "";
}

//---------------------------------------------//
// TODO:NAMESPACE:ELEMENT
//---------------------------------------------//

function createTable(style, content) {
	var res = "<table" + styleSheetGet(style) + ">";
	for(var i = 0; i < content.length; i++) {
		res += createTableRow(content[i].style, content[i].content);
	}
	res += "</table>";
	return res;
}
function createTableRow(style, content) {
	var res = "<tr" + styleSheetGet(style) + ">";
	for(var i = 0; i < content.length; i++) {
		res += createTableCell(content[i].style, content[i].content);
	}
	res += "</tr>";
	return res;
}
function createTableCell(style, content) {
	return "<td" + styleSheetPrint(style) + ">" + content + "</td>";
}

//---------------------------------------------//

module.exports = {
	styleSheet : {
		set : styleSheetSet,
		get : styleSheetGet,
		remove : styleSheetRemove,
		clear : styleSheetClear
	},
	createTable : createTable,
	createTableRow : createTableRow,
	createTableCell : createTableCell
};
