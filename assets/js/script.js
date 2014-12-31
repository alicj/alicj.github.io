var page = "home";
var clicked = false;

PROJECTS = [
	{
		title: "title1",
		type: "computer",
		content: "content1",
		date: "2014 Dec 12",
		view: false
	},
	{
		title: "title5",
		type: "computer",
		content: "content5",
		date: "2014 Dec 14",
		view: "GlossGallery/index.html"
	},
	{
		title: "title8",
		type: "computer",
		content: "content8",
		date: "2014 Dec 18",
		view: false
	}
]

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
	// Note to myself:
    // let individual projects, such as glossGallery, 
    // CyberBlasters, etc be seperate pages
	switch(curPage){
		case "resume":
			$('body').addClass('loading');
			$('#ajax-content').css("min-height", $(document).innerHeight()-$('#header').innerHeight()-$('.footer').innerHeight()-20);
			$("#ajax-content").load('assets/pages/'+curPage+'.html', function(){
				$(this).fadeIn('400');
				$('#ajax-content .pdf').height($('#ajax-content').innerHeight());
			});
			break;
		case "projects":
			$('body').removeClass('loading');
			$("#ajax-content").load('assets/pages/'+curPage+'.html', function(){
				renderProj(PROJECTS);
				$(this).fadeIn('400');
			});
			break;
		default:
			$('body').removeClass('loading');
			$("#ajax-content").load('assets/pages/'+curPage+'.html', function(){
				if(clicked) {
					$(this).fadeIn('400');
				}else{
					$(this).show();
				}
			});
	}
	setNavActive(curPage);
}

function setNavActive(curPage){
	$('.navAjax').removeClass('current');
	$('.navAjax[href="/'+curPage+'"]').addClass('current');
	$('title').html(capitalizeEachWord(curPage.replace("_", " ")) + ' | Alic Jiang');
}

function renderProj (projList) {
	$.each(projList, function(index, proj) {
		console.log(proj);
		var block = $('<div></div>')
						.addClass('cd-timeline-block')
						.append($('<div></div>')
							.addClass("cd-timeline-img cd-"+proj.type)
						)
						.append($('<div></div>')
							.addClass('cd-timeline-content')
							.append($('<h2></h2>')
								.append(proj.title)
							)
							.append($('<p></p>')
								.append(proj.content)
							)
							.append($('<span></span>')
								.addClass('cd-date')
								.append(proj.date)
							)
						);
		if (proj.view){
			console.log(proj.view);
			$(block)
				.find('.cd-date')
				.before($('<a></a>')
					.addClass('cd-read-more')
					.attr('href', proj.view)
					.append('View Project')
				);
		}
		$('#cd-timeline').append(block);
	});
}
