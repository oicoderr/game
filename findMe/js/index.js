function game_findMe() {
  game_current.removeAllChildren();
  current_level = 0;
  totalTime = gameAllConfig.totalTime;
  createjs.Ticker.removeEventListener("tick", main_ticker);
  createjs.Ticker.addEventListener("tick", ticker);
  homeBtn.visible = true;
  sndBtn.visible = true;
  replayBtn.visible = true;
  //加载背景以及显示计时、分数或内容的背景
  var totalTimeText = timeToText(totalTime);
  show.gameBg("bg");
  show.gameTime("", stage.canvas.width / 2, 35, totalTimeText, 40, "#3c3c3c")

  levelContainer = new createjs.Container();
  game_current.addChild(levelContainer);
  //播放loading动画
  handleLoadSprite(spritesheets["load-door"], findMe_init);
}

function findMe_init() {
  levelContainer.removeAllChildren();
  current_answerIndex = 0;
  var elements = gameAllConfig["content"][current_level]["elements"];
  var answers = gameAllConfig["content"][current_level]["answerLabels"];
  var grade = gameAllConfig["content"][current_level]["grade"];
  var exchangeCount = gameAllConfig["content"][current_level]["exchangeCount"];
  switch (grade) {
    case "easy":
      gradeTime = 650;
      break;
    case "normal":
      gradeTime = 500;
      break;
    case "difficult":
      gradeTime = 350;
      break;
  }
  var sprites = [], boxs = [], allBoxs = [];
  for (var i = 0; i < elements["length"]; i++) {
    var element = elements[i];
    var sprite = new createjs.Sprite(spritesheets[element.id + "-right"], "play");
    sprite.gotoAndStop();
    sprite.regX = sprite.getBounds().width / 2;
    sprite.regY = sprite.getBounds().height / 2;
    sprite.name = element.id;
    sprite.x = element.x;
    sprite.y = element.y;
    sprites.push(sprite);
    levelContainer.addChild(sprite);
  }
  var timer = setInterval(function () {
    if (loadEffectSound) {
      clearInterval(timer);
      playEffectSound("broken", function () {
        handleCountDown(function () {
          beginExchange();
          setTimeDate();
        });
        playEffectSound("countDown");
      });
    }
  }, 1000);

  function beginExchange() {
    //   木箱
    for (var i = 0; i < elements.length; i++) {
      var elementContainer = elements[i];
      var bmp = new createjs.Bitmap(images["box"]);
      bmp.regX = bmp.image.width / 2;
      bmp.regY = bmp.image.height / 2;
      bmp.name = elementContainer.id;
      bmp.label = elementContainer.label;
      bmp.x = elementContainer.x;
      bmp.soureY = elementContainer.y;
      bmp.y = 390;
      allBoxs.push(bmp);
      levelContainer.addChild(bmp);
      fallDown(bmp);
    }
    setTimeout(function () {
      for (var i = 0; i < sprites.length; i++) {
        sprites[i].visible = false;
      }
      boxs = allBoxs.slice();
      exchange(boxs, function () {
        startTime("down", function () {
          if (totalTime <= 0) {
            clearInterval(dateTimer);
            stopTime();
            recordScore(15 * current_level + 5);
            toServerData(gameScores);
          }
        });
        exchangeCB();
      });
    }, 650)
    function exchangeCB() {
      if (exchangeCount-- > 1) {
        boxs = allBoxs.slice();
        exchange(boxs, exchangeCB);
      } else {
        for (var i = 0; i < allBoxs.length; i++) {
          var box = allBoxs[i];
          box.on("click", function () {
            createjs.Tween.get(this)
              .to({
                y: -this.image.height
              }, 100)
            var boxDownSprite = levelContainer.getChildByName(this.name);
            boxDownSprite.x = this.x;
            boxDownSprite.visible = true;
            if (this.label == answers[current_answerIndex]) {
              // console.log("答对一个");
              playEffectSound("snake_eat");
              current_answerIndex++;
              boxDownSprite.play();
            } else {
              // console.log("答错了");
              removeBoxEvent();
              levelContainer.removeChild(boxDownSprite);
              boxDownSprite = new createjs.Sprite(spritesheets[this.name + "-wrong"]);
              boxDownSprite.gotoAndPlay();
              boxDownSprite.regX = boxDownSprite.getBounds().width / 2;
              boxDownSprite.regY = boxDownSprite.getBounds().height / 2;
              boxDownSprite.x = this.x;
              boxDownSprite.y = this.soureY;
              levelContainer.addChild(boxDownSprite);
              playEffectSound("snake_hit");
              stopTime();
              boxDownSprite.addEventListener("animationend", function () {
                boxDownSprite.stop();
              });
              setTimeout(function () {
                recordScore(15 * current_level + 5);
                toServerData(gameScores);
                current_level = 0;
              }, 1500);
            }
            if (current_answerIndex == answers.length) {
              stopTime();
              removeBoxEvent();
              playEffectSound("gameover", function () {
                current_level++;
                recordScore(15 * current_level + 5);
                if (current_level == gameAllConfig.content.length) {
                  toServerData(gameScores);
                  current_level = 0;
                  gameIsEnd = true;
                } else {
                  setTimeout(function () {
                    findMe_init();
                  }, 1000);
                }
              });
            }
          });
        }
      }
    }
  }

  function removeBoxEvent() {
    for (var i = 0; i < allBoxs.length; i++) {
      allBoxs[i].removeAllEventListeners();
    }
  }
}

