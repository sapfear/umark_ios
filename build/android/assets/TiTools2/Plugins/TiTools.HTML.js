function styleSheetSet(e,t){_styleSheet[e]=t}function styleSheetGet(e){return _styleSheet[e]}function styleSheetRemove(e){delete _styleSheet[e]}function styleSheetClear(){_styleSheet={}}function styleSheetPrint(){return void 0!=_styleSheet[name]?" "+_styleSheet[name]:""}function createTable(e,t){for(var o="<table"+styleSheetGet(e)+">",i=0;i<t.length;i++)o+=createTableRow(t[i].style,t[i].content);return o+="</table>"}function createTableRow(e,t){for(var o="<tr"+styleSheetGet(e)+">",i=0;i<t.length;i++)o+=createTableCell(t[i].style,t[i].content);return o+="</tr>"}function createTableCell(e,t){return"<td"+styleSheetPrint(e)+">"+t+"</td>"}var TiTools2=require("TiTools2/TiTools"),_styleSheet={};module.exports={styleSheet:{set:styleSheetSet,get:styleSheetGet,remove:styleSheetRemove,clear:styleSheetClear},createTable:createTable,createTableRow:createTableRow,createTableCell:createTableCell};