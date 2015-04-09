// JavaScript Document
function subnavTitle(num) {
	for (i=1;i<=5;i++){
		$("#subnav #text" + i + "-link").removeClass("current");
	}
	$("#subnav #text" + num + "-link").addClass("current");
}
function subnavScroll(num) {
	//subnavTitle(num);
	$.smoothScroll({scrollTarget: "#text" + num});
}
function browsers () {
	if ($.browser.mozilla) {
		return "html"
	}else {
		return "body"
	}
}


$(document).ready(function() {
	var str = browsers ();
	$.stellar()
	$(".nav-menu .item1").click(function(){
		 $.smoothScroll({scrollTarget: "#intro"});
	})
	$(window).scroll(function () { 
		if ($(str).scrollTop() <= $("#intro").position().top-90){
			$(".nav-menu .item1").removeClass("active");
		}else{
			$(".nav-menu .item1").addClass("active");
		}
	
		if ($(str).scrollTop() >= $("#text1").position().top-130){
			$("#sub-navigation").css("position", "fixed");
			$("#sub-navigation").css("top", "91px");
		}else{
			$("#sub-navigation").css("position", "static");
		}
		
		if ($(str).scrollTop() >= $("#text1").position().top-130 && $(str).scrollTop() <= $("#text2").position().top-130){
			subnavTitle(1);
		}else if ($(str).scrollTop() >= $("#text2").position().top-130 && $(str).scrollTop() <= $("#text3").position().top-120){
			subnavTitle(2);
		}else if ($(str).scrollTop() >= $("#text3").position().top-120 && $(str).scrollTop() <= $("#text4").position().top-120){
			subnavTitle(3);
		}else if ($(str).scrollTop() >= $("#text4").position().top-120 && $(str).scrollTop() <= $("#text5").position().top-150){
			subnavTitle(4);
		}else if ($(str).scrollTop() >= $("#text5").position().top-150){
			subnavTitle(5);
		}
	});
	
	

		
	
})