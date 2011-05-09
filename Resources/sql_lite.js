/**
 * @author Administrator
 */

var SQL_LITE_BACKEND = {};
(function(){
	SQL_LITE_BACKEND.initDatabase = function(brand_list) {
		var conn = Ti.Database.install("db/brunico.sqlite","brunico");
		var i = 0;
		for(i=0; i<brand_list.length; i++) {
			conn.execute('CREATE TABLE IF NOT EXISTS '+ brand_list[i] +' (id INTEGER PRIMARY KEY, title TEXT, url TEXT)');	
		}
		conn.close();
	}
	SQL_LITE_BACKEND.sync = function(brand_list) {
		Ti.include('feed_reader.js');
		var conn = Ti.Database.install("db/brunico.sqlite","brunico");

		for(var i=0;i<brand_list.length;i++) {
			var feeds;
			FEED_READER.load_feed(brand_list[i].feed_url);
			feeds = Titanium.App.Properties.getList('feeds');
			for(var j=0;j<feeds.length;j++) {
				try{
					conn.execute('INSERT INTO '+ brand_list[i].db_name + ' VALUES (?,?,?)',feeds[j].id,feeds[j].title,feeds[j].url);				
				}
				catch(ext){
					alert(ext.message);
				}
			}
		}
		conn.close();
	}
	SQL_LITE_BACKEND.load_local_feeds = function(brand_name) {
		var conn = Ti.Database.install("db/brunico.sqlite","brunico");
		var row = conn.execute('SELECT * FROM '+brand_name);
		var feeds = [];
		while (row.isValidRow()){
			var feed = {id:rs.field(0),title:rs.field(1),url:rs.field(2)};
			feeds.push(feed);
		}
		conn.close();
		return feeds;
	}
	
	SQL_LITE_BACKEND.init = function() {
		var brand_lists = ['KS','RS','PB','ST','MIC','STIM'];
		SQL_LITE_BACKEND.initDatabase(brand_lists);
	}
})();
SQL_LITE_BACKEND.init();
