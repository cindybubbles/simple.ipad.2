var MASTER_WINDOW = {};

(function(){
	var win = Titanium.UI.currentWindow;
	var url = 'http://www.strategyonline.ca/st_news/news.xml';
	var navGroup = win.navGroup;
	var xhr = Ti.Network.createHTTPClient();
	var brunicoData = [];
	var tableview = Titanium.UI.createTableView({
			data:brunicoData
		});
	Ti.include("feed_reader.js");
	xhr.onload = function () {
		FEED_WINDOW.read_feed(this, brunicoData, tableview);
	}
	xhr.open('GET',url);
    xhr.send();

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