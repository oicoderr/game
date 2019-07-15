var fishArr = [], movepause = true, judgeStart = false,bossEat = null,dizzy = true;
var isChance = false, mainContainer, bgContainer,eatCountText;
var score = 0, eatCount = 0;
var smallOne = 0 , smallTwo = 0, smallThree = 0;
//主体鱼的方向
var direction = {
  left: false,
  right: false,
  down: false,
  up: false
}
//等级
var level = {
  one: 200,
  two: 400,
  three: 600,
  four: 800,
  five: 1000,
  six: 1200,
  seven: 1400,
  eight: 1600,
  nine: 1800,
  ten: 2000
}
//控制主体鱼的XY速度
var MAINX = 11, MAINY = 9;
//控制客体鱼的X,Y速度
var smallX = 6, smallY = 3;
var bigX = 7, bigY = 5;
var equalX = 4, equalY = 2;
//规定客体鱼的数量
var COUNT = 9, bigCount = 2;
//判定主体鱼 与 客体鱼 所相差的距离
var RANGX = 70, RANGY = 30;
//随机数
var random = {
  mainNum: function () {
    return Math.floor(Math.random() * 80 + 10) + 1;
  },
  objNum: function () {
    return Math.floor(Math.random() * (mainContainer.num - 1)+1);
  },
  objBigNum: function () {
    return Math.floor(Math.random() * (99 - mainContainer.num) + mainContainer.num) + 1;
  },
  smallLeft: function () {
    return Math.random() * (canvas.width / 2 - 250);
  },
  smallRight: function () {
    return Math.random() * (canvas.width - (canvas.width / 2 + 250))+(canvas.width / 2 + 250);
  },
  smallY: function () {
    return Math.random() * 490;
  },
  objBigCount: function () {
    return Math.floor(Math.random() * bigCount) + 1;
  },
  rightX: function(){
    return Math.random()*50+canvas.width;
  },
  leftX :function(){
    return Math.random()*50+(-50);
  }
}


function game_fishEatFish() {
  document.getElementById("coverImg").style.display = "none";
  //初始化数据
  homeBtn.visible = false;
  sndBtn.visible = false;
  replayBtn.visible = false;
  replayBtn.alpha = 0;
  direction = {
    left: false,
    right: false,
    down: false,
    up: false
  }
  fishArr = [], movepause = true, judgeStart = false, isChance = false,bossEat = true;
  MAINX = 11, MAINY = 9;
  smallX = 6, smallY = 3;
  bigX = 7, bigY = 5;
  equalX = 4, equalY = 2;
  COUNT = 9 , bigCount = 2;
  RANGX = 70, RANGY = 30;
  eatCount = 0;
  score = 0;
  smallOne = 0 , smallTwo = 0, smallThree = 0;


  game_current.removeAllChildren();
  //移除所有监听事件
  createjs.Ticker.removeEventListener("tick", main_ticker);

  createjs.Ticker.removeEventListener("tick",ticker);
  createjs.Ticker.addEventListener("tick", ticker);
  //添加当前游戏事件监听
  var bgImg = new createjs.Bitmap(images["fish-bg"]);
  bgImg.scaleX = canvas.width / bgImg.image.width ;
  bgImg.scaleY = canvas.height / bgImg.image.height ;
  game_current.addChild(bgImg);

  bgContainer = new createjs.Container();
  var  water = new createjs.Sprite(spritesheets["bg-water"],"play");
  water.scaleX = canvas.width / water.getBounds().width;
  water.scaleY = canvas.height / water.getBounds().height;
  water.gotoAndStop(0);
  bgContainer.addChild(water);
  var middle = new createjs.Bitmap(images["bg-middle"]);
  middle.scaleX = canvas.width / middle.image.width ;
  middle.scaley = canvas.height / middle.image.height ;
  middle.y = 40;
  bgContainer.addChild(middle);
  var erye = new createjs.Sprite(spritesheets["bg-erye"],"play");
  erye.x = 40;erye.y = canvas.height - 320;
  bgContainer.addChild(erye);

  var beikecao = new createjs.Sprite(spritesheets["bg-beikecao"],"play");
  beikecao.x = 200; beikecao.y = canvas.height - 235;
  bgContainer.addChild(beikecao);
  var shanhu = new createjs.Sprite(spritesheets["bg-shanhu"],"play");
  shanhu.x = canvas.width - 450;shanhu.y = canvas.height - 200;
  bgContainer.addChild(shanhu);

  var sanye = new createjs.Sprite(spritesheets["bg-sanye"],"play");
  sanye.x = canvas.width - 300;
  sanye.y = canvas.height - 300;
  bgContainer.addChild(sanye);

  var duorou = new createjs.Sprite(spritesheets["bg-duorou"],"play");
  duorou.x = 150;duorou.y = canvas.height - 105;
  bgContainer.addChild(duorou);

  var front = new createjs.Bitmap(images["bg-front"]);
  front.regY = front.image.height;
  front.y = canvas.height;
  bgContainer.addChild(front);
  var beike = new createjs.Sprite(spritesheets["bg-beike"],"play");
  beike.x = 20;beike.y = canvas.height - 200;
  game_current.addChild(beike);

  var paopao = new createjs.Sprite(spritesheets["bg-paopao"],"play");
  paopao.x = canvas.width / 2;
  paopao.alpha = 0.6;
  game_current.addChild(paopao);

  show.gameScore("counting",canvas.width / 2,40);
  eatCountText = new createjs.Text("0", "50px katong", "#8d5328");
  eatCountText.textBaseline = "top";
  eatCountText.textAlign = "right";
  eatCountText.x = 570;
  eatCountText.y = 17;
  game_current.addChild(eatCountText);

  //播放loading动画
  fishGame_init();
}

