//Main Menu----------------------------------------------
var gamestart = false;
var mainInterval = null;
var mainPosition = 0;
var creditInterval;
var pauseInterval;
var creditPosition = 560;
var count = 0;
var counter =0;
var splashscree;
var main;
var bgscrolling = true;
var creditImg = new Image();
creditImg.src = "images/en_credit.gif";
var music = true;
var sound = true;
var priceBomb = 3000;
var priceShield = 1000;
var priceLife = 5000;
var priceFreeze = 2000;
var level =0;
var gameLoop;

//Question Maker----------------------------------------------
var switcher=0;
//Keypad----------------------------------------------
var input = "";
//Highscore----------------------------------------------
var high = new Array();
var temp;
var high9 = new Object();
//Music Player----------------------------------------------
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
var isPlaying,
	currentTrack = 0,
	autoplay = true;
//Sound Effect----------------------------------------------
var asteriod = new Audio('music/asteriod.mp3');    	//destruction of an asteriod
var destoryed = new Audio('music/destoryed.mp3');	//destruction of the main ship
var beenhit = new Audio('music/beenhit.mp3');		//main ship been hit
//Save files----------------------------------------------
var creat = new Date();
var now = new Date();
var getSave = new Array();
var saveLength = 5;
var selectSlot;
var slot = new Array();
var GG = 0;
for(var i=0; i<5; i++){
	slot[i] = true;
}
//Animation----------------------------------------------
var canvas = document.getElementById('myCanvas');
canvas.width = $('#myCanvas').width();
canvas.height = $('#myCanvas').height();
var stage = new Kinetic.Stage({
        container: 'myCanvas',
        width: canvas.width,
        height: canvas.height
    });
var layer = new Kinetic.Layer();

var lives;
var numShield = 0;
var numBomb = 0;
var numFreeze = 0;
var score = 0;
var numEnemyKilled = 0;
var shieldOn = false;
var freezeOn = false
var fail = false;

var enemyNum = 0;
var totalEnemies=1;
var enemyDelay=5000;
var enemySpeed=20000;

var enemies = new Array();
var bgInterval = null;
var bgPosition = 0;

var anim = new Array();
var pause = false;

var imageObj = new Image();
imageObj.src = 'images/Metor.png';
var bgImg = new Image();
bgImg.src = "images/space.jpg";
var baseImg = new Image();
baseImg.src = "images/SpaceshipFlame.png";
var shieldImage = new Image();
shieldImage.src = "images/ShipShield.png";
var expImg = new Image();
expImg.src = "images/explosion.png";
var freezingImg = new Image();
freezingImg.src = "images/freezebackground.png";
var base = new Kinetic.Image({
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
var freezePic = new Kinetic.Image({
    x:0,
    y:0,
    width:768,
    height:600,
    image:freezingImg,
});
var lazer = new Kinetic.Circle({
        x: stage.getWidth() / 2+30,
        y: stage.getHeight() / 2+15,
        radius: 8,
        fill: 'red'
      });

