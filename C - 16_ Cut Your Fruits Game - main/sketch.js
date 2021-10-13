// Creating the variables

var knife, fruits, monster;
var knifeImg, fruit1Img, fruit2Img, fruit3Img, fruit4Img, monsterImg, gameOverImg;
var fruitsGroup, monsterGroup;
var Fruits_Random
var gameOverSound, knifeSwooshSound;
var edges;
var score = 0;

// Game states

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload()
{
  // Loading the animation, images & swoosh sounds
  
  knifeImg = loadImage("knife.png");
  fruit1Img = loadImage("fruit1.png");
  fruit2Img = loadImage("fruit2.png");
  fruit3Img = loadImage("fruit3.png");
  fruit4Img = loadImage("fruit4.png");
  monsterImg = loadAnimation("alien1.png","alien2.png");
  gameOverImg = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
}

function setup() 
{
  // Creating the canvas
  createCanvas(600,600);

  // Making the Edges sprites
  edges = createEdgeSprites();

  // Creating the knife
  knife = createSprite(40,200,20,20);
  knife.addImage(knifeImg);
  knife.scale = 0.7;

  // Creating the game over sprite
  gameOver = createSprite(300,300,50,50);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 2.5;
  gameOver.visible = false;

  // Setting collider for the knife
  knife.debug = false;
  knife.setCollider("rectangle",0,0,40,40);

  // Creating the fruits & monster groups

  fruitsGroup = createGroup();
  monsterGroup = createGroup();
}

function draw() 
{
  // Setting the background color
  background("lightblue");
  
  // Making the play & end game states

  if(gameState === PLAY)
  {
    // Calling the functions for fruits & monster

    createFruits();
    createMonster();
    
    // Moving the knife in X & Y direction with the help of mouse

    knife.x = World.mouseX;
    knife.y = World.mouseY;
  
    // Destroying the fruits group, playing the knife swoosh sound & increasing the score
    if(fruitsGroup.isTouching(knife))
    {
      fruitsGroup.destroyEach();
      knifeSwooshSound.play();
      score = score+2;
    }
  
   else
   {
     if(monsterGroup.isTouching(knife))
     {
       gameState = END;

       // Playing the game over sound
       gameOverSound.play()
     }
   } 
  }

  if(gameState === END)
  {   
    // Destroying the groups once the game is over

    fruitsGroup.destroyEach();
    monsterGroup.destroyEach();

    // Setting the velocity for the groups once the game is over

    fruitsGroup.setVelocityXEach(0);
    monsterGroup.setVelocityXEach(0);
    
    // Making the knife image invisible
    knife.visible = false;

    // Making the gameover image visible 
    gameOver.visible = true;
  }

  drawSprites();

  //Displaing the score
  fill("orange");
  textFont("Georgia")
  textSize(25);
  text("Score : "+ score,250,50);
}

// Creating the functions for monster & fruits

function createMonster()
{
  if(World.frameCount%200 === 0)
  {
    monster = createSprite(400,Math.round(random(100,550)),20,20);
    monster.addAnimation("moving", monsterImg);

    //Increasing the velocity of monster using the score variable
    monster.velocityX = -(8+(score/10));

    monster.setLifetime = 50;
    
    // Adding the monster to the monster group
    monsterGroup.add(monster);
  }
}

function createFruits()
{
  if(World.frameCount%80 === 0)
  {
    fruits = createSprite(0,Math.round(random(50,550)),20,20);

   // Increasing the velocity of fruit using the score variable 
    fruits.velocityX = (7+(score/4));

    fruits.scale = 0.2;
    fruits.debug = false;

    // Adding fruit images in the random function

    Fruits_Random = Math.round(random(1,4));
    if (Fruits_Random == 1) 
    {
      fruits.addImage(fruit1Img);
    } 
    else if (Fruits_Random == 2) 
    {
      fruits.addImage(fruit2Img);
    }
    else if (Fruits_Random == 3) 
    {
      fruits.addImage(fruit3Img);
    }
    else 
    {
      fruits.addImage(fruit4Img);
    }

    fruits.setLifetime = 100;

    // Adding the fruits to the fruits group
    fruitsGroup.add(fruits);
  }
}