var page = "";

$(document).on('click', '.navAjax', function (event) {
	event.preventDefault();
	page = $(this).attr('href').replace("/","");
	loadPage(page);
});

$(document).ready(function() {
	loadPage();
});

function loadPage(curPage="") {
	$("#ajax-content").hide();
	switch(curPage){
		case "":
			$("#ajax-content").load('assets/pages/index.html', function(){
				$(this).fadeIn('400');
			});
			break;
		default:
			$("#ajax-content").load('assets/pages/'+curPage+'.html', function(){
				$(this).fadeIn('400');
			});
	}
	setNavActive(curPage);
}

function setNavActive(curPage){
	$('.navAjax').removeClass('current');
	$('.navAjax[href="/'+curPage+'"]').addClass('current');
}