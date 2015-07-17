var SCREEN_WIDTH = screen.width;
var SCREEN_HIGHT = screen.height;
var SCROLL_TIME = 3000;

function setWindowSize() {
	$('.piece').height(window.innerHeight);
}

function nextFilm() {;
	var current = $('.piece.current');
	var next = current.next('.piece');
	if(next.length > 0) {
		$(current).removeClass('current');
		$(next).addClass('current');
		$(next).css('left', window.innerWidth);
		$(next).show();
		$(current).animate({left: -window.innerWidth}, SCROLL_TIME);
		$(next).animate({left: 0}, SCROLL_TIME);
	}
	console.log(next);
}

function prevFilm() {;
	var current = $('.piece.current');
	var prev = current.prev('.piece');
	if(prev.length > 0) {
		$(current).removeClass('current');
		$(prev).addClass('current');
		$(prev).css('left', -window.innerWidth);
		$(prev).show();
		$(current).animate({left: window.innerWidth}, SCROLL_TIME);
		$(prev).animate({left: 0}, SCROLL_TIME);
	}
	console.log(next);
}

$("#next").on("click", function(event) {
	event.preventDefault();
	console.log("next!");
	nextFilm();
});

$("#prev").on("click", function(event) {
	event.preventDefault();
	console.log("prev!");
	prevFilm();
});

$(window).resize(function(event) {
	/* Act on the event */
	setWindowSize();
});

$(document).ready(function() {
	setWindowSize();
	$('.piece').first().show();
	$('.piece').first().addClass('current');
});