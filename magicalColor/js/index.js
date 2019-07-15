function game_magicalColor() {
  game_current.removeAllChildren();
  createjs.Ticker.removeEventListener("tick", main_ticker);
  createjs.Ticker.addEventListener("tick", magicalColor_tick);

  // dodo主角
  dodo.container = new createjs.Container();
  dodo.run = new createjs.Sprite(spritesheets["run"], "play");
  dodo.stand = new createjs.Bitmap(images["stand"]);
  dodo.jump = new createjs.Bitmap(images["jump"]);

  /*// 左右按钮
   var leftBtn = new createjs.Bitmap(images["leftBtn"]);
   leftBtn.regX = leftBtn.image.width / 2;
   leftBtn.regY = leftBtn.image.height / 2;
   leftBtn.x = 80;
   leftBtn.y = 600;
   leftBtn.on("mousedown", function () {
   dodo.container.removeAllChildren();
   dodo.run = new createjs.Sprite(spritesheets["run"], "play");
   dodo.run.play();
   dodo.container.addChild(dodo.run);
   // move(dodo.container, true);
   isLeft = true;
   });
   leftBtn.on("pressup", function () {
   // clearInterval(dodo.timer);
   dodo.container.removeAllChildren();
   dodo.container.addChild(dodo.stand);
   isLeft = false;
   });
   game_current.addChild(leftBtn);

   var rightBtn = new createjs.Bitmap(images["rightBtn"]);
   rightBtn.regX = rightBtn.image.width / 2;
   rightBtn.regY = rightBtn.image.height / 2;
   rightBtn.x = 200;
   rightBtn.y = 600;
   rightBtn.on("mousedown", function () {
   dodo.container.removeAllChildren();
   dodo.run = new createjs.Sprite(spritesheets["run"], "play");
   dodo.run.play();
   dodo.container.addChild(dodo.run);
   // move(dodo.container, false);
   isRight = true;
   });
   rightBtn.on("pressup", function () {
   // clearInterval(dodo.timer);
   dodo.container.removeAllChildren();
   dodo.container.addChild(dodo.stand);
   isRight = false;
   });
   game_current.addChild(rightBtn);*/

  jumpBtn = new createjs.Bitmap(images["jumpBtn"]);
  jumpBtn.regX = jumpBtn.image.width / 2;
  jumpBtn.regY = jumpBtn.image.height / 2;
  jumpBtn.x = 950;
  jumpBtn.y = 600;
  jumpBtn.click = true;
  jumpBtn.on("mousedown", function () {
    if (!jumpBtn.click) return;
    jumpBtn.click = false;
    dodo.container.removeAllChildren();
    dodo.jump = new createjs.Bitmap(images["jump"]);
    dodo.container.addChild(dodo.jump);
    dodo.isJumping = true;
  });
  game_current.addChild(jumpBtn);

  levelContainer = new createjs.Container();
  levelContainer.on("mousedown", function (evt) {
    targetX = evt.stageX;
    startPos = {
      x: dodo.container.x,
      y: dodo.container.y
    }
    if (evt.stageX > dodo.container.x) {
      isRight = true;
      isLeft = false;
    } else {
      isLeft = true;
      isRight = false;
    }
    dodo.container.removeAllChildren();
    dodo.run = new createjs.Sprite(spritesheets["run"], "play");
    dodo.run.play();
    dodo.container.addChild(dodo.run);
  });
  levelContainer.on("pressup", function (evt) {
    isLeft = false;
    isRight = false;
    dodo.container.removeAllChildren();
    dodo.container.addChild(dodo.stand);
  });
  //播放loading动画
  // handleLoadSprite(spritesheets["load-door"], magicalColor_init);
  magicalColor_init();
}

