var dog, happyDog, database, foodS, foodStock;
var happyDogImg, hungryDogImg;
var feedTime,lastFeed,foodObj,feed,addFood;

function preload()
{
	happyDogImg = loadImage("images/dogImg.png");
  hungryDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(1000 ,500);
  foodObj = new Food();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function (data){
    lastFeed = data.val();
  });
  stock = database.ref('Food');
  stock.on("value",readStock)

  dog = createSprite(900,250,1,1);
  dog.addImage(happyDogImg);
  dog.scale=0.2;

  addFood=createButton("Add Food");
  addFood.position(700,95);
  addFood.mousePressed(addFoods);

  food=createButton("Feed the Dog");
  food.position(800,95);
  food.mousePressed(feedDog);
}


function draw() {  
background(46, 139, 87); 
fill("white");

foodObj.display();

fill(255,255,254);
textSize(15);
if(lastFeed>=12){
    text("Last Feed : "+lastFeed%12+" PM",650,50);
}else if(lastFeed==0){
  text("Last Feed : 12 AM",650,50);
}else{
  "Last Feed : "+lastFeed+" AM",650,50}

drawSprites();


}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
    dog.addImage(hungryDogImg);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
database.ref('/').update({
  Food:foodS
})
}
