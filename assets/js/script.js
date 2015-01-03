var page = "home";
var clicked = false;

PROJECTS = [
    {
        title: "AgentFlux",
        note: "Web Developer Co-op @ AgentFlux Inc.",
        type: "computer",
        content: "\
            I worked in a team of seven people to create a web application \
            with JavaScript and HTML.\
            I also worked with Zend Framework to create certain APIs.\
            AgentFlux is an application across all platforms that provides \
            real estate agents a revolutionary way to connect with their clients\
             - share properties with them and schedule appointments.\
        ",
        date: "May - August 2014",
        link: "http://agentflux.com/"
    },
    {
        title: "Gloss Gallery",
        note: false,
        type: "internet",
        content: "\
            A gallery made upon professor's request to hold the top animations \
            written in Haskell submitted from class CS1JC3.\
            Some responsive design ideas are applied. The gallery mode is \
            completely written by me.\
        ",
        date: "May 2014",
        link: "GlossGallery/index.html"
    },
    {
        title: "Vshore Website",
        note: false,
        type: "computer",
        content: "A website made for Vshore Inc. I used JavaScript to build \
        several functions to reduce workload, like writting the header and the footer\
        automatically in every page. I also made that gallery myself. Didn't know too much about \
        responsive design back then. But the website does not break on a smaller screen.\
        ",
        date: "October 2013",
        link: "http://vshore.com/"
    },
    {
        title: "Cyber Blaster",
        note: "TechU.me Program",
        type: "mobile",
        content: "A program in which I worked with a high shcool peer, and a group of Grade Three students who act\
        as clients. We made an educational web-based app based on their proposal.\
        This is the first Web App I ever wrote. We learnt JavaScript, HTML, and \
        <a href='http://en.wikipedia.org/wiki/Systems_development_life_cycle'>SDLC</a> in a month during class independently.\
        The entire development is docummented on a weekly basis, as we applied some Agile and Lean ideas.\
        Checkout the Github repo <a href='https://github.com/AlicJ/CyberBlaster/'>here</a>.\
        Also we lunched the app onto a BlackBerry Playbook using \
        <a href='http://developer.blackberry.com/html5/'>WebWorks</a>.\
        ",
        date: "Janurary - June 2013",
        link: "CyberBlaster/index.html"
    }
]

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
    // let individual projects, such as glossGallery, 
    // CyberBlasters, etc be seperate pages
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
        // console.log(proj);
        var block = $('<div></div>')
                        .addClass('cd-timeline-block')
                        .append($('<div></div>')
                            .addClass("cd-timeline-img cd-"+proj.type)
                        )
                        .append($('<div></div>')
                            .addClass('cd-timeline-content')
                            .append($('<h2></h2>')
                                .addClass('title')
                                .append(proj.title)
                            )
                            .append($('<p></p>')
                                .addClass('content')
                                .append(proj.content)
                            )
                            .append($('<span></span>')
                                .addClass('cd-date')
                                .append(proj.date)
                            )
                        );
        if (proj.link){
            // console.log(proj.link);
            $(block)
                .find('.cd-date')
                .before($('<a></a>')
                    .addClass('cd-read-more')
                    .attr('href', proj.link)
                    .attr('target', "_blank")
                    .append('View Project')
                );
        }
        if (proj.note){
            $(block)
                .find('.content')
                .before($('<p></p>')
                    .addClass('text-muted')
                    .append(proj.note)
                );
        }
        $('#cd-timeline').append(block);
    });
}
