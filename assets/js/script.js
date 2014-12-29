var page = "";
var clicked = false;

$(document).on('click', '.navAjax', function (event) {
	event.preventDefault();
	if (page == $(this).attr('href').replace("/","")) return false;
	page = $(this).attr('href').replace("/","");
	clicked = true;
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
				if(clicked) {
					$(this).fadeIn('400');
				}else{
					$(this).show();
				}
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