var stage ,game_current,canvas
var replayBtn = null,homeBtn = null,sndBtn,nosndBtn,replayBtn_click,homeBtn_click;
canvas = document.getElementById("gameCanvas");
stage = new  createjs.Stage(canvas);
stage.setBounds(0,0,canvas.width ,canvas.height);
game_current = new createjs.Container();
stage.addChild(game_current);

var everyGameTime = {second:0,minute:0,hour:0},gameScores = {}

var allSounds = {
  sndUrl:"sounds/",
  sndBgId:"soundBg",
  sndBgSrc:"snake_bg.mp3",
  sndBgInstance:null,//游戏背景音函数
  effectSoundInstance:null,//游戏音效函数
  effectSoundsFile:"sound_effect.mp3",//游戏音效文件,
  effectData:[
    {'duration': 1536, 'id': 'correct_1', 'startTime': 0}, {
      'duration': 1416,
      'id': 'correct_2',
      'startTime': 1736
    }, {'duration': 1584, 'id': 'correct_3', 'startTime': 3352}, {
      'duration': 960,
      'id': 'correct_4',
      'startTime': 5136
    }, {'duration': 1584, 'id': 'correct_5', 'startTime': 6296}, {
      'duration': 1296,
      'id': 'correct_6',
      'startTime': 8080
    }, {'duration': 708, 'id': 'dadishudacuo', 'startTime': 9576}, {
      'duration': 984,
      'id': 'dadishudadui',
      'startTime': 10484
    }, {'duration': 432, 'id': 'diancuo', 'startTime': 11668}, {
      'duration': 1680,
      'id': 'diandui',
      'startTime': 12300
    }, {'duration': 2304, 'id': 'incorrect_1', 'startTime': 14180}, {
      'duration': 2064,
      'id': 'incorrect_2',
      'startTime': 16684
    }, {'duration': 1320, 'id': 'incorrect_3', 'startTime': 18948}, {
      'duration': 1392,
      'id': 'incorrect_4',
      'startTime': 20468
    }, {'duration': 236, 'id': 'lianxiancuo', 'startTime': 22060}, {
      'duration': 941,
      'id': 'lianxiandui',
      'startTime': 22496
    }, {'duration': 1920, 'id': 'qiudao', 'startTime': 23637}, {
      'duration': 2592,
      'id': 'qiugun',
      'startTime': 25757
    }, {'duration': 912, 'id': 'shanggou', 'startTime': 28549}, {
      'duration': 1596,
      'id': 'shepian',
      'startTime': 29661
    }, {'duration': 1464, 'id': 'tuocuo', 'startTime': 31457}, {
      'duration': 1728,
      'id': 'tuodui',
      'startTime': 33121
    }, {'duration': 1704, 'id': 'wakuangshi', 'startTime': 35049}, {
      'duration': 2328,
      'id': 'zhongba',
      'startTime': 36953
    }],
  isMute : false

}
createjs.Ticker.useRAF = true;
createjs.Touch.enable(stage, true, false);

var gameName = null,gameManifest,function_prepWorld = null;
var spritesheets = new Array();

var load_preload = new createjs.LoadQueue(false);
var main_preload = new createjs.LoadQueue(false);
createjs.Ticker.addEventListener("tick",main_ticker);
//一些静态文件
var images = [];var loadAnimation = null;

function addSoundsEffect(){
  createjs.HTMLAudioPlugin.enableIOS = true;
  var sounds = [
    {
      id:allSounds.sndBgId,
      src:allSounds.sndBgSrc
    },
    {
      src:allSounds.effectSoundsFile,
      data:{
        audioSprite:allSounds.effectData
      }
    }
  ]

  createjs.Sound.alternateExtensions = ["mp3"];
  createjs.Sound.addEventListener("fileload", function () {
    if(isIOS()){
      allSounds.sndBgInstance = createjs.Sound.play(allSounds.sndBgId, {loop: -1, volume: 0.2});
    }
  });
  createjs.Sound.registerSounds(sounds, allSounds.sndUrl);  // register sounds, which preloads by default
}

function playBgSound() {
  allSounds.sndBgInstance = createjs.Sound.play(allSounds.sndBgId, {loop: -1, volume: 0.2});
}

function stopBgSound() {
  allSounds.sndBgInstance.stop();
}

function playEffectSound(id, callback) {
  if (allSounds.effectSoundInstance) {
    allSounds.effectSoundInstance.stop();
  }
  allSounds.effectSoundInstance = createjs.Sound.play(id);
  if (callback) {
    allSounds.effectSoundInstance.addEventListener("complete", callback);
  }
}

