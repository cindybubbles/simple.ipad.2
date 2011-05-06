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
    var feeds = [{title:'Kidscreen',url:'kidscreen_list.js'},
    			{title:'realscreen',url:'realscreen_list.js'},
    			{title:'Playback',url:'playback_list.js'},
    			{title:'strategy',url:'strategy_list.js'},
    			{title:'Media in Canada',url:'mic_list.js'},
				{title:'Stimulant',url:'stim_list.js'}
				];
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
		    url:evt.row.url
		});
		navGroup.open(newWin);
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