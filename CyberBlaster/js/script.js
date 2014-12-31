//questionmaker
var switcher=0;
    function QuestionMaker(num1, num2, operation){

        if (Math.max(num1, num2)== num2){
            switcher = num2;
			num2=num1;
			num1=switcher;
		}
		
		if(operation>=3){
			num1 = halver(num1+1);
			num2 = halver(num2+1);
		}
		
		switch(operation){
			case 1: //addition
                this.answer = num1 + num2;
				//$("#question").text("What is " + num1 + " plus " + num2+ "? ");
				this.question = num1 + " + " + num2+ " = ? ";
                break;
			case 2: //subtraction
				this.answer = num1 - num2;
				//$("#question").text("What is " + num1 + " minus " + num2+ "? ");
				this.question = num1 + " - " + num2+ " = ? ";
                break;
			case 3: //multiplication
				this.answer = num1 * num2;
				//$("#question").text("What is " + num1 + " multiplied by " + num2+ "? ");
				this.question = num1 + " x " + num2+ " = ? ";
				break;
			case 4: //division
				num1 *= num2;
				this.answer = num1 / num2;
				//$("#question").text("What is " + num1 + " divided by " + num2+ "? ");
				this.question = num1 + " / " + num2+ " = ? ";
				break;
		}
    }
	function halver (number){
		if(number>10){
			number /=2;
		}
            return Math.floor(number);
	}
	
//Keypad
	var input = "";
	function addNum (num){
        if(input.length<=3){
            input += num;
            $("#input").text(input);
        }
	}
	function clean(){
		input = "";
		$("#input").text(input);
	}
	
//highscore
var high = new Array();
var temp;
var high9 = new Object();

if(!localStorage.highscore){
    localStorage.highscore = high;
}else{
    high = JSON.parse(localStorage.highscore);
}

function sortScore(){
	for(var j=0; j<high.length-1; j++){
		for (var i=0; i<high.length-1; i++){
			if(high[i].score<high[i+1].score){
				temp = high[i];
				high[i] = high[i+1];
				high[i+1] = temp;
			}
		}
	}
	high9 = high.slice(0,9);
}

function showScore(){
	for(var h=0; h<high9.length; h++){
		$('#highscore ul').append('<li><span class="score">' + high9[h].score + '</span><span class="user">' + high9[h].user + '</span></li>');
	}
}

function pushScore(){
	var currentScore = {
		score : score,
		user : getSave[selectSlot].name
	};
	high.push(currentScore);
	sortScore();
	localStorage.highscore = JSON.stringify(high9);
}

	
//Music Player
    var playlist = [
        {
			mp3: 'music/01.mp3',
			ogg: 'music/01.ogg'
		},
	    {
			mp3: 'music/02.mp3',
			ogg: 'music/02.ogg'
		},
	    {
			mp3: 'music/03.mp3',
			ogg: 'music/03.ogg'
		},
        {
			mp3: 'music/04.mp3',
			ogg: 'music/04.ogg'
			},
        {
			mp3: 'music/05.mp3',
			ogg: 'music/05.ogg'
			},
        {
			mp3: 'music/06.mp3',
			ogg: 'music/06.ogg'
		},
        {
			mp3: 'music/07.mp3',
			ogg: 'music/07.ogg'
		},
        {
			mp3: 'music/08.mp3',
			ogg: 'music/08.ogg'
		},
        {
			mp3: 'music/09.mp3',
			ogg: 'music/09.ogg'
		},
        {
			mp3: 'music/10.mp3',
			ogg: 'music/10.ogg'
		},
        {
			mp3: 'music/11.mp3',
			ogg: 'music/11.ogg'
		},
        {
			mp3: 'music/12.mp3',
			ogg: 'music/12.ogg'
		},
        {
			mp3: 'music/13.mp3',
			ogg: 'music/13.ogg'
		},
        {
			mp3: 'music/14.mp3',
			ogg: 'music/14.ogg'
		},
        {
			mp3: 'music/15.mp3',
			ogg: 'music/15.ogg'
		},
        {
			mp3: 'music/16.mp3',
			ogg: 'music/16.ogg'
		},
        {
			mp3: 'music/17.mp3',
			ogg: 'music/17.ogg'
		},
        {
			mp3: 'music/18.mp3',
			ogg: 'music/18.ogg'
		},
        {
			mp3: 'music/19.mp3',
			ogg: 'music/19.ogg'
		},
	];
	
	var isPlaying,  currentTrack,
		currentTrack = 0,
		autoplay = true;
	
	function musicPlay(){
		audio.play();
		isPlaying = true;
	}
	function musicPause(){
		audio.pause();
		isPlaying = false;
	}
	function switchTrack(i){
		var track;
		if(i<0){
			track = currentTrack = playlist.length-1;
		}else if(i>=playlist.length){
			track = currentTrack = 0;
		}else{
			track = i;
		}
		$('audio').remove();
		loadTrack(track);
		if(isPlaying === true){
			musicPlay();
		}
	}
	//Fire when track ended
	function ended(){
		musicPause();
        if(gamestart){
            switchTrack(++currentTrack);
        }else{
            switchTrack(currentTrack);
        }
		
	}
	//
	function afterLoad(){
		if(autoplay == true){
			musicPlay();
		}
	}
	//Load track
	function loadTrack(i){
		var item = playlist[i],
			newaudio = $('<audio>').html('<source src="' + item.ogg + '"><source src="' + item.mp3 + '">').appendTo('.bgMusic');
		audio = newaudio[0];
		audio.addEventListener('canplay',afterLoad, false);
		audio.addEventListener('ended',ended, false);
	}
	
	loadTrack(currentTrack);
    
