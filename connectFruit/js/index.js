var fruit = {}
var subContainer = null;
var content = null;
function game_fruit() {
  homeBtn.visible = false;
  sndBtn.visible = false;
  replayBtn.visible = false;
  replayBtn.alpha = 0;
  game_current.removeAllChildren();
  createjs.Ticker.removeEventListener("tick",main_ticker);
  createjs.Ticker.addEventListener("tick",ticker);

  fruit = {
    move : false,
    text : "",
    score : 0,
    speed : 6000,
    arr : [],
    basketArr : [],
    live : 3,
    answerArr:[],
    combo:0
  }
  subContainer = null;
  //加载背景以及显示计时、分数或内容的背景
  show.gameBg("fruit_bg");
  show.gameContent("content_bg",500,35);
  show.gameScore("score_bg",415,35,"0","36","#000000");

  content = random_count(50,20);
    //播放loading动画
  handleLoadSprite("load-door", fruit_init);
  stage.removeChild(loadAnimation);

}

function fruit_init() {

  setTimeout(function(){
    playEffectSound("countDown")
    handleCountDown(refresh)
    setTimeData();
  },3000)

}

//初始化
function refresh(){
  homeBtn.visible = true;
  sndBtn.visible = true;
  replayBtn.visible = true;
  replayBtn.alpha = 1;
  // if(!count)count = 1;
  subContainer = new createjs.Container();
  game_current.addChild(subContainer);
  fruit.move = true;
  var data = getArrayItems(content,4)
  for(var i = 0; i < data.length;i++){
    //水果
    var fruitContainer = new createjs.Container();
    subContainer.addChild(fruitContainer)
    var fruit_ = new createjs.Bitmap(images["fruit_"+i])
    fruit_.name = "fruit";
    fruitContainer.regX = fruit_.image.width / 2;
    fruitContainer.regY = fruit_.image.height / 2;
    fruitContainer.startX = (canvas.width - 200) / 4 * (i + 1);
    fruitContainer.startY = 100;
    fruitContainer.x = fruitContainer.startX;
    fruitContainer.y = fruitContainer.startY;
    fruitContainer.answer = data[i][1];
    fruitContainer.addChild(fruit_)
    var fruit_text_1 = new createjs.Text("","34px katong","#ffffff")
    fruit_text_1.textAlign = "center";
    fruit_text_1.textBaseline = "middle";
    fruit_text_1.x = fruitContainer.regX + 5
    fruit_text_1.y = fruitContainer.regY - 13
    fruit_text_1.text = data[i][0][0]
    fruitContainer.addChild(fruit_text_1)
    fruit.arr.push(fruitContainer);
    var fruit_text_2 = new createjs.Text("","34px katong","#ffffff")
    fruit_text_2.textAlign = "center";
    fruit_text_2.textBaseline = "middle";
    fruit_text_2.x = fruitContainer.regX - 20
    fruit_text_2.y = fruitContainer.regY
    fruit_text_2.text = data[i][0][1]
    fruitContainer.addChild(fruit_text_2)
    fruit.arr.push(fruitContainer);
    var fruit_text_3 = new createjs.Text("","34px katong","#ffffff")
    fruit_text_3.textAlign = "center";
    fruit_text_3.textBaseline = "middle";
    fruit_text_3.x = fruitContainer.regX + 5
    fruit_text_3.y = fruitContainer.regY + 13
    fruit_text_3.text = data[i][0][2]
    fruitContainer.addChild(fruit_text_3)
    fruit.arr.push(fruitContainer);

    //篮子
    var basket = new createjs.Bitmap(images["basket"])
    basket.name = "basket";
    basket.regX = basket.image.width / 2;
    basket.regY = basket.image.height / 2;
    basket.x = (canvas.width - 200) / 4 * (i + 1);
    basket.y = 500;
    basket.answer = -1;
    basket.childImg = [];
    fruit.basketArr.push(basket);
    subContainer.addChild(basket)

    //答案
    var answerContainer = new createjs.Container();
    subContainer.addChild(answerContainer)
    var answer_bg = new createjs.Bitmap(images["answer_bg"])
    answer_bg.name = "answer";
    answerContainer.regX = answer_bg.image.width / 2;
    answerContainer.regY = answer_bg.image.height / 2;
    answerContainer.startX = (canvas.width - 200) / 4 * (i + 1);
    answerContainer.startY = 600;
    answerContainer.x = answerContainer.startX;
    answerContainer.y = answerContainer.startY;
    answerContainer.answer = data[i][1];
    answerContainer.addChild(answer_bg)
    fruit.answerArr.push(answerContainer)
    dragdrop(answerContainer);
  }
  var arr = getArrayItems(data,4)
  for(var i = 0; i < fruit.answerArr.length;i++){
    var answer_text = new createjs.Text("","36px katong","#000")
    answer_text.textBaseline = "middle"
    answer_text.textAlign = "center";
    answer_text.text = String(arr[i][1])
    answer_text.x = fruit.answerArr[i].regX ;
    answer_text.y = fruit.answerArr[i].regY + 10;
    fruit.answerArr[i].addChild(answer_text)
    fruit.answerArr[i].answer = arr[i][1]
  }

  fruit_down()
}
function fruit_down(count){
  // if(!count)count = 1;
  // for(var i = 1; i < (count + 1);i++){
  //   (function(a) {
  //     var timer = setTimeout(function() {
        var target = fruit.arr[Math.floor(Math.random()*4)]
        createjs.Tween.get(target,{loop:false})
          .wait(2000)
          .to({y:500 - target.regX},fruit.speed)
          .call(function(){
            for(var i = 0 ; i < fruit.basketArr.length;i++){
              var dest = fruit.basketArr[i];
              if((target.x - dest.x <= 10 || dest.x - target.x >= -10) &&(target.y - dest.y <= 10 || dest.y - target.y >= -10)){
                checkAnswer(target,dest)
                break;
              }
            }
            // clearTimeout(timer)
            // timer = null;
          })
      // }, a*2000);
    // })(i)
  // }
}

