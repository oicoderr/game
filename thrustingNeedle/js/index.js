function game_thrustingNeedle() {
  game_current.removeAllChildren();
  current_level = 0;
  totalTime = gameAllConfig.totalTime;
  createjs.Ticker.removeEventListener("tick", main_ticker);
  createjs.Ticker.addEventListener("tick", ticker);

  homeBtn.visible = true;
  sndBtn.visible = true;
  replayBtn.visible = true;

  var totalTimeText = timeToText(totalTime);
  show.gameBg("bg");
  show.gameTime("", stage.canvas.width / 2, 25, totalTimeText, 40, "#3c3c3c");
  levelContainer = new createjs.Container();
  game_current.addChild(levelContainer);
  //播放loading动画
  handleLoadSprite(spritesheets["load-door"], thrustingNeedle_init);
}
function thrustingNeedle_init() {
  levelContainer.removeAllChildren();
  current_answerIndex = 0;
  stopTime();
  var gameData = gameAllConfig["content"][current_level];
  var direction = gameData.direction;
  var isClockwise = direction == "clockwise" ? true : false;
  var angle = isClockwise ? 360 : -360;
  var ballCon = new createjs.Container();
  var texts = [];   // 文字集合
  var needlePos = []; // 坐标集合
  var needleNumbers = gameData.numbers;
  var answers = gameData["answers"];
  var answerIndexs = gameData["answerIndex"];
  var answerNeedles = []; // 所有答案针集合
  var judgeAnswers = []; // 判断答案集合
  var grade = gameData.grade; // 难度
  var speed = null;
  var canClick = true;
  for (var i = 0; i < gameData.answers.length; i++) {
    var answerText = gameData.answers[i];
    var answerNeedle = createNeedleCon(200, 370 + i * 100, 0, answerText, true);
    levelContainer.addChild(answerNeedle);
    answerNeedles.push(answerNeedle);
  }
  switch (grade) {
    case "easy":
      speed = 10000;
      break;
    case "normal":
      speed = 8000;
      break;
    case "difficult":
      speed = 6500;
      break;
  }
  beginGame();
  addStageMask();
  var timer = setInterval(function () {
    if (loadEffectSound) {
      clearInterval(timer);
      playEffectSound("broken", function () {
        startTime("down", function () {
          if (totalTime <= 0) {
            clearInterval(dateTimer);
            endGame();
            stopTime();
            recordScore(15 * current_level + 5);
            toServerData(gameScores);
          }
        });
        removeStageMask();
        setTimeDate();
        createjs.Tween.get(ballCon, {loop: true})
          .to({
            rotation: angle
          }, speed)
        rotateText();
      });
    }
  }, 1000);

  function beginGame() {
    var ball = new createjs.Bitmap(images["ball"]);
    ball.regX = ball.image.width / 2;
    ball.regY = ball.image.height / 2;
    ball.x = ball.image.width / 2;
    ball.y = ball.image.height / 2;
    ballCon.rotation = 0;
    ballCon.regX = ball.image.width / 2;
    ballCon.regY = ball.image.height / 2;
    ballCon.x = 700;
    ballCon.y = 370;
    levelContainer.addChild(ballCon);
    getNeedleConPos(needleNumbers.length);

    for (var i = 0; i < needleNumbers.length; i++) {
      var flag = true;
      var needleCon = createNeedleCon(needlePos[i].x, needlePos[i].y, needlePos[i].rotation, needleNumbers[i]);
      for (var j = 0; j < answerIndexs.length; j++) {
        if (i == answerIndexs[j]) {
          flag = false;
          continue;
        }
      }
      if (flag) {
        ballCon.addChild(needleCon);
        judgeAnswers.push({x: needlePos[i].x, y: needlePos[i].y, rotation: needlePos[i].rotation});
      }
    }
    for (var i = 0; i < texts.length; i++) {
      var textObj = texts[i];
      textObj.target.rotation = -textObj.rotation;
    }
    ballCon.addChild(ball);
  }

  function createNeedleCon(x, y, rotation, text, isAnswer) {
    var needleCon = new createjs.Container();
    var needle = new createjs.Bitmap(images["needle"]);
    var text = new createjs.Text(text, "40px Arial", "#ff9000");
    text.regX = text.getBounds().width / 2;
    text.regY = text.getBounds().height / 2;
    text.x = 28;
    text.y = 28;
    needleCon.regX = needle.image.width / 2;
    needleCon.regY = needle.image.height / 2;
    needleCon.x = x;
    needleCon.y = y;
    needleCon.rotation = rotation;
    needleCon.number = text;
    needleCon.addChild(needle, text);
    if (!isAnswer) {
      texts.push({target: text, rotation: rotation});
    }
    return needleCon;
  }

  function getNeedleConPos(length) {
    // 圆点坐标：(x0,y0) 球
    // 半径：r 138
    // 角度：a 360 / length * i
    // 则圆上任一点为：（calX,calY）
    var calX, calY;
    for (var i = 0; i < length; i++) {
      calX = 138 - 145 * Math.cos(360 / length * i * 3.14 / 180);
      calY = 138 - 145 * Math.sin(360 / length * i * 3.14 / 180);
      needlePos.push({x: calX, y: calY, rotation: 360 / length * i});
    }
  }

  function rotateText() {
    for (var i = 0; i < texts.length; i++) {
      var textObj = texts[i];
      createjs.Tween.get(textObj.target, {loop: true})
        .to({
          rotation: -angle - textObj.rotation
        }, speed)
    }
  }
  // 点击做个一次性处理
  // 每根针间距角度为15
  levelContainer.removeAllEventListeners("click");
  levelContainer.on("click", stageClickEvent);

  function stageClickEvent() {
    if (!canClick) return;
    canClick = false;
    var current_answerNeedle = answerNeedles[current_answerIndex];
    var next_answerNeedle = answerNeedles[current_answerIndex + 1];
    var current_answerNeedleIndex = answerIndexs[current_answerIndex];
    var isHit = false;
    createjs.Tween.get(current_answerNeedle)
      .to({
        x: 550
      }, 200)
      .call(function () {
        createjs.Tween.get(current_answerNeedle.number, {loop: true})
          .to({
            rotation: -angle
          }, speed)
        var nowRotation = ballCon.rotation;
        var calX = 138 - 145 * Math.cos(-ballCon.rotation * 3.14 / 180);
        var calY = 138 - 145 * Math.sin(-ballCon.rotation * 3.14 / 180);
        current_answerNeedle.rotation = -ballCon.rotation;
        current_answerNeedle.x = calX;
        current_answerNeedle.y = calY;
        ballCon.addChildAt(current_answerNeedle, ballCon.children.length - 1);
        // 判断在正确答案中间 与 碰撞
        var prevIndex = current_answerNeedleIndex - 1 < 0 ? judgeAnswers.length - 1 : current_answerNeedleIndex - 1,
          nextIndex = current_answerNeedleIndex > judgeAnswers.length - 1 ? 0 : current_answerNeedleIndex,
          prevNeedle = judgeAnswers[prevIndex],
          nextNeedle = judgeAnswers[nextIndex],
          nextAngle = nextNeedle.rotation == 0 ? 360 : nextNeedle.rotation,
          prevAngle = prevNeedle.rotation;
        if (isClockwise) {
          nowRotation = 360 - nowRotation;
        } else {
          nowRotation = Math.abs(nowRotation);
        }
        if (Math.abs(nowRotation - nextAngle) < 15 || Math.abs(nowRotation - prevAngle) < 15) {
          isHit = true;
        }
        if (nowRotation < nextAngle && nowRotation > prevAngle && !isHit) {
          judgeAnswers.splice(current_answerNeedleIndex, 0, {x: calX, y: calY, rotation: nowRotation});
          // console.log(true);
          addStageMask();
          if (current_answerIndex == answers.length - 1) {
            // console.log('过关')
            current_level++;
            stopTime();
            recordScore(15 * current_level + 5);
            if (current_level == gameAllConfig["content"]["length"]) {
              // 移除文字与球旋转
              endGame();
              current_level = 0;
              gameIsEnd = true;
              toServerData(gameScores);
            } else {
              setTimeout(function () {
                thrustingNeedle_init();
              }, 1000)
            }
          } else {
            createjs.Tween.get(next_answerNeedle)
              .to({
                y: next_answerNeedle.y - 100
              }, 600)
              .call(function () {
                removeStageMask();
                canClick = true;
              })
            if (answerNeedles[current_answerIndex + 2]) {
              createjs.Tween.get(answerNeedles[current_answerIndex + 2])
                .to({
                  y: answerNeedles[current_answerIndex + 2].y - 100
                }, 600)
            }
            current_answerIndex++;
          }
        } else {
          // console.log(false)
          endGame();
          stopTime();
          recordScore(15 * current_level + 5);
          toServerData(gameScores);
        }
      })
  }

  function endGame() {
    removeStageMask();
    for (var i = 0; i < texts.length; i++) {
      var textObj = texts[i];
      createjs.Tween.removeTweens(textObj.target);
    }
    for (var i = 0; i < answerNeedles.length; i++) {
      createjs.Tween.removeTweens(answerNeedles[i].number);
    }
    createjs.Tween.removeTweens(ballCon);
  }
}
function addStageMask() {
  removeStageMask();
  var mask = new createjs.Shape();
  mask.alpha = 0.01;
  mask.name = "stageMask";
  mask.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
  mask.on("click", function (evt) {
    evt.stopPropagation();
  });
  stage.addChild(mask);
}

function removeStageMask() {
  var mask = stage.getChildByName("stageMask");
  if (mask) {
    stage.removeChild(mask);
  }
}

function ticker() {
  stage.update();
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

  var endTime = new createjs.Text("总用时: " + (gameAllConfig.totalTime - totalTime) + " s", "36px katong", "#3c3c3c");
  endTime.regX = endTime.getBounds().width / 2;
  endTime.regY = endTime.getBounds().height / 2;
  endTime.x = 0;
  endTime.y = -140;
  templateContainer.addChild(endTime);

  createjs.Tween.get(templateContainer)
    .to({y: canvas.height / 2}, 3000, createjs.Ease.bounceOut)
}
