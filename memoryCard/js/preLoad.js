var stage ,game_current,canvas,fixedBtnCon;
var replayBtn = null,homeBtn = null,sndBtn,nosndBtn,replayBtn_click,homeBtn_click,timeBg;
var everyGameTime = {second: 0,minute: 0,hour: 0},
  gameScores = {},//往服务器传数据的对象
  reward = {};//奖励对象
var gameName = null,gameManifest,
  function_prepWorld = null,
  templateContainer = null;//最后奖励展示Container
//游戏计时
var gameTimer = null,//计时函数
  totalTime = null,//初始化计时时间
  totalTimeText = null,//计时文本
  positiveTiming = null, //后端接受正计时值
  scoreText = null;//分数文本

canvas = document.getElementById("gameCanvas");
stage = new  createjs.Stage(canvas);
stage.setBounds(0,0,canvas.width ,canvas.height);
game_current = new createjs.Container();
stage.addChild(game_current);

gameName = gameAllConfig.name;
if(gameAllConfig.time){
  totalTime = gameAllConfig.time;
}

var allSounds = {
  sndUrl:"sounds/",
  sndBgId:"soundBg",
  sndBgSrc:gameAllConfig.sndBgSrc, //游戏背景音
  sndBgInstance:null,//游戏背景音函数
  effectSoundInstance:null,//游戏音效函数
  effectSoundsFile:gameAllConfig.effectSoundsFile, //游戏音效文件,
  effectData:gameAllConfig.effectData,
  isMute : false
}

createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
createjs.Touch.enable(stage, true, false);
createjs.Ticker.setFPS(15);

var load_preload = new createjs.LoadQueue(false);
var main_preload = new createjs.LoadQueue(false);
createjs.Ticker.addEventListener("tick",main_ticker);
//一些静态文件
var images = [];var loadAnimation = null;

//背景音乐及音效函数
function addSoundsEffect(){
  createjs.HTMLAudioPlugin.enableIOS = true;
  var sounds = [
    {
      id:allSounds.sndBgId,
      src:allSounds.sndBgSrc
    },
    {
      src:allSounds.effectSoundsFile,
      data:{
        audioSprite:allSounds.effectData
      }
    }
  ]
  var callNum = 0;
  createjs.Sound.alternateExtensions = ["mp3"];
  createjs.Sound.registerSounds(sounds, allSounds.sndUrl); 
  createjs.Sound.addEventListener("fileload", function () {
    callNum++;
    if( callNum === 1 ){
      playBgSound();
    }else{
      console.log("调了2次");
    }
    if(isIOS()){
      // allSounds.sndBgInstance = createjs.Sound.play(allSounds.sndBgId, {loop: -1, volume: 0.1})
    }
    //createjs.Sound.registerSounds(sounds, allSounds.sndUrl);  // register sounds, which preloads by default
  });  
}

function playBgSound() {
  allSounds.sndBgInstance = createjs.Sound.play(allSounds.sndBgId, {loop: -1, volume: 0.2});
}

function stopBgSound() {
  allSounds.sndBgInstance.stop();
}
//播放音效
function playEffectSound(id, callback) {
  if (allSounds.effectSoundInstance) {
    allSounds.effectSoundInstance.stop();
  }
  allSounds.effectSoundInstance = createjs.Sound.play(id);

  if (callback) {
    allSounds.effectSoundInstance.addEventListener("complete", callback);
  }
}

//背景音乐函数，open/close
function muteBgSound(evt) {
  evt.stopPropagation();
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
  stage.update();
}

//加载页面常量元素(按钮等)
load_preload.addEventListener("complete",handleMainLoad);
load_preload.loadManifest(gameAllConfig.loadMainFest)

