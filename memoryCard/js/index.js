var fixedArray = [], integralNum = 0, randNum = 3, randN = [], Tcorr = null, Ferror = null,
changeArray = [],isReplay = false;//integralNum分数， randNum随机个数, changeArray变化图片, Tcorr正确, Ferror错误

function game_memoryCard(){
  memoryCard_init();
/*
  //页面长时间未操作
  (function($){
    funObj = {
      timeUserFun:'timeUserFun',
    }
    $[funObj.timeUserFun] = function(time){
      var time = time || 2;
      var userTime = time*60;
      var objTime = {
        init:0,
        time:function(){
          objTime.init += 1;
          if(objTime.init == userTime){
            console.log( userTime+"s未操作" ) // 用户到达未操作事件 做一些处理
            // longTime();
            console.log(objTime.init)
          }
        },
        eventFun:function(){
          clearInterval(testUser);
          objTime.init = 0;
          
          testUser = setInterval(objTime.time,1000);
        }
      }
      var testUser = setInterval(objTime.time,1000);
      var body = document.querySelector('html');
      body.addEventListener("mousedown",objTime.eventFun)
      body.addEventListener("mousemove",objTime.eventFun);
      body.addEventListener("click",objTime.eventFun);
    }
  })(window)
  //直接调用 参数代表分钟数,可以有一位小数;
  timeUserFun(0.2);
*/
}
function memoryCard_init(){
  createjs.Ticker.removeEventListener("tick", main_ticker);
  createjs.Ticker.addEventListener("tick", main_ticker);
  var container = new createjs.Container();
  container.x = 0;container.y = 0;
  fixedArray = []; //清空游戏固定元素
  changeArray = []; //清空游戏变化元素
  randN = [];//清空img.index
  createEle(container, "leftBg", "leftBg", gameAllConfig.gameEle[0].leftBg.x, gameAllConfig.gameEle[0].leftBg.y);
  createEle(container, "rightBg", "rightBg", gameAllConfig.gameEle[0].rightBg.x, gameAllConfig.gameEle[0].rightBg.y);
  createEle(container, "noSameBtn", "noSameBtn", gameAllConfig.gameEle[0].noSameBtn.x, gameAllConfig.gameEle[0].noSameBtn.y);
  createEle(container, "sameBtn", "sameBtn", gameAllConfig.gameEle[0].sameBtn.x, gameAllConfig.gameEle[0].sameBtn.y);
  createEle(container, "yes", "correct", gameAllConfig.gameEle[0].correctBtn.x, gameAllConfig.gameEle[0].correctBtn.y);
  createEle(container, "no", "error", gameAllConfig.gameEle[0].errorBtn.x, gameAllConfig.gameEle[0].errorBtn.y);
  hideEle(fixedArray[4], fixedArray[5]);// 默认隐藏按钮:no/yes
  game_current.removeAllChildren();//移除所有元素
  game_current.addChild(container,fixedBtnCon);//添加游戏元素及按钮
  //初始化倒计时显示时间
  show.gameTime('timeBg', 510,28, 546,28, '00:50', 42, 'rgba(0,0,0,.8)'); 
  //初始化显示积分
  show.gameScore(null,460,28,null,null,integralNum,42,'rgba(60,60,60,1)');//,0
  totalTime = gameAllConfig.time; //重置倒计时,初始化时间
  game_current.setChildIndex( container, game_current.children.lenght-2 );//游戏元素永远在fixedBtn下面
  //创建随机图片
  createChangeEle(container, "pattern_1", "pattern_1", gameAllConfig.gameEle[1].changeEle.x, gameAllConfig.gameEle[1].changeEle.y);
  createChangeEle(container, "pattern_2", "pattern_2", gameAllConfig.gameEle[1].changeEle.x, gameAllConfig.gameEle[1].changeEle.y);
  createChangeEle(container, "pattern_3", "pattern_3", gameAllConfig.gameEle[1].changeEle.x, gameAllConfig.gameEle[1].changeEle.y);
  createChangeEle(container, "pattern_4", "pattern_4", gameAllConfig.gameEle[1].changeEle.x, gameAllConfig.gameEle[1].changeEle.y);
  //执行随机数变化变量图片
  createRandom();
  //是否按下重玩
  switch(isReplay){
    case true:  //按下
      // console.log("按下“重玩”");
      handleLoadSprite("load-door",function(){
        stopTime();//停止计时
        var timer = setTimeout(function(){
          startTime("down",timeEnd);
          pokeCard();//执行翻牌动画
          createRandom();//ranN存index
        },2500)
      })
    return;
  }
  //入场动画播放完成执行动画倒数！
  loadAnimation.on("animationend",function(){
    handleCountDown();//时间倒计时动画
    // console.log("入场动画播放完成");
  });
}
//创建固定元素
function createEle(container, obj, srcId, x, y){
  obj = new createjs.Bitmap(images[srcId]);
  obj.x = x;
  obj.y = y;
  obj.regX = obj.getBounds().width/2;
  obj.regY = obj.getBounds().height/2;
  fixedArray.push(obj);
  container.addChild(obj);
}
//创建变量元素
function createChangeEle(container, obj, srcId, x, y){
  obj = new createjs.Bitmap(images[srcId]);
  obj.x = x;
  obj.y = y;
  obj.regX = obj.getBounds().width/2;
  obj.regY = obj.getBounds().height/2;
  changeArray.push(obj);
  container.addChild(obj);
}
//生成随机数
function createRandom(){
  // 当前随机数,保存当前随机数变量
  var randIndex = Math.round(Math.random()*randNum);
  randN.push(randIndex);
  switch(randIndex){
    case 0:
      showEle(changeArray[0]);
      hideEle(changeArray[1], changeArray[2], changeArray[3]);
    break;
    case 1:
      showEle(changeArray[1]);
      hideEle(changeArray[0], changeArray[2], changeArray[3]);
    break;
    case 2:
      showEle(changeArray[2]);
      hideEle(changeArray[0], changeArray[1], changeArray[3]);
    break;
    case 3:
      showEle(changeArray[3]);
      hideEle(changeArray[0], changeArray[1], changeArray[2]);
    break;
  }
  
  if( randN.length > 1 ){ //randN数组里面有index
    var last = randN.length-1, lastOne = randN.length-2;
    if( randN[last] == randN[lastOne] ){
      return Tcorr = true;
    }else{
      return Ferror = false;
    }
  }
}

