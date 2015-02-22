var page = "home";
var clicked = false;

var projTemplate = $('<div></div>')
				.addClass('cd-timeline-block')
				.append($('<div></div>')
					.addClass('cd-timeline-img')
				)
				.append($('<div></div>')
					.addClass('cd-timeline-content')
					.append($('<h2></h2>')
						.addClass('title')
					)
					.append($('<p></p>')
						.addClass('content')
					)
					.append($('<span></span>')
						.addClass('cd-date')
					)
				);

var storyTemplate = $('<div></div>')
						.addClass('panel panel-default')
						.append($('<div></div>')
							.addClass('panel-heading collapsed')
							.attr({
								'data-toggle': 'collapse',
								'data-parent': '#stories'
							})
							.append($('<h3></h3>')
								.addClass('panel-title')
							)
						)
						.append($('<div></div>')
							.addClass('panel-collapse collapse')
							.append($('<div></div>')
								.addClass('panel-body')
							)
						);

$(document).on('click', '.navAjax', function (event) {
	event.preventDefault();
	if (window.location.hash == $(this).attr('href'))
		return false;
	window.location.replace($(this).attr('href'));
	clicked = true;
	loadPage();
});

$(document).ready(function() {
	if (!window.location.hash)
		window.location.replace(window.location + "#home");
	loadPage();
});


function capitalizeEachWord(str) {
	return str.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

function loadPage() {
	curPage = window.location.hash;
	curPage = curPage.replace("#", "")
	$("#ajax-content").hide();
	// Note to myself:
	// let individual projects, such as glossGallery, Cyberblaster, etc be seperate pages
	switch(curPage){
		case "resume":
			$('body').addClass('loading');
			$('#ajax-content').css("min-height", $(document).innerHeight()-$('#header').innerHeight()-$('.footer').innerHeight()-35);
			$("#ajax-content").load('assets/pages/'+curPage+'.html', function(){
				$(this).fadeIn('400');
				$('#ajax-content .pdf').height($('#ajax-content').innerHeight());
				window.setTimeout(function(){
					$('body').removeClass('loading');
				}, 1500);
			});
			break;
		default:
			$('body').removeClass('loading');
			$("#ajax-content").load('assets/pages/'+curPage+'.html', function(){
				if(curPage == "projects") renderProj(PROJECTS);
				else if (curPage == "stories") renderStory(STORIES);
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
		// console.log(proj);
		var template = $(projTemplate).clone();
		$(template).find('.cd-timeline-img').addClass('cd-'+proj.type);
		$(template).find('.title').append(proj.title);
		$(template).find('.content').append(proj.content);
		$(template).find('.cd-date').append(proj.date)

		if (proj.link){
			// console.log(proj.link);
			$(template)
				.find('.cd-date')
				.before($('<a></a>')
					.addClass('cd-read-more')
					.attr('href', proj.link)
					.attr('target', "_blank")
					.append('View Project')
				);
		}
		if (proj.note){
			$(template)
				.find('.content')
				.before($('<p></p>')
					.addClass('text-muted')
					.append(proj.note)
				);
		}
		$('#cd-timeline').append(template);
	});
}

function renderStory (storyList) {
	$.each(storyList, function(index, story) {
		var template = $(storyTemplate).clone();

		$(template).find('.panel-heading').attr('href', '#st'+index);
		$(template).find('.panel-title').append(story.title);
		$(template).find('.panel-collapse').attr('id', 'st'+index);
		$(template).find('.panel-body').append(story.content);

		$('#stories').append(template);

	});
}