

$(document).on('click', '.navAjax', function (event) {
	event.preventDefault();
	console.log(event);
	window.location.replace($(this).attr('href'));
});

$(document).ready(function() {
	var args = Arg.all();
	url = {queryKey:  args};
	var a = $('<a>', { href:document.URL } )[0];
	var path = a.pathname.charAt(0) == '/' ? a.pathname.substring(1) : a.pathname;

	console.log(path);

	switch(path){
		case "":
			$("#ajax-content").load('assets/pages/index.html');
		default:
			$("#ajax-content").load('assets/pages/'+path+'.html');
	}

});