function fishGame_init() {
  loadAnimation.gotoAndPlay("out");
  loadAnimation.addEventListener("animationend",function(){
    stage.removeChild(loadAnimation);
  })
  mainContainer = new createjs.Container();
  var mainFish = new createjs.Sprite(spritesheets["fish-main"], "swim");
  var _mainBounds = mainFish.getTransformedBounds();
  mainContainer.regX = _mainBounds.width / 2;
  mainContainer.regY = _mainBounds.height / 2;
  mainContainer.x = canvas.width / 2;
  mainContainer.y = 0;
  mainContainer.num = random.mainNum();
  var mainNum = new createjs.BitmapText(mainContainer.num.toString(),spritesheets["color-num"])
  mainNum.scaleX = mainNum.scaleY = 0.8;
  mainNum.x = 115;
  mainNum.y = 100;
  mainNum.regX = mainNum.getBounds().width / 2;
  mainNum.regY = mainNum.getBounds().height / 2;
  //大,小鱼
  objects.randomFish(COUNT, random.objBigCount());
  bossFish("right");
  equalFish();

  mainContainer.addChild(mainFish);
  mainContainer.addChild(mainNum)
  game_current.addChild(mainContainer);

  createjs.Tween.get(mainContainer)
    .to({y:canvas.height / 2},3000)
    .call(function(){
      handleCountDown(function(){
        movepause = false;
        judgeStart = true;
        stageEvent();
        setTimeData();
        homeBtn.visible = true;
        sndBtn.visible = true;
        replayBtn.visible = true;
        replayBtn.alpha = 1;
      });
    })
}
//客体鱼
var objects = {
  //初始化所有鱼(BOSS,相等的,小于的,大于的)
  randomFish: function (count, bigCount,peripheral) {
    if (count) {
      //加载比主体鱼 数字大的鱼
      for (var i = 0; i < bigCount; i++) {
        var smallContainer = new createjs.Container();
        var bigFish = new createjs.Sprite(spritesheets["fish-big"], "swim");
        //bigFish.gotoAndStop();
        var _bigBounds = bigFish.getTransformedBounds();
        smallContainer.regX = _bigBounds.width / 2;
        smallContainer.regY = _bigBounds.height / 2;
        var randomDriection = Math.floor(Math.random()*2);
        if(peripheral == "right"){
          smallContainer.x = random.rightX();
          smallContainer.y = random.smallY();
        }else if(peripheral == "left"){
          smallContainer.x = random.leftX();
          smallContainer.y = random.smallY();
        }else{
          if(randomDriection == 0){
            smallContainer.x = random.smallLeft();
          }else{
            smallContainer.x = random.smallRight();
          }
          smallContainer.y = random.smallY();
        }
        smallContainer.isTouch = false;
        smallContainer.num = random.objBigNum();
        var bigNum = new createjs.BitmapText(smallContainer.num.toString(),spritesheets["color-num"])
        bigNum.scaleX = bigNum.scaleY = 0.8;
        bigNum.x = 95;
        bigNum.y = 50;
        bigNum.regX = bigNum.getBounds().width / 2;
        bigNum.regY = bigNum.getBounds().height / 2;
        smallContainer.addChild(bigFish);
        smallContainer.addChild(bigNum);
        smallContainer.name = "bigFish";
        game_current.addChild(smallContainer);
        fishArr.push(smallContainer);
        //初始化每条鱼的方向
        objects.deriction(smallContainer);
        // stage.update();
      }
      var smallCount = count - bigCount - 1 - 1;
      //加载比主体鱼 数字小的鱼
      if (smallCount > 0) {
        for (var j = 0; j < smallCount; j++) {
          var smallContainer = new createjs.Container();
          var randomSmallFish = Math.floor(Math.random()*3);
          var other = new createjs.Sprite(spritesheets["fish-small"+randomSmallFish], "swim");
          //other.gotoAndStop();

          var _smallBounds = other.getTransformedBounds();
          smallContainer.regX = _smallBounds.width / 2;
          smallContainer.regY = _smallBounds.height / 2;
          if(peripheral == "right"){
            smallContainer.x = random.rightX();
            smallContainer.y = random.smallY();
          }else if(peripheral == "left"){
            smallContainer.x = random.leftX();
            smallContainer.y = random.smallY();
          }else{
            if(randomSmallFish == 0){
              smallContainer.x = random.smallLeft();
            }else{
              smallContainer.x = random.smallRight();
            }
            smallContainer.y = random.smallY();
          }
          smallContainer.isTouch = false;
          // 10%几率数字是大的
          var rdm = Math.floor(Math.random()*9);
          if(rdm == 0){
            smallContainer.num = random.objBigNum();
            smallContainer.name = "bigFish";
          }else{
            smallContainer.name = "smallFish";
            smallContainer.num = random.objNum();
          }
          var smallNum = new createjs.BitmapText(smallContainer.num.toString(),spritesheets["color-num"])
          smallNum.scaleX = smallNum.scaleY = 0.8;
          smallNum.regX = smallNum.getBounds().width / 2;
          smallNum.regY = smallNum.getBounds().height / 2;
          smallContainer.addChild(other);
          smallContainer.addChild(smallNum);
          if(randomSmallFish == 0){
            smallContainer.typeName = "smallFishOne";
            smallNum.x = 85;
            smallNum.y = 100;
          }else if(randomSmallFish == 1){
            smallContainer.typeName = "smallFishTwo";
            smallNum.x = 105;
            smallNum.y = 115;
          }else if(randomSmallFish == 2){
            smallContainer.typeName = "smallFishThree";
            smallNum.x = 50;
            smallNum.y = 40;
          }
          game_current.addChild(smallContainer);
          fishArr.push(smallContainer);
          //初始化每条鱼的方向
          objects.deriction(smallContainer);
          // stage.update();
        }
      }
    } else{
      var smallContainer = new createjs.Container();
      var randomSmallFish = Math.floor(Math.random()*3);
      var other = new createjs.Sprite(spritesheets["fish-small"+randomSmallFish], "swim");
      //other.gotoAndStop();

      var _smallBounds = other.getTransformedBounds();
      smallContainer.regX = _smallBounds.width / 2;
      smallContainer.regY = _smallBounds.height / 2;
      var randomDc = Math.floor(Math.random()*2);
      if(randomDc == 0){
        smallContainer.x = random.rightX();
        smallContainer.y = random.smallY();
      }else{
        smallContainer.x = random.leftX();
        smallContainer.y = random.smallY();
      }
      smallContainer.isTouch = false;
      smallContainer.num = random.objNum();
      var smallNum = new createjs.BitmapText(smallContainer.num.toString(),spritesheets["color-num"])
      smallNum.scaleX = smallNum.scaleY = 0.8;
      smallNum.regX = smallNum.getBounds().width / 2;
      smallNum.regY = smallNum.getBounds().height / 2;
      smallContainer.addChild(other);
      smallContainer.addChild(smallNum);
      smallContainer.name = "smallFish";
      if(randomSmallFish == 0){
        smallContainer.typeName = "smallFishOne";
        smallNum.x = 85;
        smallNum.y = 100;
      }else if(randomSmallFish == 1){
        smallContainer.typeName = "smallFishTwo";
        smallNum.x = 105;
        smallNum.y = 115;
      }else if(randomSmallFish == 2){
        smallContainer.typeName = "smallFishThree";
        smallNum.x = 50;
        smallNum.y = 40;
      }
      game_current.addChild(smallContainer);
      fishArr.push(smallContainer);
      //初始化每条鱼的方向
      objects.deriction(smallContainer);
      // stage.update();
    }
  },
  //初始化鱼的方向
  deriction: function (currentObj) {
    if (currentObj.x > 0 && currentObj.x < canvas.width / 2) {
      currentObj.right = true;
      currentObj.left = false;
    } else if (currentObj.x > canvas.width / 2 && currentObj.x < canvas.width) {
      currentObj.right = false;
      currentObj.left = true;
    }else if(currentObj.x > canvas.width ){
      currentObj.right = false;
      currentObj.left = true;
    }else if(currentObj.x < 0){
      currentObj.right = true;
      currentObj.left = false;
    }

    if (currentObj.y > 0 && currentObj.y < canvas.height / 2) {
      currentObj.down = true;
      currentObj.up = false;
    } else if (currentObj.y > canvas.height / 2 && currentObj.y < canvas.width) {
      currentObj.down = false;
      currentObj.up = true;
    }
  },
  //使得随机鱼运动
  randomMove: function (currentObj) {
    if (currentObj.x < (0 - 50)) {
      currentObj.left = false;
      currentObj.right = true;
    } else if (currentObj.x > (canvas.width + 50)) {
      currentObj.left = true;
      currentObj.right = false;
    }
    if (currentObj.y < (0 - 50)) {
      currentObj.down = true;
      currentObj.up = false;
    } else if (currentObj.y > (canvas.height + 50)) {
      currentObj.down = false;
      currentObj.up = true;
    }

    if (currentObj.right) {
      if(currentObj.name == "bigFish"){
        currentObj.x += bigX;
      }
      if(currentObj.name == "bossFish"){
        currentObj.x += bigX;
      }
      if(currentObj.name == "equalFish"){
        currentObj.x += equalX;
      }
      if(currentObj.name == "smallFish"){
        currentObj.x += smallX;
      }
      currentObj.scaleX = -1;
      currentObj.children[1].scaleX = -1 * 0.8;
    }
    if (currentObj.left) {
      if(currentObj.name == "bigFish"){
        currentObj.x -= bigX;
      }
      if(currentObj.name == "bossFish"){
        currentObj.x -= bigX;
      }
      if(currentObj.name == "equalFish"){
        currentObj.x -= equalX;
      }
      if(currentObj.name == "smallFish"){
        currentObj.x -= smallX;
      }
      currentObj.scaleX = 1;
      currentObj.children[1].scaleX = 1 * 0.8;

    }
    if (currentObj.down) {
      if(currentObj.name == "bigFish"){
        currentObj.y += bigY;
      }
      if(currentObj.name == "bossFish"){
        currentObj.y += bigY;
      }
      if(currentObj.name == "equalFish"){
        currentObj.y += equalY;
      }
      if(currentObj.name == "smallFish"){
        currentObj.y += smallY;
      }

    }
    if (currentObj.up) {
      if(currentObj.name == "bigFish"){
        currentObj.y -= bigY;
      }
      if(currentObj.name == "bossFish"){
        currentObj.y -= bigY;
      }
      if(currentObj.name == "equalFish"){
        currentObj.y -= equalY;
      }
      if(currentObj.name == "smallFish"){
        currentObj.y -= smallY;
      }
    }
  },
  //判定客体鱼是否与主体鱼相遇
  hitTestMain: function (currentObj) {
    var valueX = currentObj.x - mainContainer.x;
    var valueY = currentObj.y - mainContainer.y;
    if (valueX < 0) {
      valueX = -1 * valueX
    }
    if (valueY < 0) {
      valueY = -1 * valueY
    }
    if (judgeStart) {
      game_current.setChildIndex(mainContainer, mainContainer.parent.children.length - 1);
      if (valueX < RANGX && valueY < RANGY && !currentObj.isTouch) {
        //当小于时
        if (currentObj.num < mainContainer.num) {
          playEffectSound("eat");
          currentObj.isTouch = true;
          if(currentObj.typeName == "smallFishOne"){
            smallOne +=1;
          }else if(currentObj.typeName == "smallFishTwo"){
            smallTwo +=1;
          }else if(currentObj.typeName == "smallFishThree"){
            smallThree +=1;
          }

          mainContainer.children[0].gotoAndPlay("eat");
          mainContainer.children[0].addEventListener("animationend", function () {
            mainContainer.children[0].gotoAndPlay("swim");
          })
          game_current.removeChild(currentObj);
          fishArr.splice(fishArr.indexOf(currentObj), 1);
          setTimeout(function () {
            objects.randomFish()
          }, 500)
          score += 10;
          if((score / 10) % 10 == 0){
            playEffectSound("reward");
          }
          eatCountText.text = (score / 10).toString();
          //鱼加速//加鱼
          switch (score) {
            case level.one: {
              smallY = smallY + 1;
              smallX = smallX + 1;
              bigY = bigY + 1;
              bigX = bigX + 1;
              equalY = equalY + 1;
              equalX = equalX + 1;
              var randomDc = Math.floor(Math.random()*2);
              if(randomDc == 0){
                objects.randomFish(5, 1,"right");
              }else{
                objects.randomFish(5, 1,"left");
              }
              break;
            }
            case level.two: {
              smallY = smallY + 1;
              smallX = smallX + 1;
              bigY = bigY + 1;
              bigX = bigX + 1;
              equalY = equalY + 1;
              equalX = equalX + 1;
              objects.randomFish(5, 1);
              bossFish("left");
              equalFish();
              break;
            }
              ;
            case level.three: {
              smallY = smallY + 1;
              smallX = smallX + 1;
              bigY = bigY + 1;
              bigX = bigX + 1;
              equalY = equalY + 1;
              equalX = equalX + 1;
              objects.randomFish(5, 1);
              break;
            }
            case level.four: {
              smallY = smallY + 1;
              smallX = smallX + 1;
              bigY = bigY + 1;
              bigX = bigX + 1;
              equalY = equalY + 1;
              equalX = equalX + 1;
              objects.randomFish(5, 1);
              break;
            }
            case level.five: {
              smallY = smallY + 1;
              smallX = smallX + 1;
              bigY = bigY + 1;
              bigX = bigX + 1;
              equalY = equalY + 1;
              equalX = equalX + 1;
              objects.randomFish(5, 1);
              break;
            }
            case level.six: {
              smallY = smallY + 1;
              smallX = smallX + 1;
              bigY = bigY + 1;
              bigX = bigX + 1;
              equalY = equalY + 1;
              equalX = equalX + 1;
              objects.randomFish(5, 1);
              break;
            }
            case level.seven: {
              smallY = smallY + 1;
              smallX = smallX + 1;
              bigY = bigY + 1;
              bigX = bigX + 1;
              equalY = equalY + 1;
              equalX = equalX + 1;
              objects.randomFish(5, 1);
              break;
            }
            case level.eight: {
              smallY = smallY + 1;
              smallX = smallX + 1;
              bigY = bigY + 1;
              bigX = bigX + 1;
              equalY = equalY + 1;
              equalX = equalX + 1;
              objects.randomFish(5, 1);
              break;
            }
            case level.nine: {
              smallY = smallY + 1;
              smallX = smallX + 1;
              bigY = bigY + 1;
              bigX = bigX + 1;
              equalY = equalY + 1;
              equalX = equalX + 1;
              objects.randomFish(5, 1);
              break;
            }
            case level.ten: {
              smallY = smallY + 1;
              smallX = smallX + 1;
              bigY = bigY + 1;
              bigX = bigX + 1;
              equalY = equalY + 1;
              equalX = equalX + 1;
              objects.randomFish(5, 1);
              break;
            }
          }
        }
        //当相等时
        if (currentObj.num == mainContainer.num && !movepause && dizzy) {
          dizzy = false;
          playEffectSound("vertigo");
          mainContainer.children[0].gotoAndPlay("yun");
          movepause = true;
          mainContainer.children[0].on("animationend",function(){
            mainContainer.children[0].gotoAndPlay("swim");
            movepause = false;
          })
          setTimeout(function(){
            dizzy = true;
          },3000)
        }
        //当大于时
        if (currentObj.num > mainContainer.num) {
          playEffectSound("gameover");
          movepause = true;
          judgeStart = false;
          currentObj.children[0].gotoAndPlay("eat");
          setTimeout(function(){
            mainContainer.visible = false;
            recordScore(score / 10);
            scoreToServer(gameScores,"endfish-main", game_over);
          },800)

        }
      }
      //比主体鱼小的鱼
      if (valueX < mainContainer.getBounds().width && valueY < RANGY) {
        if (currentObj.num < mainContainer.num) {
          if (direction.left == !currentObj.left && direction.right == !currentObj.right) {
            var chance = Math.floor(Math.random() * 4);
            if (chance == 0 && !isChance) {
              isChance = true;
              currentObj.left = !currentObj.left;
              currentObj.right = !currentObj.right;
              setTimeout(function () {
                isChance = false;
              }, 2000)
            }
          }
        }
      }
      //比主体鱼大的鱼
      if (valueX < (2 * mainContainer.getBounds().width) && valueY < RANGY) {
        if (currentObj.num > mainContainer.num) {
          if ((direction.right == currentObj.left) || (mainContainer.x > currentObj.x && direction.left) || (currentObj.x > mainContainer.x && direction.right)) {
            var chance = Math.floor(Math.random() * 19);
            if (chance == 0) {
              currentObj.left = !currentObj.left;
              currentObj.right = !currentObj.right;
            }
          }
        }
      }
      //boss鱼
      if(currentObj.name == "bossFish"){
        if(bossEat){
          for(var j = 0;j<fishArr.length;j++){
            var fish = fishArr[j];
            if(fish == currentObj)continue;
            var bossX = currentObj.x - fish.x;
            var bossY = currentObj.y - fish.y;
            if (bossX < 0) {
              bossX = -1 * bossX
            }
            if (bossY < 0) {
              bossY = -1 * bossY
            }
            if (bossX < RANGX && bossY < RANGY){
              if(currentObj.num > fish.num){
                currentObj.children[0].gotoAndPlay("eat");
                currentObj.children[0].addEventListener("animationend",function(){
                  currentObj.children[0].gotoAndPlay("swim");
                })
                bossEat = false;
                game_current.removeChild(fish);
                if(fish.name == "bigFish"){
                  objects.randomFish(1,1,"right");
                }
                if(fish.name == "smallFish"){
                  objects.randomFish();
                }
                if(fish.name == "equalFish"){
                  equalFish("left");
                }
                fishArr.splice(fishArr.indexOf(fish), 1);
                setTimeout(function(){
                  bossEat = true;
                },6000)
              }
            }
          }
        }
      }
    }
  }
}
//加载BOOS鱼
function bossFish(peripheral) {
  var fishBoss = "fish-boss"+Math.floor(Math.random()*2);
  var bossFishContainer = new createjs.Container();
  var bossFish = new createjs.Sprite(spritesheets[fishBoss], "swim");
  //bossFish.gotoAndStop();
  var _bossBounds = bossFish.getTransformedBounds();
  bossFishContainer.regX = _bossBounds.width / 2;
  bossFishContainer.regY = _bossBounds.height / 2;
  if(peripheral == "right"){
    bossFishContainer.x = random.rightX();
    bossFishContainer.y = random.smallY();
  }else if(peripheral == "left"){
    bossFishContainer.x = random.leftX();
    bossFishContainer.y = random.smallY();
  }
  bossFishContainer.isTouch = false;
  bossFishContainer.num = 100;
  bossFishContainer.addChild(bossFish);
  var bossNum = new createjs.BitmapText(bossFishContainer.num.toString(),spritesheets["color-num"])
  bossNum.scaleX = bossNum.scaleY = 0.8;
  if(fishBoss == "fish-boss0"){
    bossNum.x = 165;
    bossNum.y = 95;
  }else if(fishBoss == "fish-boss1"){
    bossNum.x = 177;
    bossNum.y = 98;
  }

  bossNum.regX = bossNum.getBounds().width / 2;
  bossNum.regY = bossNum.getBounds().height / 2;
  bossFishContainer.addChild(bossNum);
  bossFishContainer.name = "bossFish";
  game_current.addChild(bossFishContainer);
  fishArr.push(bossFishContainer);
  //初始化每条鱼的方向
  objects.deriction(bossFishContainer);
  // stage.update();
}