//Sound Effects
    var asteriod = new Audio('music/asteriod.ogg');		//destruction of an asteriod
	var destoryed = new Audio('music/destoryed.ogg');	//destruction of the main ship
	var beenhit = new Audio('music/beenhit.ogg');		//main ship been hit
	
/***
var source= document.createElement('source');
if (audio.canPlayType('audio/mpeg;')) {
    source.type= 'audio/mpeg';
    source.src= 'audio/song.mp3';
} else {
    source.type= 'audio/ogg';
    source.src= 'audio/song.ogg';
}
audio.appendChild(source);
***/

//Save files
    var creat = new Date();
    var now = new Date();
    //var newSave = new Array();
    var getSave = new Array();
    var saveLength = 5;
    var selectSlot;
	var slot = new Array();
	var GG = 0;
	for(var i=0; i<5; i++){
		slot[i] = true;
	}

	function LSupdate(pending,update){
		//add 1 to the version
		pending.version ++;
		//update last save date
		pending.lastSave = now.customFormat("#MMM# #D##th# #hh#:#mm#");
		//update the version
		localStorage.setItem(update,JSON.stringify(pending));
	}
	
	function LSget(pending,getData){
		//get data from localStorage
		pending = JSON.parse(localStorage.getItem(getData));
	}
    
	function updateData(num){
		getSave[num].level = level;
		getSave[num].score = score;
		getSave[num].numLives = lives;
		getSave[num].numShield = numShield;
		getSave[num].numBomb = numBomb;
		getSave[num].numFreeze = numFreeze;
		getSave[num].numEnemyKilled = numEnemyKilled;
		getSave[num].lastSave = now.customFormat("#MMM# #D##th# #hh#:#mm#");
		getSave[num].version++;
		LSupdate(getSave[num],'save'+num);
	}
	
	function deleteData(num){
		if(getSave[num]){
			getSave[num] = new Object();
			slot[num] = false;
			$('.save'+(num+1)).text('Please restart to use this slot');
			localStorage.removeItem('save'+num);
		}
	}
	
	function GameStart(){
		GG = 0;
		lives = 3;
		$('.lives').text(lives);
        $('.level').text(level+1);
        $('.score').text(score);
		hideDiv('#main');
		fadeInDiv('#gamefield');
		fadeInDiv('#ui');
		$('#gamefield').css('background', '#999');
		fadeInDiv('#nonPause');
		gamestart = true;
		enemyNum = 0;
		levelSelect(level);
		gameLoop = window.setInterval(enemyMaker, enemyDelay);
		bgInterval = window.setInterval(bgAnimation, 1000/30);
		ended();
		window.clearInterval(mainInterval);
		$('.level').text(level+1);
		score = getSave[selectSlot].score;
		$(".score").text(score);
        layer.add(base);
        stage.add(layer);
	}
    
    function GameOver(){
		if(GG == 0){
			if(fail){
				$('#gameover h3').text("Our ship is destroyed!");
				$('#gameover div').text("Retreat");
				if(sound) destoryed.play();
				getSave[selectSlot].level = 0;
				getSave[selectSlot].numBomb = 0;
				getSave[selectSlot].numEnemyKilled = 0;
				getSave[selectSlot].numFreeze = 0;
				getSave[selectSlot].numLives = 3;
				getSave[selectSlot].numShield = 0;
				if(getSave[selectSlot].score<0) getSave[selectSlot].score = 0;
				LSupdate(getSave[selectSlot],'save'+selectSlot);
				slot[selectSlot] = false;
				$('.save'+(selectSlot+1)).text('Please restart to use this slot');

			}else{
				$('#gameover h3').text("We survived from the meteoric stream!");
				$('#gameover div').text("Celebrate!");
			}
			$('#ui').fadeOut();
			$('#gamefield').css('background-image', 'url(images/space.jpg)');
			clearInterval(gameLoop);
			fadeInDiv('#gameover');
			pushScore();
		}
		GG ++;
    }
	
	function saveData(i){
		//if save does not exist
        if(!getSave[i]&&slot[i]){
            hideDiv('#save');
            fadeInDiv('#namefield');
            $(".launch").click(function(){
				hideDiv('#namefield');
				hideDiv('#save');
                selectSlot = i;
                getSave[i] = {
                    name : $(".name").val(),
                    slot: selectSlot,
                    level : 1,
                    score : 0,
                    numLives : 3,
                    numShield : 0,
                    numBomb : 0,
                    numFreeze : 0,
                    numEnemyKilled : 0,
                    lastSave : 0,
                    createTime: creat.customFormat("#MMM# #D##th# #hh#:#mm#"),
                    version : 1
                };
				//if the input name is valid, store it and start game
                if(getSave[i].name){
                    if(getSave[i].name.length>0) {
                        LSupdate(getSave[i],'save'+i);
						level = 0;
						selectSlot = i;
						GameStart();
                    }
				//otherwise dont
                }else{
                    getSave[i] = "";
                }

            });
		//if the save exit, use it
        }else if(slot[i]){
			selectSlot = i;
			level = getSave[selectSlot].level;
			lives = getSave[selectSlot].numLives;
			GameStart();
        }
	}
    

