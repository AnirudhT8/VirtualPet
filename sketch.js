var doggy;
var foodStock;
var foodS = 56;
var database;


function preload(){
dogNImage = loadImage("pics/DogN.png");
dogHImage = loadImage("pics/DogH.png");

}

function setup(){  
  database = firebase.database();
  console.log(database);
  
  createCanvas(2000,2000); 
  doggy = createSprite(1000,1000,10,10);
  doggy.addImage(dogNImage);

  foodStock= database.ref('Food');
  foodStock.on("value", readStock);

}


function draw(){
  background(46, 139, 87);
  if(foodS!== undefined){
   if(keyDown(UP_ARROW)){
    doggy.addImage(dogHImage);
    writeStock(foodS);
  } else{
    doggy.addImage(dogNImage);
  }
  }

  
  drawSprites();
  fill("yellow");
  textSize(100);
  stroke(2);
  text ("Food Stock: "+ readStock.data,500,200);
}

  



function readStock(data){
  Food=data.val();
}


function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
