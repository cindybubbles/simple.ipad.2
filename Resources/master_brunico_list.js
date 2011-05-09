var BRUNICO_LIST = {};
(function(){
	

// create table view data object
var data = [];
var db = Ti.Database.open('feedDB');
db.execute('CREATE TABLE IF NOT EXISTS tblfeed (title VARCHAR(16) NOT NULL, url VARCHAR(16) NOT NULL)');
BRUNICO_LIST.update = function(url) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.open("GET",url);
	xhr.onload = function() {
		try	{	
		
			db.execute('DELETE FROM tblfeed');
		
			var doc = this.responseXML.documentElement;
			var items = doc.getElementsByTagName("item");
			var x = 0;
			var doctitle = doc.evaluate("//channel/title/text()").item(0).nodeValue;
			for (var c=0;c<items.length;c++)
			{
				var item = items.item(c);			
				var title = item.getElementsByTagName("title").item(0).text;
				var url = item.getElementsByTagName("link").item(0).text;
				db.execute('INSERT INTO tblfeed (title,url) VALUES (?,?)',title,url);
			}
		}
		catch(E) {
			alert(E.message);
		}
	};
	xhr.send();
};
BRUNICO_LIST.show = function(data) {
	try
	{
var feedRS = db.execute('SELECT title,url FROM tblfeed');
		
		var x = 0;
		while (feedRS.isValidRow())
		{
		  var title = feedRS.fieldByName('title');
		  var url = feedRS.fieldByName('url');

		  var row = Ti.UI.createTableViewRow({height:50});
		  var label = Ti.UI.createLabel({
					text:title,
					left:72,
					top:5,
					bottom:5,
					right:5				
				});
			row.add(label);
			data[x++] = row;
			row.url = url;
		  
		  Ti.API.info(title + ' ' + url + ' ');
		  feedRS.next();
		}
		feedRS.close();
		
		var tableview = Titanium.UI.createTableView({data:data});
		Titanium.UI.currentWindow.add(tableview);
		tableview.addEventListener('click',tableClick);			
		
		function tableClick(e) {
		var evtData = {
			"row" : e.doctitle,
			"title": e.row.url,
			"url":e.row.url
		}
		Ti.App.fireEvent('app:rowClicked', evtData);
		}
	}
	catch(E) {
		alert(E.message);
	}
}
if (Titanium.Network.networkType != Titanium.Network.NETWORK_NONE) {
	BRUNICO_LIST.update("http://kidscreen.com/feed/");	
}
else {
	alert('No internet connection could be found. The system will not be able to update the data until then.');
}
BRUNICO_LIST.show(data);
})();