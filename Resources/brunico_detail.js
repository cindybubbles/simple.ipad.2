// detail.js
var DETAIL_WINDOW = {};
(function(){
	var win = Titanium.UI.currentWindow;
	var webView = null;
		
	/**
	* called when event is fired from master window tableView
	*/
	function rowClicked(evtData) {
		Ti.API.debug(evtData);

		
        if (webView == null ){
	
			Ti.API.debug("creating webview");
			
			webView = Ti.UI.createWebView({
	            autoDetect: [Ti.UI.AUTODETECT_NONE]
        	});	
			win.add(webView);			
		}

		webView.url = evtData.url;
		
	}
	
	/**
	* basic window initialization
	*/
	DETAIL_WINDOW.init = function(){	
		
		Ti.App.addEventListener('app:rowClicked',rowClicked);	
		
		Ti.Gesture.addEventListener('orientationchange',function(e){        
		});
										
	}
	
})();
DETAIL_WINDOW.init();