function checkAnswer(target,dest){
  if(dest.answer == -1){
    var bitmap = new createjs.Bitmap(images["live"])
    bitmap.regX = bitmap.image.width / 2;
    bitmap.regY = bitmap.image.height / 2;
    bitmap.x = 530 - (fruit.live - 1) * 26,bitmap.y = 35;
    game_current.addChild(bitmap);
    game_current.removeChild(subContainer)
    fruit.answerArr = []
    fruit.basketArr = []
    fruit.arr = []
    refresh()
    fruit.live--;
    if(fruit.live <= 0){
      recordScore(fruit.score / 10)
      scoreToServer(gameScores)
      createjs.Tween.removeAllTweens()
    }
    playEffectSound("broken")
  }else{
    if(target.answer == dest.answer){
      fruit.combo +=1
      if(fruit.combo >=3){
        animation("candy")
      }
      playEffectSound("snake_eat")
      createContent(target,dest)
      waggle(dest)
      fruit.score += 10;
      scoreText.text = fruit.score.toString();
      if(fruit.score % 100 == 0){
        fruit.speed -= 500;
        if(fruit.speed <= 1000){
          fruit.speed = 1000;
        }
      }
    }
    else{
      var bitmap = new createjs.Bitmap(images["live"])
      bitmap.regX = bitmap.image.width / 2;
      bitmap.regY = bitmap.image.height / 2;
      bitmap.x = 530 - (fruit.live - 1) * 26,bitmap.y = 35;
      game_current.addChild(bitmap);
      fruit.combo = 0;
      createContent(target,dest)
      fruit.live--;
      if(fruit.live <= 0){
        recordScore(fruit.score / 10)
        scoreToServer(gameScores)
        createjs.Tween.removeAllTweens()
      }
      playEffectSound("snake_yun")
    }
  }
}
function createContent(target,dest){
  fruit.arr.splice(fruit.arr.indexOf(target),1)
  fruit.answerArr.splice(fruit.answerArr.indexOf(dest.childImg[0]),1)
  subContainer.removeChild(target)
  subContainer.removeChild(dest.childImg[0])
  var data = getArrayItems(content,1)
  var fruitContainer = target;
  var answerContainer = dest.childImg[0];

  fruitContainer.children[1].text = data[0][0][0];
  fruitContainer.children[2].text = data[0][0][1];
  fruitContainer.children[3].text = data[0][0][2];
  fruitContainer.answer = data[0][1];
  fruitContainer.startX = target.startX;
  fruitContainer.startY = target.startY;
  fruitContainer.x = fruitContainer.startX;
  fruitContainer.y = fruitContainer.startY;

  answerContainer.answer = data[0][1];
  answerContainer.children[1].text = String(data[0][1])
  answerContainer.startX = dest.childImg[0].startX;
  answerContainer.startY = dest.childImg[0].startY;
  answerContainer.x = answerContainer.startX;
  answerContainer.y = answerContainer.startY;

  dragdrop(answerContainer)

  subContainer.addChild(fruitContainer)
  subContainer.addChild(answerContainer)
  fruit.arr.push(fruitContainer)
  fruit.answerArr.push(answerContainer)
  var new_arr = getArrayItems(fruit.answerArr,4)
  updatePosition(new_arr,fruit.answerArr,fruit_down)
}