//加载相等鱼
function equalFish(peripheral) {
  var equalFishContainer = new createjs.Container();
  var equalFish = new createjs.Sprite(spritesheets["fish-equal"], "swim");
  //equalFish.gotoAndStop();
  var _equalBounds = equalFish.getTransformedBounds();
  equalFishContainer.regX = _equalBounds.width / 2;
  equalFishContainer.regY = _equalBounds.height / 2;
  if(peripheral == "right"){
    equalFishContainer.x = random.rightX();
    equalFishContainer.y = random.smallY();
  }else if(peripheral == "left"){
    equalFishContainer.x = random.leftX();
    equalFishContainer.y = random.smallY();
  }else{
    var randomDriection = Math.floor(Math.random()*2);
    if(randomDriection == 0){
      equalFishContainer.x = random.smallLeft();
    }else{
      equalFishContainer.x = random.smallRight();
    }
    equalFishContainer.y = random.smallY();
  }
  equalFishContainer.isTouch = false;
  equalFishContainer.num = mainContainer.num;
  var equalNum = new createjs.BitmapText(equalFishContainer.num.toString(),spritesheets["color-num"])
  equalNum.scaleX = equalNum.scaleY = 0.8;
  equalNum.x = 80;
  equalNum.y = 75;
  equalNum.regX = equalNum.getBounds().width / 2;
  equalNum.regY = equalNum.getBounds().height / 2;
  equalFishContainer.addChild(equalFish);
  equalFishContainer.addChild(equalNum);
  equalFishContainer.name = "equalFish";
  game_current.addChild(equalFishContainer);
  fishArr.push(equalFishContainer);
  //初始化每条鱼的方向
  objects.deriction(equalFishContainer);
  // stage.update();
}

