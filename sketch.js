var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player,ground , enemy,treasure;
var gameover , gameoverImg;
var score = 0;



function preload(){
  bg = loadImage("Road.png")
  playerImg = loadAnimation("Runner-1.png","Runner-2.png")
  enemyImg = loadImage("enemy.png")
  treasureImg = loadImage("treasure.png")
  gameoverImg = loadImage("gameOver.png")

  collectSound = loadSound("collect.mp3")
  ascendSound = loadSound("ascending.mp3")
}


function setup() {
  createCanvas(1535 ,790);


ground = createSprite(750,300,600,1000)
ground.addImage(bg)



 player =  createSprite(760,700,50,50);
player.addAnimation("running" ,playerImg)
player.scale = 0.2;

enemyGroup = new Group();
treasureGroup = new Group();


 player.debug = false;
 player.setCollider("circle",0,0,500)
 

 
 
}



function draw() {
  background("black");
 
   
  createEdgeSprites()
  
 
    




       if (gameState===PLAY){

        


        if(keyDown("w")|| keyDown(UP_ARROW)){
          player.y = player.y - 10
          }


        
          if(keyDown("s")|| keyDown(DOWN_ARROW)){
          player.y = player.y + 10
          }


        
          if(keyDown("a")|| keyDown(LEFT_ARROW)){
            player.x = player.x - 10
            }


          
            if(keyDown("d")|| keyDown(RIGHT_ARROW)){
              player.x = player.x +10
              }

            
              ground.velocityY = 6

              if(ground.y > 500 ){
                ground.y = 300
              }

          
              for(i=0 ; i<treasureGroup.length; i++){
                if(player.isTouching(treasureGroup.get(i))){
                  treasureGroup.get(i).destroy();
                  score = score + 10;
                  collectSound.play()
                }
              }


              spawnEnemy()
              spawnTreasure()

              if(player.isTouching(enemyGroup)){
                gameState = END;
                ascendSound.play()
                player.velocityY = 0;


                }



      }

       else if  (gameState === END){

        ground.velocityY = 0;

       
       gameover = createSprite(750,360,50,50)
       gameover.addImage(gameoverImg)
        
       enemyGroup.destroyEach()
       treasureGroup.destroyEach()
       player.destroy()

       }









  

    
  
  drawSprites();
  fill("red")
  textSize(50)
 text("SCORE: "+score,100,100)

}

function spawnEnemy(){
  if( frameCount % 200 === 0 ){
    enemy = createSprite(0,0,50,50)
    enemy.x = Math.round(random(100,1600))
    enemy.velocityY = 8
    enemy.addImage(enemyImg)
    enemy.scale = 0.4

    enemyGroup.add(enemy)
    enemy.debug = false;
    enemy.setCollider("circle",0,0,200)
    enemyGroup.setLifetimeEach(100)
  }
}




function spawnTreasure(){
  if(frameCount % 120 === 0){
    treasure = createSprite(0,0,50,50)
    treasure.x = Math.round(random(100,1500))
    treasure.velocityY = 3
    treasure.addImage(treasureImg)
    treasure.scale = 0.2

    treasureGroup.add(treasure)
    treasure.debug = false;
    treasureGroup.setLifetimeEach(265)
  }
}