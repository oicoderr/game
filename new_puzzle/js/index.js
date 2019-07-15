var nowPass = 1,levels = 1,passIntegral = 10, isReplay = false;
function game_puzzle(){
  game_init();
}

function game_init(){
  var nowPass = 1,levels = 1;
  createjs.Ticker.removeEventListener("tick", main_ticker);
  createjs.Ticker.addEventListener("tick", main_ticker);
  game_current.removeAllChildren();
  switch(nowPass){
    case 1:
      var gameBg = {
        "id":"puzzle_bg",
        "x":46,
        "y":136
      };
      var bgs = ["img_1","img_2","img_3","img_4","img_5","img_6","img_7"];
      var drags = ["drag_1","drag_2","drag_3","drag_4","drag_5","drag_6","drag_7"];
      var bgsPosi = [
        {"x":124,"y":236},
        {"x":258,"y":236},
        {"x":419,"y":236},
        {"x":101,"y":374},
        {"x":235,"y":374},
        {"x":419,"y":419},
        {"x":261,"y":512}
      ];
      Puzzle.init(bgs,drags,bgsPosi,gameBg);
    break;
    case 2:
    break; 
    case 3:
    break;
  }
  //返回值success是否过关false/true
  createjs.Ticker.addEventListener("tick", testing);
  function testing() {
    if(success){
      success = false;
      createjs.Ticker.removeEventListener("tick", testing);
      var timer = setTimeout(function(){
        nowPass++;
        playEffectSound("correct_2");
        stopTime();//停止计时
        if(nowPass > levels){
          createjs.Ticker.removeEventListener("tick", testing);
          createMask();//创建mask
          recordScore(passIntegral);//积分赋值
          toServerData(gameScores);//传积分
          stopPositiveTiming();//停止给服务器时间计时
          stopTime();//停止计时
          return;
        }
        handleLoadSprite("load-door",function(){//开门动画
          gameReplay();
          createjs.Ticker.addEventListener("tick", testing);
        });   
      },1000)
    }
  }
  game_current.addChild(fixedBtnCon);//添加游戏元素及按钮 templateContainer
  show.gameTime('timeBg',510,42,510,42,'00 : 00',44,'rgba(0,0,0,.8)');//初始化倒计时显示时间
  totalTime = gameAllConfig.time; //重置倒计时,初始化时间

  //是否按下重玩
  switch(isReplay){
    case true:  //按下
      handleLoadSprite("load-door",function(){
        stopTime();//停止计时

        var timer = setTimeout(function(){
          startTime("up");
        },2500)
      })
    return;
  }
  //入场动画播放完成执行动画倒数！
  loadAnimation.on("animationend",function(){
    handleCountDown();//时间倒计时动画
  });
}

//倒计时动画
function handleCountDown(callback){
  var container = new createjs.Container();
  game_current.addChild(container);
  var blank = new createjs.Bitmap(images["load-target"]);
  blank.scaleX = canvas.width / blank.image.width;
  blank.scaleY = canvas.height / blank.image.height;
  blank.on("click", function(evt){
    evt.stopPropagation();
  })
  container.addChild(blank);
  var countDown = new createjs.Sprite(spritesheets["number"],"play");
  countDown.regX = countDown.getBounds().width / 2;
  countDown.regY = countDown.getBounds().height / 2;
  countDown.x = canvas.width / 2;
  countDown.y = canvas.height / 3;
  var clockDial = new createjs.Sprite(spritesheets["circle"],"play");
  clockDial.regX = clockDial.getBounds().width / 2;
  clockDial.regY = clockDial.getBounds().height / 2;
  clockDial.x = canvas.width / 2;
  clockDial.y = canvas.height / 3;
  container.addChild(clockDial,countDown);
  blank.on("click",function(evt){
    evt.stopPropagation();
  })
  countDown.addEventListener("animationend",function(e){ //入场倒计时结束
    setTimeData(); //服务器正计时开始
    startTime('up');//前台显示正计时
    game_current.removeChild(container);
  })  
}

//完成结束 -》结算奖励
function resultAward(){
  var showTime = new createjs.Text("00 : "+totalTime+"", "44px katong", "#3c3c3c");
  showTime.x = 460;showTime.y = -76;
  //结算页面背景
  var resultBg = new createjs.Bitmap(images["result"]);
  resultBg.x = 512;resultBg.y = 0;
  resultBg.regX = resultBg.getBounds().width / 2;
  resultBg.regY = resultBg.getBounds().height / 2;
  createjs.Tween.get(templateContainer, {loop: false})
    .to({y:canvas.height / 2},2000,createjs.Ease.bounceOut)
  templateContainer.addChild(resultBg,showTime); //添加至prelaod中结算页面Container
}