function updatePosition(arr1,arr2,callback){
  var position = []
  for(var i =0;i<arr1.length;i++){
    position.push([])
    position[i][0] = arr1[i].startX
    position[i][1] = arr1[i].startY
  }
  var timer = setTimeout(function(){
    for(var j = 0; j < arr2.length;j++){
      arr2[j].startX = position[j][0]
      arr2[j].startY = position[j][1]
      arr2[j].x = arr2[j].startX
      arr2[j].y = arr2[j].startY
    }
    if(callback)callback()
    clearTimeout(timer)
    timer = null;
  },100)

}
//倒计时
function handleCountDown(callback){
  var container = new createjs.Container();
  game_current.addChild(container);
  var blank = new createjs.Bitmap(images["mask"]);
  blank.scaleX = canvas.width / blank.image.width;
  blank.scaleY = canvas.height / blank.image.height;
  container.addChild(blank);
  var countDown = new createjs.Sprite(spritesheets["countDown"],"play");
  countDown.regX = countDown.getBounds().width / 2;
  countDown.regY = countDown.getBounds().height / 2;
  countDown.x = canvas.width / 2;
  countDown.y = canvas.height / 2;
  container.addChild(countDown);
  countDown.addEventListener("animationend",function(){
    game_current.removeChild(container);
    if(callback)callback()
  })
}

function dragdrop(current){
  var childIndex = 1;
  current.on("mousedown",function(evt){
    if(fruit.move){
      this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
      childIndex = this.parent.getChildIndex(current);
      playEffectSound("snake_graphical")
    }
  })
  current.on("pressmove",function(evt){
    if(fruit.move){
      this.parent.setChildIndex(current, this.parent.children.length - 1);
      this.x = evt.stageX + this.offset.x;
      this.y = evt.stageY + this.offset.y;
    }
  })
  current.on("pressup",function(evt){
    if(fruit.move){
      for(var i = 0;i < fruit.basketArr.length;i ++){
        var dest = fruit.basketArr[i];
        var pt = dest.globalToLocal(stage.mouseX, stage.mouseY);
        if(dest.hitTest(pt.x,pt.y)){
          playEffectSound("snake_die")
          dest.answer = this.answer;
          if(dest.childImg.length >0){
            dest.childImg[0].x = dest.childImg[0].startX
            dest.childImg[0].y = dest.childImg[0].startY
            dest.childImg = [];
          }
          this.x = dest.x;
          this.y = dest.y;
          dest.childImg.push(this);
          break;
        }
      }
    }

  })
}


//结束后，后台传来的数据与游戏结束内容显示
function gameOverAnimation(){
  homeBtn.visible = false;
  sndBtn.visible = false;
  replayBtn.visible = false;

  var template = new createjs.Bitmap(images["template"]);
  template.regX = template.image.width / 2;
  template.regY = template.image.height / 2;
  template.x = canvas.width / 2;
  template.y = canvas.height / 2;
  templateContainer.addChild(template);
  var end_score = new createjs.Text("得分:","50px katong","#00000")
  end_score.textBaseline = "middle";
  end_score.textAlign = "center";
  end_score.x = canvas.width / 2;
  end_score.y = canvas.height / 2 - 150;
  end_score.text += scoreText.text;
  templateContainer.addChild(end_score)
}

//从一个给定的数组arr中,随机返回num个不重复项
function getArrayItems(arr, num) {
  //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
  var temp_array = new Array();
  for (var index in arr) {
    temp_array.push(arr[index]);
  }
  //取出的数值项,保存在此数组
  var return_array = new Array();
  for (var i = 0; i<num; i++) {
    //判断如果数组还有可以取出的元素,以防下标越界
    if (temp_array.length>0) {
      //在数组中产生一个随机索引
      var arrIndex = Math.floor(Math.random()*temp_array.length);
      //将此随机索引的对应的数组元素值复制出来
      return_array[i] = temp_array[arrIndex];
      //然后删掉此索引的数组元素,这时候temp_array变为新的数组
      temp_array.splice(arrIndex, 1);
    } else {
      //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
      break;
    }
  }
  return return_array;
}

