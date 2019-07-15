var dragArray = [],fixedArray = [], isReplay = false, isStop = false,answerKey = null,integral = 0;
var answerCon = new createjs.Container(),problemCon = new createjs.Container(),animationRun = new createjs.Container();
function game_puzzle(){
  puzzle_init();
}

function puzzle_init(){
  createjs.Ticker.removeEventListener("tick", main_ticker);
  createjs.Ticker.addEventListener("tick", main_ticker);
  game_current.removeAllChildren();//移除所有元素
  game_current.addChild(fixedBtnCon);//添加游戏元素及按钮
  integral = 0;//积分归0
  show.gameTime('timeBg',510,34,510,40,'01 : 01',36,'rgba(255,255,255,.8)'); //初始化倒计时显示时间
  totalTime = gameAllConfig.time; //重置倒计时,初始化时间
  //是否按下重玩
  switch(isReplay){
    case true:  //按下
      handleLoadSprite("load-door",function(){
        stopTime();//停止计时
        var timer = setTimeout(function(){
          startTime("down",timeEnd);
          randomPeople();
        },2500)
      })
    return;
  }
  //入场动画播放完成执行动画倒数！
  loadAnimation.on("animationend",function(){
    handleCountDown();//时间倒计时动画
  });
}


//倒计时动画 +randomPeople()
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
  countDown.addEventListener("animationend",function(e){ //入场倒计时动画结束
    setTimeData(); //正计时
    startTime('down',timeEnd);//倒计时
    game_current.removeChild(container);
    randomPeople();
  })  
}
//未完成游戏结束-》结算页面
function timeEnd(){
  if(totalTimeText.text == "00 : 00"){
    stopTime(); //停止计时
    createMask();//创建mask
    recordScore(integral);//积分赋值
    toServerData(gameScores);//传积分
    animationRun.removeAllChildren();
    problemCon.removeAllChildren();
    answerCon.removeAllChildren();
    game_current.removeChild(animationRun,problemCon,answerCon,problemCon);
    
  }
}
//随机动画,随机方向 + run()
function randomPeople(){//随机0-1选4次放入indexArry
  var peopleArry = ["dodoRun","huhuJump"];
  var indexArry = [];
  var list = [];
  var result_0Arry = [],result_1Arry = [];
  //0 ->dodo; 1 ->huhu
  for( let i = 0; i < 4; i++ ){
    var randIndex = Math.floor(Math.random()*2);
    indexArry.push(randIndex);
  }
  //console.log(indexArry);//循环0 - 1; 0是dodo，1是huhu
  function searchKeys(needle, haystack){
    var result = [];
    for (i in haystack){
      if (haystack[i] == needle){
        result.push(i);
      }
    }
    return result;
  }
  // var animationRun = new createjs.Container();
  game_current.addChild(animationRun);
  var find_dodo = searchKeys(0, indexArry);
  var find_huhu = searchKeys(1, indexArry);
  var result_dodo = JSON.parse('[' + String( find_dodo ) + ']');//查看dodo有几个=find_dodo.length,位置：indexArry[find_dodo[x]]
  var result_huhu = JSON.parse('[' + String( find_huhu ) + ']');//查看huhu有几个=find_huhu.length,
  //console.log(result_dodo);//1 2 3 道跑
  //console.log(result_huhu);//0     道跑
  var dodo_len = result_dodo.length,huhu_len = result_huhu.length;
  if( dodo_len > 0 ){
    for( let i = 0; i < dodo_len; i++ ){
      var doRun = "dodoRun_"+i;
      doRun = new createjs.Sprite(spritesheets["dodoRun"],"play");
      result_0Arry.push(doRun);
      animationRun.addChild(result_0Arry[i]);//有result_dodo.length个 -》dodoRun对象
      if( dodo_len ){//对象index = ？
        //console.log(result_dodo[i]);//0 2
        if( result_dodo[i] == 0 ){//如果index = 0，就把第一个对象放第一道
          result_0Arry[i].x = (stage.canvas.width)/2;result_0Arry[i].y = -6;
          animationRun.setChildIndex(result_0Arry[i],0)
          run(result_0Arry[i],stage.canvas.width);
        }else if( result_dodo[i] == 1 ){//如果index = 1，就把第二个对象放第二道
          result_0Arry[i].scaleX = -1;
          result_0Arry[i].x = (stage.canvas.width)/2;result_0Arry[i].y = 110;
          animationRun.setChildIndex(result_0Arry[i],1)
          run(result_0Arry[i],0);
        }else if( result_dodo[i] == 2 ){
          result_0Arry[i].x = (stage.canvas.width)/2;result_0Arry[i].y = 254;
          animationRun.setChildIndex(result_0Arry[i],2)
          run(result_0Arry[i],stage.canvas.width);
        }else if( result_dodo[i] == 3 ){
          result_0Arry[i].scaleX = -1;
          result_0Arry[i].x = (stage.canvas.width)/2;result_0Arry[i].y = 410;
          animationRun.setChildIndex(result_0Arry[i],3)
          run(result_0Arry[i],0);
        }
      }
    }
  }
  if( huhu_len > 0 ){
    for( let i = 0; i < huhu_len; i++ ){
      var huJump = "huhuJump"+i;
      huJump = new createjs.Sprite(spritesheets["huhuJump"],"play");
      result_1Arry.push(huJump);
      animationRun.addChild(result_1Arry[i]);//有result_huhu.length个 -》huhuRun对象
      if( huhu_len ){//对象index = ？
        //console.log(result_huhu[i]);//0 2
        if( result_huhu[i] == 0 ){//如果index = 0，就把第一个对象放第一道.从右往左跑
          result_1Arry[i].x = 280;result_1Arry[i].y = -70;
          animationRun.setChildIndex(result_1Arry[i],0,result_dodo,result_huhu);
          run(result_1Arry[i],0);
        }else if( result_huhu[i] == 1 ){//如果index = 1，就把第二个对象放第二道，从左往右跑
          result_1Arry[i].scaleX = -1;
          result_1Arry[i].x = 800;result_1Arry[i].y = 50;//800
          animationRun.setChildIndex(result_1Arry[i],1)
          run(result_1Arry[i],stage.canvas.width+260);
        }else if( result_huhu[i] == 2 ){
          result_1Arry[i].x = 280;result_1Arry[i].y = 192;
          animationRun.setChildIndex(result_1Arry[i],2)
          run(result_1Arry[i],0);
        }else if( result_huhu[i] == 3 ){
          result_1Arry[i].scaleX = -1;
          result_1Arry[i].x = 800;result_1Arry[i].y = 350;
          animationRun.setChildIndex(result_1Arry[i],3)
          run(result_1Arry[i],stage.canvas.width+260);
        }
      }
    }
  }
  // 3s提示问题，显示可选择答案 + answer + problem
  if(totalTime< 5){
    var timer = setTimeout(function(){
      answer(result_dodo,result_huhu);
      problemCon.removeAllChildren();
      answerCon.removeAllChildren();
      game_current.removeChild(animationRun,problemCon,answerCon,problemCon);
    },3000)
  }else{
    var timer = setTimeout(function(){
      problem();
      answer(result_dodo,result_huhu);
    },3000)
  }
  
  // console.log(animationRun)
}
//动画跑起来
function run(obj,n){
  createjs.Ticker.addEventListener("tick",tick);
  var speed = 5;
  function tick(){
    if(!createjs.Ticker.getPaused()){
      if(n <= 0){
        obj.x-=3.1*speed;
        stage.update(); //更新舞台
        // speed-=.1;
        (obj.x <= -260) && (obj.x = -260,speed = null,obj.gotoAndStop(),
          createjs.Ticker.removeEventListener("tick",tick));
      }
      if( n!=0 ){
        obj.x+=3*speed;
        stage.update(); //更新舞台
        // speed+=.1;
        (obj.x >= n) && (obj.x = n,speed = null,obj.gotoAndStop(),
          createjs.Ticker.removeEventListener("tick",tick));
      }
    }
  }
}
//确定答案
function answer(dodo,huhu){
  var dodoLeftn = 0,dodoRightn = 0,huhuLeftn = 0,huhuRightn = 0;
  var no = new createjs.Bitmap(images["no"]),yes =  new createjs.Bitmap(images["yes"]);
  no.regX = no.getBounds().width/2;no.regY = no.getBounds().height/2;
  yes.regX = yes.getBounds().width/2;yes.regY = yes.getBounds().height/2;
  no.x = yes.x = 514;no.y = yes.y = 350;
  //默认隐藏对/错
  hideEle(no,yes);
  if(dodo.length > 0){
    for(x in dodo){
      if(dodo[x]%2 == 0){
        dodoRightn++;
      }else{
        dodoLeftn++;
      }
    }
  }
  if(huhu.length > 0){
    for(x in huhu){
      if(huhu[x]%2 == 0){
        huhuLeftn++;
      }
      if(huhu[x]%2 != 0){
        huhuRightn++;
      }
    }
  }
  // console.log("huhu左:"+huhuLeftn);
  // console.log("huhu右:"+huhuRightn);
  // console.log("dodo左:"+dodoLeftn);
  // console.log("dodo右:"+dodoRightn);
  //同时抛出问题
  problem(dodoLeftn,dodoRightn,huhuLeftn,huhuRightn);
  // var answerCon = new createjs.Container();
  var answerArry = [];
  answerCon.x = 0, answerCon.y = 0;
  game_current.addChild(answerCon)
  var one = new createjs.Bitmap(images["answerOne"]),two = new createjs.Bitmap(images["answerTwo"]), 
  three = new createjs.Bitmap(images["answerThree"]),four = new createjs.Bitmap(images["answerFour"]);
  answerArry.push(one,two,three,four);
  for( let i = 0;i < answerArry.length; i++ ){
    answerArry[i].on("click",function(){
      if( i+1 == answerKey ){
        integral+=2;
        playEffectSound("tuodui");
        showEle(yes);
        var timer = setTimeout(function(){
          problemCon.removeAllChildren();
          answerCon.removeAllChildren();
          game_current.removeChild(animationRun,problemCon,answerCon,problemCon);
          randomPeople();
        },1000)
        
      }else{
        playEffectSound("tuocuo");
        showEle(no);
        var timer = setTimeout(function(){
          problemCon.removeAllChildren();
          answerCon.removeAllChildren();
          game_current.removeChild(animationRun,problemCon,answerCon,problemCon);
          randomPeople();
        },1000)
      }
    })
  }
  // console.log(integral)
  answerCon.addChild(one,two,three,four,no,yes);
  var oneWidth = one.getBounds().width,difference = 35;
  var offset = (stage.canvas.width - oneWidth*4 - difference*3)/2;
  one.x = offset;one.y = 360;
  two.x = offset + oneWidth + difference;two.y = 360;
  three.x = offset + oneWidth*2 + difference*2;three.y = 360;
  four.x = offset + oneWidth*3 + difference*3;four.y = 360;
}
//问题出现 
function problem(doL,doR,huL,huR){
  // var problemCon = new createjs.Container();
  problemCon.x = 0;problemCon.y = 0;
  game_current.addChild(problemCon);
  //都是谁
  var bitmaps = [];
  if(doL>0){
    bitmaps.push("dodoLeft");
  }
  if(doR>0){
    bitmaps.push("dodoRight");
  }
  if(huL>0){
    bitmaps.push("huhuLeft");
  }
  if(huR>0){
    bitmaps.push("huhuRight");
  }
  // console.log(bitmaps)
  // console.log(index);
  // console.log(bitmaps.length)
  var index = Math.floor(Math.random()*bitmaps.length); 
  if( bitmaps[index] == "dodoLeft" ){
    answerKey = doL;
  }
  if( bitmaps[index] == "dodoRight" ){
    answerKey = doR;
  }
  if( bitmaps[index] == "huhuLeft" ){
    answerKey = huL;
  }
  if( bitmaps[index] == "huhuRight" ){
    answerKey = huR;
  }
  bitmaps[index] = new createjs.Bitmap(images[ bitmaps[index] ]);
  //问号
  var questionMask = new createjs.Bitmap(images["question"]);
  problemCon.addChild(bitmaps[index],questionMask);
  //位置  获取bitmaps[index].getBounds().width获取不到,报错
  var peopleWidth = 150;
  var maskWidth = questionMask.getBounds().width;
  var offset = (stage.canvas.width - (peopleWidth + maskWidth))/2;
  bitmaps[index].x = offset;bitmaps[index].y = 160;
  questionMask.x = offset + peopleWidth;questionMask.y = 220;
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
      integral = 0;
      fixedArray = []; //页面元素清空
      changeArray = [];//动态变化图片清空
      animationRun.removeAllChildren();
      problemCon.removeAllChildren();
      answerCon.removeAllChildren();
      game_current.removeChild(animationRun,problemCon,answerCon,problemCon);
      playEffectSound("correct_3");
    })
  var integralText = new createjs.Text(integral,"60px katong", "rgba(60,60,60,1)"); //积分显示
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
