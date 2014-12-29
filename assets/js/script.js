var page = "";

$(document).on('click', '.navAjax', function (event) {
	event.preventDefault();
	page = $(this).attr('href').replace("/","");
	loadPage(page);
});

$(document).ready(function() {
	loadPage(page);

});

function loadPage (page) {
	switch(page){
		case "":
			$("#ajax-content").load('assets/pages/index.html');
			break;
		default:
			$("#ajax-content").load('assets/pages/'+page+'.html');
	}
}