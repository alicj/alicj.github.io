var contextMenu = require('sdk/context-menu');
var tabs = require('sdk/tabs');
var newTabUrl = 'about:newtab';

var addLinkScript = 'self.on("click", function(node, data) {' + 
					'	console.log(tabs.activeTab.url);' + 
					'	console.log("Item clicked!");' + 
					'});'

var menuItem = contextMenu.Item({
	label: 'Add this page to quick launch',
	// contentScript: addLinkScript				
})

tabs.on('open', function(tab){
	tab.on('ready', function(tab){
		if (tab.url == newTabUrl) {
			console.log("new tab!");
		}
	});
});