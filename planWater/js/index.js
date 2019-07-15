function game_planWater() {
  game_current.removeAllChildren();
  totalTime = gameAllConfig.totalTime;
  createjs.Ticker.removeEventListener("tick", main_ticker);
  createjs.Ticker.addEventListener("tick", ticker);

  //加载背景以及显示计时、分数或内容的背景
  var totalTimeText = timeToText(totalTime);
  show.gameBg("bg");
  show.gameTime("", stage.canvas.width / 2, 20, totalTimeText, 40, "#3c3c3c")

  levelContainer = new createjs.Container();
  game_current.addChild(levelContainer);
  //播放loading动画
  handleLoadSprite(spritesheets["load-door"], planWater_init);
}

function planWater_init() {
  levelContainer.removeAllChildren();
  var gameData = gameAllConfig["content"][current_level];
  var buckets = gameData["buckets"];
  var basins = gameData["basins"];
  var pipes = gameData["pipes"];
  var flows = gameData["flows"];
  var answers = gameData["answers"];
  var orders = gameData["orders"];
  var allBucketCons = [];
  var allAnswerCons = [];
  var allNumbers = [];

  var huhuCon = new createjs.Container();
  var huhu = new createjs.Bitmap(images["huhu"]);
  huhuCon.x = gameData["huhu"].x;
  huhuCon.y = gameData["huhu"].y;
  huhuCon.addChild(huhu);
  levelContainer.addChild(huhuCon);

  var start = new createjs.Bitmap(images["o"]);
  start.regX = start.image.width / 2;
  start.regY = start.image.height / 2;
  start.x = 910;
  start.y = 605;
  start.alpha = 0;

  endBtn = new createjs.Bitmap(images["x"]);
  endBtn.regX = endBtn.image.width / 2;
  endBtn.regY = endBtn.image.height / 2;
  endBtn.x = 910;
  endBtn.y = 605;
  levelContainer.addChild(start, endBtn);

  // 固定的桶
  for (var i = 0; i < buckets.length; i++) {
    var bucket = buckets[i];
    var bucketCon = new createjs.Container();
    var bucketWater = new createjs.Bitmap(images["water"]);
    if (bucket.isFull) {
      bucketWater.y = 0;
    } else {
      if (bucket.isDown) {
        bucketWater.y = 124;
      } else {
        bucketWater.y = 100;
      }
    }
    bucketWater.name = "bucketWater";
    bucketCon.addChild(bucketWater);
    var bucketShape = createBucket("bucket" + (i + 1), bucket.isDown, bucket.isFull);
    bucketShape.x = bucketShape.getBounds().width / 2;
    bucketShape.y = bucketShape.getBounds().height / 2;
    bucketShape.regX = bucketShape.getBounds().width / 2;
    bucketShape.regY = bucketShape.getBounds().height / 2;
    bucketCon.addChild(bucketShape);
    var bucketMask = createBucket("bucketMask" + (i + 1), bucket.isDown, bucket.isFull);
    bucketMask.regX = bucketShape.getBounds().width / 2;
    bucketMask.regY = bucketShape.getBounds().height / 2;
    bucketMask.x = bucket.x;
    bucketMask.y = bucket.y;
    if (bucket.scaleX) {
      bucketMask.scaleX = bucketShape.scaleX = bucket.scaleX;
    }
    bucketCon.mask = bucketMask;
    if (!bucket.isAnswer) {
      var bucketText = new createjs.Text(bucket.label, "60px katong", "#0a5161");
      bucketText.regX = bucketText.getBounds().width / 2;
      bucketText.regY = bucketText.getBounds().height / 2;
      if (bucket.isDown) {
        bucketText.x = bucketShape.getBounds().width / 2;
        bucketText.y = bucketShape.getBounds().height / 2 - 20;
      } else {
        if (bucket.scaleX > 0) {
          bucketText.x = bucketShape.getBounds().width / 2 - 8;
          bucketText.y = bucketShape.getBounds().height / 2 - 12;
        } else {
          bucketText.x = bucketShape.getBounds().width / 2 + 10;
          bucketText.y = bucketShape.getBounds().height / 2 - 15;
        }
      }
      bucketCon.addChild(bucketText);
    }
    bucketCon.regX = bucketShape.getBounds().width / 2;
    bucketCon.regY = bucketShape.getBounds().height / 2;
    bucketCon.name = bucket.id;
    bucketCon.x = bucket.x;
    bucketCon.y = bucket.y;
    bucketCon.isFull = bucket.isFull;
    bucketCon.isAnswer = bucket.isAnswer;
    levelContainer.addChild(bucketCon);
    allBucketCons.push(bucketCon);
    if (bucket.isAnswer) {
      allAnswerCons.push(bucketCon);
    }
  }
  // 固定的管
  for (var i = 0; i < pipes.length; i++) {
    var pipe = pipes[i];
    var pipeBmp = new createjs.Bitmap(images[pipe.type]);
    pipeBmp.regX = pipeBmp.image.width;
    pipeBmp.regY = pipeBmp.image.height;
    pipeBmp.x = pipe.x;
    pipeBmp.y = pipe.y;
    levelContainer.addChild(pipeBmp);
  }
  // 槽
  for (var i = 0; i < basins.length; i++) {
    var basin = basins[i];
    var basinCon = new createjs.Container();
    var basinShape = createBasin("basin" + (i + 1));
    basinCon.addChild(basinShape);
    var basinMask = createBasin("basinMask" + (i + 1));
    var basinWater = new createjs.Bitmap(images["water"]);
    if (basin.isFull) {
      basinWater.y = 0;
    } else {
      basinWater.y = 105;
    }
    basinWater.name = "basinWater";
    basinCon.addChild(basinWater);

    if (!basin.isAnswer) {
      var basinText = new createjs.Text(basin.label, "60px katong", "#0a5161");
      basinText.regX = basinText.getBounds().width / 2;
      basinText.regY = basinText.getBounds().height / 2;
      basinText.x = basinShape.getBounds().width / 2;
      basinText.y = basinShape.getBounds().height / 2;
      basinCon.addChild(basinText);
    }
    basinMask.regX = basinShape.getBounds().width / 2;
    basinMask.regY = basinShape.getBounds().height / 2;
    basinMask.x = basin.x;
    basinMask.y = basin.y;
    basinCon.regX = basinShape.getBounds().width / 2;
    basinCon.regY = basinShape.getBounds().height / 2;
    basinCon.x = basin.x;
    basinCon.y = basin.y;
    basinCon.name = basin.id;
    basinCon.mask = basinMask;
    basinCon.label = basin.label;
    levelContainer.addChild(basinCon);
    if (basin.isAnswer) {
      allAnswerCons.push(basinCon);
    }
  }
  // 水流动画
  for (var i = 0; i < flows.length; i++) {
    var flow = flows[i];
    var flowCon = new createjs.Container();
    var flowMask = new createjs.Shape();
    flowMask.graphics.drawRect(0, 0, 50, flow.height);
    flowMask.x = flowCon.x = flow.x;
    flowMask.y = flowCon.y = flow.y;
    var flowSprite = new createjs.Sprite(spritesheets[flow.type], "play");
    flowSprite.scaleX = flow.scaleX;
    if (flow.scaleX < 0) {
      flowSprite.x = 38;
    } else {
      flowSprite.x = 12;
    }
    flowSprite.y = -40;
    flowSprite.name = flow.id;
    flowSprite.gotoAndStop();
    flowCon.name = flow.id + "Con";
    flowCon.mask = flowMask;
    flowCon.addChild(flowSprite);
    levelContainer.addChild(flowCon);
  }
  // 答案数字
  for (var i = 0; i < answers.length; i++) {
    var answer = answers[i];
    var answerCon = new createjs.Container();
    var answerShape = new createjs.Shape();
    answerShape.graphics.beginFill("rgba(255, 255, 255, 0.01)").drawRect(0, 0, 80, 70);
    answerShape.regX = 40;
    answerShape.regY = 35;
    answerShape.x = 40;
    answerShape.y = 35;
    answerCon.addChild(answerShape);
    var answerText = new createjs.Text(answer.label, "60px katong", "#0a5161");
    answerText.regX = answerText.getBounds().width / 2;
    answerText.regY = answerText.getBounds().height / 2;
    answerText.x = 42;
    answerText.y = 30;
    answerCon.addChild(answerText);
    answerCon.regX = 40;
    answerCon.regY = 35;
    answerCon.x = 905;
    answerCon.y = answer.y;
    answerCon.srcX = answerCon.x;
    answerCon.srcY = answerCon.y;
    answerCon.label = answer.label;
    levelContainer.addChild(answerCon);
    allNumbers.push(answerCon);
  }

  var timer = setInterval(function () {
    if (loadEffectSound) {
      clearInterval(timer);
      playEffectSound("broken", function () {
        handleCountDown(function () {
          beginGame();
          setTimeDate();
          startTime("down", function () {
            if (totalTime <= 0) {
              clearInterval(dateTimer);
              stopTime();
              current_level = 0;
              recordScore(15 * current_level + 5);
              toServerData(gameScores);
            }
          });
        });
        playEffectSound("countDown");
      });
    }
  }, 1000);

  function beginGame() {
    for (var i = 0; i < allNumbers.length; i++) {
      var allNumber = allNumbers[i];
      addEvent(allNumber);
    }
    endBtn.on("click", function () {
      endBtn.alpha = 0;
      start.alpha = 1;
      stopTime();
      // 开水阀
      for (var i = 0; i < allBucketCons.length; i++) {
        var obj = allBucketCons[i];
        var water = null;
        if (!obj.isAnswer && obj.isFull) {
          water = obj.getChildByName("bucketWater");
          createjs.Tween.get(water)
            .to({
              y: 140
            }, 1800)
        }
      }
      for (var i = 0; i < orders.length; i++) {
        var order = orders[i];
        executeOrder(order);
      }
      function executeOrder(order) {
        switch (order.type) {
          case "bucket":
            setTimeout(function () {
              var target = levelContainer.getChildByName(order.id);
              var upWater = target.getChildByName("bucketWater");
              createjs.Tween.get(upWater)
                .to({
                  y: 0
                }, 1500)
                .call(function () {
                  var that = this;
                  createjs.Tween.get(that)
                    .to({
                      y: 40
                    }, 500)
                })
            }, order.time)
            break;
          case "basin":
            setTimeout(function () {
              var target = levelContainer.getChildByName(order.id);
              var basin = levelContainer.getChildByName(order.id);
              var basinUpWater = basin.getChildByName("basinWater");
              if (basin.result == "eq") {
                createjs.Tween.get(basinUpWater)
                  .to({
                    y: 0
                  }, order.upTime)
                  .call(function () {
                    var huhuDrink = new createjs.Sprite(spritesheets["huhu-drink"], "play");
                    huhuCon.removeAllChildren();
                    huhuCon.addChild(huhuDrink);
                    huhuDrink.on("animationend", function () {
                      huhuCon.removeAllChildren();
                      var huhuBling = new createjs.Sprite(spritesheets["huhu-bling"], "play");
                      huhuBling.x = 150;
                      huhuBling.scaleX = 1.2;
                      huhuBling.scaleY = 1.2;
                      var huhuHappy = new createjs.Bitmap(images["huhu-happy"]);
                      huhuCon.addChild(huhuBling, huhuHappy);
                      huhuBling.on("animationend", function () {
                        current_level++;
                        recordScore(15 * current_level + 5);
                        if (current_level == gameAllConfig["content"].length) {
                          toServerData(gameScores);
                          gameIsEnd = true;
                          current_level = 0;
                        } else {
                          setTimeout(function () {
                            planWater_init();
                          }, 1000)
                        }
                      });
                    });
                  })
              } else if (basin.result == "gt") {
                createjs.Tween.get(basinUpWater)
                  .to({
                    y: 30
                  }, order.upTime)
                  .call(function () {
                    var huhuAnxious = new createjs.Sprite(spritesheets["huhu-anxious"], "play");
                    huhuCon.removeAllChildren();
                    huhuCon.addChild(huhuAnxious);
                    huhuAnxious.on("animationend", function () {
                      recordScore(15 * current_level + 5);
                      toServerData(gameScores);
                      current_level = 0;
                    });
                  })
              } else {
                createjs.Tween.get(basinUpWater)
                  .to({
                    y: -10
                  }, order.upTime)
                  .call(function () {
                    var huhuSlip = new createjs.Sprite(spritesheets["huhu-slip"], "play");
                    huhuCon.removeAllChildren();
                    huhuCon.addChild(huhuSlip);
                    huhuSlip.on("animationend", function () {
                      recordScore(15 * current_level + 5);
                      toServerData(gameScores);
                      current_level = 0;
                    });
                  })
              }
            }, order.time)
            break;
          case "flow":
            setTimeout(function () {
              var target = levelContainer.getChildByName(order.id + "Con");
              var targetFlow = target.getChildByName(order.id);
              targetFlow.play();
            }, order.time)
            break;
        }
      }
    });
  }

  // 答案事件
  function addEvent(target) {
    target.on("mousedown", function (evt) {
      this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
    });
    target.on("pressmove", function (evt) {
      this.x = evt.stageX + this.offset.x;
      this.y = evt.stageY + this.offset.y;
      this.parent.setChildIndex(target, this.parent.children.length - 1);
    });
    target.on("pressup", function (evt) {
      var hit = false;
      var inObj = null;
      for (var j = 0; j < allNumbers.length; j++) {
        var obj = allNumbers[j];
        var pt = obj.globalToLocal(stage.mouseX, stage.mouseY);
        if (obj.hitTest(pt.x, pt.y)) {
          obj.x = obj.srcX;
          obj.y = obj.srcY;
        }
      }
      for (var j = 0; j < allAnswerCons.length; j++) {
        var obj = allAnswerCons[j];
        var pt = obj.globalToLocal(stage.mouseX, stage.mouseY);
        if (obj.hitTest(pt.x, pt.y)) {
          hit = true;
          inObj = obj;
          if (target.label > obj.label) {
            obj.result = "gt";
          } else if (target.label == obj.label) {
            obj.result = "eq";
          } else if (target.label < obj.label) {
            obj.result = "lt";
          }
        }
      }
      if (hit) {
        this.x = inObj.x;
        this.y = inObj.y;
      } else {
        this.x = this.srcX;
        this.y = this.srcY;
      }
    });
  }

  // 画桶
  function createBucket(name, isDown, isFull) {
    var shape = new createjs.Shape();
    shape.name = name;
    if (!isFull) {
      shape.graphics.beginFill("rgba(255, 255, 255, 0.01)");
    }
    if (isDown) {
      shape.setBounds(0, 0, 140, 124);
      shape.graphics
        .moveTo(0, 0)
        .setStrokeStyle(4)
        .beginStroke("#4eb8ce")
        .arc(130, 86, 10, 0, Math.PI / 2)
        .lineTo(92, 96)
        .arc(88, 96, 4, 0, Math.PI / 2)
        .lineTo(86, 100)
        .lineTo(86, 108)
        .arc(86, 112, 4, Math.PI * 3 / 2, Math.PI * 2)
        .lineTo(90, 114)
        .arc(86, 118, 4, 0, Math.PI / 2)
        .lineTo(56, 122)
        .arc(56, 118, 4, Math.PI / 2, Math.PI)
        .lineTo(52, 118)
        .arc(56, 114, 4, Math.PI, Math.PI * 3 / 2)
        .lineTo(56, 108)
        .lineTo(56, 102)
        .arc(54, 98, 4, Math.PI / 2, Math.PI)
        .lineTo(12, 98)
        .arc(12, 88, 10, Math.PI / 2, Math.PI)
        .lineTo(2, 10)
        .arc(12, 10, 10, Math.PI, Math.PI * 3 / 2)
        .lineTo(12, 0)
        .arc(130, 10, 10, Math.PI * 3 / 2, Math.PI * 2)
        .lineTo(140, 86)
    } else {
      shape.setBounds(0, 0, 164, 100);
      shape.graphics
        .moveTo(0, 0)
        .setStrokeStyle(4)
        .beginStroke("#4eb8ce")
        .arc(130, 10, 10, Math.PI * 3 / 2, Math.PI * 2)
        .arc(140, 14, 4, Math.PI * 3 / 2, Math.PI * 2)
        .lineTo(144, 16)
        .lineTo(152, 16)
        .arc(156, 16, 4, Math.PI, Math.PI * 3 / 2)
        .lineTo(164, 12)
        .arc(164, 16, 4, Math.PI * 3 / 2, Math.PI * 2)
        .lineTo(168, 38)
        .arc(164, 42, 4, 0, Math.PI / 2)
        .lineTo(156, 46)
        .arc(156, 42, 4, Math.PI / 2, Math.PI)
        .lineTo(144, 42)
        .arc(140, 44, 4, 0, Math.PI / 2)
        .lineTo(140, 90)
        .arc(130, 86, 10, 0, Math.PI / 2)
        .lineTo(10, 96)
        .arc(10, 86, 10, Math.PI / 2, Math.PI)
        .lineTo(0, 10)
        .arc(10, 10, 10, Math.PI, Math.PI * 3 / 2)
    }
    return shape;
  }

  // 画槽
  function createBasin(id) {
    var shape = new createjs.Shape();
    shape.name = id;
    shape.setBounds(0, 0, 137, 107);
    shape.graphics
      .moveTo(0, 0)
      .setStrokeStyle(4)
      .beginFill("#E6FBFF")
      .beginStroke("#4eb8ce")
      .lineTo(0, 0)
      .lineTo(20, 105)
      .lineTo(115, 105)
      .lineTo(135, 0)
      .lineTo(0, 0)
    return shape;
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
  endTime.y = -145;
  templateContainer.addChild(endTime);

  createjs.Tween.get(templateContainer)
    .to({y: canvas.height / 2}, 3000, createjs.Ease.bounceOut)
}
