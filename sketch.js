var bg, bgImg;
var mario, marioImg, marioStanding;
var cactus, cactusImg;
var wood, woodImg;
var coin, coinImg;
var gameOver, gameOverImg

var distance = 0;
var coin_score = 0;

var gameState = "play";




function preload(){
  bgImg = loadImage("background.jpg")
  marioImg = loadAnimation("mariorunning.png", "mariorunning2r.png", "mariorunning3.png");
  cactusImg = loadImage("cactus.png");
  woodImg = loadImage("woodplankr.png");
  coinImg = loadImage("coin.png");
  coinSound = loadSound("Collect Coin - Sound Effect [HD].mp3");
  marioStanding = loadAnimation("marioStanding.png");
  gameOverImg = loadImage("gameover.jpg");
  gameSound = loadSound("gamesound.mp3");
}

function setup() {
 createCanvas(700,400);

 gameSound.play();
  
  bg = createSprite(300,130);
  bg.addImage(bgImg);
  bg.scale = 0.8;

  gameOver = createSprite(350,200);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 0.6;
  
  
  
  mario = createSprite(100,300);
  mario.addAnimation("running", marioImg);
  mario.addAnimation("standing", marioStanding);
  mario.scale = 0.2;
  mario.setCollider("rectangle", 0,0,40,330);
  
  
  
  invisibleGround = createSprite(400,390,1000,5);
  invisibleGround.visible = true;
  
  cactusGroup = new Group();
  woodGroup = new Group();
  coinGroup = new Group();
  
}

function draw() {
 background("black");

 mario.depth = mario.depth + 1;
 
 if(gameState === "play"){
  bg.velocityX=-(5+distance/100);


  if(keyDown("space")&& mario.y >= 157) {
    mario.velocityY = -12;
}
mario.velocityY = mario.velocityY + 0.6;

distance=distance+Math.round(getFrameRate()/60);



for(var i=0;i<coinGroup.length;i++){
  if(coinGroup.get(i). isTouching (mario)){
  coinGroup.get(i).destroy();
  coinSound.play();
  coin_score=coin_score+100;
  }
  }

  if(cactusGroup.isTouching(mario) || mario.x<0){
      gameState = "end";
  }

  spawnCactus();
  spawnWood();

  if(bg.x<0){
    bg.x = 350;
  }

  



 } else if(gameState === "end"){
  bg.velocityX=0;

  bg.velocityX = 0;
  cactusGroup.setVelocityXEach(0);
  mario.changeAnimation("standing", marioStanding);

  mario.velocityY = 0;
  mario.visible = false;

  cactusGroup.destroyEach();

  gameOver.visible = true;

  woodGroup.setVelocityXEach(0);
  coinGroup.setVelocityXEach(0);
 }
  
 
  
  mario.collide(invisibleGround);
  mario.collide(woodGroup);




  

  

  
  
  



  
  


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  drawSprites();

  fill("black");
  textSize(25);
  textAlign(CENTER);
  text("Distance:"+distance, 600,50);
  text("Coin Score:"+coin_score, 100,50);
  
}

function spawnCactus(){
  if(frameCount%90===0){
      cactus = createSprite(700,350);
      cactus.addImage(cactusImg);
      cactus.scale = 0.15;
      cactus.velocityX=-(5+distance/100);
    
      cactus.lifetime=300;
      
    cactusGroup.add(cactus);
  }
}

function spawnWood(){
  if(frameCount%300===0){
    wood = createSprite(1000,Math.round(random(50,200)));
    wood.addImage(woodImg);
    wood.velocityX=-3;
    wood.scale=0.3

    wood.setCollider("rectangle", 0,0,500,20);

    coin = createSprite(wood.x,wood.y-35);
    coin.addImage(coinImg);
    coin.velocityX=-3;
    coin.scale=0.2

    coin.lifetime=300;
    wood.lifetime=300;

    woodGroup.add(wood);
    coinGroup.add(coin);

  
  }
}