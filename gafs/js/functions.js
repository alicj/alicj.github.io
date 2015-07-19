function renderHeader() {
	var str='<div class="header-content">\
      <ul class="topnav alignright">\
        <li>\
          <a href="index.html" title="Home">Home</a>\
        </li>\
        <li>\
          <a href="services.html" title="Services">Services</a>\
        </li>\
        <li><a href="about.html" title="Company">About Us</a>\
          <div class="subnav subnav3">\
            <div class="clearfix" id="company">\
              <dl class="alignleft">\
                <dd><a href="about.html" title="About Us">About Us</a></dd>\
                <dd><a href="team.html" title="Our Team">Our Organization</a></dd>\
              </dl>\
            </div>\
          </div>\
        </li>\
        <li>\
          <a href="contact.html" title="Contact Us">Contact Us</a>\
        </li>\
      </ul>\
      <!-- start logo -->\
      <h1 id="logo" class="alignleft"><a href="index.html" title="ppandp">ppandp</a></h1>\
      <!-- end logo -->\
    </div>\
    <div id="header-bottom" class="clear"></div>';

    $('#header').html(str);
    console.log($("#header").attr('page'));

    //set active
    var pageNum = 0;
    if ($("#header").attr('page')) {
    	pageNum = $("#header").attr('page');
    }
    $("#header ul li:nth-child("+pageNum+")").addClass('active');
}

function renderFooter() {
	var str='<div class="footer-content clearfix">\
    <div class="col1-3">\
      <h3>Contact Us</h3>\
      <p>Global Association for Food Saftey<br />\
        22 Miron Drive<br />\
        New York City, 12603 NY<br />\
        Email: <a href="contact.html" class="escape" title="Contact">info<span><span>&part;</span></span>domain.com</a><br />\
        Phone: (845) 453 9867</p>\
    </div>\
    <div class="col1-3">\
      <h3>About Us</h3>\
      <p>\
      	Our goal is to provide food safety professionals worldwide with a forum to exchange information on protecting the food supply. <a href="about.html">Read more</a>\
      </p>\
    </div>\
    <div class="col1-3 last">\
      <h3>Footer Links</h3>\
      <p><a href="index.html" title="Home">Home</a><br />\
        <a href="services.html" title="Services">Services</a><br />\
        <a href="about.html" title="About Us">About Us</a><br />\
        <a href="contact.html" title="Contact Us">Contact Us</a><br />\
      </p>\
    </div>\
    <div id="footer-bottom" class="clear">\
      <p class="alignleft">(c) 2012 GAFS.com. All rights reserved.</p>\
    </div>\
  </div>'


    $('#footer').html(str);
}

$(document).ready(function() {
	renderHeader();
	renderFooter();
});