function magicalColor_init() {
  levelContainer.removeAllChildren();
  var bgColor = gameLevels[current_level]["backgroundColor"];
  var s = drawDrawRect(0, 0, stage.canvas.width, stage.canvas.height, bgColor);
  s.name = "backgroundColor";
  levelContainer.addChild(s);

  game_current.addChildAt(levelContainer, 0);
  // 初始化变量
  isPassing = false;
  barriers = [];
  gameButtons = [];
  var startLabel = gameLevels[current_level]["startLabel"];

  var buttons = gameLevels[current_level]["buttons"];

  var lands = gameLevels[current_level]["lands"];

  var walls = gameLevels[current_level]["walls"];

  var dodoConfig = gameLevels[current_level]["dodo"];

  var starConfig = gameLevels[current_level]["star"];

  // 星星
  star = new createjs.Sprite(spritesheets["star"]);
  star.gotoAndStop();
  star.x = starConfig.x;
  star.y = starConfig.y;
  star.on("animationend", function () {
    star.gotoAndStop();
  });
  levelContainer.addChild(star);

  // 颜色按钮
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    var btn = null, btnDown = null;
    btnDown = new createjs.Bitmap(images[button["type"] + "Down"]);
    btn = new createjs.Bitmap(images[button["type"]]);
    btnDown.visible = false;
    btn.visible = true;
    if (button["label"] == startLabel) {
      btn.visible = false;
      btnDown.visible = true
    }
    btn.label = button["label"];
    btn.regX = btn.image.width / 2;
    btn.regY = btn.image.height / 2;
    btn.x = button["x"];
    btn.y = button["y"];
    btn.down = btnDown;
    btn.color = button["color"];
    btn.on("mousedown", function (evt) {
      evt.stopPropagation();
    });
    btn.on("pressup", function (evt) {
      evt.stopPropagation();
    });
    btn.on("click", function (evt) {
      evt.stopPropagation();
      var that = this;
      for (var i = 0; i < gameButtons.length; i++) {
        var btn = gameButtons[i];
        btn.visible = true;
        btn.down.visible = false;
      }
      this.visible = false;
      this.down.visible = true;

      var bgcolor = levelContainer.getChildByName("backgroundColor");
      levelContainer.removeChild(bgcolor);

      var s = drawDrawRect(0, 0, stage.canvas.width, stage.canvas.height, that.color);
      s.name = "backgroundColor";
      levelContainer.addChildAt(s, 0);

      for (var j = 0; j < barriers.length; j++) {
        var barrier = barriers[j];
        if (barrier.name == "land") continue;
        if (barrier.label == that.label) {
          barrier.visible = false;
        } else {
          barrier.visible = true;
        }
      }
    });
    btnDown.label = button["label"];
    btnDown.regX = btnDown.image.width / 2;
    btnDown.regY = btnDown.image.height / 2;
    btnDown.x = button["x"];
    btnDown.y = button["y"];
    btnDown.up = btn;
    btnDown.on("mousedown", function (evt) {
      evt.stopPropagation();
    });
    btnDown.on("pressup", function (evt) {
      evt.stopPropagation();
    });
    btnDown.on("click", function (evt) {
      evt.stopPropagation();
    });
    levelContainer.addChild(btn);
    levelContainer.addChild(btnDown);
    gameButtons.push(btn);
  }

  // 陆地
  for (var i = 0; i < lands.length; i++) {
    var land = lands[i];
    var landBmp = new createjs.Bitmap(images["land"]);
    landBmp.x = land.x;
    landBmp.y = land.y;
    landBmp.name = "land";
    landBmp.label = land.label;
    levelContainer.addChild(landBmp);
    if (land.isBarrier) {
      barriers.push(landBmp);
    }
  }

  // 墙壁 w 128 h 50 landscape 水平 portrait 垂直
  for (var i = 0; i < walls.length; i++) {
    var wall = walls[i];
    var w = null, h = null;
    if (wall.type == "portrait") {
      w = 50;
      h = 128;
    } else if (wall.type == "landscape") {
      w = 128;
      h = 50;
    }
    var wallBmp = drawDrawRect(wall.x, wall.y, w, h, wall.color);
    wallBmp.label = wall.label;
    wallBmp.type = wall.type;
    wallBmp.setBounds(wall.x, wall.y, w, h);
    if (wall.label == startLabel) {
      wallBmp.name = "green";
      wallBmp.visible = false;
    } else {
      wallBmp.name = "yellow";
      wallBmp.visible = true;
    }
    levelContainer.addChild(wallBmp);

    barriers.push(wallBmp);
  }

  // dodo
  dodo.container = new createjs.Container();
  dodo.stand = new createjs.Bitmap(images["stand"]);
  dodo.container.addChild(dodo.stand);

  dodo.container.scaleX = dodoConfig.scale;
  dodo.container.x = dodoConfig.x;
  dodo.container.y = dodoConfig.y;
  dodo.container.regX = dodo.container.getBounds().width / 2;
  dodo.container.regY = dodo.container.getBounds().height / 2;
  levelContainer.addChild(dodo.container);

}
var speed = {
  speedX: 15,
  speedY: 20
}
var jumpDis = 0, isLeft = false, isRight = false, targetX = null, startPos = {}, star = null, isPassing = false, isJumpTemp = false
function magicalColor_tick() {
  // 上升过程
  if (dodo.isJumping) {
    dodo.container.y -= speed.speedY;
    if (!isJumpTemp) {
      isJumpTemp = true;
      startPos.x = dodo.container.x;
      startPos.y = dodo.container.y;
    }
    if (dodo.container.scaleX == -1) {
      isLeft = false;
      isRight = true;
    } else {
      isLeft = true;
      isRight = false;
    }
    jumpDis -= speed.speedY;
    if (jumpDis <= -100) {
      jumpDis = -100;
      dodo.isJumping = false;
    }
  }
  // 下降过程 判断条件需要更改
  if (!dodo.isJumping && !jumpBtn.click) {
    dodo.container.y += speed.speedY;
    if (!isJumpTemp) {
      isJumpTemp = true;
      startPos.x = dodo.container.x;
      startPos.y = dodo.container.y;
    }
    if (dodo.container.scaleX == -1) {
      isLeft = false;
      isRight = true;
    } else {
      isLeft = true;
      isRight = false;
    }
    jumpDis += speed.speedY;
    if (jumpDis >= 0) {
      jumpDis = 0;
      dodo.container.removeAllChildren();
      dodo.container.addChild(dodo.stand);
      jumpBtn.click = true;
      isJumpTemp = false;
      isRight = false;
      isLeft = false;
    }
  }
  // 向左移动
  if (isLeft) {
    dodo.container.scaleX = 1;
    dodo.container.x -= speed.speedX;
    if (dodo.container.x <= dodo.container.getBounds().width / 2) {
      dodo.container.x = dodo.container.getBounds().width / 2;
    }
  }
  // 向右移动
  if (isRight) {
    dodo.container.scaleX = -1;
    dodo.container.x += speed.speedX;
    if (dodo.container.x + dodo.container.getBounds().width / 2 >= stage.canvas.width) {
      dodo.container.x = stage.canvas.width - dodo.container.getBounds().width / 2;
    }
  }
  // 判断是否走到手指处
  if (Math.abs(targetX - dodo.container.x) <= 15 && !dodo.isJumping && dodo.isJumping && jumpBtn.click) {
    dodo.container.x = targetX;
    isRight = false;
    isLeft = false;
    dodo.container.removeAllChildren();
    dodo.container.addChild(dodo.stand);
  }
  calcHit();
  // 检测过关
  if (dodo.container.x - star.x > 50 && !isPassing) {
    isPassing = true;
    current_level++;
    star.play();
    createjs.Tween.get(dodo.container)
      .to({
        alpha: 0
      }, 1000)
      .call(function () {
        magicalColor_init();
      });
  }
  stage.update();
}

