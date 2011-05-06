var FEED_WINDOW = {};
(function() {
	FEED_WINDOW.read_feed = function(xmlObj, datalist, tableview){
	var xml = xmlObj.responseXML.documentElement;
		var channels = xml.getElementsByTagName("channel");
		var i = 0;
		var items = xml.getElementsByTagName("item");
		
		var x = 0;
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
})();