//翻牌动画
function pokeCard(){
  var pokeCon = new createjs.Container();
  game_current.addChild(pokeCon);
  var poke = new createjs.Sprite(spritesheets["poke"],"play");
  poke.regX = poke.getBounds().width / 2;
  poke.regY = poke.getBounds().height / 2;
  poke.x = 510;poke.y = 340;
  pokeCon.addChild(poke);
  poke.addEventListener("animationend",function(){
    pokeCon.removeAllChildren();
    //no/yes按钮; 翻牌动画结束按钮可点击
    fixedArray[2].addEventListener("click",noSame,false);
    fixedArray[3].addEventListener("click",same,false);
  },false)
}

//倒计时动画
function handleCountDown(){
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
  });
  countDown.addEventListener("animationend",function(e){ //入场倒计时动画结束
    setTimeData(); //正计时
    startTime('down',timeEnd);//倒计时
    var timer = setTimeout(function(){
      pokeCard();
      createRandom();
      // console.log(randN)
    },800);
    game_current.removeChild(container);
  });  
}
//未完成游戏结束-》结算页面
function timeEnd(){
  if(totalTimeText.text == "00:00"){
    stopTime(); //停止倒计时
    createMask();//创建mask
    randN = []; //清空图片index
    stopPositiveTiming();//停止正计时
    recordScore(integralNum);//传积分
    toServerData(gameScores);
  }
}

//结算奖励
function resultAward(){
  //结算页面背景
  var resultBg = new createjs.Bitmap(images["result"]);
  resultBg.x = 509;resultBg.y = 0;
  resultBg.regX = resultBg.getBounds().width / 2;
  resultBg.regY = resultBg.getBounds().height / 2;

  createjs.Tween.get(templateContainer, {loop: false})
    .to({y:canvas.height / 2},2000,createjs.Ease.bounceOut)
    .call(function(){
      integralNum = 0; //积分清空
      fixedArray = []; //页面元素清空
      changeArray = [];//动态变化图片清空
    })
  var integralText = new createjs.Text(integralNum,"60px katong", "rgba(60,60,60,1)"); //积分显示
  integralText.textBaseline = "middle"; integralText.textAlign = "center";
  integralText.x = 508;integralText.y = -160;
  templateContainer.addChild(resultBg,integralText); //添加至prelaod中结算页面Container
}

// 显示
function showEle(){
  if( arguments.length >= 1){
    for( var i = 0; i < arguments.length; i++ ){
      arguments[i].visible = true;
    }
  }else{
    console.log("没传参数");
  }
}
// 隐藏
function hideEle(){
  if( arguments.length >= 1){
    for( var i = 0; i < arguments.length; i++ ){
      arguments[i].visible = false;
    }
  }else{
    console.log("没传参数");
  }
}

//不同按钮
function noSame(){
  if(Ferror == false){
    showEle(fixedArray[4]);
    playEffectSound("tuodui");
    integralNum++;
    scoreText.text = integralNum;
    var timer = setTimeout(function(){
      hideEle(fixedArray[4]);
      pokeCard();
      createRandom();
    },500)
  }else{
    playEffectSound("tuocuo");
    showEle(fixedArray[5]);
    var timer = setTimeout(function(){
      hideEle(fixedArray[5]);
      pokeCard();
      createRandom();
    },500)
  }
  Tcorr = null;
  Ferror = null;
  //触发按钮事件后取消其事件
  fixedArray[2].removeEventListener("click",noSame,false);
  fixedArray[3].removeEventListener("click",same,false);
}
//相同按钮
function same(){
  if(Tcorr == true){
    playEffectSound("tuodui");
    showEle(fixedArray[4]);
    integralNum++;
    scoreText.text = integralNum;
    var timer = setTimeout(function(){
      hideEle(fixedArray[4]);
      pokeCard();
      createRandom();
    },500)
  }else{
    playEffectSound("tuocuo");
    showEle(fixedArray[5]);
    var timer = setTimeout(function(){
      hideEle(fixedArray[5]);
      pokeCard();
      createRandom();
    },500)
  }
  Tcorr = null;
  Ferror = null;
  //触发按钮事件后取消其事件
  fixedArray[2].removeEventListener("click",noSame,false);
  fixedArray[3].removeEventListener("click",same,false);
}
//长时间未操作 动画跳出
function longTime(){
  var animationHuhu = new createjs.Sprite(spritesheets["huhu-right"], "play");
  animationHuhu.regX = animationHuhu.getBounds().width/2;
  animationHuhu.regY = animationHuhu.getBounds().height/2;
  animationHuhu.x = canvas.width / 2;
  animationHuhu.y = canvas.height / 2;
}