function drawDrawRect(x, y, width, height, color) {
  var s = new createjs.Shape();
  var g = s.graphics;

  g.beginFill(color)
    .drawRect(0, 0, width, height);
  s.x = x;
  s.y = y;

  return s;
}
// FPS.startFPS(stage);

// 计算碰撞
function calcHit() {
  for (var i = 0; i < barriers.length; i++) {
    var barrier = barriers[i];
    if (!barrier.visible) continue;
    var w = barrier.getBounds().width;
    var h = barrier.getBounds().height;
    var barrierCenter = {
      x: barrier.x + w / 2,
      y: barrier.y + h / 2
    };
    /*if (startPos.x - barrier.x >= 0) {
     console.log('墙在左');
     console.log(barrier.getBounds())
     } else {
     console.log('墙在右');
     if (dodo.container.x + ) {

     }
     }*/
    // 两个中心点比较距离判断碰撞 鸟160 * 180
    var top = false, bottom = false, left = false, right = false, isUp = false;
    if (Math.abs(dodo.container.x - barrierCenter.x) < (w / 2 + 80) && Math.abs(dodo.container.y - barrierCenter.y) < (h / 2 + 90)) {
      if (dodo.container.x - barrierCenter.x > 0 && dodo.container.x - barrierCenter.x < (80 + w / 2 ) && Math.abs(dodo.container.y - barrierCenter.y) < (90 + h / 2)) {
        // console.log("鸟在右,墙在左")
        left = true;
        right = false;
      }
      if (dodo.container.x - barrierCenter.x < 0 && barrierCenter.x - dodo.container.x < (80 + w / 2) && Math.abs(dodo.container.y - barrierCenter.y) < (90 + h / 2)) {
        // console.log("鸟在左,墙在右");
        left = false;
        right = true;
      }
      if (dodo.container.y - barrierCenter.y > 0 && dodo.container.y - barrierCenter.y <= (90 + h / 2) && Math.abs(dodo.container.x - barrierCenter.x) < (80 + w / 2)) {
        /*that.crush.top = true;
         that.speed.y = 0;
         that.position.y += 1;*/
        // console.log("鸟在下,墙在上")
        top = false;
        bottom = true;
      }
      if (dodo.container.y - barrierCenter.y < 0 && dodo.container.y - barrierCenter.y < (90 + h / 2) && Math.abs(dodo.container.x - barrierCenter.x) < (80 + w / 2)) {
        /*that.crush.bottom = true;
         that.position.y = model.position.y - tImg.renderH;//修正碰撞之后物体的位置*/
        // 横幅时跳的成功了
        console.log(h)
        if (dodo.isJumping && h == 50 || (dodo.isJumping && jumpBtn.click) && h == 50) {
          dodo.container.y = barrierCenter.y - h / 2 - 90;
          isUp = true;
        }
        // console.log("鸟在上,墙在下")
        top = true;
        bottom = false;
      }
      // that.onCrush && that.onCrush(model);
    }
    if (left && top) {
      console.log("墙在左上")
      dodo.container.x = barrier.x + w + 80;
    } else if (left && bottom) {
      console.log("墙在左下")
    } else if (right && top) {
      console.log("墙在右上")
      if (isUp) {
        console.log( isUp )
      }
    } else if (right && bottom) {
      console.log("墙在右下")
    }
  }
}
