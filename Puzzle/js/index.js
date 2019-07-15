var dragArray = [],fixedArray = [],passNum = 1,passIntegral = 10, isReplay = false;

function game_puzzle(){
  puzzle_init();
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

function puzzle_init(){
  fixedArray = [];//清空游戏固定元素
  dragArray = [],//清空游戏拖拽元素
  createjs.Ticker.removeEventListener("tick", main_ticker);
  createjs.Ticker.addEventListener("tick", main_ticker);
  var container = new createjs.Container();
  container.x = 0;container.y = 0;//container.regX = canvas.width/2;container.regY = canvas.height/2;
  switch(passNum){ //关卡
    case 1:
      createObj( container, "fixed0_1", "bg1_1", 0, 1 );//背景图
      createObj( container, "fixed0_2", "bg1_2", 0, 2 );
      createObj( container, "fixed0_3", "bg1_3", 0, 3 );
      createObj( container, "drag0_1", "drag1_1", 0, 1 );//推拽元素
      createObj( container, "drag0_2", "drag1_2", 0, 2 );
      createObj( container, "drag0_3", "drag1_3", 0, 3 );
    break;
    case 2:
      createObj( container, "fixed1_1", "bg2_1", 1, 1 );
      createObj( container, "fixed1_2", "bg2_2", 1, 2 );
      createObj( container, "fixed1_3", "bg2_3", 1, 3 );
      createObj( container, "drag1_1", "drag2_1", 1, 1 );
      createObj( container, "drag1_2", "drag2_2", 1, 2 );
      createObj( container, "drag1_3", "drag2_3", 1, 3 );
    break;
    case 3:
      createObj( container, "fixed2_1", "bg3_1", 2, 1 );
      createObj( container, "fixed2_2", "bg3_2", 2, 2 );
      createObj( container, "fixed2_3", "bg3_3", 2, 3 );
      createObj( container, "drag2_1", "drag3_1", 2, 1 );
      createObj( container, "drag2_2", "drag3_2", 2, 2 );
      createObj( container, "drag2_3", "drag3_3", 2, 3 );
    break;
  }

  game_current.removeAllChildren();//移除所有元素
  game_current.addChild(container,fixedBtnCon);//添加游戏元素及按钮
  show.gameTime('timeBg',510,42,510,42,'00 : 50',44,'rgba(0,0,0,.8)'); //初始化倒计时显示时间
  totalTime = gameAllConfig.time; //重置倒计时,初始化时间
  game_current.setChildIndex( container, game_current.children.lenght-2 );//游戏元素永远在fixedBtn下面
  //是否按下重玩
  switch(isReplay){
    case true:  //按下
      handleLoadSprite("load-door",function(){
        stopTime();//停止计时
        var timer = setTimeout(function(){
          startTime("down",timeEnd);
        },2500)
      })
    return;
  }
  //入场动画播放完成执行动画倒数！
  loadAnimation.on("animationend",function(){
    handleCountDown();//时间倒计时动画
  });
}

function drag( container, objs, bgImg ){//1:container是objs父级; 2:objs推拽对象 3:推拽到目的地对象
  var arrayN = [];
  var nTest = 0;
  for( let i = 0; i < objs.length; i++ ){
    objs[i].index = i;
    objs[i].on("mousedown", function (evt) {
      evt.stopPropagation();
      this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
      container.setChildIndex(this, this.parent.children.length - 1); 
    });  

    objs[i].on("pressmove", function (evt) {
      evt.stopPropagation();
      this.x = evt.stageX + this.offset.x;
      this.y = evt.stageY + this.offset.y;
    });

    objs[i].on("pressup", function (evt) {
      evt.stopPropagation();
      for(let j = 0; j < bgImg.length; j++ ){
        var dest = bgImg[this.index];
        var pt = dest.globalToLocal(stage.mouseX, stage.mouseY);
        if (dest.hitTest(pt.x, pt.y)) {
          playEffectSound("tuodui"); 
          this.removeAllEventListeners();
          this.x = dest.x;
          this.y = dest.y;
          // 将推拽正确的this.index值存入数组，并且数组去重，留下最终this.index值
          arrayN.push(this.index);
          function arr(arr) { 
            var result = []
            for(let i = 0; i < arr.length; i++){
              if(result.indexOf(arr[i]) == -1){
                result.push(arr[i])
              }
            }
            if( result.length == 3 ){ //如果result.length == 推拽正确的次数，提示：你太棒了  
              nTest++;
              if(nTest == 3){ //会执行3次,nTest变量限制
                stopTime(); //停止计时
                var timer = setTimeout(function(){
                  passNum++;//下一关
                  playEffectSound("correct_2"); 
                  // console.log(passNum)
                  if(passNum > 3){ //如果超过三关
                    isReplay = true;
                    passNum = 3;//如果超过三关停留在第三关
                    playEffectSound("correct_3"); 
                    createMask();//创建mask
                    recordScore(passIntegral);//积分赋值
                    toServerData(gameScores); //传积分
                    stopPositiveTiming();//停止正计时
                    // console.log(passNum);
                    return;
                  }     
                  handleLoadSprite("load-door",function(){//开门动画
                    gameReplay(); //游戏重新开始
                   // startTime('down',timeEnd);//倒计时开始
                  }); 
                },1000)
              }
            }
          }      
          arr(arrayN); //调用数组去重
        }else{
          playEffectSound("tuocuo"); 
        }
      }
    });
  }
}

function createObj( container, obj, srcId, level, bitNum ){ //1.元素父级 2.创建元素 3.bitmap.Id 4.level:关卡 5: bitNum: 第几张图
  if( obj.indexOf("fixed") != -1 ){ //背景图
    obj = new createjs.Bitmap(images[srcId]);
    switch(level){
      case 0: //第一关
        switch(bitNum){
          case 1:
            obj.x = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".y");
          break;
          case 2:
            obj.x = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".y");
          break;
          case 3:
            obj.x = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".y");
          break;
        }
      break;
      case 1://第二关
        switch(bitNum){
          case 1:
            obj.x = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".y");
          break;
          case 2:
            obj.x = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".y");
          break;
          case 3:
            obj.x = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".y");
          break;
        }
      break;
      case 2://第三关
        switch(bitNum){
          case 1:
            obj.x = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".y");
            // console.log(obj.x, obj.y)
          break;
          case 2:
            obj.x = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".y");
          break;
          case 3:
            obj.x = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.fixedPosition["+level+"]"+"."+"fixed"+level+"_"+bitNum+".y");
          break;
        }
      break;
    }
    fixedArray.push(obj);
    // console.log(fixedArray)
    container.addChild(obj);
  }else if( obj.indexOf("drag") != -1 ){ //推拽元素
    obj = new createjs.Bitmap(images[srcId]);
    switch(level){
      case 0:
        switch(bitNum){
          case 1:
            obj.x = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".y");
            // console.log(obj.x, obj.y)
          break;
          case 2:
            obj.x = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".y");
          break;
          case 3:
            obj.x = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".y");
          break;
        }//第一关
      break;
      case 1:
        switch(bitNum){
          case 1:
            obj.x = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".y");
            // console.log(obj.x, obj.y)
          break;
          case 2:
            obj.x = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".y");
          break;
          case 3:
            obj.x = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".y");
          break;
        }//第二关
      break;
      case 2:
        switch(bitNum){
          case 1:
            obj.x = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".y");
            // console.log(obj.x, obj.y)
          break;
          case 2:
            obj.x = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".y");
          break;
          case 3:
            obj.x = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".x");
            obj.y = eval("gameAllConfig.dragPosition["+level+"]"+"."+"drag"+level+"_"+bitNum+".y");
          break;
        }//第三关
      break;
    }

    dragArray.push(obj);
    drag( container, dragArray, fixedArray )
    container.addChild(obj);
  }
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
    setTimeData(); //正计时
    startTime('down',timeEnd);//倒计时
    game_current.removeChild(container);
  })  
}
//未完成游戏结束-》结算页面
function timeEnd(){
  if(totalTimeText.text == "00 : 00"){
    stopTime(); //停止计时
    createMask();//创建mask
    recordScore(0);//积分赋值
    toServerData(gameScores);//传积分
  }
}

//结算奖励
function resultAward(){
  //结算页面背景
  var resultBg = new createjs.Bitmap(images["result"]);
  resultBg.x = 512;resultBg.y = 0;
  resultBg.regX = resultBg.getBounds().width / 2;
  resultBg.regY = resultBg.getBounds().height / 2;

  createjs.Tween.get(templateContainer, {loop: false})
    .to({y:canvas.height / 2},2000,createjs.Ease.bounceOut)
    .call(function(){
      fixedArray = []; //页面元素清空
      changeArray = [];//动态变化图片清空
    })
  templateContainer.addChild(resultBg); //添加至prelaod中结算页面Container
}
//长时间未操作 动画跳出
function longTime(){
  var animationHuhu = new createjs.Sprite(spritesheets["huhu-right"], "play");
  animationHuhu.regX = animationHuhu.getBounds().width/2;
  animationHuhu.regY = animationHuhu.getBounds().height/2;
  animationHuhu.x = canvas.width / 2;
  animationHuhu.y = canvas.height / 2;
}