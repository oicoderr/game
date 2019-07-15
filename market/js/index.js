var gameMarket = {
  operation:null,//操作
  method:null,//判定方法
  container:null,
  inputArr:null
};
var switchSprite,sceneTwoLoad,srcImgs,desImgs,rightAnswer,sureImg;
var currentEpisode = 0;
var subNarrations = [];


function game_market() {
  stage.removeChild(loadAnimation);
  game_current.removeAllChildren();
  currentEpisode = 0;
  subNarrations = [];

  handleLoadSprite(spritesheets["load-door"],init_gameMarket);
  for (var j = 0; j < gameAllConfig["content"][gameName]["episodes"].length; j++) {
    //添加问题声音
    subNarrations.push(gameAllConfig["content"][gameName]["episodes"][j].sound);
  }
}

function init_gameMarket() {
  
  gameMarket.inputArr = [];//答案选择数组
  rightAnswer = 0;
  srcImgs = [];
  desImgs = [];

  var gameMarketEpisodes = gameAllConfig["content"][gameName]["episodes"];
  gameMarket.method = gameMarketEpisodes[currentEpisode].method;
  gameMarket.operation = gameMarketEpisodes[currentEpisode].operation;
  switchSprite = gameMarketEpisodes[currentEpisode]["switchSprite"];
 
  //判断是否有背景
  if(gameMarketEpisodes[currentEpisode]["subBackground"]){
    var bgImg = gameMarketEpisodes[currentEpisode]["subBackground"];
    if(bgImg.type == "bitmap"){
      var bg = new createjs.Bitmap(images[bgImg.id]);
    }else if(bgImg.type == "sprite"){
      var bg = new createjs.Sprite(spritesheets[bgImg.id]);
    }
  }else{
    var bgImg = gameAllConfig["content"][gameName]["background"];
    if(bgImg.type == "bitmap"){
      var bg = new createjs.Bitmap(images[bgImg.id]);
    }else if(bgImg.type == "sprite"){
      var bg = new createjs.Sprite(spritesheets[bgImg.id]);
    }
  }
  bg.scaleX = stage.canvas.width / bg.image.width;
  bg.scaleY = stage.canvas.height / bg.image.height;
  game_current.addChildAt(bg,0);

  //加载当前关可以点击的图片
  gameMarket.container = new createjs.Container();
  game_current.addChild(gameMarket.container);

  //加载中间需要遮罩的水果
  var moveObj = gameMarketEpisodes[currentEpisode]["moveObj"];
  var core = gameMarketEpisodes[currentEpisode]["core"];
  if(moveObj.type == "sprite"){
    var moveSprite = new createjs.Sprite(spritesheets[moveObj.id],"inner");
    moveSprite.regX = moveSprite.getBounds().width / 2;
    moveSprite.regY = moveSprite.getBounds().height / 2;
    moveSprite.x = 0 - moveSprite.getBounds().width / 2;
    moveSprite.y = core.y;
    gameMarket.container.addChild(moveSprite);
    createjs.Tween.get(moveSprite)
      .wait(4000)
      .to({x:core.x - 100},2000)
      .call(function(){
        this.gotoAndStop("stop");
        if(core.type == "bitmap"){
          var coreImg = new createjs.Bitmap(images[core.id]);
          coreImg.regX = coreImg.image.width / 2;
          coreImg.regY = coreImg.image.height / 2;
          coreImg.x = core.x;
          coreImg.y = core.y;
          coreImg.label = core.label;
          gameMarket.container.addChild(coreImg);
          gameMarket.inputArr.push(coreImg);
        }
      })
      .wait(300)
      .call(function(){this.gotoAndPlay("out")})
      .to({x:0 - moveSprite.getBounds().width / 2},2000)
      .call(function(){gameMarket.container.removeChild(this)})
  }
  //第一场景的数据并绑定事件
  var sceneOne = gameMarketEpisodes[currentEpisode]["sceneOne"];
  for(var i = 0; i < sceneOne.length;i++){
    if(sceneOne[i].type == "bitmap"){
      var img = new createjs.Bitmap(images[sceneOne[i].id]);
      img.regX = img.image.width / 2;
      img.regY = img.image.height / 2;
      img.x = sceneOne[i].x;
      img.y = sceneOne[i].y;
      img.targetImg = sceneOne[i].targetImg;
      gameMarket.container.addChild(img);
      handleClick(img);
    }
  }
  //加载确定按钮
  var sure = gameMarketEpisodes[currentEpisode]["sure"];
  sureImg = new createjs.Bitmap(images[sure.id]);
  sureImg.regX = sureImg.image.width / 2;
  sureImg.regY = sureImg.image.height / 2;
  sureImg.x = 800;
  sureImg.y = 400;
  gameMarket.container.addChild(sureImg);
  /*if(gameMarket.inputArr.length > 1){*/
    sureImg.addEventListener("click",checkAnswer);
  //}
}
//加载第二场景的数据
function loadSceneTwo(){
  game_current.removeAllChildren();
  gameMarket.container = new createjs.Container();
  game_current.addChild(gameMarket.container);
  //第二场景背景
  var bg = gameAllConfig["content"][gameName]["episodes"][currentEpisode]["sceneTwo"]["subBackground"];
  if(bg){
    if(bg.type == "bitmap"){
      var bgImg = new createjs.Bitmap(images[bg.id]);
      bgImg.scaleX = stage.canvas.width / bgImg.image.width;
      bgImg.scaleY = stage.canvas.height / bgImg.image.height;
    }else if(bg.type == "sprite"){
      var bgImg = new createjs.Sprite(spritesheets[bg.id]);
      bgImg.scaleX = stage.canvas.width / bgImg.getBounds().width;
      bgImg.scaleY = stage.canvas.height / bgImg.getBounds().height;
    }
    game_current.addChildAt(bgImg,0);
  }

  var sceneTwo = gameAllConfig["content"][gameName]["episodes"][currentEpisode]["sceneTwo"];
  gameMarket.answer = sceneTwo["rightDrag"];
  var srcImg = sceneTwo["srcImgs"];
  var desImg = sceneTwo["desImgs"];
  for(var j = 0; j < srcImg.length;j++){
    if(srcImg[j].type == "bitmap"){
      var img = new createjs.Bitmap(images[srcImg[j].id]);
      img.regX = img.image.width / 2;
      img.regY = img.image.height / 2;
      img.x = srcImg[j].x;
      img.y = srcImg[j].y;
      img.startX = img.x;
      img.startY = img.y;
      img.label = srcImg[j].label;
      gameMarket.container.addChild(img);
      srcImgs.push(img);
      handlePressmove(img);
    }
  }
  for(var j = 0; j < desImg.length;j++){
    if(desImg[j].type == "bitmap"){
      var img = new createjs.Bitmap(images[desImg[j].id]);
      img.regX = img.image.width / 2;
      img.regY = img.image.height / 2;
      img.x = desImg[j].x;
      img.y = desImg[j].y;
      img.label = desImg[j].label;
      gameMarket.container.addChild(img);
      desImgs.push(img);
    }
  }
  sceneTwoLoad = true;
}

