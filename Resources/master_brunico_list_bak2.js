
(function(){
	

// create table view data object
var data = [];

var xhr = Ti.Network.createHTTPClient();
xhr.open("GET","http://kidscreen.com/feed/");
xhr.onload = function()
{
	try
	{
		var doc = this.responseXML.documentElement;
		var items = doc.getElementsByTagName("item");
		var x = 0;
		var doctitle = doc.evaluate("//channel/title/text()").item(0).nodeValue;
		for (var c=0;c<items.length;c++)
		{
			var item = items.item(c);
			
			var title = item.getElementsByTagName("title").item(0).text;
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
			row.url = item.getElementsByTagName("link").item(0).text;	
			
			
		}
		var tableview = Titanium.UI.createTableView({data:data});
		Titanium.UI.currentWindow.add(tableview);
		tableview.addEventListener('click',tableClick);			
		
		function tableClick(e) {
		var evtData = {
			"row" : e.doctitle,
			"title": e.row.url 
		}
		Ti.App.fireEvent('app:rowClicked', evtData);
ad
	}
		
		
	}
	catch(E)
	{
		alert(E);
	}
};
xhr.send();

	
})();