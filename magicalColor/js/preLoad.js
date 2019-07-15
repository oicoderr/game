var stage, game_current, canvas;
var replayBtn = null, homeBtn = null, sndBtn, nosndBtn, replayBtn_click, homeBtn_click, current_level = 0;

canvas = document.getElementById("gameCanvas");
stage = new createjs.Stage(canvas);
stage.setBounds(0, 0, canvas.width, canvas.height);

game_current = new createjs.Container();
stage.addChild(game_current);
var gameLevels, gameButtons = [], levelContainer = null, barriers = [],jumpBtn,
  dodo = {
    container: null,
    stand: null,
    run: null,
    timer: null,
    isJumping: false
  };
var allSounds = {
  sndUrl: "sounds/",
  sndBgId: "soundBg",
  sndBgSrc: "snake_bg.mp3",
  sndBgInstance: null,//游戏背景音函数
  effectSoundInstance: null,//游戏音效函数
  effectSoundsFile: "snake_game_effect.mp3",//游戏音效文件,
  effectData: [
    {"duration": 1150, "id": "broken", "startTime": 0},
    {"duration": 4076, "id": "countDown", "startTime": 1650},
    {"duration": 4703, "id": "gameover", "startTime": 6226},
    {"duration": 575, "id": "snake_die", "startTime": 11429},
    {"duration": 392, "id": "snake_eat", "startTime": 12504},
    {"duration": 523, "id": "snake_graphical", "startTime": 13396},
    {"duration": 601, "id": "snake_hit", "startTime": 14419},
    {"duration": 2613, "id": "snake_yun", "startTime": 15520}
  ],
  isMute: false
}

createjs.Ticker.useRAF = true;
createjs.Touch.enable(stage, true, false);

var gameName = null, gameManifest, function_prepWorld = null;
var spritesheets = new Array();

var load_preload = new createjs.LoadQueue(false);
var main_preload = new createjs.LoadQueue(false);
createjs.Ticker.addEventListener("tick", main_ticker);

//一些静态文件
var images = [];
var loadAnimation = null;

function addSoundsEffect() {
  createjs.HTMLAudioPlugin.enableIOS = true;
  var sounds = [
    {
      id: allSounds.sndBgId,
      src: allSounds.sndBgSrc
    },
    {
      src: allSounds.effectSoundsFile,
      data: {
        audioSprite: allSounds.effectData
      }
    }
  ]

  createjs.Sound.alternateExtensions = ["mp3"];
  createjs.Sound.addEventListener("fileload", function () {
    if (isIOS()) {
      allSounds.sndBgInstance = createjs.Sound.play(allSounds.sndBgId, {loop: -1, volume: 0.2});
    }
  });
  createjs.Sound.registerSounds(sounds, allSounds.sndUrl);  // register sounds, which preloads by default
}

