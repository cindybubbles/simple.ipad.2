// detail.js
var DETAIL_WINDOW = {};
(function(){
	var win = Titanium.UI.currentWindow;
	var webView = null;
	var view = null;
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
 		}
       	view = Ti.UI.createView({
       		width:'100%',
       		height:'100%'
       	});
        	var textData = Ti.UI.createLabel({
        		text:evtData.description2,
        		width:'100%',
        		height:'100%'
        	});
        	view.add(textData);
		if (Titanium.Network.networkType != Titanium.Network.NETWORK_NONE) {
			win.add(webView);			
			webView.url = evtData.url;
		}
		else {
			alert("Still not connected.");
			win.add(webView);			
			webView.html = evtData.description2;
		}
		
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