function stageEvent() {
  stage.addEventListener("stagemousemove", function (evt) {
    if (evt.stageX - mainContainer.x > 5) {
      direction.left = false;
      direction.right = true;
    } else if(mainContainer.x - evt.stageX > 5){
      direction.left = true;
      direction.right = false;
    }
    if (evt.stageY - mainContainer.y > 5) {
      direction.down = true;
      direction.up = false;
    } else if( mainContainer.y - evt.stageY > 5){
      direction.down = false;
      direction.up = true;
    }
  })
  /*  stage.addEventListener("stagemousedown", function (evt) {
      if (evt.stageX > mainContainer.x) {
        direction.left = false;
        direction.right = true;
      } else {
        direction.left = true;
        direction.right = false;
      }
      if (evt.stageY > mainContainer.y) {
        direction.down = true;
        direction.up = false;
      } else {
        direction.down = false;
        direction.up = true;
      }
    })*/

}

function ticker(event) {
  // console.log("555555");
  //console.log(event.delta / 1000);
  //控制主体鱼
  if (!movepause) {
    if (direction.right) {
      mainContainer.x += MAINX;
      mainContainer.scaleX = -1;
      mainContainer.children[1].scaleX = -1 *0.8;
      if (mainContainer.x > canvas.width) {
        direction.left = true;
        direction.right = false;
      }
    }
    if (direction.left) {
      mainContainer.x -= MAINX;
      mainContainer.scaleX = 1;
      mainContainer.children[1].scaleX = 1 *0.8;

      if (mainContainer.x < 0 ) {
        direction.left = false;
        direction.right = true;
      }
    }
    if (direction.down) {
      mainContainer.y += MAINY;
      if (mainContainer.y > canvas.height ) {
        direction.down = false;
        direction.up = true;
      }
    }
    if (direction.up) {
      mainContainer.y -= MAINY;
      if (mainContainer.y < 0 ) {
        direction.down = true;
        direction.up = false;
      }
    }
  }
  //给客体鱼添加自由移动
  if(judgeStart){
    for (var i = 0; i < fishArr.length; i++) {
      objects.randomMove(fishArr[i]);
    }
    //给客体鱼添加判定
    for (var idx = 0; idx < fishArr.length; idx++) {
      objects.hitTestMain(fishArr[idx]);
    }
  }
  stage.update();
}

