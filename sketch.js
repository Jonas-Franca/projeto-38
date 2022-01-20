var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;

var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;

var nuvem, grupodenuvens, imagemdanuvem;
var grupodeobstaculos, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;

var pontuacao;

var imagemFim, imagemRestart, fim, restart;


function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_colidiu = loadAnimation("trex_collided.png");
  
  imagemdosolo = loadImage("ground2.png");
  
  imagemdanuvem = loadImage("cloud.png");
  
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  
  imagemFim = loadImage("gameOver.png")
  imagemRestart = loadImage("restart.png")
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided" , trex_colidiu)
  trex.scale = 0.5;
  
  solo = createSprite(200,180,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  solo.velocityX = -4;
  
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
   
  //criar grupos de obstáculos e de nuvens
  grupodeobstaculos = createGroup();
  grupodenuvens = createGroup();
  
  trex.setCollider("circle",0,0,40);
  //trex.debug = true
  
  fim = createSprite(300,100);
  fim.addImage(imagemFim);
  
  restart = createSprite(300,140);
  restart.addImage(imagemRestart);
  
  fim.scale = 0.5
  restart.scale = 0.5
  
  fim.visible = false;
  restart.visible = false;
  
  pontuacao = 0;
}

function draw() {
  background("white");

  trex.x = camera.position.x - 250
  //exibindo pontuação
  text("Pontuação: "+ pontuacao, 500,50);
    
  
  
  if(estadoJogo === JOGAR){
    
    fim.visible = false;
  restart.visible = false;
    
    //mover o solo
    solo.velocityX = -4;
    //marcando pontuação
    pontuacao = pontuacao + Math.round(frameCount/60);
    
    if (solo.x < 0){
      solo.x = solo.width/2;
    }
    
    //saltar quando a tecla de espaço é pressionada
    if(keyDown("space")&& trex.y >= 100) {
       trex.velocityY = -13;
  }
  
    //adicionar gravidade
    trex.velocityY = trex.velocityY + 0.8
   
    //gerar as nuvens
    gerarNuvens();
  
    //gerar obstáculos no solo
    gerarObstaculos();
    
    if(grupodeobstaculos.isTouching(trex)){
        estadoJogo = ENCERRAR;
    }
  }
     else if (estadoJogo === ENCERRAR) {
       fim.visible = true;
  restart.visible = true;
       
      solo.velocityX = 0;
      trex.velocityY = 0
       
       trex.changeAnimation("collided",trex_colidiu);
       
       grupodeobstaculos.setLifetimeEach(-1)
       grupodenuvens.setLifetimeEach(-1)
     
     grupodeobstaculos.setVelocityXEach(0);
     grupodenuvens.setVelocityXEach(0);
   }
  
  
  //evita que o Trex caia no solo
  trex.collide(soloinvisivel);

  
  
  drawSprites();
}

function gerarObstaculos(){
 if (frameCount % 60 === 0){
   var obstaculo = createSprite(camera.position.x + 350,165,10, 40);
  obstaculo.velocityX = -6;
      
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstaculo.addImage(obstaculo1);
              break;
      case 2: obstaculo.addImage(obstaculo2);
              break;
      case 3: obstaculo.addImage(obstaculo3);
              break;
      case 4: obstaculo.addImage(obstaculo4);
              break;
      case 5: obstaculo.addImage(obstaculo5);
              break;
      case 6: obstaculo.addImage(obstaculo6);
              break;
      default: break;
    }
   
    //atribuir escala e tempo de duração ao obstáculo         
    obstaculo.scale = 0.5;
    obstaculo.lifetime = 300;
   
    //adicionar cada obstáculo ao grupo
    grupodeobstaculos.add(obstaculo);
 }
}

function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    nuvem = createSprite(camera.position.x,100,40,10);
    nuvem.y = Math.round(random(10,60));
    nuvem.addImage(imagemdanuvem);
    nuvem.scale = 0.5;
    nuvem.velocityX = -3;
    
     //atribuir tempo de duração à variável
    nuvem.lifetime = 134;
    
    //ajustando a profundidade
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
        
    //adiciondo nuvem ao grupo
   grupodenuvens.add(nuvem);
  }
}