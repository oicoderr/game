var stage, game_current, canvas;
var replayBtn = null, homeBtn = null, sndBtn, nosndBtn, replayBtn_click, homeBtn_click,
  current_level = 0, current_answerIndex = 0, gradeTime = 0, dateTimer = null, gameIsEnd = false,
  loadEffectSound = false, gameTimer = null, gameScores = {}, reward = {}, totalTime = gameAllConfig.totalTime, totalTimeText = null,
  everyGameTime = {second: 0, minute: 0, hour: 0},
  canvas = document.getElementById("gameCanvas");
stage = new createjs.Stage(canvas);
stage.setBounds(0, 0, canvas.width, canvas.height);

game_current = new createjs.Container();
stage.addChild(game_current);
var allSounds = {
  sndUrl: "sounds/",
  sndBgId: "soundBg",
  sndBgSrc: gameAllConfig.sndBgSrc,
  sndBgInstance: null,//游戏背景音函数
  effectSoundInstance: null,//游戏音效函数
  effectSoundsId: "effectSound",
  effectSoundsFile: gameAllConfig.effectSoundsFile,//游戏音效文件,
  effectData: gameAllConfig.effectData,
  isMute: false
}

createjs.Ticker.useRAF = true;
createjs.Touch.enable(stage, true, false);
createjs.MotionGuidePlugin.install();
var gameManifest, function_prepWorld = null, templateContainer = null;

var load_preload = new createjs.LoadQueue(false);
var main_preload = new createjs.LoadQueue(false);
createjs.Ticker.addEventListener("tick", main_ticker);

//一些静态文件
var images = [];

