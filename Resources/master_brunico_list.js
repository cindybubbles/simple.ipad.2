var BRUNICO_LIST = {};
(function(){
BRUNICO_LIST.url = "http://kidscreen.com/feed/";

// create table view data object
var data = [];
var db = Ti.Database.install('db/brunico.sqlite','tblfeed');
db.execute('CREATE TABLE IF NOT EXISTS tblfeed (id INTETER PRIMARY KEY AUTOINCREMENT, title VARCHAR(16) NOT NULL, url VARCHAR(16) NOT NULL, description VARCHAR(4000))');
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
				var description = item.getElementsByTagName("description").item(0).text;
				db.execute('INSERT INTO tblfeed (title,url,description) VALUES (?,?,?)',title,url,description);
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
var feedRS = db.execute('SELECT title,url,description FROM tblfeed');
		
		var x = 0;
		while (feedRS.isValidRow())
		{
		  var title = feedRS.fieldByName('title');
		  var url = feedRS.fieldByName('url');
		  var description = feedRS.fieldByName('description');
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
		  row.description2 = description;
		  
				
		  Ti.API.info(title + ' ' + url + ' ' + description + ' ');
		  feedRS.next();
		}
		feedRS.close();
		
		var tableview = Titanium.UI.createTableView({data:data});
		var button = Titanium.UI.createButton({title:'Update!', width:100, height:30, top:500});
		Titanium.UI.currentWindow.add(tableview);
		Titanium.UI.currentWindow.add(button);
		tableview.addEventListener('click',tableClick);			
		tableview.addEventListener('scrollEnd',refresh);
		button.addEventListener('click',refresh);
		function refresh(e) {
			button.title = "Updating...";
			BRUNICO_LIST.update(BRUNICO_LIST.url);
			BRUNICO_LIST.show(data);
			button.title = "Update again!";
		}
		function tableClick(e) {
		var evtData = {
			"row" : e.doctitle,
			"title": e.row.url,
			"url":e.row.url,
			"description2":e.row.description2
		};
		Ti.App.fireEvent('app:rowClicked', evtData);
		}
	}
	catch(E) {
		alert(E.message);
	}
}
if (Titanium.Network.networkType != Titanium.Network.NETWORK_NONE) {
	BRUNICO_LIST.update(BRUNICO_LIST.url);	
}
else {
	alert('No internet connection could be found. The system will not be able to update the data until then.');
}
BRUNICO_LIST.show(data);
})();