//Motion
    //Animation
  
    var canvas = document.getElementById('myCanvas');
	canvas.width = 768;
	canvas.height = $('#myCanvas').height();
    var gamestart = false;
    var enemies;
    var enemyNum = 0;
    var stage = new Kinetic.Stage({
            container: 'myCanvas',
            width: canvas.width,
            height: canvas.height
        });
    var layer = new Kinetic.Layer();
    
	var lives = 3;
    var numShield = 0;
    var numBomb = 0;
    var numFreeze = 0;
    var score = 0;
	var numEnemyKilled = 0;
    var shieldOn = false;
	var fail = false;

	var rectX = canvas.width/2-50;
	var rectY = canvas.height/2-50;
    var totalEnemies=1;
    var enemyDelay=5000;
    var enemySpeed=20000;
    var enemies = new Array();
    var bgInterval = null;
    var bgPosition = 0;
	var imageObj = new Image();
    imageObj.src = 'images/Meteor.png';
	var bgImg = new Image();
	bgImg.src = "images/space.jpg";
    var baseImg = new Image();
    baseImg.src = "images/SpaceshipFlame.png";
    var shieldImage = new Image();
    shieldImage.src = "images/ShipShield.png";
	var expImg = new Image();
	expImg.src = "images/explosion.png";
    var anim = new Array();
    var pause = false;
    var base;
    base = new Kinetic.Image({
        x: stage.getWidth() / 2 -50,
        y: stage.getHeight() / 2 -50,
        width: 140,
        height: 110,
        //stroke:"Red",
        //strokeWidth:1,
        image:baseImg,
    });
    var shieldPic =new Kinetic.Image({
        x: (stage.getWidth() / 2)-136,
        y: (stage.getHeight() / 2)-155,
        width: 320,
        height: 320,
        image:shieldImage,
    });
    shieldPic.hide();
    layer.add(shieldPic);
    stage.add(layer);
    
    function submit(){
        var correct =false
        for(var i = 0; i <enemies.length; i++ ){
            if(input == enemies[i].answer&&enemies[i].alive){
                cleanEnemy (i);
                var redLine = new Kinetic.Line({
                    points: [enemies[i].image.attrs.x, enemies[i].image.attrs.y, base.attrs.x+70, base.attrs.y+55],
                    stroke: 'red',
                    strokeWidth: 15,
                    lineCap: 'round',
                    lineJoin: 'round'
                });
                layer.add(redLine);
                stage.add(layer);
                var counter=true;
                var lazerCount = window.setInterval(function()
                {
                    if(!counter)
                    {
                        clearInterval(lazerCount);
                        redLine.hide();
                    }
                    counter=false;
                },400);
                score+=Math.round(enemies[i].scoreKeep);
				numEnemyKilled ++;
				if(sound) asteriod.play();
                correct=true;
            }
        }
        if(!correct)
        {
            score-=300;
        }
		$(".score").text(score);
        input = "";
        $("#input").text(input);
    }
    
    
    
    
   function enemyMaker ()
   {
       if(gamestart&&enemyNum<totalEnemies&&!pause)
        {
            var side= Math.floor((Math.random())*4+1);
            var question = new QuestionMaker(Math.floor(Math.random()*20)+1, Math.floor(Math.random()*20)+1,Math.floor(Math.random()*4)+1 );
            var x=0;
            var y=0;
            if(side==2||side==4)
            {
                y= Math.floor(Math.random()*canvas.height)+1;
                if(side==2){
                    x= canvas.width+50;
                }
                else{
                    x=-50;
                }
            }
            else if(side==1||side==3)
            {
                x= Math.floor(Math.random()*canvas.width)+1;
                if(side==3){
                    y= canvas.height+50;
                }
                else{
                    y=-50;
                }
            }
            enemies[enemyNum]= new enemy(x, y, question.question, question.answer, side);
            if(enemies[enemyNum].image.attrs.x>base.attrs.x)
            {
                enemies[enemyNum].image.setScale(-1, 1);
            }
            if(enemies[enemyNum].image.attrs.y>image.attrs.x>base.attrs.y)
            {
                enemies[enemyNum].image.setScale(1, -1);
            }
            layer.add(enemies[enemyNum].image);
            layer.add(enemies[enemyNum].text);
           
            stage.add(layer);
            
            
            animate(enemyNum);
            
            enemyNum++;
            }
   }
    function levelSelect (level)
    {
        totalEnemies = 1 +3*level;
        enemySpeed = 100000/(5+level);
        enemyDelay = 30000/(5+level);
    }
    function enemy (x_bron, y_bron, question, answer, side)
    {
        this.answer = answer;
        this.alive = true;
        this.side = side
       	this.fixedX = x_bron;
		this.fixedY = y_bron;
        //this.borderWidth= 2;   
        this.xGap = ((canvas.width/2)-x_bron)/enemySpeed;
        this.yGap = ((canvas.height/2)-y_bron)/enemySpeed;
        this.scoreKeep=1000;
        this.image = new Kinetic.Image({
                x: x_bron,
                y: y_bron,
                width: 100,
                height:30,
                image:imageObj, 
                offset: [25, 30],
                rotation:-Math.atan(Math.abs((y_bron-base.attrs.y)/(x_bron-base.attrs.x)))
        });
        this.text = new Kinetic.Text({
            x: x_bron,
            y: y_bron,
            text: question,
            fontSize: 20,
            fontFamily: 'TIEWing',
            fill: '#67EFE9'
        });
		this.explosion = new Kinetic.Image({
			x: 0,
			y: 0,
			width: 30,
			height: 30,
			image: expImg,
			offset: [15, 15]
		});
    }
   
	//Background Animation
	function bgAnimation() {
        if(bgscrolling){
            bgPosition--;
            $("#myCanvas").css({backgroundPosition: (bgPosition * 5) + "px 0px"});
    	    if(Math.abs(bgPosition)>=bgImg.width){
			    bgPosition = 0;
		    }
        }
	}
    
    function cleanEnemy (num)
    {
        anim[num].stop();
		enemies[num].explosion.attrs.x = enemies[num].image.attrs.x;
		enemies[num].explosion.attrs.y = enemies[num].image.attrs.y;
		layer.add(enemies[num].explosion);
		stage.add(layer);
	    anim[num] = new Kinetic.Animation(function (frame){
         enemies[num].explosion.setScale(1+frame.time/500);
         if(frame.time>500)
         {
             anim[num].stop();
             enemies[num].explosion.hide();
         }
	    }, layer);
        anim[num].start();
		enemies[num].alive = false;
        enemies[num].image.hide();
        enemies[num].text.hide(); 
        stage.add(layer);
         var counter=0;
         for(var i=0;i<enemies.length;i++)
         {
          if(!enemies[i].alive)
             {
                 counter++;
             }
         }
         // Level is Cleared
         if(counter==totalEnemies)
         {
			 level++;
			 updateData(selectSlot);
             pause = true;
             fadeInDiv("#levelComplete");
         }
    }
      
      
    function freeze ()
    {
        if(numFreeze>0){
            for(var i =0;i<anim.length;i++)
            {
                anim[i].stop();
            }
            pause = true;
            var count = 0;
             $('.numFreeze').text(3-count);
            var timer = window.setInterval(function(){
                count++;
                $('.numFreeze').text(3-count);
                if(count==3)
                {
                    pause = false;
                    for(var i =0;i<anim.length;i++)
                     {
                        anim[i].start();
                     }
                    clearInterval(timer);
                    numFreeze--;
                    $('.numFreeze').text('Freeze: ' + numFreeze);
                }
            }, 1000);  
        }
    }
    function bomb ()
    {
        if(numBomb>0){
            for(var i =0;i<enemies.length;i++)
            {
                if(enemies[i].alive)
                {
                    cleanEnemy (i);
                }
            }
            numBomb--;
            $('.numBomb').text('Bomb: ' + numBomb);
        }
    }
    function shield() 
    {
        if(numShield>0){
            var counter = 0;
            var shieldShow = true;
             numShield--;
            $('.numShield').text('Shield: ' + numShield);
            shieldOn = true;
            shieldPic.show();
            layer.draw();
            var timer = window.setInterval(function(){
                counter ++;
                $('.numShield').text(5-counter);
                if(counter==4)
                {
                    var flashing = window.setInterval(function()
                    {
                        if(shieldShow)
                        {
                            shieldPic.hide();
                            shieldShow = false;
                        }
                        else{
                            shieldPic.show();
                            shieldShow = true;
                        }
                        if(counter==5)
                        {
                            clearInterval(flashing);
                            shieldPic.hide();
                        }
                    },70);
                }
                if(counter == 5)
                {
                    clearInterval(timer);  
                    shieldOn=false;
                     $('.numShield').text("Shield: " + numShield);
                     layer.draw();
                }
            }, 1000);
           
        }
    }
    function animStop (isPaused)
    {
        if(isPaused)
        {
            for(var i=0;i<anim.length;i++){
                anim[i].stop();
            }
        }
        else
        {
            for(var i=0;i<anim.length;i++){
             anim[i].start();    
        }
        }
    }
    function shipAnimate()
    {
        var animate = new Kinetic.Animation(function(frame){
            var yShift = 12*Math.sin(frame.time/1000);
            base.setY(yShift+ stage.getHeight() / 2 -50);
            shieldPic.setY(yShift + (stage.getHeight() / 2)-155);
        }, layer);
        animate.start();
    }
    function animate(num) 
    {
        var scoreRate =  Math.abs(1000*enemies[num].xGap/(enemies[num].fixedX-canvas.width/2));
        anim[num] = new Kinetic.Animation(function(frame) {  
            
            enemies[num].image.setX(enemies[num].fixedX + frame.time*enemies[num].xGap);
            enemies[num].image.setY(enemies[num].fixedY + frame.time*enemies[num].yGap);
            enemies[num].text.setX(enemies[num].fixedX + frame.time*enemies[num].xGap+10);
            enemies[num].text.setY(enemies[num].fixedY + frame.time*enemies[num].yGap-20);
            //enemies[num].image.rotate(frame.timeDiff * (Math.PI / 4) / 1000);
            enemies[num].scoreKeep -= 10*enemies[num].xGap;
            Math.abs((enemies[num].fixedX-canvas.width/2));
                if(enemies[num].alive && enemies[num].image.attrs.x < base.attrs.x+base.attrs.width+25 && enemies[num].image.attrs.x > base.attrs.x-enemies[num].image.attrs.width+25
                && enemies[num].image.attrs.y < base.attrs.y+base.attrs.height +25 && enemies[num].image.attrs.y > base.attrs.y-enemies[num].image.attrs.height+25)
                {
					cleanEnemy (num);
					//enemies[num].explosion.setScale(Math.sin(frame.time * 2 * Math.PI / 2000) + 0.001);
					score -=1000;
                    if(!shieldOn){
						if(sound) beenhit.play();
                        lives-=1;
                        $('.lives').text(lives);
                    }
                }
                
                if(lives <= 0){
					fail = true;
                    GameOver();
                }
        }, layer);
        
        if(!pause){
            anim[num].start();
        }
      }
