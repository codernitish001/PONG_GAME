var userPaddle, computerPaddle, computerScore, playerScore, gameState, ball, scoreSound, wall_hitSound, hitSound;
var imgball, fall, gm, kick, player, reset, robot;
//loading the images
function preload() {
  imgball = loadImage('ball.png');
  fall = loadImage('fall.png');
  gm = loadImage('gm.png');
  kick = loadImage('kick.png');
  player = loadImage('player.png');
  reset = loadImage('reset.png');
  robot = loadImage('robot.png');
  scoreSound=loadSound('score.mp3');
  wall_hitSound=loadSound('wall_hit.mp3');
  hitSound=loadSound('hit.mp3');
}

function setup() {

  createCanvas(400, 400);


  //create a user paddle sprite
  userPaddle = createSprite(370, 200, 10, 70);
  userPaddle.addImage("user", player);
  //create a computer paddle sprite
  computerPaddle = createSprite(30, 200, 10, 70);
  computerPaddle.addImage("computer", robot);
  //create the pong ball
  ball = createSprite(200, 200, 12, 12);
  ball.addImage("ball", imgball);
  computerScore = 0;
  playerScore = 0;
  gameState = "serve";
}

function draw() {
  //fill the computer screen with white color

  background(255);
  if (keyDown("k")&&gameState==="play") {
    userPaddle.addImage("user", kick);
  }
  if (keyWentUp("k")&&gameState==="play") {
    userPaddle.addImage("user", player);
  }
  edges = createEdgeSprites();
  //display Scores
  text(computerScore, 170, 20);
  text(playerScore, 230, 20);


  //draw dotted lines
  for (var i = 0; i < 400; i += 20) {
    line(200, i, 200, i + 10);
  }

  if (gameState === "serve") {
    text("Press Space to Serve", 150, 180);
  }

  if (gameState === "over") {
    text("Game Over!", 170, 160);
    text("Press 'R' to Restart", 150, 180);
  }

  if (keyDown("r")) {
    gameState = "serve";
    computerScore = 0;
    playerScore = 0;
  }

    if(ball.x>300){
     userPaddle.addImage("user", kick);
    }
   if(ball.x<300){
   userPaddle.addImage("user", player);
   }
  //give velocity to the ball when the user presses play
  //assign random velocities later for fun
  if (keyDown("space") && gameState == "serve") {
    ball.velocityX = 5;
    ball.velocityY = 5;
    userPaddle.addImage("user", player);
    gameState = "play";
  }

  //make the userPaddle move with the mouse
  userPaddle.y = World.mouseY;



  //make the ball bounce off the user paddle
  if (ball.isTouching(userPaddle)) {
    //hitSound.play();
    ball.x = ball.x - 5;
    ball.velocityX = -ball.velocityX;
  }

  //make the ball bounce off the computer paddle
  if (ball.isTouching(computerPaddle)) {
    hitSound.play();
    ball.x = ball.x + 5;
    ball.velocityX = -ball.velocityX;
  }

  //place the ball back in the centre if it crosses the screen
  if (ball.x > 400 || ball.x < 0) {
      scoreSound.play();
   
    if (ball.x < 0) {
      playerScore++;
    } else {
       userPaddle.addImage("user", fall);
      computerScore++;
    }

    ball.x = 200;
    ball.y = 200;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";

    if (computerScore === 5 || playerScore === 5) {
      gameState = "over";
    }
  }

  //make the ball bounce off the top and bottom walls
  if (ball.isTouching(edges[2]) || ball.isTouching(edges[3])) {
    ball.bounceOff(edges[2]);
    ball.bounceOff(edges[3]);
    wall_hitSound.play();
  }
  //add AI to the computer paddle so that it always hits the ball
  computerPaddle.y = ball.y-45;
  drawSprites();
}