//游戏结束动画
function game_over(scoreData,spritesheet){
  homeBtn.visible = false;
  replayBtn.visible = false;
  sndBtn.visible = false;
  nosndBtn.visible = false;
  var bgImg = new createjs.Bitmap(images["fish-bg"]);
  // "fish-bg"
  bgImg.scaleX = canvas.width / bgImg.image.width ;
  bgImg.scaleY = canvas.height / bgImg.image.height ;
  game_current.addChild(bgImg);
  var doubleContainer = new createjs.Container();
  doubleContainer.x = canvas.width / 2;doubleContainer.y = (canvas.height / 2) - 50;
  var fishBoss = "endfish-Boss"+Math.floor(Math.random()*2);
  var endAnimation = new createjs.Sprite(spritesheets[fishBoss],"eat");
  var mainFish = new createjs.Sprite(spritesheets[spritesheet],"swim");
  mainFish.x = mainFish.y = 0;
  endAnimation.x = 220;endAnimation.y = 0;
  doubleContainer.addChild(mainFish);
  doubleContainer.addChild(endAnimation);
  game_current.addChild(doubleContainer);
  createjs.Tween.get(doubleContainer)
    .to({x:-400},4000)
    .call(function(){
      game_current.removeChild(this);
      createMask();
      if(scoreData){
        toServerData(scoreData);
      }
    })
}

