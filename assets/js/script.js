var page = "home";
var clicked = false;

$(document).on('click', '.navAjax', function (event) {
	event.preventDefault();
	if (page == $(this).attr('href').replace("/","")) return false;
	page = $(this).attr('href').replace("/","");
	clicked = true;
	loadPage(page);
});

$(document).ready(function() {
	loadPage(page);
});

function capitalizeEachWord(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function loadPage(curPage) {
	$("#ajax-content").hide();
    // let individual projects, such as glossGallery, CyberBlasters, etc be seperate pages
	// switch(curPage){
	// 	case "":
	// 		$("#ajax-content").load('assets/pages/index.html', function(){
	// 			if(clicked) {
	// 				$(this).fadeIn('400');
	// 			}else{
	// 				$(this).show();
	// 			}
	// 		});
	// 		break;
	// 	default:
	$("#ajax-content").load('assets/pages/'+curPage+'.html', function(){
		$(this).fadeIn('400');
	});
	// }
	setNavActive(curPage);
}

function setNavActive(curPage){
	$('.navAjax').removeClass('current');
	$('.navAjax[href="/'+curPage+'"]').addClass('current');
	$('title').html(capitalizeEachWord(curPage.replace("_", " ")) + ' | Alic Jiang');
}