function handleMainLoad(){
  addSoundsEffect();
  gameManifest = gameAllConfig[gameName+ "_mainfest"];
  gameAllConfig.loadSprite();
  document.getElementById("coverImg").style.zIndex = -2;
  document.getElementById("gameCanvas").style.zIndex = 100;
  //加载动画尺寸(小)改变适配
  loadAnimation = new createjs.Sprite(spritesheets["game-load"],"play"); //入场开门动画
  if(gameAllConfig.loadSpriteInfo){
    var info = gameAllConfig.loadSpriteInfo;
    if(info.x)loadAnimation.x = info.x; //0 
    if(info.y)loadAnimation.y = info.y; //0
    if(info.scaleX)loadAnimation.scaleX = info.scaleX; //1.04
    if(info.scaleY)loadAnimation.scaleY = info.scaleY;
  }
  stage.addChild(loadAnimation);
  //重玩按钮
  replayBtn = new createjs.Bitmap(load_preload.getResult("replay-btn"));
  replayBtn.visible = true;
  replayBtn.regX = replayBtn.image.width / 2;
  replayBtn.regY = replayBtn.image.height / 2;
  replayBtn.x = 830;
  replayBtn.y = 50;
  replayBtn.addEventListener("click",function(evt){
    evt.stopPropagation();
    replayBtn_click.visible = true;
    createjs.Tween.get(this)
      .call(function(){
        replayBtn.visible = false;
      })
      .wait(300)
      .call(function(){
        replayBtn.visible = true;
        replayBtn_click.visible = false;
        gameReplay();
      })
  });
  replayBtn_click = new createjs.Bitmap(load_preload.getResult("replay-click"));
  replayBtn_click.visible = false;
  replayBtn_click.regX = replayBtn_click.image.width / 2;
  replayBtn_click.regY = replayBtn_click.image.height / 2;
  replayBtn_click.x = 830; replayBtn_click.y = 50;
  //返回主页
  homeBtn = new createjs.Bitmap(load_preload.getResult("home-btn"));
  homeBtn.visible = true;
  homeBtn.regX = homeBtn.image.width / 2;
  homeBtn.regY = homeBtn.image.height / 2;
  homeBtn.x = 970;
  homeBtn.y = 50;
  homeBtn.addEventListener("click",function(evt){
    evt.stopPropagation();
    homeBtn.visible = true;
    createjs.Tween.get(this)
      .call(function(){
        homeBtn.visible = false;
        homeBtn_click.visible = true;
      })
      .wait(300)
      .call(function(){
        homeBtn.visible = true;
        homeBtn_click.visible = false;
        stopTime();//暂停倒计时
        //弹出是否退出，不可直接返回home主页
        gotoHome("/learning/student_navigation/");
      })
  });
  homeBtn_click = new createjs.Bitmap(load_preload.getResult("home-click"));
  homeBtn_click.visible = false;
  homeBtn_click.regX = homeBtn_click.image.width / 2;
  homeBtn_click.regY = homeBtn_click.image.height / 2;
  homeBtn_click.x = 970;
  homeBtn_click.y = 50;
  //背景音乐按钮
  sndBtn = new createjs.Bitmap(load_preload.getResult("snd-btn"));
  sndBtn.visible = true;
  sndBtn.regX = sndBtn.image.width / 2;
  sndBtn.regY = sndBtn.image.height / 2;
  sndBtn.x = 900;
  sndBtn.y = 50;
  //绑定bgm开关函数
  sndBtn.addEventListener("click",muteBgSound);
  nosndBtn = new createjs.Bitmap(load_preload.getResult("nosnd-btn"));
  nosndBtn.visible = false;
  nosndBtn.regX = nosndBtn.image.width / 2;
  nosndBtn.regY = nosndBtn.image.height / 2;
  nosndBtn.x = 900;
  nosndBtn.y = 50;
  nosndBtn.addEventListener("click",muteBgSound);
  //加载页面操作元素
  main_preload.loadManifest(gameManifest);
  main_preload.addEventListener("fileload",handleFileLoad);
  main_preload.addEventListener("complete",handleComplete);
  
  //配置JSON
  if(gameAllConfig["content"] != undefined){
    main_preload.loadManifest({src: gameAllConfig["content"].src, id: gameAllConfig["content"].id});
  }
}