//结束后，后台传来的数据与游戏结束内容显示
function gameOverAnimation(data) {
  homeBtn.visible = false;
  sndBtn.visible = false;
  templateContainer
  templateContainer.x = canvas.width / 2 ;
  templateContainer.y =  - (canvas.height / 2);
  game_current.addChild(templateContainer);

  var light = new createjs.Bitmap(images["light"]);
  light.regX = light.getBounds().width / 2;
  light.regY = light.getBounds().height / 2;
  light.y = -20;


  var templete = new createjs.Bitmap(images["template"]);
  templete.regX = templete.getBounds().width / 2;
  templete.regY = templete.getBounds().height / 2;
  templete.x = 0;
  templete.y = -30;
  templateContainer.addChild(templete);

  var endFish = new createjs.Sprite(spritesheets["endfish-main"],"yun");
  endFish.regX = endFish.getBounds().width / 2;
  endFish.regY = endFish.getBounds().height / 2;
  endFish.scaleX = endFish.scaleY = 0.7;
  endFish.x = 15;
  endFish.y = -180;
  templateContainer.addChild(endFish);

  if((score / 10) <= 50){
    var endTalk = new createjs.Bitmap(images["shoukuai"]);
  }else if(50 < (score / 10) && (score / 10) <= 70 ){
    var endTalk = new createjs.Bitmap(images["xietiao"]);
  }else if( (score / 10) > 70){
    var endTalk = new createjs.Bitmap(images["shensu"]);
  }
  endTalk.regX = endTalk.image.width / 2;
  endTalk.regY = endTalk.image.height / 2;
  endTalk.x = 5;
  endTalk.y = -250;
  templateContainer.addChild(endTalk);

  var smallOneCount = new createjs.Text("0","46px katong","#ffffff");
  var smallTwoCount = new createjs.Text("0","46px katong","#ffffff");
  var smallThreeCount = new createjs.Text("0","46px katong","#ffffff");
  smallOneCount.x = 60;smallOneCount.y = 0;
  smallOneCount.textBaseline = "top";
  smallOneCount.textAlign = "right";
  smallTwoCount.textBaseline = "top";
  smallTwoCount.textAlign = "right";
  smallThreeCount.textBaseline = "top";
  smallThreeCount.textAlign = "right";

  smallOneCount.x = 120;smallOneCount.y = 15;
  smallTwoCount.x = 120;smallTwoCount.y = -115;
  smallThreeCount.x = 120;smallThreeCount.y = -50;

  smallOneCount.text = smallOne.toString();
  smallTwoCount.text = smallTwo.toString();
  smallThreeCount.text = smallThree.toString();
  templateContainer.addChild(smallOneCount);
  templateContainer.addChild(smallTwoCount)
  templateContainer.addChild(smallThreeCount)

  createjs.Tween.get(templateContainer)
    .to({y:canvas.height / 2},3000,createjs.Ease.bounceOut)
    .call(function(){
      templateContainer.addChildAt(light,0);
    })

}


//倒计时动画
function handleCountDown(callback){
  var container = new createjs.Container();
  game_current.addChild(container);
  var blank = new createjs.Bitmap(images["target"]);
  blank.scaleX = canvas.width / blank.image.width;
  blank.scaleY = canvas.height / blank.image.height;
  container.addChild(blank);
  var countDown = new createjs.Sprite(spritesheets["countDown"],"play");
  countDown.regX = countDown.getBounds().width / 2;
  countDown.regY = countDown.getBounds().height / 2;
  countDown.x = canvas.width / 2;
  countDown.y = canvas.height / 2;
  container.addChild(countDown);
  countDown.addEventListener("animationend",function(e){
    game_current.removeChild(container);
    if(callback)callback()
  })
}

// FPS.startFPS(stage);