function playBgSound() {
  // allSounds.sndBgInstance = createjs.Sound.play(allSounds.sndBgId, {loop: -1, volume: 0.2});
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

load_preload.addEventListener("complete", handleMainLoad);
load_preload.loadManifest([
  // {id: "huhu-out", src: "img/huhu_out.png"},
  {id: "replay-btn", src: "img/btn_replay.png"},
  {id: "home-btn", src: "img/btn_home.png"},
  {id: "snd-btn", src: "img/btn_snd.png"},
  {id: "nosnd-btn", src: "img/btn_nosnd.png"},
  {id: "replay-click", src: "img/replay_click.png"},
  {id: "home-click", src: "img/home_click.png"}
])

function handleMainLoad() {
  addSoundsEffect();
  createjs.Ticker.setFPS(15);
  gameName = "magicalColor";
  gameManifest = gameAllConfig["manifest_magicalColor"];
  gameLevels = gameAllConfig["levels"];

  document.getElementById("coverImg").style.zIndex = -2;
  document.getElementById("gameCanvas").style.zIndex = 100;


  //重玩按钮
  replayBtn = new createjs.Bitmap(load_preload.getResult("replay-btn"));
  replayBtn.visible = true;
  replayBtn.regX = replayBtn.image.width / 2;
  replayBtn.regY = replayBtn.image.height / 2;
  replayBtn.x = 830;
  replayBtn.y = 50;
  replayBtn.addEventListener("click", function () {
    gameReplay();
    replayBtn_click.visible = true;
    createjs.Tween.get(this)
      .call(function () {
        replayBtn.visible = false;
        replayBtn_click.visible = true;
      })
      .wait(500)
      .call(function () {
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
  homeBtn.addEventListener("click", function () {
    homeBtn.visible = true;
    createjs.Tween.get(this)
      .call(function () {
        homeBtn.visible = false;
        homeBtn_click.visible = true;
      })
      .wait(500)
      .call(function () {
        homeBtn.visible = true;
        homeBtn_click.visible = false;
        // location = "www.baidu.com";
        // console.log("主页")
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
  sndBtn.addEventListener("click", muteBgSound)

  nosndBtn = new createjs.Bitmap(load_preload.getResult("nosnd-btn"));
  nosndBtn.visible = false;
  nosndBtn.regX = nosndBtn.getBounds().width / 2;
  nosndBtn.regY = nosndBtn.getBounds().height / 2;
  nosndBtn.x = 900;
  nosndBtn.y = 50;
  nosndBtn.addEventListener("click", muteBgSound);

  main_preload.addEventListener("fileload", handleFileLoad);
  main_preload.addEventListener("complete", handleComplete);
  main_preload.loadManifest(gameManifest);

}

function handleFileLoad(o) {
  //加载图片等静态文件资源
  if (o.item.type == createjs.LoadQueue.IMAGE) {
    images[o.item.id] = o.result;
    images.push(o.result);
    images[images.length - 1].id = o.item.id;
  }
}

function handleComplete() {
  document.getElementById("coverImg").style.display = "none";
  if (!isIOS()) {
    playBgSound();
  }
  gameSprites();

  stage.addChild(sndBtn);
  stage.addChild(nosndBtn)
  stage.addChild(replayBtn);
  stage.addChild(homeBtn);
  stage.addChild(replayBtn_click);
  stage.addChild(homeBtn_click);
  stage.setChildIndex(replayBtn, stage.children.length - 1);
  stage.setChildIndex(homeBtn, stage.children.length - 1);

  function_prepWorld = "game_" + gameName;
  mainWorld();
}

function main_ticker() {
  stage.update();
}

function mainWorld() {
  game_current.removeAllChildren();
  if (typeof(window[function_prepWorld]) === "function") window[function_prepWorld]();
}

//加载loading 同时执行init
function handleLoadSprite(spriteSheet, callback) {
  stage.removeChild(loadAnimation);
  var sprite = new createjs.Sprite(spriteSheet, "play");
  var spriteBounds = sprite.getBounds();
  sprite.regX = spriteBounds.width / 2;
  sprite.regY = spriteBounds.height / 2;
  sprite.scaleX = canvas.width / spriteBounds.width;
  sprite.scaleY = canvas.height / spriteBounds.height;
  sprite.x = canvas.width / 2;
  sprite.y = canvas.height / 2;
  stage.addChild(sprite);
  if (callback) {
    callback();
  }
  createjs.Tween.get(sprite)
    .wait(3000)
    .call(function () {
      game_current.removeChild(sprite);
    })
  // stage.update();
}

//切关的动画
function switchAnimation(spritesheet, callback) {
  if (callback) {
    callback();
  }
  if (spritesheet) {
    var animate = new createjs.Sprite(spritesheet, "play");
    animate.scaleX = stage.canvas.width / animate.getBounds().width;
    animate.scaleY = stage.canvas.height / animate.getBounds().height;
    game_current.addChild(animate);
    animate.addEventListener("animationend", function () {
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
function createMask() {
  var mask = new createjs.Shape();
  mask.graphics.beginFill("#000000").drawRect(0, 0, canvas.width, canvas.height)
  mask.alpha = 0.5;
  game_current.addChild(mask);
  game_current.setChildIndex(mask, game_current.children.length - 1);
  game_current.mask = mask;
  stage.update();
}

//重玩
function gameReplay() {
  mainWorld();
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
function gameSprites() {
  spritesheets["countDown"] = new createjs.SpriteSheet({
    "images": [images["countDown"]],
    "frames": [
      [1, 1, 318, 326, 0, 0, 0],
      [321, 1, 318, 326, 0, 0, 0],
      [641, 1, 318, 326, 0, 0, 0],
      [961, 1, 318, 326, 0, 0, 0],
      [1281, 1, 318, 326, 0, 0, 0],
      [1601, 1, 318, 326, 0, 0, 0],
      [1921, 1, 318, 326, 0, 0, 0],
      [2241, 1, 318, 326, 0, 0, 0],
      [2561, 1, 318, 326, 0, 0, 0],
      [2881, 1, 318, 326, 0, 0, 0],
      [3201, 1, 318, 326, 0, 0, 0],
      [3521, 1, 318, 326, 0, 0, 0],
      [3841, 1, 318, 326, 0, 0, 0],
      [4161, 1, 318, 326, 0, 0, 0],
      [4481, 1, 318, 326, 0, 0, 0],
      [4801, 1, 318, 326, 0, 0, 0],
      [5121, 1, 318, 326, 0, 0, 0],
      [5441, 1, 318, 326, 0, 0, 0],
      [5761, 1, 318, 326, 0, 0, 0],
      [6081, 1, 318, 326, 0, 0, 0],
      [6401, 1, 318, 326, 0, 0, 0],
      [6721, 1, 318, 326, 0, 0, 0],
      [7041, 1, 318, 326, 0, 0, 0],
      [7361, 1, 318, 326, 0, 0, 0],
      [7681, 1, 318, 326, 0, 0, 0],
      [8001, 1, 318, 326, 0, 0, 0],
      [8321, 1, 318, 326, 0, 0, 0],
      [8641, 1, 318, 326, 0, 0, 0],
      [8961, 1, 318, 326, 0, 0, 0],
      [9281, 1, 318, 326, 0, 0, 0],
      [9601, 1, 318, 326, 0, 0, 0],
      [9921, 1, 318, 326, 0, 0, 0],
      [10241, 1, 318, 326, 0, 0, 0],
      [10561, 1, 318, 326, 0, 0, 0],
      [10881, 1, 318, 326, 0, 0, 0],
      [11201, 1, 318, 326, 0, 0, 0],
      [11521, 1, 318, 326, 0, 0, 0],
      [11841, 1, 318, 326, 0, 0, 0],
      [12161, 1, 318, 326, 0, 0, 0],
      [12481, 1, 318, 326, 0, 0, 0],
      [12801, 1, 318, 326, 0, 0, 0],
      [13121, 1, 318, 326, 0, 0, 0],
      [13441, 1, 318, 326, 0, 0, 0],
      [13761, 1, 318, 326, 0, 0, 0],
      [14081, 1, 318, 326, 0, 0, 0]
    ],
    "animations": {
      "play": {
        "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
        speed: 1.2
      }
    },
  });
  spritesheets["run"] = new createjs.SpriteSheet({
    "images": [images["run"]],
    "frames": [
      [1, 1, 160, 180, 0, 0, 0],
      [163, 1, 160, 180, 0, 0, 0],
      [325, 1, 160, 180, 0, 0, 0],
      [487, 1, 160, 180, 0, 0, 0],
      [649, 1, 160, 180, 0, 0, 0],
      [811, 1, 160, 180, 0, 0, 0],
      [973, 1, 160, 180, 0, 0, 0],
      [1135, 1, 160, 180, 0, 0, 0]
    ],
    "animations": {
      "play": {
        "frames": [0, 1, 2, 3, 4, 5, 6, 7],
        speed: 0.8
      }
    },
  });
  spritesheets["star"] = new createjs.SpriteSheet({
    "images": [images["star"]],
    "frames": [
      [1, 1, 200, 180, 0, 0, 0],
      [203, 1, 200, 180, 0, 0, 0],
      [405, 1, 200, 180, 0, 0, 0],
      [607, 1, 200, 180, 0, 0, 0],
      [809, 1, 200, 180, 0, 0, 0],
      [1011, 1, 200, 180, 0, 0, 0],
      [1213, 1, 200, 180, 0, 0, 0],
      [1415, 1, 200, 180, 0, 0, 0],
      [1617, 1, 200, 180, 0, 0, 0],
      [1819, 1, 200, 180, 0, 0, 0],
      [2021, 1, 200, 180, 0, 0, 0]
    ],
    "animations": {
      "play": {
        "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        speed: 1
      }
    },
  });
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showFPS() {
  var FPS = {};
  FPS.time = 0;
  FPS.FPS = 0;
  FPS.showText = "ct:";
  FPS.startFPS = function (stage) {
    FPS.shape = new createjs.Shape();
    FPS.shape.graphics.beginFill("#8EE5EE").drawRect(0, 0, 200, 70);
    FPS.txt = new createjs.Text("", "30px Arial", "#000");
    FPS.container = new createjs.Container();
    stage.addChild(FPS.container);
    FPS.container.addChild(FPS.shape)
    FPS.container.addChild(FPS.txt);
    FPS.container.cache(0, 0, 200, 70);
    createjs.Ticker.addEventListener("tick", FPS.TickerFPS);
//    setInterval(FPS.TickerFPS,18)
  }
  FPS.TickerFPS = function (event) {
    FPS.date = new Date();
    FPS.currentTime = FPS.date.getTime();
    if (FPS.time != 0) {
      FPS.FPS = Math.ceil(1000 / (FPS.currentTime - FPS.time));
    }
    FPS.time = FPS.currentTime;
    FPS.txt.text = "FPS: " + FPS.FPS + "\n" + FPS.showText;
    FPS.container.cache(0, 0, 200, 70);
  }
  FPS.startFPS2 = function (stage) {
    FPS.txt = document.getElementById("fps");
    createjs.Ticker.addEventListener("tick", FPS.TickerFPS2);
  }
  FPS.TickerFPS2 = function (event) {
    FPS.date = new Date();
    FPS.currentTime = FPS.date.getTime();
    if (FPS.time != 0) {
      FPS.FPS = Math.ceil(1000 / (FPS.currentTime - FPS.time));
    }
    FPS.time = FPS.currentTime;
    FPS.txt.innerText = "FPS: " + FPS.FPS;
  }
}