function handleFileLoad(o){
  //加载图片等静态文件资源
  if(o.item.type == createjs.LoadQueue.IMAGE){
    images[o.item.id] = o.result;
    images.push(o.result);
    images[images.length - 1].id = o.item.id;
  }
}

function handleComplete(){
  if(!isIOS()){
    playBgSound();
  }
  gameSprites();
  fixedBtnCon = new createjs.Container();
  fixedBtnCon.x = 0; fixedBtnCon.y = 0;
  fixedBtnCon.addChild( sndBtn, nosndBtn, replayBtn, homeBtn, homeBtn_click, replayBtn_click, timeBg );
  game_current.addChild(fixedBtnCon);
  game_current.setChildIndex( fixedBtnCon, game_current.children.length-1 );
  function_prepWorld = "game_"+gameName;
  gameReplay();//重玩
}

function main_ticker(){
  stage.update();
}

function mainWorld(){
  if (typeof(window[function_prepWorld]) === "function") window[function_prepWorld]();
}

// animation 切换关卡 动画 必须定义next为false
function handleLoadSprite( spriteSheet, callback ){
  var sprite = new createjs.Sprite(spritesheets[spriteSheet],"play");
  var spriteBounds = sprite.getBounds();
  sprite.regX = spriteBounds.width / 2;
  sprite.regY = spriteBounds.height / 2;
  //问题处
  sprite.scaleX = canvas.width / spriteBounds.width ;
  sprite.scaleY = canvas.height / spriteBounds.height ;
  sprite.x = canvas.width / 2;
  sprite.y = canvas.height / 2;
  if(callback) {
    callback();
  }
  game_current.addChild(sprite);
  game_current.setChildIndex(sprite,game_current.children.length - 1);

  sprite.addEventListener("animationend",function(){
    game_current.removeChild(this);
  })
}

