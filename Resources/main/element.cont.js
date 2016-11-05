var t2,
	bank,
	cmp,
	win_main,
	form,
	mod,
	request,
	element,
	instoreShow = false;
	
//---------------------------------------------//

var clicked;
//---------------------------------------------//

function onInitController(window, params) {
	if(Ti.Platform.osname == "iphone"){
		t2 = require("TiTools2/TiTools");
	} else {
		t2 = require("TiTools2_a/TiTools");
	}
	win_main = window;
	request = t2.TxRx;
	
	if (!!params.element)
		element = params.element;
		
	if(!!params.instore)
		instoreShow = true;
	
	clicked = false;
	if(!Ti.Network.online) {
		offline = true;
	}
}

//---------------------------------------------//

function onWindowOpen(window, event) {
	
	prepareText = function(text){
		//text = text.replace(': +7', ':       +7');
		text = text.replace(/(\\r\\n|\n|\r|\t)/gm,"");
		text = text.replace(new RegExp('</td><td>', 'g'), ': ');
		text = text.replace(new RegExp('&nbsp;', 'g'), ' ');
		text = text.replace(new RegExp('&ndash;', 'g'), '-');
		text = text.replace(new RegExp('&quot;', 'g'), '"');
		//text = text.replace(new RegExp('&deg;', 'g'), '°');
		text = text.replace(new RegExp('</tr><tr>', 'g'), "\n");

		return text.replace(/<\/?[^>]+>/gi, '');
	};
	
	
	t2.Utils.info(element.text);
	
	if(!!element){
		form = t2.Form.load(window, "main/element.form.js", {
			img: element.img,
			ptext: prepareText(element.anons),
			imageWidth: t2.Screen.width-20,
			storeLine: t2.Global.get("mainStoreCity") + ': в наличии ' + element.stock + ' шт.',
			detail: prepareText(element.text),
			instoreHeight: instoreShow ? Ti.UI.SIZE : 0
		});
	}

}

function onWindowClose(window, event) {
}

//---------------------------------------------//

//---------------------------------------------//

module.exports = {
	onInitController: onInitController,
	onWindowOpen: onWindowOpen,
	onWindowClose: onWindowClose
};