function muteBgSound() {
  if (allSounds.isMute) {
    nosndBtn.visible = false;
    sndBtn.visible = true;
    playBgSound();
  } else {
    nosndBtn.visible = true;
    sndBtn.visible = false;
    stopBgSound();
  }
  allSounds.isMute = !allSounds.isMute;
}


load_preload.addEventListener("complete",handleMainLoad);
load_preload.loadManifest([
  {id:"huhu-out",src:"img/gameMarket/car.png"},
  {id:"replay-btn",src:"img/btn_replay.png"},
  {id:"home-btn",src:"img/btn_home.png"},
  {id:"snd-btn",src:"img/btn_snd.png"},
  {id:"nosnd-btn",src:"img/btn_nosnd.png"},
  {id:"replay-click",src:"img/replay_click.png"},
  {id:"home-click",src:"img/home_click.png"},
  {id:"pop", src :"img/pop.png"},
  {id:"sure", src:"img/sure.png"},
  {id:"cancle", src :"img/cancle.png"}
])
function handleMainLoad(){
  addSoundsEffect();
  createjs.Ticker.setFPS(15);
  gameName = "market";
  gameManifest = gameAllConfig["manifest_market"];

  document.getElementById("coverImg").style.zIndex = -2;
  document.getElementById("gameCanvas").style.zIndex = 100;
  spritesheets["market-car"] = new createjs.SpriteSheet({
    "images": [load_preload.getResult("huhu-out")],
    "frames": [
      [0, 0, 416, 275, 0, -30, -31],
      [416, 0, 415, 281, 0, -30, -29],
      [831, 0, 414, 276, 0, -30, -28],
      [1245, 0, 416, 274, 0, -30, -32],
      [1661, 0, 417, 270, 0, -30, -37],
      [2078, 0, 416, 273, 0, -30, -32],
      [2494, 0, 414, 283, 0, -30, -26],
      [2908, 0, 416, 273, 0, -30, -31],
      [3324, 0, 418, 269, 0, -30, -37],
      [3742, 0, 418, 276, 0, -30, -31],
      [4160, 0, 418, 281, 0, -30, -25],
      [4578, 0, 416, 273, 0, -30, -31],
      [4994, 0, 415, 281, 0, -30, -29],
      [5409, 0, 414, 276, 0, -30, -28],
      [5823, 0, 416, 274, 0, -30, -32],
      [6239, 0, 417, 270, 0, -30, -37],
      [6656, 0, 416, 273, 0, -30, -32],
      [7072, 0, 414, 283, 0, -30, -26],
      [7486, 0, 416, 273, 0, -30, -31],
      [7902, 0, 418, 269, 0, -30, -37],
      [8320, 0, 418, 276, 0, -30, -31]
    ],
    "animations": {
      "inner": { "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      "stop":{"frames":[11]},
      "out":{"frames":[11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
    },
  });
  loadAnimation = new createjs.Sprite(spritesheets["market-car"],"inner");
  loadAnimation.regX = loadAnimation.getBounds().width / 2;
  loadAnimation.regY = loadAnimation.getBounds().height / 2;
  loadAnimation.x = canvas.width / 2;
  loadAnimation.y = canvas.height / 2;
  stage.addChild(loadAnimation);

  //重玩按钮
  replayBtn = new createjs.Bitmap(load_preload.getResult("replay-btn"));
  replayBtn.visible = true;
  replayBtn.regX = replayBtn.image.width / 2;
  replayBtn.regY = replayBtn.image.height / 2;
  replayBtn.x = 830;
  replayBtn.y = 50;
  replayBtn.addEventListener("click",function(){
    gameReplay();
    replayBtn_click.visible = true;
    createjs.Tween.get(this)
      .call(function(){
        replayBtn.visible = false;
        replayBtn_click.visible = true;
      })
      .wait(500)
      .call(function(){
        replayBtn.visible = true;
        replayBtn_click.visible = false;
      })
  })
  replayBtn_click = new createjs.Bitmap(load_preload.getResult("replay-click"));
  replayBtn_click.visible = false;
  replayBtn_click.regX = replayBtn_click.image.width / 2;
  replayBtn_click.regY = replayBtn_click.image.height / 2;
  replayBtn_click.x = 830;
  replayBtn_click.y = 50;
  //返回主页
  homeBtn = new createjs.Bitmap(load_preload.getResult("home-btn"));
  homeBtn.visible = true;
  homeBtn.regX = homeBtn.image.width / 2;
  homeBtn.regY = homeBtn.image.height / 2;
  homeBtn.x = 970;
  homeBtn.y = 50;
  homeBtn.addEventListener("click",function(){
    homeBtn.visible = true;
    createjs.Tween.get(this)
      .call(function(){
        homeBtn.visible = false;
        homeBtn_click.visible = true;
      })
      .wait(500)
      .call(function(){
        homeBtn.visible = true;
        homeBtn_click.visible = false;
        gotoHome();
      })
  })
  homeBtn_click = new createjs.Bitmap(load_preload.getResult("home-click"));
  homeBtn_click.visible = false;
  homeBtn_click.regX = homeBtn_click.image.width / 2;
  homeBtn_click.regY = homeBtn_click.image.height / 2;
  homeBtn_click.x = 970;
  homeBtn_click.y = 50;

  //背景音乐按钮
  sndBtn = new createjs.Bitmap(load_preload.getResult("snd-btn"));
  sndBtn.regX = sndBtn.getBounds().width / 2;
  sndBtn.regY = sndBtn.getBounds().height / 2;
  sndBtn.x = 900;
  sndBtn.y = 50;
  sndBtn.addEventListener("click",muteBgSound)
  nosndBtn = new createjs.Bitmap(load_preload.getResult("nosnd-btn"));
  nosndBtn.visible = false;
  nosndBtn.regX = nosndBtn.getBounds().width / 2;
  nosndBtn.regY = nosndBtn.getBounds().height / 2;
  nosndBtn.x = 900;
  nosndBtn.y = 50;
  nosndBtn.addEventListener("click",muteBgSound);

  main_preload.addEventListener("fileload",handleFileLoad);
  main_preload.addEventListener("complete",handleComplete);
  main_preload.loadManifest(gameManifest);
  if(gameAllConfig["content"] != undefined){
    main_preload.loadManifest({src: gameAllConfig["content"].src, id: gameAllConfig["content"].id});
  }

}

function handleFileLoad(o){
  //加载图片等静态文件资源
  if(o.item.type == createjs.LoadQueue.IMAGE){
    images[o.item.id] = o.result;
    images.push(o.result);
    images[images.length - 1].id = o.item.id;
  }
}

function handleComplete(){
 document.getElementById("coverImg").style.display = "none";
 if(!isIOS()){
   playBgSound();
 }
  gameSprites();

  stage.addChild(sndBtn);
  stage.addChild(nosndBtn)
  stage.addChild(replayBtn);
  stage.addChild(homeBtn);
  stage.addChild(replayBtn_click);
  stage.addChild(homeBtn_click);
  stage.setChildIndex(replayBtn,stage.children.length - 1);
  stage.setChildIndex(homeBtn,stage.children.length - 1);

  function_prepWorld = "game_"+gameName;
  // game_content = main_preload.getResult("contentData");
  mainWorld();
  //console.log(game_content);
}

function main_ticker(){
  stage.update();
}

function mainWorld(){
  if (typeof(window[function_prepWorld]) === "function") window[function_prepWorld]();
}
//loading animation
function handleLoadSprite(spriteSheet,callback){
  stage.removeChild(loadAnimation);
  var sprite = new createjs.Sprite(spriteSheet,"play");
  var spriteBounds = sprite.getBounds();
  sprite.regX = spriteBounds.width / 2;
  sprite.regY = spriteBounds.height / 2;
  sprite.scaleX = canvas.width / spriteBounds.width ;
  sprite.scaleY = canvas.height / spriteBounds.height ;
  sprite.x = canvas.width / 2;
  sprite.y = canvas.height / 2;
  stage.addChild(sprite);
  if(callback){
    callback();
  }
  createjs.Tween.get(sprite)
    .wait(3000)
    .call(function(){
      game_current.removeChild(sprite);
    })
  stage.update();
}
//切关的动画
function switchAnimation(spritesheet,callback){
  if(callback){
    callback();
  }
  if(spritesheet){
    var animate = new createjs.Sprite(spritesheet,"play");
    animate.scaleX = stage.canvas.width / animate.getBounds().width ;
    animate.scaleY = stage.canvas.height / animate.getBounds().height ;
    game_current.addChild(animate);
    animate.addEventListener("animationend",function(){
      game_current.removeChild(this);
    })
 /*   createjs.Tween.get(animate)
      .wait(5000)
      .call(function(){
        game_current.removeChild(this);
      })*/
  }
}

//创建mask
function createMask(){
  var  mask = new createjs.Shape();
  mask.graphics.beginFill("#000000").drawRect(0,0,canvas.width,canvas.height)
  mask.alpha = 0.5;
  game_current.addChild(mask);
  game_current.setChildIndex(mask,game_current.children.length - 1);
  game_current.mask = mask;
  stage.update();
}
//重玩
function gameReplay(){
  mainWorld();
}

function gotoHome(){
  var container = new createjs.Container();
  game_current.addChild(container);
  var  mask = new createjs.Shape();
  mask.graphics.beginFill("#000000").drawRect(0,0,canvas.width,canvas.height)
  mask.alpha = 0.5;
  container.addChild(mask);
  createjs.Ticker.removeEventListener("tick",main_ticker);

  var pop = new createjs.Bitmap(load_preload.getResult("pop"));
  pop.regX = pop.image.width / 2;
  pop.regY = pop.image.height / 2;
  pop.x = canvas.width / 2;
  pop.y = canvas.height / 2;

  var sure = new createjs.Bitmap(load_preload.getResult("sure"));
  sure.x = 450;
  sure.y = 350;
  sure.addEventListener("click",function(){
    console.log("返回主页")

  })

  var cancle = new createjs.Bitmap(load_preload.getResult("cancle"));
  cancle.x = 640;
  cancle.y = 210;
  cancle.addEventListener("click",function(){
    game_current.removeChild(container);
    createjs.Ticker.addEventListener("tick",main_ticker);
  })
  container.addChild(pop,sure,cancle);
  stage.update();
}

function isIOS() {
  var UA = navigator.userAgent;
  if (UA.match(/iPad/i) || UA.match(/iPhone/i) || UA.match(/iPod/i)) {
    return true;
  } else {
    return false;
  }
}

//所有动图
function gameSprites(){
  spritesheets["load-door"] = new createjs.SpriteSheet({
    "images":[images["gameMarket-door"]],
    "frames":[
      [1, 1, 1016, 632, 0, 0, 0],
      [1019, 1, 1016, 632, 0, 0, 0],
      [2037, 1, 1016, 632, 0, 0, 0],
      [3055, 1, 1016, 632, 0, 0, 0],
      [4073, 1, 1016, 632, 0, 0, 0],
      [5091, 1, 1016, 632, 0, 0, 0],
      [6109, 1, 1016, 632, 0, 0, 0],
      [7127, 1, 1016, 632, 0, 0, 0],
      [1, 635, 1016, 632, 0, 0, 0],
      [1019, 635, 1016, 632, 0, 0, 0],
      [2037, 635, 1016, 632, 0, 0, 0],
      [3055, 635, 1016, 632, 0, 0, 0],
      [4073, 635, 1016, 632, 0, 0, 0],
      [5091, 635, 1016, 632, 0, 0, 0],
      [6109, 635, 1016, 632, 0, 0, 0],
      [7127, 635, 1016, 632, 0, 0, 0],
      [1, 1269, 1016, 632, 0, 0, 0],
      [1019, 1269, 1016, 632, 0, 0, 0],
      [2037, 1269, 1016, 632, 0, 0, 0],
      [3055, 1269, 1016, 632, 0, 0, 0],
      [4073, 1269, 1016, 632, 0, 0, 0],
      [5091, 1269, 1016, 632, 0, 0, 0],
      [6109, 1269, 1016, 632, 0, 0, 0],
      [7127, 1269, 1016, 632, 0, 0, 0],
      [1, 1903, 1016, 632, 0, 0, 0],
      [1019, 1903, 1016, 632, 0, 0, 0],
      [2037, 1903, 1016, 632, 0, 0, 0],
      [3055, 1903, 1016, 632, 0, 0, 0],
      [4073, 1903, 1016, 632, 0, 0, 0],
      [5091, 1903, 1016, 632, 0, 0, 0],
      [6109, 1903, 1016, 632, 0, 0, 0],
      [7127, 1903, 1016, 632, 0, 0, 0],
      [1, 2537, 1016, 632, 0, 0, 0],
      [1019, 2537, 1016, 632, 0, 0, 0],
      [2037, 2537, 1016, 632, 0, 0, 0],
      [3055, 2537, 1016, 632, 0, 0, 0],
      [4073, 2537, 1016, 632, 0, 0, 0],
      [5091, 2537, 1020, 632, 0, 0, 0]
    ],
    'animations': {
      'play': { 'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37] ,next : false}
      },
  });
  spritesheets["gameMarket-car"] = new createjs.SpriteSheet({
    "images": [
      images["gameMarket-car"]
    ],
    "frames": [
      [0, 0, 416, 275, 0, -30, -31],
      [416, 0, 415, 281, 0, -30, -29],
      [831, 0, 414, 276, 0, -30, -28],
      [1245, 0, 416, 274, 0, -30, -32],
      [1661, 0, 417, 270, 0, -30, -37],
      [2078, 0, 416, 273, 0, -30, -32],
      [2494, 0, 414, 283, 0, -30, -26],
      [2908, 0, 416, 273, 0, -30, -31],
      [3324, 0, 418, 269, 0, -30, -37],
      [3742, 0, 418, 276, 0, -30, -31],
      [4160, 0, 418, 281, 0, -30, -25],
      [4578, 0, 416, 273, 0, -30, -31],
      [4994, 0, 415, 281, 0, -30, -29],
      [5409, 0, 414, 276, 0, -30, -28],
      [5823, 0, 416, 274, 0, -30, -32],
      [6239, 0, 417, 270, 0, -30, -37],
      [6656, 0, 416, 273, 0, -30, -32],
      [7072, 0, 414, 283, 0, -30, -26],
      [7486, 0, 416, 273, 0, -30, -31],
      [7902, 0, 418, 269, 0, -30, -37],
      [8320, 0, 418, 276, 0, -30, -31]
    ],
    "animations": {
      "inner": { "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      "stop":{"frames":[11]},
      "out":{"frames":[11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
    },
  });
}

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//设置时间
function setTimeData() {
  clearInterval(timer);
  var timer = setInterval(function () {
    everyGameTime.second++;
    if (everyGameTime.second > 59) {
      everyGameTime.second = 0;
      everyGameTime.minute++;
    }
    if (everyGameTime.minute > 59) {
      everyGameTime.minute = 0;
      everyGameTime.hour++;
    }
  }, 1000);
}

// 获取每关时间
function getTimeDate() {
  return copy(everyGameTime);
}

// 1级赋值
function copy(obj) {
  var newobj = {};
  for (var attr in obj) {
    newobj[attr] = obj[attr];
  }
  return newobj;
}
// 积分
function recordScore(score) {
  var time = getTimeDate();
  if (gameScores[gameName]) {
    gameScores[gameName]["score"] += score;
    gameScores[gameName]["time"] = time.hour * 60 * 60 + time.minute * 60 + time.second;
    gameScores["id"] = getQueryString("id");
  } else {
    gameScores[gameName] = {
      "score": score,
      "time": time.hour * 60 * 60 + time.minute * 60 + time.second
    }
    gameScores["id"] = getQueryString("id");
  }
}
// 清除积分
function replayScore() {
  if (gameScores[gameName]) {
    gameScores[gameName]["score"] = 0;
    gameScores[gameName]["time"] = 0;
  }
  everyGameTime = {hour: 0, minute: 0, second: 0};
}

//向服务器传送数据
function toServerData(data){
  if(data){
    var gameData = JSON.stringify(data)
    console.log(gameData);
    $.ajax({
      type:"POST",
      url:"/learning/create_quiz_record/",
      data:gameData,
      success:function(result){
        if(result.success){
          console.log("data to server success");
        }
      }
    })
  }
}

function showReward(){

}

function getQueryString(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
}



var FPS = {};
FPS.time = 0;
FPS.FPS = 0;
FPS.showText = "ct:";
FPS.startFPS = function (stage){
  FPS.shape = new createjs.Shape();
  FPS.shape.graphics.beginFill("#8EE5EE").drawRect(0, 0, 200, 70);
  FPS.txt = new createjs.Text("", "30px Arial", "#000");
  FPS.container = new createjs.Container();
  stage.addChild(FPS.container);
  FPS.container.addChild(FPS.shape)
  FPS.container.addChild(FPS.txt);
  FPS.container.cache(0,0, 200,70);
  createjs.Ticker.addEventListener("tick", FPS.TickerFPS);
//    setInterval(FPS.TickerFPS,18)
}
FPS.TickerFPS = function (event)
{
  FPS.date = new Date();
  FPS.currentTime = FPS.date.getTime();
  if(FPS.time!=0)
  {
    FPS.FPS = Math.ceil(1000/(FPS.currentTime -  FPS.time));
  }
  FPS.time = FPS.currentTime;
  FPS.txt.text = "FPS: "+FPS.FPS + "\n" + FPS.showText;
  FPS.container.cache(0,0, 200,70);
}
FPS.startFPS2 = function (stage)
{
  FPS.txt = document.getElementById("fps");
  createjs.Ticker.addEventListener("tick", FPS.TickerFPS2);
}
FPS.TickerFPS2 = function (event)
{
  FPS.date = new Date();
  FPS.currentTime = FPS.date.getTime();
  if(FPS.time!=0)
  {
    FPS.FPS = Math.ceil(1000/(FPS.currentTime -  FPS.time));
  }
  FPS.time = FPS.currentTime;
  FPS.txt.innerText = "FPS: "+FPS.FPS;
}