function addSoundsEffect() {
  createjs.HTMLAudioPlugin.enableIOS = true;
  var sounds = [
    {
      id: allSounds.sndBgId,
      src: allSounds.sndBgSrc
    },
    {
      id: allSounds.effectSoundsId,
      src: allSounds.effectSoundsFile,
      data: {
        audioSprite: allSounds.effectData
      }
    }
  ]

  createjs.Sound.alternateExtensions = ["mp3"];
  createjs.Sound.addEventListener("fileload", function (o) {
    if (o.id == "effectSound") {
      loadEffectSound = true;
    } else {
      // allSounds.sndBgInstance = createjs.Sound.play(allSounds.sndBgId, {loop: -1, volume: 0.2});
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

load_preload.addEventListener("complete", handleMainLoad);
load_preload.loadManifest(gameAllConfig.loadManiFest);

function handleMainLoad() {
  addSoundsEffect();
  createjs.Ticker.setFPS(15);
  gameManifest = gameAllConfig[gameAllConfig.name + "_manifest"];
  gameAllConfig.loadSprite();
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
        stopTime();
        homeBtn.visible = true;
        homeBtn_click.visible = false;
        gotoHome("/learning/student_navigation/");
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

  function_prepWorld = "game_" + gameAllConfig.name;
  mainWorld();
}

function main_ticker() {
  stage.update();
}

function mainWorld() {
  if (typeof(window[function_prepWorld]) === "function") window[function_prepWorld]();
}

//加载loading 同时执行init
function handleLoadSprite(spriteSheet, callback) {
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
  if (typeof(gameAllConfig[gameAllConfig.name + "_spritesheets"]) == "function") {
    gameAllConfig[gameAllConfig.name + "_spritesheets"]();
  }
}

function gotoHome(url) {
  createjs.Ticker.removeEventListener("tick", main_ticker);
  createjs.Ticker.removeEventListener("tick", ticker);

  if (game_current.getChildByName("maskContainer")) {
    game_current.removeChild(game_current.getChildByName("maskContainer"))
  }
  var container = new createjs.Container();
  container.name = "maskContainer";
  game_current.addChild(container);
  var mask = new createjs.Shape();
  mask.graphics.beginFill("#000000").drawRect(0, 0, canvas.width, canvas.height)
  mask.alpha = 0.5;
  container.addChild(mask);

  var pop = new createjs.Bitmap(load_preload.getResult("pop"));
  pop.regX = pop.image.width / 2;
  pop.regY = pop.image.height / 2;
  pop.x = canvas.width / 2;
  pop.y = canvas.height / 2;

  var sure = new createjs.Bitmap(load_preload.getResult("sure"));
  sure.x = 450;
  sure.y = 350;
  sure.addEventListener("click", function () {
    window.location.href = "http://dodobaike.com" + url;
  });

  var cancel = new createjs.Bitmap(load_preload.getResult("cancel"));
  cancel.x = 640;
  cancel.y = 210;
  cancel.addEventListener("click", function () {
    game_current.removeChild(container);
    createjs.Ticker.addEventListener("tick", ticker);
    if (totalTime > 0 && !gameIsEnd) {
      startTime("down", function () {
        if (totalTime <= 0) {
          clearInterval(dateTimer);
          stopTime();
          recordScore(15 * current_level + 5);
          toServerData(gameScores);
        }
      });
    }
  })
  container.addChild(pop, sure, cancel);
  stage.update();
}
//重玩
function gameReplay() {
  mainWorld();
  replayScore();
}
//设置时间
function setTimeDate() {
  clearInterval(dateTimer);
  dateTimer = setInterval(function () {
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
  gameScores["id"] = getQueryString("id");
  if (gameScores) {
    gameScores["score"] = score;
    gameScores["time"] = time.hour * 60 * 60 + time.minute * 60 + time.second;
    gameScores["id"] = getQueryString("id");
  } else {
    gameScores["score"] = score;
    gameScores["time"] = time.hour * 60 * 60 + time.minute * 60 + time.second;
  }
}
// 清除积分
function replayScore() {
  if (gameScores) {
    gameScores["score"] = 0;
    gameScores["time"] = 0;
  }
  everyGameTime = {hour: 0, minute: 0, second: 0};
}

//向服务器传送数据
function toServerData(scoreData) {
  if (scoreData) {
    if (scoreData.score > 100) {
      scoreData.score = 100;
    }
    $.ajax({
      type: "POST",
      url: "/learning/create_game_record/",
      data: scoreData,
      success: function (result) {
        if (result.success) {
          reward.url = result.redirect_url;
          reward.waterList = result.waterList;
          show.gameReward(reward, gameAllConfig.rewardPosition, gameOverAnimation, 36, "#3c3c3c")
        }
      }
    })
  }
}

//获取游戏ID
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null)return unescape(r[2]);
  return null;
}

var show = {
  //游戏分数,计时,内容显示
  gameBg: function (bitmap) {
    var gameBg = new createjs.Bitmap(images[bitmap]);
    gameBg.scaleX = canvas.width / gameBg.image.width;
    gameBg.scaleY = canvas.height / gameBg.image.height;
    gameBg.cache(0, 0, gameBg.image.width, gameBg.image.height);
    game_current.addChild(gameBg);
  },
  gameScore: function (bitmap, x, y, text, size, color) {
    if (!text)text = "0";
    if (!color)color = "#ffffff";
    if (!size) size = "36";
    var scoreBlank = new createjs.Bitmap(images[bitmap]);
    scoreBlank.regX = scoreBlank.image.width / 2;
    scoreBlank.regY = scoreBlank.image.height / 2;
    scoreBlank.x = x;
    scoreBlank.y = y;
    scoreBlank.cache(0, 0, scoreBlank.image.width, scoreBlank.image.height);
    game_current.addChild(scoreBlank);

    scoreText = new createjs.Text(text, size + "px katong", color);
    scoreText.x = x;
    scoreText.y = y;
    scoreText.textBaseline = "middle";
    scoreText.textAlign = "center";
    game_current.addChild(scoreText);
  },
  gameTime: function (bitmap, x, y, text, size, color) {
    if (!text)text = "00:00";
    if (!color)color = "#ffffff";
    if (!size) size = "36";
    if (bitmap != "") {
      var timeBlank = new createjs.Bitmap(images[bitmap]);
      timeBlank.regX = timeBlank.image.width / 2;
      timeBlank.regY = timeBlank.image.height / 2;
      timeBlank.x = x;
      timeBlank.y = y;
      timeBlank.cache(0, 0, timeBlank.image.width, timeBlank.image.height);
      game_current.addChild(timeBlank);
    }

    totalTimeText = new createjs.Text(text, size + "px katong", color);
    totalTimeText.textAlign = "center";
    totalTimeText.textBaseline = "middle";
    totalTimeText.x = x;
    totalTimeText.y = y;
    game_current.addChild(totalTimeText);
  },
  gameContent: function (bitmap, x, y, callback) {
    var content = new createjs.Bitmap(images[bitmap]);
    content.regX = content.image.width / 2;
    content.regY = content.image.height / 2;
    content.x = x;
    content.y = y;
    content.cache(0, 0, content.image.width, content.image.height);
    game_current.addChild(content);
    if (callback)callback()
  },
  //游戏奖励 —— 水 和 按钮
  gameReward: function (data, position, callBack, fontSize, fontColor) {
    createMask();
    templateContainer = new createjs.Container();
    game_current.addChild(templateContainer);
    if (!fontSize) fontSize = "36";
    if (!fontColor)fontColor = "#ffffff";

    var milk = new createjs.Text("0", fontSize + "px katong", fontColor);
    var juice = new createjs.Text("0", fontSize + "px katong", fontColor);
    var mineral = new createjs.Text("0", fontSize + "px katong", fontColor);
    milk.textBaseline = "top";
    milk.textAlign = "center";
    juice.textBaseline = "top";
    juice.textAlign = "center";
    mineral.textBaseline = "top";
    mineral.textAlign = "center";
    var end_home = new createjs.Bitmap(images["end_home"]);
    end_home.regX = end_home.image.width / 2;
    end_home.regY = end_home.image.height / 2;
    end_home.addEventListener("click", function () {
      gotoHome(data.url)
    });
    var end_replay = new createjs.Bitmap(images["end_replay"]);
    end_replay.regX = end_replay.image.width / 2;
    end_replay.regY = end_replay.image.height / 2;
    end_replay.addEventListener("click", gameReplay)
    if (JSON.stringify(data) != "{}") {
      var my_waterObj = {
        "milk": {"count": 0},
        "juice": {"count": 0},
        "mineral": {"count": 0}
      }
      for (var i = 0; i < data.waterList.length; i++) {
        var water = data.waterList[i];
        my_waterObj[water.type].count = water.count;
      }
      mineral.text = my_waterObj["mineral"].count.toString();
      milk.text = my_waterObj["milk"].count.toString();
      juice.text = my_waterObj["juice"].count.toString();
    }
    if (position) {
      milk.x = position[0][0];
      milk.y = position[0][1];
      juice.x = position[1][0];
      juice.y = position[1][1];
      mineral.x = position[2][0];
      mineral.y = position[2][1];
      end_home.x = position[3][0];
      end_home.y = position[3][1];
      end_replay.x = position[4][0];
      end_replay.y = position[4][1];
    }

    if (callBack)callBack();
    templateContainer.addChild(mineral);
    templateContainer.addChild(juice);
    templateContainer.addChild(milk);
    templateContainer.addChild(end_home, end_replay);
    stage.update();
  }
}

//游戏计时
function startTime(type, callback) {
  gameTimer = setInterval(function () {
    //倒计时
    if (type == "down") {
      totalTime--;
      timing();
    } else if (type == "up") {//正计时
      totalTime++;
      timing();
    }
    if (callback) {
      callback();
    }
  }, 1000);

  function timing() {
    if (totalTime < 10) {
      totalTimeText.text = "00:0" + totalTime;
    } else if (totalTime >= 10 && totalTime <= 59) {
      totalTimeText.text = "00:" + totalTime;
    } else if (totalTime >= 60) {
      if (totalTime % 60 != 0) {
        var s = totalTime % 60;
        if (s < 10) {
          var m = (totalTime - s) / 60;
          if (m < 10) {
            totalTimeText.text = "0" + m + ":0" + s;
          } else {
            totalTimeText.text = "" + m + ":0" + s;
          }
        } else {
          var m = (totalTime - s) / 60;
          if (m < 10) {
            totalTimeText.text = "0" + m + ":" + s;
          } else {
            totalTimeText.text = "" + m + ":" + s;
          }
        }
      } else {
        var m = totalTime / 60;
        if (m < 10) {
          totalTimeText.text = "0" + m + ":00";
        } else {
          totalTimeText.text = "" + m + ":00";
        }
      }
    }
  }
}
//停止计时
function stopTime() {
  clearInterval(gameTimer);
}

// 时间转文字
function timeToText(time) {
  var text = "";
  if (time < 10) {
    text = "00:0" + time;
  } else if (time >= 10 && time <= 59) {
    text = "00:" + time;
  } else if (time >= 60) {
    if (time % 60 != 0) {
      var s = time % 60;
      if (s < 10) {
        var m = (time - s) / 60;
        if (m < 10) {
          text = "0" + m + ":0" + s;
        } else {
          text = "" + m + ":0" + s;
        }
      } else {
        var m = (time - s) / 60;
        if (m < 10) {
          text = "0" + m + ":" + s;
        } else {
          text = "" + m + ":" + s;
        }
      }
    } else {
      var m = time / 60;
      if (m < 10) {
        text = "0" + m + ":00";
      } else {
        text = "" + m + ":00";
      }
    }
  }
  return text;
}