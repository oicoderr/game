var puzzleImage = [],dragImages = [],initAngle = 0,passN = 3,
behavior = { //操作行为
  "isClick":false,
  "isMove":false,
  "isUp":false
},
dragPrompt = {
  "num":3,
};
function puzzle() {
  this.puzzleCon =  new createjs.Container();
  this.puzzleCon.name = "puzzleContainer";
  this.puzzleCon.x = 0;this.puzzleCon.y = 0;
  game_current.addChild(this.puzzleCon);
  // game_current.setChildIndex(this.puzzleCon,4)

}
puzzle.prototype = {
  init:function(bgSrcId,dragSrcId,puzzleImageXy,dragImagesXy,isReg){ //处理背景图/推拽图等拼接.  puzzleImage,dragImages,puzzleImageXy,dragImagesXy,isReg.  
    if(bgSrcId && dragSrcId){//2个for解决拖拽图在bg层上面
      for(let i = 0;i < bgSrcId.length; i++){
        this.bgObj = new createjs.Bitmap(images[bgSrcId[i]]);
        puzzleImage.push(this.bgObj);
        this.puzzleCon.addChild(this.bgObj);
      }
      for(let i = 0;i < dragSrcId.length; i++){
        this.dragObj = new createjs.Bitmap(images[dragSrcId[i]]);
        dragImages.push(this.dragObj);
        this.puzzleCon.addChild(this.dragObj);
      }
    }
  
    console.log(dragImages)
    var len = puzzleImage.length;
    for (let i = 0; i < len; i++) {
      if(isReg){
        puzzleImage[i].regX = puzzleImage[i].getBounds().width/2;
        puzzleImage[i].regY = puzzleImage[i].getBounds().height/2;
        dragImages[i].regX = dragImages[i].getBounds().width/2;
        dragImages[i].regY = dragImages[i].getBounds().height/2;
      }else{
        puzzleImage[i].x = 100;
        puzzleImage[i].y = 100;
        dragImages[i].x = 200;
        dragImages[i].y = 100;
      }
    }
    puzzle.drag(puzzleImage,dragImages);
  },
  drag:function(bg,drg){
    for(let i = 0;i < drg.length; i++){
      drg[i].index = i;
      drg[i].on("mousedown",function(evt){
        evt.stopPropagation();
        console.log(this)
      })
    }
  }
}
var puzzle = new puzzle();
// puzzle.init(bgs,drags);
//c1:背景图对象数组 c2:拖拽图片对象数组 c3:背景图默认x,y c4:拖拽图默认x,y,[{}] c5:是否设置regXy,1true 0false