

$(document).ready(function() {
	var args = Arg.all();
	url = {queryKey:  args};
	var a = $('<a>', { href:document.URL } )[0];
	var path = a.pathname.charAt(0) == '/' ? a.pathname.substring(1) : a.pathname;

	console.log(path)
});