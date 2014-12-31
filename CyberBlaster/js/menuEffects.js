//hide uneccessary divs----------------------------------------------
hideDiv('#gamefield');
//hideDiv('#menu');
hideDiv('#setting1');
hideDiv('#help1');
hideDiv('#credit');
hideDiv('#highscore');
hideDiv('#save');
hideDiv('#namefield');
hideDiv('#pauseScreen');
hideDiv('#effects')
hideDiv('#shop');
hideDiv('#setting2');
hideDiv('#help2');
hideDiv('#mainmenu');
hideDiv('#levelComplete');
hideDiv('#gameover');
//$('body').css('width',window.innerWidth);
//$('body').css('height',window.innerHeight);

/*** Splash is disabled due to the load screen function of PlayBook
if(count === 0){
	splashscreen = window.setInterval(splash, 1000);
	count+=1;
}else{
    clearInterval(splashscreen); 
}
***/
//load highscores----------------------------------------------
if(!localStorage.highscore){
    localStorage.highscore = high;
}else{
    high = JSON.parse(localStorage.highscore);
}
//load music------------------------------------------------------------------------------------------------------------------------------------------
loadTrack(currentTrack);
//hide pictures--------------------------------------------------------------------------------------------
shieldPic.hide();
layer.add(shieldPic);
stage.add(layer);
//load configurations----------------------------------------------
if(!localStorage.sound){
	localStorage.setItem('music',JSON.stringify(music));
	localStorage.setItem('sound',JSON.stringify(sound));
	localStorage.setItem('bgscrolling',JSON.stringify(bgscrolling));
}
music = JSON.parse(localStorage.getItem('music'));
sound = JSON.parse(localStorage.getItem('sound'));
bgscrolling = JSON.parse(localStorage.getItem('bgscrolling'));
var lang = localStorage.getItem('lang');
if (lang == 'fr') {
	french = true;
	english = false;
}
if(english){
    englishfy();
}else{
    frenchify();
}
//start background animation----------------------------------------------
mainInterval = window.setInterval(mainAnimation, 1000/60);
//write item prices----------------------------------------------
$('.priceBomb').text(priceBomb);
$('.priceShield').text(priceShield);
$('.priceLife').text(priceLife);
$('.priceFreeze').text(priceFreeze);
//main function for every click effects----------------------------------------------
$(document).ready(function() {
    //for main menu selections
	$('.newgame').click(function(){
        //below is the saving slot, refer line 139-234 for relevant funcitons
        hideDiv('#help1');
		hideDiv('#highscore');
        hideDiv('#setting1');
        hideDiv('#namefield');
        fadeInDiv('#save');
		shipAnimate();
		//below is to load the save info
		for (var i=0;i<5;i++){
			if (localStorage['save'+i]&&slot[i]){
				//get data from localStorage
				getSave[i] = new Object();
				getSave[i] = JSON.parse(localStorage.getItem('save'+i));
				if(english) $('.save'+(i+1)).text(getSave[i].name + " " + en_level + " " + (parseInt(getSave[i].level)+1) + " - " + getSave[i].lastSave);
				if(french) $('.save'+(i+1)).text(getSave[i].name + " " + fr_level + " " + (parseInt(getSave[i].level)+1) + " - " + getSave[i].lastSave);
			}
		}
	});
    $('.setting1').click(function(){
        hideDiv('#help1');
        hideDiv('#save');
		hideDiv('#highscore');
        hideDiv('#namefield');
		fadeInDiv('#setting1');
	});
    $('.bg').click(function(){
        if(bgscrolling){
            bgscrolling = false;
            if(english) $('.bg').text(en_backscrollOff);
			if(french) $('.bg').text(fr_backscrollOff);
        }else{
            bgscrolling = true;
            if(english) $('.bg').text(en_backscrollOn);
			if(french) $('.bg').text(fr_backscrollOn);
        }
		localStorage.setItem('bgscrolling',JSON.stringify(bgscrolling));
    });
    $('.music').click(function(){
        if(music){
            music = false;
            musicPause();
            if(english) $('.music').text(en_musicOff);
			if(french) $('.music').text(fr_musicOff);
        }else{
            music = true;
            musicPlay();
            if(english) $('.music').text(en_musicOn);
			if(french) $('.music').text(fr_musicOn);
        }
		localStorage.setItem('music',JSON.stringify(music));
    });
    $('.sound').click(function(){
        if(sound){
            sound = false;
            if(english) $('.sound').text(en_soundOff);
			if(french) $('.sound').text(fr_soundOff);
        }else{
            sound = true;
            if(english) $('.sound').text(en_soundOn);
			if(french) $('.sound').text(fr_soundOn);
        }
		localStorage.setItem('sound',JSON.stringify(sound));
    });
	$('.lang').click(function(){
		if(english){
			frenchify ()
		}else{
			englishfy ()
		}
	})
    $('.english').click(function(){
		englishfy();
    });
    $('.french').click(function(){
		frenchify();
    });
	$('.help1').click(function(){
        hideDiv('#setting1');
        hideDiv('#save');
		hideDiv('#highscore');
        hideDiv('#namefield');
        fadeInDiv('#help1');
	});
	$('.highscore').click(function(){
        hideDiv('#setting1');
        hideDiv('#help1');
        hideDiv('#save');
        hideDiv('#namefield');
        fadeInDiv('#highscore');
		sortScore();
		$('#highscore ul').text('');//reset highscore, or will add scores unlimited
		showScore();
	});
    $('.credit').click(function(){
        hideDiv('#setting1');
		hideDiv('#highscore');
        hideDiv('#help1');
        hideDiv('#menu');
        hideDiv('#save');
        hideDiv('#namefield');
        fadeInDiv('#credit');
		creditInterval = window.setInterval(creditAnimation, 1000/60);
        pauseInterval = window.setInterval(function(){
            if(creditPosition <= -1750){
                clearInterval(creditInterval);
                counter++;
            }
            if(counter == 3){
                $('#credit').fadeOut();
            }
            if(counter == 4){
                fadeInDiv('#menu');
                counter = 0;
                creditPosition = 560;
            }
        },1000);
        
    });
    $('#credit').click(function(){
        window.clearInterval(creditInterval);
        window.clearInterval(pauseInterval);
        hideDiv('#credit');
		creditPosition = 560;
        fadeInDiv('#menu');
    });
    //for in-game buttons
    $('.pause').click(function(){
        hideDiv('#nonPause');
        $('#myCanvas').fadeTo(400, 0.5);
        if (freezeOn) $('#myCanvas').fadeTo(400, 0.5);
        fadeInDiv('#pauseScreen');
        animStop(true);
        pause = true;
    });
    //close pause screen
    $('.resume').click(function(){
        hideDiv('#pauseScreen');
        hideDiv('#setting2');
        hideDiv('#shop');
        hideDiv('#help2');
        hideDiv('#mainmenu');
        fadeInDiv('#nonPause');
        $('#myCanvas').fadeTo(400, 1.0);
        if (freezeOn) $('#effects').fadeTo(400, 1.0);
        if(!freezeOn)
        {
            animStop(false);
        }
        pause =false;
    });
    //open the shop
    $('.shop').click(function(){
        hideDiv('#mainmenu');
        hideDiv('#setting2');
        hideDiv('#help2');
        fadeInDiv('#shop');
    });
    //buy various items
    $('.bomb').click(function(){
        if(score>=priceBomb){
    		score -= priceBomb;
    		$('#leftPanel #score .num').text(score);
    		numBomb +=1;
            textrepl('.numBomb .num', numBomb);
        }
    });
    $('.shield').click(function(){
        if(score>=priceShield){
        	score -= priceShield;
    		$('#leftPanel #score .num').text(score);
    		numShield +=1;
            textrepl('.numShield .num', numShield);
        }
    });
    $('.life').click(function(){
        if(score>=priceLife){
            score -= priceLife;
    		$('#leftPanel #score .num').text(score);
    		lives +=1;
            textrepl('#lives .num', lives);
        }

    });
    $('.freeze').click(function(){
        if(score>=priceFreeze){
            score -= priceFreeze;
        	$('#leftPanel #score .num').text(score);
    		numFreeze +=1;
            textrepl('.numFreeze .num', numFreeze);
        }

    });
    $('.setting2').click(function(){
        hideDiv('#mainmenu');
        hideDiv('#shop');
        hideDiv('#help2');
        fadeInDiv('#setting2');
    });
    $('.help2').click(function(){
        hideDiv('#mainmenu');
        hideDiv('#shop');
        hideDiv('#setting2');
        fadeInDiv('#help2');
    });
    $('.mainmenu').click(function(){
        hideDiv('#setting2');
        hideDiv('#shop');
        hideDiv('#help2');
        fadeInDiv('#mainmenu');
    });
    $('.backMain').click(function(){
		//updateData(selectSlot);
        gamestart = false;
        bgscrolling = true;
        clearInterval(gameLoop);
        clearInterval(bgInterval);
        ended();
        switchTrack(0);
		destoryed.pause();
        mainInterval = window.setInterval(mainAnimation, 1000/60);
		hideDiv('#gamefield');
        hideDiv('#mainmenu');
        hideDiv('#pauseScreen');
		hideDiv('#levelcomplete');
		hideDiv('#gameover');
		hideDiv('#save');
		fadeInDiv('#main');
        $('#myCanvas').fadeTo(400, 1.0);
        pause=false;
        for(var i=0;i<enemies.length;i++)
        {
            enemies[i].image.hide();
            enemies[i].text.hide(); 
        }
        for(var i=0; i<enemies.length;i++)
                {
                    anim[i].stop;
                }
        enemies = new Array();
        enemyNum=0;
    });
    $('.no').click(function(){
        $('#mainmenu').fadeOut();
    });
    $('.nextLevel').click(function(){
        levelSelect(level);
        enemyNum=0;
        hideDiv("#levelComplete");
        $('#rightPanel .level').text(level+1);
		pause = false;
    });
    $('.exit').click(function(){
        window.close();
        blackberry.app.exit();
    });
});
