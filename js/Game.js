class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(200, 200);
    car2 = createSprite(400, 200);
    car3 = createSprite(600, 200);
    car4 = createSprite(800, 200);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var Index = 0;
      var x = 0;
      var y;
      for(var plr in allPlayers){
        Index =Index + 1;
        x =x + 200;
        y = displayHeight - allPlayers[plr].distance;
        cars[Index-1].position.x = x;
        cars[Index-1].position.y = y;
        if (Index == player.index){
          cars[Index-1].shapeColor = "red";
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    drawSprites();
  }
}
