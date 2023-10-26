var trex, trexrunning, trexcollide
var ground, groundimg
var invisibleground
var cloud, cloundimg
var cacto, cactoimg1, cactoimg2, cactoimg3, cactoimg4, cactoimg5, cactoimg6
var score = 0
var records = 0
var play = 1
var end = 0
var gameState = play
var cactoGp, cloudGp
var gameover, gameoverimg
var reset, resetimg
var jumpsound, diesound, pointsound
//preload carrega as midías do jogo 
function preload() {
  trexrunning = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  groundimg = loadImage("ground2.png")
  cloundimg = loadImage("cloud.png")
  cactoimg1 = loadImage("obstacle1.png")
  cactoimg2 = loadImage("obstacle2.png")
  cactoimg3 = loadImage("obstacle3.png")
  cactoimg4 = loadImage("obstacle4.png")
  cactoimg5 = loadImage("obstacle5.png")
  cactoimg6 = loadImage("obstacle6.png")
  gameoverimg = loadImage("gameOver.png")
  resetimg = loadImage("restart.png")
  trexcollide = loadImage("trex_collided.png")
  jumpsound = loadSound("jump.mp3")
  diesound = loadSound("die.mp3")
  pointsound = loadSound("checkpoint.mp3")
}
//setup faz a aconfiguração
function setup() {
  createCanvas(windowWidth,windowHeight);
  // criando as bordas
  trex = createSprite(50, height-40, 20, 50)
  trex.addAnimation("running", trexrunning)
  trex.scale = 0.5
  trex.addAnimation("collide", trexcollide)
  trex.debug = false
  trex.setCollider("circle", 0, 0, 30)

  ground = createSprite(width/2,height-30, width, 2)
  ground.addImage("solo", groundimg)

  invisibleground = createSprite(width/2,height-10, width, 2)

  invisibleground.visible = false

  gameover = createSprite(width/2,height-120)
  gameover.addImage(gameoverimg)
  gameover.scale = 0.5

  gameover.visible = false

  reset = createSprite(width/2,height-80)
  reset.addImage(resetimg)
  reset.scale = 0.5

  reset.visible = false

  cactoGp = new Group()
  cloudGp = new Group()



}
//draw faz o movimento, a ação do jogo
function draw() {
  background("#f0f9f7");

  if (trex.isTouching(cactoGp)) {
    gameState = end
    //diesound.play()
  }

  if (gameState === play) {
    score += Math.round(getFrameRate() / 60)
    if (score > 0 && score % 100 === 0) {
      pointsound.play()
    }
    ground.velocityX = -(6 + score / 100)


    if (ground.x < 800) {
      ground.x = ground.width / 2
    }

    if (touches.length>0||keyDown("space") && trex.y > height-36) {
      trex.velocityY = -10
      touches=[]
      jumpsound.play()
    }

    createClouds()
    createCactos()

  }
  if (gameState === end) {
    trex.changeAnimation("collide", trexcollide)
    cactoGp.setVelocityXEach(0)
    cloudGp.setVelocityXEach(0)
    gameover.visible = true
    reset.visible = true
    cactoGp.setLifetimeEach(-1)
    cloudGp.setLifetimeEach(-1)
    trex.velocityY = 0
    ground.velocityX = 0

if (records < score) {
  records=score
}

    if (mousePressedOver(reset)) {
      gameState = play
      gameover.visible = false
      reset.visible = false
      cactoGp.destroyEach()
      cloudGp.destroyEach()
      trex.changeAnimation("running")
      score=0
    }
  }


  trex.velocityY += 0.5

  trex.collide(invisibleground)


fill("silver")
stroke("silver")
textAlign(CENTER,TOP)
textSize(13)  
  text("Score " + score, width-150, height-180);

  text("Record " + records, width-150, height-165);

  //coordenadas do mouse na tela
  //text("X: " + mouseX + "/ Y: " + mouseY, mouseX, mouseY);
  drawSprites();

}

function createClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(width, random(height-186,height-100), 40, 10)
    cloud.velocityX = -(6 + score / 100)
    cloud.addImage(cloundimg)
    cloud.scale = random(0.3, 1.4)
    cloud.depth = trex.depth - 1
    cloud.lifetime = 250
    cloudGp.add(cloud)

  }



}

function createCactos() {
  if (frameCount % 100 === 0) {
    cacto = createSprite(width, height-30, 10, 50)
    cacto.velocityX = -(6 + score / 100)
    cacto.scale = 0.5
    cacto.lifetime = 230
    cacto.depth = trex.depth
    cactoGp.add(cacto)

    var sorte = Math.round(random(1, 6))
    switch (sorte) {
      case 1: cacto.addImage(cactoimg1)
        break;
      case 2: cacto.addImage(cactoimg2)
        break;
      case 3: cacto.addImage(cactoimg3)
        break;
      case 4: cacto.addImage(cactoimg4)
        break;
      case 5: cacto.addImage(cactoimg5)
        break;
      case 6: cacto.addImage(cactoimg6)
        break;

    }
  }


}
