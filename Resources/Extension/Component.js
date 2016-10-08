var t2 = require("TiTools2/TiTools"),
	bank = t2.Bank;

function createSearchBar(cancel) {
	var search = t2.UI.createSearchBar(undefined, {
		backgroundImage: t2.Path.preprocess("%ResourcesPath%/Media/Navbar/Bg.png"),
		showCancel: false,
		hintText: t2.tr("Search")
	});
	search.addEventListener("change", function(e) {
		e.value; 
	});
	search.addEventListener("return", function(e) {
		search.blur();
	});
	search.addEventListener("cancel", function(e) {
		search.blur();
		if(cancel !== undefined) {
			setTimeout(cancel, 750);
		}
	});
	return search;
}

function createTableViewSection(title) {
	var headerView = t2.UI.createView(undefined, {
		backgroundImage: t2.Path.preprocess("%ResourcesPath%Media/Table/Header.png")
	});
	
	headerView.add(
		t2.UI.createLabel(["L.Bold", "L.16", "L.Brown"], {
			left: 10,
			height: Ti.UI.SIZE,
			width: Ti.UI.FILL,
			text: title
		})
	);
	
	return t2.UI.createTableViewSection(undefined, {
		header: title,
		headerView: headerView
	});
}

function createAlertDialog(title, message, callback) {
	var title = title || "Error";
	var alertDialog = t2.UI.createAlertDialog(undefined, {
		title: t2.tr(title),
		message: t2.tr(message)
	});
	if(_.isFunction(callback)) {
		alertDialog.addEventListener("click", callback);
	}
	return alertDialog;
}

function createBackBtn(win, title, onSingletap) {
	var defaultFunc = function() { t2.UI.currentTab.close(win, {animated: true}); };
	var onSingletap = onSingletap || defaultFunc;
	var back = t2.Form.load(undefined, {
		name: "me",
		prefab: {
			name: "Button.Back",
			params: {
				text: "< " + title,
				onSingletap: onSingletap
			}
		}
	});
	
	if(!!back && !!back.me) {
		return back.me;		
	}
}

function setBackBtn(win, title, onSingletap) {
	win.leftNavButton = createBackBtn(win, title, onSingletap);
}

module.exports = {
	createSearchBar: createSearchBar,
	createTableViewSection: createTableViewSection,
	createAlertDialog: createAlertDialog,
	createBackBtn: createBackBtn,
	setBackBtn: setBackBtn
};
