var page = "";

$(document).on('click', '.navAjax', function (event) {
	event.preventDefault();
	page = $(this).attr('href').replace("/","");
	setPage(page)
	loadPage();
});

$(document).ready(function() {
	loadPage();
});

function setPage(curPage){
	localStorage.setItem('lastViewdPage', curPage)
}

function loadPage() {
	var isValid = localStorage.getItem('lastViewdPage');
	var curPage = isValid ? isValid : "";

	$("#ajax-content").hide();
	switch(curPage){
		case "":
			$("#ajax-content").load('assets/pages/index.html');
			break;
		default:
			$("#ajax-content").load('assets/pages/'+curPage+'.html');
	}
	setNavActive(curPage);
	$("#ajax-content").fadeIn('fast');

}

function setNavActive(curPage){
	$('.navAjax').removeClass('current');
	$('.navAjax[href="/'+curPage+'"]').addClass('current');
}