function ticker() {
  stage.update();
}
//倒计时
function handleCountDown(callback) {
  var container = new createjs.Container();
  game_current.addChild(container);
  var countDown_circle = new createjs.Sprite(spritesheets["circle"], "play");
  countDown_circle.regX = countDown_circle.getBounds().width / 2;
  countDown_circle.regY = countDown_circle.getBounds().height / 2;
  countDown_circle.x = canvas.width / 2;
  countDown_circle.y = 200;
  container.addChild(countDown_circle);
  var countDown_number = new createjs.Sprite(spritesheets["number"], "play");
  countDown_number.regX = countDown_number.getBounds().width / 2;
  countDown_number.regY = countDown_number.getBounds().height / 2;
  countDown_number.x = canvas.width / 2;
  countDown_number.y = 200;
  container.addChild(countDown_number);
  countDown_number.addEventListener("animationend", function () {
    game_current.removeChild(container);
    if (callback && typeof callback == "function") {
      callback();
    }
  })
}

function fallDown(bm, callback) {
  var target = {};
  var start = {};
  start.x = bm.x;
  start.y = -bm.image.height;
  target.x = bm.x;
  target.y = bm.y;
  target.obj = bm;
  bm.x = start.x;
  bm.y = start.y;
  createjs.Tween.get(target.obj).to({y: target.y}, 600, createjs.Ease.linear).call(
    function () {
      if (callback) {
        callback();
      }
    }
  )
}

function exchange(arr, callback) {
  var random1 = randomInt(0, arr.length - 1);
  var bmp1 = arr[random1];
  arr.splice(random1, 1);
  var random2 = randomInt(0, arr.length - 1);
  var bmp2 = arr[random2];
  arr.splice(random2, 1);
  var bmp1End = false;
  var bmp2End = false;
  var target1 = {
      x: bmp1.x,
      y: bmp1.y
    },
    target2 = {
      x: bmp2.x,
      y: bmp2.y
    }
  createjs.Tween.get(bmp1)
    .to({
      guide: {
        path: [target1.x, target1.y, target1.x + (target2.x - target1.x) / 2, target2.y - 50, target2.x, target2.y],
      }
    }, gradeTime, createjs.Tween.linear).call(function () {
    bmp1End = true;
    if (bmp1End && bmp2End) {
      callback();
    }
  });
  createjs.Tween.get(bmp2)
    .to({
      guide: {
        path: [target2.x, target2.y, target2.x + (target1.x - target2.x) / 2, target2.y + 50, target1.x, target1.y],
      }
    }, gradeTime, createjs.Tween.linear)
    .call(function () {
      bmp2End = true;
      if (bmp1End && bmp2End) {
        callback();
      }
    });
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gameOverAnimation() {
  templateContainer.x = canvas.width / 2;
  templateContainer.y = -(canvas.height / 2);
  var overBg = new createjs.Bitmap(images["result"]);
  overBg.regX = overBg.getBounds().width / 2;
  overBg.regY = overBg.getBounds().height / 2;
  overBg.x = 0;
  overBg.y = 0;
  templateContainer.addChild(overBg);

  var endTime = new createjs.Text("总用时: " + (gameAllConfig.totalTime - totalTime) + " s", "24px katong", "#3c3c3c");
  endTime.regX = endTime.getBounds().width / 2;
  endTime.regY = endTime.getBounds().height / 2;
  endTime.x = 0;
  endTime.y = -45;
  templateContainer.addChild(endTime);

  createjs.Tween.get(templateContainer)
    .to({y: canvas.height / 2}, 3000, createjs.Ease.bounceOut)
}