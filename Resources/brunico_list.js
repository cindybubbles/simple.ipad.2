var MASTER_WINDOW = {};

(function(){
	var win = Titanium.UI.currentWindow;
	var url = 'http://kidscreen.com/feed/';
	var navGroup = win.navGroup;
	var xhr = Ti.Network.createHTTPClient();
	var brunicoData = [];
	var tableview = Titanium.UI.createTableView({
			data:brunicoData
		});
    var feeds = [{title:'Kidscreen',url:'kidscreen_list.js',db_name:'KS',feed_url:'http://kidscreen.com/feed/'},
    			{title:'realscreen',url:'realscreen_list.js',db_name:'RS',feed_url: 'http://realscreen.com/feed/'},
    			{title:'Playback',url:'playback_list.js',db_name:'PB',feed_url: 'http://playbackonline.ca/feed/'},
    			{title:'strategy',url:'strategy_list.js',db_name:'ST',feed_url: 'http://www.strategyonline.ca/news/st_news.xml'},
    			{title:'Media in Canada',url:'mic_list.js',db_name:'MIC',feed_url: 'http://www.mediaincanada.com/news/mic_news.xml'},
				{title:'Stimulant',url:'stim_list.js',db_name:'STIM',feed_url: 'http://www.stimulantonline.ca/news/stim_news.xml'}
				];
	Ti.include('sql_lite.js');
	SQL_LITE_BACKEND.sync(feeds);
	for(var i=0; i<feeds.length; i++){
		var row = Ti.UI.createTableViewRow(feeds[i]);
		brunicoData.push(row);
	}
	tableview.setData(brunicoData);
    /**
	* on click event, fireEvent, detail window is listening
	*/
	function tableClick(evt) {
		var newWin = Ti.UI.createWindow({
		    title:evt.row.title,
		    backgroundColor: '#fff',
		    url:evt.row.url,
		    feed_url:evt.row.feed_url
		});
		
		navGroup.open(newWin);
	}
	
	/**
	* initialize the window
	*/
	MASTER_WINDOW.init = function(){
		win.add(tableview);		
		Ti.include('sql_lite.js');
		
		tableview.addEventListener('click',tableClick);						
	}
	
})();
MASTER_WINDOW.init();