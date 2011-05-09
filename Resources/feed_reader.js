var FEED_READER = {};
(function() {
	FEED_READER.currentFeed = [];
	FEED_READER.read_feed = function(xmlObj, datalist, tableview){
		var xml = xmlObj.responseXML.documentElement;
		var items = xml.getElementsByTagName("item");
		
		var doctitle = xml.evaluate("//channel/title/text()").item(0).nodeValue;
        
		for (var c=0;c<items.length;c++) {
        	var item = items.item(c);
			var title2 = item.getElementsByTagName("title").item(0).text;
			var link2 = item.getElementsByTagName("link").item(0).text;
			var row = Ti.UI.createTableViewRow({title:title2, height:80, width:'100%', url:link2});
			datalist.push(row);
		}
		tableview.setData(datalist);
	}
	FEED_READER.load_feed = function(feedurl){
		var xhr = Ti.Network.createHTTPClient();
		xhr.onload = function () {
			var xml = this.responseXML.documentElement;
			var items = xml.getElementsByTagName("item");
			var doctitle = xml.evaluate("//channel/title/text()").item(0).nodeValue; 
			for (var c=0;c<items.length;c++) {
        		var item = items.item(c);
				var title2 = item.getElementsByTagName("title").item(0).text;
				var link2 = item.getElementsByTagName("link").item(0).text;
				var row = {id:c, title:title2, url:link2};
				FEED_READER.currentFeed.push(row);
			}
			Titanium.App.Properties.setList('feeds',FEED_READER.currentFeed);

		}
		xhr.open('GET', feedurl);
		xhr.send();
	}
	FEED_READER.display_feed = function(feedurl, datalist, tableview){
		FEED_READER.load_feed(feedurl);
		FEED_READER.currentFeed = Titanium.App.Properties.getList('feeds');
		for (var f=0;f<FEED_READER.currentFeed.length;f++){
			var feed = FEED_READER.currentFeed[f];
			var row = Ti.UI.createTableViewRow({title:feed.title, height:80, width:'100%', url:feed.url});
			datalist.push(row);
		}
		tableview.setData(datalist);
	}
	
})();
