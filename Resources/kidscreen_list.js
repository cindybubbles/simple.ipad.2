var MASTER_WINDOW = {};

(function(){
	var win = Titanium.UI.currentWindow;
	var url = 'http://kidscreen.com/feed/';
	var navGroup = win.navGroup;
	var brunicoData = [];
	Ti.include('feed_reader.js');
	Ti.include('sql_lite.js');
	var tableview = Titanium.UI.createTableView({
			data:brunicoData
		});
	Ti.include("feed_reader.js");
	var feeds = SQL_LITE_BACKEND.load_local_feeds('KS');
	FEED_READER.display_local_feed(feeds,brunicoData,tableview);
    /**
	* on click event, fireEvent, detail window is listening
	*/
	function tableClick(evt) {
		var evtData = {
			"row" : evt.index,
			"title": evt.row.title,
			"url" : evt.row.url 
		}
		Ti.App.fireEvent('app:rowClicked', evtData);
	}
	
	/**
	* initialize the window
	*/
	MASTER_WINDOW.init = function(){
	
		win.add(tableview);		
		
		tableview.addEventListener('click',tableClick);						
	}
	
})();
MASTER_WINDOW.init();