//切关的动画
function switchAnimation(sprite,callback){
  if(callback){
    callback();
  }
  if(sprite){
    var animate = new createjs.Sprite(spritesheets[sprite.id],"play");
    animate.scaleX = stage.canvas.width / animate.getBounds().width ;
    animate.scaleY = stage.canvas.height / animate.getBounds().height ;
    game_current.addChild(animate);
    createjs.Tween.get(animate)
      .wait(5000)
      .call(function(){
        if(sceneTwoLoad){
          game_current.removeChild(this);
        }
      })
  }
}
//绑定点击事件(给第一场景)
function handleClick(currentObj){
  currentObj.on("click",function(evt){
    playEffectSound("diandui");
    var target = evt.target;
    if(gameMarket.inputArr.length > 1){
      gameMarket.container.removeChild(gameMarket.container.children[0]);
      gameMarket.inputArr.splice(1,1);
    }
    if(target.targetImg.type == "bitmap"){
      var targetImg = new createjs.Bitmap(images[target.targetImg["id"]]);
      targetImg.regX = targetImg.image.width / 2;
      targetImg.regY = targetImg.image.height / 2;
      targetImg.label = target.targetImg.label;
      targetImg.x = gameMarket.inputArr[0].x;
      targetImg.y = gameMarket.inputArr[0].y;
      gameMarket.container.addChildAt(targetImg,0);
      gameMarket.inputArr.push(targetImg);
    }
  })
}
//绑定拖拽事件(给第二场景)
function handlePressmove(currentObj){
  currentObj.on("mousedown", function (evt) {
    this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
  });
  // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
  currentObj.on("pressmove", function (evt) {
    this.x = evt.stageX + this.offset.x;
    this.y = evt.stageY + this.offset.y;
    gameMarket.container.setChildIndex(evt.target, evt.target.parent.children.length - 1);
  });
  currentObj.on("pressup",function(evt){
    var target = evt.target;
    var hit = false;
    for(var i = 0; i < desImgs.length;i++){
      var dest = desImgs[i];
      if (target.label != dest.label) continue;
      var pt = dest.globalToLocal(stage.mouseX, stage.mouseY);
      if (dest.hitTest(pt.x, pt.y)) {
        playEffectSound("tuodui");
        hit = true;
        target.x = dest.x;
        target.y = dest.y;
        rightAnswer++;
        target.removeAllEventListeners("mousedown");
        target.removeAllEventListeners("pressmove");
        target.removeAllEventListeners("pressup");
        if(rightAnswer == gameMarket.answer){
          playEffectSound("correct_" + randomInt(1, 6).toString());
          for(var j = 0; j < srcImgs.length;j++){
            srcImgs[j].removeAllEventListeners("pressmove");
            srcImgs[j].removeAllEventListeners("mousedown");
            srcImgs[j].removeAllEventListeners("pressup");
          }
          rightAnswer = 0;
          nextQ_quizmogameMarket();
        }
      }
    }
    if(!hit){
      target.x = target.startX;
      target.y = target.startY;
      playEffectSound("tuocuo");
    }
  })
}
//确定按钮
function checkAnswer(evt){
  var question = gameMarket.inputArr[0];
  var answer = gameMarket.inputArr[1];
  if(answer != undefined && question.label == answer.label){
    switchAnimation(switchSprite,loadSceneTwo);
    playEffectSound("correct_" + randomInt(1, 6).toString());
    evt.target.removeAllEventListeners("click");
  }else{
    playEffectSound("incorrect_" + randomInt(1, 4).toString());
  }
}


function nextQ_quizmogameMarket() {
  if (currentEpisode < subNarrations.length - 1) {
      currentEpisode++;
    setTimeout(function () {
      init_gameMarket();
    },2000)
  } else {
    currentEpisode = 0;
    subNarrations = [];
  }
}