//创建mask
function createMask(container){
  var  mask = new createjs.Shape();
  mask.graphics.beginFill("rgba(0,0,0,.5)").drawRect(0,0,canvas.width,canvas.height);
  if(container){
    container.mask = mask
  }else{
    game_current.addChild(mask);
    game_current.setChildIndex(mask,game_current.children.length - 1);
    game_current.mask = mask;
  }
  mask.on("click",function(evt){
    evt.stopPropagation();
  })
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
function gameSprites(){
  if(typeof(gameAllConfig[gameName+"_spritesheets"]) == "function"){
    gameAllConfig[ gameName+"_spritesheets"]();
  }
}

function gotoHome(url){
  createjs.Ticker.removeEventListener("tick",main_ticker);
  // createjs.Ticker.removeEventListener("tick",ticker);
  if(game_current.getChildByName("maskContainer")){
    game_current.removeChild(game_current.getChildByName("maskContainer"))
  }
  var container = new createjs.Container();
  container.name = "maskContainer";
  game_current.addChild(container);
  var  mask = new createjs.Shape();
  mask.graphics.beginFill("rgba(0,0,0,.5)").drawRect(0,0,canvas.width,canvas.height);
  mask.on("click",function(evt){
    evt.stopPropagation();
  })
  container.addChild(mask);
  var pop = new createjs.Bitmap(load_preload.getResult("pop"));
  pop.regX = pop.image.width / 2;
  pop.regY = pop.image.height / 2;
  pop.x = canvas.width / 2;
  pop.y = canvas.height / 2;
  var sure = new createjs.Bitmap(load_preload.getResult("sure"));
  sure.x = 450;
  sure.y = 350;
  sure.addEventListener("click",function(evt){
    evt.stopPropagation();
    window.location.href = "http://dodobaike.com"+url;
  })
  var cancle = new createjs.Bitmap(load_preload.getResult("cancle"));
  cancle.x = 640;
  cancle.y = 210;
  cancle.addEventListener("click",function(evt){
    evt.stopPropagation();
    game_current.removeChild(container);
    startTime("down",timeEnd); //开启倒计时
    createjs.Ticker.addEventListener("tick",main_ticker);
    // createjs.Ticker.addEventListener("tick", ticker);
  })
  container.addChild(pop,sure,cancle);
  stage.update();
}
//重玩
function gameReplay(evt){
  mainWorld();
  replayScore();//积分清空
  isReplay = true;
}
//设置时间:正计时->后端
function setTimeData() {
  clearInterval(positiveTiming);
  positiveTiming = setInterval(function () {
    everyGameTime.second++;
    if( everyGameTime.second <= 9 ){
      everyGameTime.second = "0" + everyGameTime.second;
    }
    if (everyGameTime.second > 59) {
      everyGameTime.second = 00;
      everyGameTime.minute++;
      if( everyGameTime.minute <= 9 ){
        everyGameTime.minute = "0"+ everyGameTime.minute;
      }
    }
    if (everyGameTime.minute > 59) {
      everyGameTime.hour++;
      everyGameTime.minute = 00;
      if( everyGameTime.hour <= 9 ){
        everyGameTime.hour = "0"+everyGameTime.hour;
      }
    }
  }, 1000);
}

// 获取每关使用时间(正计时时间)
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
function toServerData(scoreData){
  if(scoreData){
    if(scoreData.score >= 100){
      scoreData.score = 100;
    }
    reward = {"waterList": [{"count": 3, "type": "mineral"}], "redirect_url": "/learning/student_navigation/"}; 
    show.gameReward( reward, gameAllConfig.rewardPosition, resultAward, 48, "rgba(60,60,60,1)" );
    // $.ajax({
    //   type:"POST",
    //   url:"/learning/create_game_record/",
    //   data:scoreData,
    //   success:function(result){
    //     if(result.success){
    //       console.log("data to server success");
    //       reward.url = result.redirect_url;
    //       reward.waterList = result.waterList;
    //       show.gameReward( reward, gameAllConfig.rewardPosition, resultAward, 48, "rgba(60,60,60,1)" );
    //     }
    //   }
    // })
   }
}

//获取游戏ID
function getQueryString(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
}

var show = {
  //游戏分数,计时,内容显示
  gameBg:function(bitmap){
    var gameBg = new createjs.Bitmap(images[bitmap]);
    gameBg.scaleX = canvas.width / gameBg.image.width ;
    gameBg.scaleY = canvas.height / gameBg.image.height ;
    gameBg.cache(0,0,gameBg.image.width,gameBg.image.height);
    game_current.addChild(gameBg);
  },
  gameScore:function(bitmap,x,y,x1,y1,text,size,color){
    if(!text)text = "0";
    if(!color)color = "#ffffff";
    if(!size) size = "36";
    if(!bitmap){
      scoreText = new createjs.Text(text,size + "px katong",color);
      scoreText.x = x;scoreText.y = y;
      scoreText.textBaseline = "middle";scoreText.textAlign = "center";
      game_current.addChild(scoreText);
    }else{
      var scoreBlank = new createjs.Bitmap(images[bitmap]);
      scoreBlank.regX = scoreBlank.image.width / 2 ;
      scoreBlank.regY = scoreBlank.image.height / 2;
      scoreBlank.x = x1;scoreBlank.y = y1;
      scoreBlank.cache(0,0,scoreBlank.image.width,scoreBlank.image.height);
      game_current.addChild(scoreBlank);
      scoreText = new createjs.Text(text,size + "px katong",color);
      scoreText.x = x;scoreText.y = y;
      scoreText.textBaseline = "middle";scoreText.textAlign = "center";
      game_current.addChild(scoreText);
    }
  },
  gameTime:function(bitmap,x,y,x1,y1,text,size,color){
    if(!text)text = "00:00";
    if(!color)color = "#ffffff";
    if(!size) size = "36";
    if(!bitmap){
      totalTimeText = new createjs.Text(text, size+"px katong", color);
      totalTimeText.textAlign = "center";
      totalTimeText.textBaseline = "middle";
      totalTimeText.x = x1;
      totalTimeText.y = y1;
      game_current.addChild(totalTimeText);
    }else{
      var timeBlank = new createjs.Bitmap(images[bitmap]);
      timeBlank.regX = timeBlank.image.width / 2 ;
      timeBlank.regY = timeBlank.image.height / 2;
      timeBlank.x = x;timeBlank.y = y;
      timeBlank.cache(0,0,timeBlank.image.width,timeBlank.image.height);
      game_current.addChild(timeBlank);
      totalTimeText = new createjs.Text(text, size+"px katong", color);
      totalTimeText.textAlign = "center";
      totalTimeText.textBaseline = "middle";
      totalTimeText.x = x1;
      totalTimeText.y = y1;
      game_current.addChild(totalTimeText);
    }
  },
  gameContent:function(bitmap,x,y,callback){
    var content = new createjs.Bitmap(images[bitmap]);
    content.regX = content.image.width / 2 ;
    content.regY = content.image.height / 2;
    content.x = x;content.y = y;
    content.cache(0,0,content.image.width,content.image.height);
    game_current.addChild(content);
    if(callback)callback()
  },
  //游戏奖励 —— 水, 按钮, 积分
  gameReward:function(data,position,callBack,fontSize,fontColor){
    templateContainer = new createjs.Container();
    game_current.addChild(templateContainer);
    if(!fontSize) fontSize = "36";
    if(!fontColor)fontColor = "#ffffff";
    var milk = new createjs.Text("0",fontSize+"px katong",fontColor);
    var juice = new createjs.Text("0",fontSize+"px katong",fontColor);
    var mineral = new createjs.Text("0",fontSize+"px katong",fontColor);
    milk.textBaseline = "top";
    milk.textAlign = "center";
    juice.textBaseline = "top";
    juice.textAlign = "center";
    mineral.textBaseline = "top";
    mineral.textAlign = "center";
    var end_home = new createjs.Bitmap(images["end_home"]);
    end_home.regX = end_home.image.width / 2;
    end_home.regY = end_home.image.height / 2;
    end_home.addEventListener("click",function(evt){
      evt.stopPropagation();
      stopTime();//停止倒计时
      stopPositiveTiming();//停止正计时
      gotoHome(data.url);
    })
    var end_replay = new createjs.Bitmap(images["end_replay"]);
    end_replay.regX = end_replay.image.width / 2;
    end_replay.regY = end_replay.image.height / 2;
    end_replay.addEventListener("click",gameReplay);

    if(JSON.stringify(data) != "{}"){
      var my_waterObj = {
        "milk":{"count":0},
        "juice":{"count":0},
        "mineral":{"count":0}
      }
      for(var i = 0; i < data.waterList.length;i++){
        var water = data.waterList[i];
        my_waterObj[water.type].count = water.count;
      }
      mineral.text = my_waterObj["mineral"].count.toString();
      milk.text = my_waterObj["milk"].count.toString();
      juice.text = my_waterObj["juice"].count.toString();
    }
    if(position){
      milk.x = position[0][0];milk.y = position[0][1];
      juice.x = position[1][0];juice.y = position[1][1];
      mineral.x = position[2][0];mineral.y = position[2][1];
      end_home.x = position[3][0],end_home.y = position[3][1];
      end_replay.x = position[4][0],end_replay.y = position[4][1];
    }

    if(callBack)callBack();
    templateContainer.addChild(mineral);
    templateContainer.addChild(juice);
    templateContainer.addChild(milk);
    templateContainer.addChild(end_home,end_replay);
    stage.update();
  }
}
//游戏计时
function startTime(type,callback) {
  gameTimer = setInterval(function () {
    //倒计时
    if(type == "down"){
      totalTime--;
      timing();
    }else if(type == "up"){//正计时
      totalTime++;
      timing();
    }
    if(callback){
      callback();
    }
  }, 1000);

  function timing(){
    if(totalTime < 10 && totalTime >= 0){
      totalTimeText.text = "00:0" + totalTime;
    }else if(totalTime >= 10 && totalTime <=59){
      totalTimeText.text = "00:" + totalTime;
    }else if(totalTime < 0 ){
       totalTimeText.text = "00:00";
    }else if(totalTime >= 60){
      if(totalTime % 60 != 0){
        var s = totalTime % 60;
        if(s < 10){
          var m = (totalTime-s) / 60;
          if(m < 10){
            totalTimeText.text = "0"+m+ ":0" + s;
          }else{
            totalTimeText.text = ""+m+ ":0"+ s;
          }
        }else{
          var m = (totalTime-s) / 60;
          if(m < 10){
            totalTimeText.text = "0"+m+ ":"+ s;
          }else{
            totalTimeText.text = ""+m+ ":"+ s;
          }
        }
      }else{
        var m = totalTime / 60;
        if(m < 10){
          totalTimeText.text = "0"+m+":00";
        }else{
          totalTimeText.text = ""+m+":00";
        }
      }
    }
  }
}
//停止计时
function stopTime() {
  clearInterval(gameTimer);
}
//停止正计时
function stopPositiveTiming(){
  clearInterval(positiveTiming);
}
//动画结束后/或直接将游戏数据传到后台
function scoreToServer(scoreData,spriteSheet,callback){
  game_current.removeAllChildren();
  if(spriteSheet){//播放结束动画
    if(callback){
      callback(scoreData,spriteSheet)
    }else{
      var sprite = new createjs.Sprite(spritesheets[spriteSheet],"play");
      var _spriteBounds = sprite.getBounds();
      sprite.regX = _spriteBounds.width / 2;
      sprite.regY = _spriteBounds.height / 2;
      sprite.x = canvas.width / 2;
      sprite.y = canvas.height / 2;
      game_current.addChild(sprite);
      sprite.addEventListener("animationend",function(){
        game_current.removeChild(this);
        toServerData(scoreData);
      })
    }
  }else{
    toServerData(scoreData)
  }
}


var FPS = {};
FPS.time = 0;
FPS.FPS = 0;
FPS.showText = "ct:";
FPS.startFPS = function (stage){
  FPS.shape = new createjs.Shape();
  FPS.shape.graphics.beginFill("#8EE5EE").drawRect(0, 0, 200, 70);
  FPS.txt = new createjs.Text("", "30px Arial", "#000");
  FPS.container = new createjs.Container();
  stage.addChild(FPS.container);
  FPS.container.addChild(FPS.shape)
  FPS.container.addChild(FPS.txt);
  FPS.container.cache(0,0, 200,70);
  createjs.Ticker.addEventListener("tick", FPS.TickerFPS);
//    setInterval(FPS.TickerFPS,18)
}
FPS.TickerFPS = function (event)
{
  FPS.date = new Date();
  FPS.currentTime = FPS.date.getTime();
  if(FPS.time!=0)
  {
    FPS.FPS = Math.ceil(1000/(FPS.currentTime -  FPS.time));
  }
  FPS.time = FPS.currentTime;
  FPS.txt.text = "FPS: "+FPS.FPS + "\n" + FPS.showText;
  FPS.container.cache(0,0, 200,70);
}
FPS.startFPS2 = function (stage)
{
  FPS.txt = document.getElementById("fps");
  createjs.Ticker.addEventListener("tick", FPS.TickerFPS2);
}
FPS.TickerFPS2 = function (event)
{
  FPS.date = new Date();
  FPS.currentTime = FPS.date.getTime();
  if(FPS.time!=0)
  {
    FPS.FPS = Math.ceil(1000/(FPS.currentTime -  FPS.time));
  }
  FPS.time = FPS.currentTime;
  FPS.txt.innerText = "FPS: "+FPS.FPS;
}