function ticker(){
  stage.update();

  if(fruit.basketArr.length > 0){
    for(var i=0;i<fruit.basketArr.length;i++) {
      subContainer.setChildIndex(fruit.basketArr[i],subContainer.children.length - 1)
    }
  }
  if(fruit.answerArr.length > 0){
    for(var i=0;i<fruit.answerArr.length;i++) {
      subContainer.setChildIndex(fruit.answerArr[i],subContainer.children.length - 1)
    }
  }
}

//随机生成加减运算
function random_count(count,size,figure){
  var arr = []
  var sign = ['+','-'];
  if(!figure)figure = 2;
  for (var i = 0; i < count;i++){
    switch(figure){
      case 2:
        var x = sign[randomInt(0,1)]
        var a = randomInt(1,size)
        var b = randomInt(1,size)
        switch(x){
          case '+':
            arr.push([])
            arr[i].push([])
            arr[i][0][0] = ""+a
            arr[i][0][1] = x
            arr[i][0][2] = ""+b
            arr[i][1] = a + b
            break
          case '-':
            arr.push([])
            if (a < b){
              arr[i].push([])
              arr[i][0][0] = ""+b
              arr[i][0][1] = x
              arr[i][0][2] = ""+a
              // arr[i][0] = b + x + a
              arr[i][1] = b - a
            }else{
              arr[i].push([])
              arr[i][0][0] = ""+a
              arr[i][0][1] = x
              arr[i][0][2] = ""+b
              // arr[i][0] = a + x + b
              arr[i][1] = a - b
            }
            break;
        }
        break;
      case 3:
        var x = sign[randomInt(0,1)]
        var y = sign[randomInt(0,1)]
        var a = randomInt(1,size)
        var b = randomInt(1,size)
        var c = randomInt(1,size)
        switch(x){
          case '+':
            arr.push([])
            if(y == '+'){
              arr[i][0] = a + x + b + y + c
              arr[i][1] = a + b + c
            }else{
              if((a+b)>c){
                arr[i][0] = a + x + b + y + c
                arr[i][1] = a + b - c
              }else{
                c = randomInt(0,(a + b - 1))
                arr[i][0] = a + x + b + y + c
                arr[i][1] = a + b - c
              }
            }
            break
          case '-':
            arr.push([])
            if(y == '+'){
              if(a < b){
                arr[i][0] = b + x + a + y + c
                arr[i][1] = b - a + c
              }else{
                arr[i][0] = a + x + b + y + c
                arr[i][1] = a - b + c
              }
            }else{
              if (a < b){
                if((b + a) < c){
                  arr[i][0] = c + x + b + y + a
                  arr[i][1] = c - b - a
                }else{
                  if((a+c) < b){
                    arr[i][0] = b + x + a + y + c
                    arr[i][1] = b - a - c
                  }else{
                    c = randomInt(0,(b - a - 1))
                    arr[i][0] = b + x + a + y + c
                    arr[i][1] = b - a - c
                  }
                }
              }else{
                if((a + b) < c){
                  arr[i][0] = c + x + a + y + b
                  arr[i][1] = c - a - b
                }else{
                  if((b + c) < a){
                    arr[i][0] = a + x + b + y + c
                    arr[i][1] = a - b - c
                  }else{
                    c = randomInt(0,(a - b - 1))
                    arr[i][0] = a + x + b + y + c
                    arr[i][1] = a - b - c
                  }
                }
              }
            }
            break
        }
        break;
    }
  }
  return arr
}

function animation(sprite,callback){
  var sprite = new createjs.Sprite(spritesheets[sprite],"play")
  var _spriteBounds = sprite.getBounds();
  sprite.regX = _spriteBounds.width / 2;
  sprite.regY = _spriteBounds.height / 2;
  sprite.x = canvas.width / 2;
  sprite.y = canvas.height / 2;
  game_current.addChild(sprite);
  sprite.addEventListener("animationend",function(){
    game_current.removeChild(this)
    if(callback)callback()
  })
}
function waggle(bm, callback) {
  var random = randomInt(2, 10) * 1000;
  createjs.Tween.get(bm, {loop: false})
    .to({rotation: bm.rotation + 5}, 50, createjs.Ease.linear)
    .to({rotation: bm.rotation}, 50, createjs.Ease.linear)
    .to({rotation: bm.rotation - 5}, 50, createjs.Ease.linear)
    .to({rotation: bm.rotation}, 50, createjs.Ease.linear)
    .wait(random).call(
    function () {
      if (callback) {
        callback();
      }
    }
  )
}