
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;

var ground

var sTime

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale = 0.1;

  obstacleGroup = createGroup();
  
  FoodGroup = createGroup();
  
}


function draw() {
  background("white")

    if(FoodGroup.isTouching(monkey)){
      score = score+2
     FoodGroup.destroyEach()
    }

    if(obstacleGroup.isTouching(monkey)){
      score = score-4
     obstacleGroup.destroyEach()
    }

    switch(score){
        case 10: monkey.scale=0.12;
        break;

        case 20: monkey.scale=0.14;
        break;

        case 30: monkey.scale=0.16;
        break;

        case 40: monkey.scale=0.18;
        break;
        default: break;
    }




  ground = createSprite(400,350,900,10)
  ground.velocityX = -4;
  ground.x = ground.width/2;
//  console.log(ground.x)
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground)
  monkey.collide(obstacleGroup)
  
  if(keyDown("space") && monkey.y >= 159) {
    monkey.velocityY = -12;
  }

  time();
  spawnObstacles();
  
  spawnBananas();
  
  drawSprites();
}

function time(){

  stroke("black")
  textSize(20)
  fill("black")
  text("Score:"+score,100,30)
  
  
  stroke("black")
  textSize(20)
  fill("black")
  

  // if frameRate() is not constant sTime will not be consistant  
  sTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:"+ sTime,100,50)
  
}

function spawnObstacles() {
  if(frameCount % 130 === 0) {
    obstacle = createSprite(600,315,10,40);
    obstacle.addImage(obstacleImage)
    obstacle.velocityX = -(6 + 3*score/100);           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}



function spawnBananas() {
  if(frameCount % 80 === 0) {
    banana = createSprite(600,315,10,40);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage)
    banana.velocityX = -(6 + 3*score/100);           
    banana.scale = 0.1;
    banana.lifetime = 300;
    FoodGroup.add(banana);
  }
}



