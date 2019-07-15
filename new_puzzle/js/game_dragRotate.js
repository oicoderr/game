var cj = createjs,success = false;//是否过关
var rotateBtn = ["sszBtn","nszBtn"];
function Puzzle() {
  this.isRotate = 0; //开启旋转0/1
  this.roAngle = 90; //每次旋转度数
  this.dragsRotate = 0;//正确旋转度数
  this.shapeWidth = 370;//拖拽区width
  this.dragPace = 30; //拖拽区域dragObj两者间距
  this.sounds = {//声音
    "tuodui":"tuodui",
    "tuocuo":"tuocuo",
    "nextLevel":"correct_1"
  };
}
Puzzle.prototype = {
  init:function(bgSrcId,dragSrcId,puzzleImageXy,gameBg){ //处理背景图/推拽图/背景图位置/游戏背景
    this.puzzleImage = [];//bgImg集合
    this.dragImages = []; 
    this.indexArr = [];//indexArr 判断是否成功
    //最外层Container
    this.puzzleCon =  new cj.Container();
    this.puzzleCon.name = "puzzleContainer";
    this.puzzleCon.x = 0;this.puzzleCon.y = 0;
    //旋转按钮con
    this.rotateCon = new cj.Container();
    this.rotateCon.name = "rotateContainer";
    //拖拽区域con
    this.dragCon = new cj.Container();
    this.dragCon.x = 654;this.dragCon.y = 0;
    this.dragCon.addChild(this.rotateCon);
    this.puzzleCon.addChild(this.dragCon);
    
    game_current.addChild(this.puzzleCon);
    game_current.setChildIndex( this.puzzleCon, game_current.children.lenght-2 );
    if(typeof gameBg == "object"){
      this.gameBg = new createjs.Bitmap(images[gameBg.id]);
      this.gameBg.x = gameBg.x;this.gameBg.y = gameBg.y;  
      this.puzzleCon.addChildAt(this.gameBg,0);
    }
    if(bgSrcId && dragSrcId){//2个for解决拖拽图在bg层上面
      for(let i = 0;i < bgSrcId.length; i++){
        var bgObj = "bgObj_"+i;
        bgObj = new cj.Bitmap(images[bgSrcId[i]]);
        this.puzzleImage.push(bgObj);
        this.puzzleCon.addChild(this.puzzleImage[i]);//将数组中的对象add到Container
      }
      for(let i = 0;i < dragSrcId.length; i++){
        var dragObj = "dragObj_"+i;
        dragObj = new cj.Bitmap(images[dragSrcId[i]]);
        this.dragImages.push(dragObj);
        this.dragCon.addChild(this.dragImages[i]);
      }
      //旋转按钮在推拽图层级上
      this.dragCon.addChildAt(this.rotateCon,this.dragCon.children.length-1);
      this.puzzleCon.setChildIndex(this.dragCon,this.puzzleCon.children.length-1);
    }
    var len = this.puzzleImage.length;
    for (let i = 0; i < len; i++) {
      this.puzzleImage[i].regX = this.puzzleImage[i].getBounds().width/2;
      this.puzzleImage[i].regY = this.puzzleImage[i].getBounds().height/2;
      this.puzzleImage[i].x = puzzleImageXy[i].x;
      this.puzzleImage[i].y = puzzleImageXy[i].y;
      this.dragImages[i].regX = this.dragImages[i].getBounds().width/2;
      this.dragImages[i].regY = this.dragImages[i].getBounds().height/2;
    }
 
    //执行推拽 0:不带旋转。1:带旋转
    Puzzle.drag(this.isRotate,rotateBtn,this.roAngle);
    Puzzle.dragImgXy();
    // puzzle.dragFalling();
    if(this.isRotate){
      //推拽图随机旋转度数0-360
      Puzzle.randomAngle();
    }
  },
  dragImgXy:function(){ //drag固定位置位置
    var len = this.dragImages.length,randomArr = [];
    for(let i = len -1; i >= 0; i--){
      randomArr.push(i);
    };
    randomArr.sort(function(){ //打乱数组
      return 0.5 - Math.random();
    });
    var offsetLeft,maxHeight = null,dragWidths = [],dragHeights = [],allWheight = [],index;
    for(let i = 0; i < len; i++){
      dragWidths.push(this.dragImages[i].getBounds().width);
      dragHeights.push(this.dragImages[i].getBounds().height);
      allWheight.push(this.dragImages[i].getBounds().width);
      allWheight.push(this.dragImages[i].getBounds().height);
    }
    maxHeight = Math.max.apply(null,allWheight) + this.dragPace; //最大高度 + 每个推拽obj相距30
    var oneScreenDrags = canvas.height / (maxHeight + this.dragPace);//一屏放的个数
    var dragLens = this.dragImages.length;//一共有有多少个
    var screenNum = dragLens / oneScreenDrags;//可以放几屏
    var drawHeight = canvas.height*screenNum;//滑动区域总高度
    if(allWheight.length == dragWidths.length*2){
      for(let i = 0; i < len; i++){
        index = randomArr[i];
        offsetLeft = (this.shapeWidth - dragWidths[i])/2 + dragWidths[i]/2;
        this.dragImages[index].x = offsetLeft;
        this.dragImages[index].y = drawHeight - (maxHeight/2 + maxHeight*i);
      }
    }
    Puzzle.dragArea(maxHeight,drawHeight);
  },
  drag:function(isRotate,rotateBtn,angle){//是否带旋转/旋转按钮/单次旋转度数
    var _this = this,downX,downY;
    for(let i = 0;i < this.dragImages.length; i++){
      this.dragImages[i].index = i;
      this.dragImages[i].on("mousedown",function(evt){
        evt.stopPropagation();
        downX = this.x;
        downY = this.y;
        _this.rotateCon.visible = true;
        this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
        this.rotation.x = 0;this.rotation.y = 0;
        _this.dragCon.setChildIndex(this, this.parent.children.length -1);
        _this.puzzleCon.setChildIndex(_this.rotateCon,_this.puzzleCon.children.length -1);
        _this.puzzleCon.setChildIndex(_this.dragCon,_this.puzzleCon.children.length -1);
        _this.puzzleCon.setChildIndex(this,_this.puzzleCon.children.length -1);
        //调用点击旋转按钮事件
        if(isRotate){
          Puzzle.clickRotate(this,rotateBtn,angle);//c1:旋转对象, c2:旋转按钮， c3: 旋转度数
        }
      })
      this.dragImages[i].on("pressmove", function (evt) {
        evt.stopPropagation();
        _this.rotateCon.visible = false;
        this.x = evt.stageX + this.offset.x;
        this.y = evt.stageY + this.offset.y;
      });

      this.dragImages[i].on("pressup", function (evt) {
        evt.stopPropagation();
        for(let i = 0; i < _this.puzzleImage.length; i++){
          var dest = _this.puzzleImage[this.index];
          var pt = dest.globalToLocal(stage.mouseX, stage.mouseY);
          if (dest.hitTest(pt.x, pt.y) && this.rotation == _this.dragsRotate) {//判断被拖拽obj是否正确
            playEffectSound(_this.sounds.tuodui);//播放声音 
            // this.removeAllEventListeners();
            _this.puzzleCon.addChild(this);//选对把拖拽对象放入祖先级里
            _this.dragCon.removeChild(this);//父级删除相应拖拽对象
            this.x = dest.x;
            this.y = dest.y;
            // puzzle.goUp(this.index);
            Puzzle.isSuccess(this.index);
            // console.log("答案就是:"+this.rotation)
            return;
          }else{
            playEffectSound(_this.sounds.tuocuo);//播放声音 
            this.x = downX;
            this.y = downY; 
          }
        } 
      });
    }
  },
  clickRotate:function(that,rotateBtn,angle){//被旋转对象/旋转按钮/单词旋转度数
    var rightRotate,leftRotate,widths,heights,x,y;
    if(rotateBtn.length > 0){
      this.rotateCon.removeAllChildren();//移除旋转按钮
      leftRotate = new cj.Bitmap(images[rotateBtn[0]]);
      rightRotate = new cj.Bitmap(images[rotateBtn[1]]);
      this.rotateCon.addChild(rightRotate,leftRotate);
      widths = that.getBounds().width;
      heights = that.getBounds().height;
      x = that.x;
      y = that.y;
      leftRotate.x = 0;rightRotate.y = 0;
      rightRotate.x = widths + rightRotate.getBounds().width;leftRotate.y = 0;
      this.rotateCon.x = x - widths/2 - rightRotate.getBounds().width;
      this.rotateCon.y = y - rightRotate.getBounds().height/2;
    }
    rightRotate.on("click",function(evt){
      evt.stopPropagation();
      that.rotation -= angle;
      if(that.rotation%360 == 0){
        that.rotation = 0;
      }
      console.log(that.rotation)
    })
    leftRotate.on("click",function(evt){
      evt.stopPropagation();
      that.rotation += angle;
      if(that.rotation%360 == 0){
        that.rotation = 0;
      }
      console.log(that.rotation)
    })
  },
  randomAngle:function(){//角度0-360
    var multiple = [],index;
    for(let i = 0;i < 361; i++){
      if(i%this.roAngle == 0){
        multiple.push(i);
        for(let j = 0; j < this.dragImages.length; j++){
          index = parseInt(Math.random()*multiple.length-1);
          this.dragImages[j].rotation = multiple[index];
        }
      }
    }
  },
  dragArea:function(maxHeight,drawHeight){//绘画拖拽区域 dragObj最高高/推拽区域高度
    var shape = new cj.Shape();
    shape.graphics.beginFill("rgba(0,0,0,1)").drawRect(0, 0, canvas.width, canvas.height);
    var dragShape = new cj.Shape();
    dragShape.graphics.beginFill("rgba(0,255,255,.2)").drawRect(0, 0, this.shapeWidth, drawHeight);

    this.puzzleCon.addChildAt(shape,0);
    this.dragCon.mask = shape;
    this.dragCon.addChildAt(dragShape,0);
    //执行滑动拖拽对象
    Puzzle.slide(this.dragCon,drawHeight);
  },
  slide:function(obj,drawHeight){//滑动
    var _this = this;
    obj.addEventListener("mousedown", down, false);
    function down(evt){
      evt.stopPropagation();
      obj.offset = {y: obj.y - evt.stageY};
      obj.addEventListener("pressmove", moves, false);
      function moves(evt){
        evt.stopPropagation();
        _this.rotateCon.visible = false;
        obj.y = evt.stageY + obj.offset.y;
        if(obj.y > 0){
          obj.y = 0;
        }
        if(obj.y <= -drawHeight + canvas.height){
          obj.y = -drawHeight + canvas.height;
        }
      }
      obj.addEventListener("pressup", up, false);//暂无绑定事件
      function up(evt){
        evt.stopPropagation();
      }
    }
  },
  goUp:function(index){//拖拽排序
    
  },
  dragFalling:function(){
    var _this = this;
    var len = this.dragImages.length -1,randomArr = [],alphaShape = new cj.Shape();
    alphaShape.graphics.beginFill("rgba(0,0,0,.01)").drawRect(0, 0, _this.shapeWidth, canvas.height);
    this.dragCon.addChildAt(alphaShape,this.dragCon.children.length-1);
    alphaShape.addEventListener("mousedown",function(evt){
      evt.stopPropagation();
    });

    for(let i = len; i >= 0; i--){ //0-6
      randomArr.push(i);
    };
    randomArr.sort(function(){ //打乱数组
      return 0.5 - Math.random();
    });
    var offsetLeft,dragWidths = [],dragHeights = [],maxHeight = null,allWheight = [];
    for(let i = 0; i < this.dragImages.length; i++){
      dragWidths.push(this.dragImages[i].getBounds().width);
      dragHeights.push(this.dragImages[i].getBounds().height);
      allWheight.push(this.dragImages[i].getBounds().width);
      allWheight.push(this.dragImages[i].getBounds().height);
    }
    if(allWheight.length == dragWidths.length*2){
      maxHeight = Math.max.apply(null,allWheight) + this.dragPace; //+每个推拽obj相距30
      for(let i = 0; i < this.dragImages.length; i++){
        if(this.shapeWidth > dragWidths[i] && canvas.height > dragHeights[i]){
          offsetLeft = (this.shapeWidth - dragWidths[i])/2 + dragWidths[i]/2;
          this.dragImages[i].x = offsetLeft;
          this.dragImages[i].y = -maxHeight/2;
        } 
      } 
    }
    var oneScreenDrags = canvas.height / (maxHeight + this.dragPace);//一屏放的个数
    var dragLens = this.dragImages.length;//一共有有多少个
    var screenNum = dragLens / oneScreenDrags;//可以放几屏
    var drawHeight = canvas.height*screenNum;//滑动区域总高度

    function intervalFor(time,arr){
      var index = -1,imgPosi,n = 0;
      setTimeout(function(){
        index++;
        if(index < arr.length){
          setTimeout(arguments.callee,time);
          imgPosi = drawHeight - (maxHeight/2 + maxHeight*index + _this.dragPace);
        }else{
          // console.log("循环结束");
          return; 
        }
        cj.Tween.get(_this.dragImages[arr[index]],{loop:false}).wait(7000)
          .to({y:imgPosi}, 5000 -500*index, cj.Ease.linear)
          .call(function(){
            // console.log("运动结束回调");
            n++;
            if(n == arr.length){
              _this.dragCon.removeChild(alphaShape);
            }
          })
          
      },time);
    }
    intervalFor(1000,randomArr);
    Puzzle.dragArea(maxHeight,drawHeight);
  },
  isSuccess:function(index){//游戏完成，返回true 正确数量/正确数字
    var num = this.puzzleImage.length,set = [];
    this.indexArr.push(index);
    function unique(array){
      for(var i = 0, l = array.length; i<l; i++){
        for(var j = i + 1; j < l; j++)
            if(array[i] == array[j]) j == ++i;
        set.push(array[i]);
      }
    }
    unique(this.indexArr);
    if(num == set.length){
      this.puzzleImage = [];
      this.dragImages = []; 
      this.nowY = [];
      this.indexArr = [];
      return success = true;
    }
  }
}
var Puzzle = new Puzzle();