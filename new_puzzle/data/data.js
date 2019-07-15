var spritesheets = new Array();
var gameAllConfig = {
  "time": 0,
  "name":"puzzle",
  "sndBgSrc":"snake_bg.mp3",
  "effectSoundsFile":"sound_effect.mp3",
  "effectData":[
    {'duration': 1536, 'id': 'correct_1', 'startTime': 0}, //你太棒了
    {'duration': 1416, 'id': 'correct_2','startTime': 1736},  //你太聪明了
    {'duration': 1584, 'id': 'correct_3', 'startTime': 3352}, //哇哦完美
    {'duration': 960, 'id': 'correct_4','startTime': 5136}, 
    {'duration': 1584, 'id': 'correct_5', 'startTime': 6296}, //完全正确
    {'duration': 1296, 'id': 'correct_6','startTime': 8080}, //又答对了
    {'duration': 708, 'id': 'dadishudacuo', 'startTime': 9576}, 
    {'duration': 984, 'id': 'dadishudadui', 'startTime': 10484},
    {'duration': 432, 'id': 'diancuo', 'startTime': 11668}, 
    {'duration': 1680, 'id': 'diandui', 'startTime': 12300}, 
    {'duration': 2304, 'id': 'incorrect_1', 'startTime': 14180}, //哎不是这样诶
    {'duration': 2064, 'id': 'incorrect_2', 'startTime': 16684}, //好像不太对哦
    {'duration': 1320, 'id': 'incorrect_3', 'startTime': 18948}, //再试一次吧
    {'duration': 1392, 'id': 'incorrect_4','startTime': 20468}, //在想一想
    {'duration': 236, 'id': 'lianxiancuo', 'startTime': 22060},
    {'duration': 941, 'id': 'lianxiandui','startTime': 22496},
    {'duration': 1920, 'id': 'qiudao', 'startTime': 23637}, 
    {'duration': 2592, 'id': 'qiugun', 'startTime': 25757}, 
    {'duration': 912, 'id': 'shanggou', 'startTime': 28549}, 
    {'duration': 1596, 'id': 'shepian', 'startTime': 29661}, 
    {'duration': 1464, 'id': 'tuocuo', 'startTime': 31457}, 
    {'duration': 1728, 'id': 'tuodui', 'startTime': 33121}, 
    {'duration': 1704, 'id': 'wakuangshi', 'startTime': 35049}, 
    {'duration': 2328, 'id': 'zhongba', 'startTime': 36953}
  ],
  "loadMainFest":[
    {id:"load-door",src: "img/door.png"},
    {id:"replay-btn",src:"img/btn_replay.png"},
    {id:"home-btn",src:"img/btn_home.png"},
    {id:"snd-btn",src:"img/btn_snd.png"},
    {id:"nosnd-btn",src:"img/btn_nosnd.png"},
    {id:"replay-click",src:"img/replay_click.png"},
    {id:"home-click",src:"img/home_click.png"},
    {id:"pop", src :"img/pop.png"},
    {id:"sure", src:"img/sure.png"},
    {id:"cancle", src :"img/cancle.png"}
  ],
  "loadSprite":function(){ //游戏开始动画
    spritesheets["game-load"] = new createjs.SpriteSheet({
      "images":[load_preload.getResult("load-door")],
      "frames":[
        [1, 1, 1016, 632, 0, 0, 0],
        [1019, 1, 1016, 632, 0, 0, 0],
        [2037, 1, 1016, 632, 0, 0, 0],
        [3055, 1, 1016, 632, 0, 0, 0],
        [4073, 1, 1016, 632, 0, 0, 0],
        [5091, 1, 1016, 632, 0, 0, 0],
        [6109, 1, 1016, 632, 0, 0, 0],
        [7127, 1, 1016, 632, 0, 0, 0],
        [1, 635, 1016, 632, 0, 0, 0],
        [1019, 635, 1016, 632, 0, 0, 0],
        [2037, 635, 1016, 632, 0, 0, 0],
        [3055, 635, 1016, 632, 0, 0, 0],
        [4073, 635, 1016, 632, 0, 0, 0],
        [5091, 635, 1016, 632, 0, 0, 0],
        [6109, 635, 1016, 632, 0, 0, 0],
        [7127, 635, 1016, 632, 0, 0, 0],
        [1, 1269, 1016, 632, 0, 0, 0],
        [1019, 1269, 1016, 632, 0, 0, 0],
        [2037, 1269, 1016, 632, 0, 0, 0],
        [3055, 1269, 1016, 632, 0, 0, 0],
        [4073, 1269, 1016, 632, 0, 0, 0],
        [5091, 1269, 1016, 632, 0, 0, 0],
        [6109, 1269, 1016, 632, 0, 0, 0],
        [7127, 1269, 1016, 632, 0, 0, 0],
        [1, 1903, 1016, 632, 0, 0, 0],
        [1019, 1903, 1016, 632, 0, 0, 0],
        [2037, 1903, 1016, 632, 0, 0, 0],
        [3055, 1903, 1016, 632, 0, 0, 0],
        [4073, 1903, 1016, 632, 0, 0, 0],
        [5091, 1903, 1016, 632, 0, 0, 0],
        [6109, 1903, 1016, 632, 0, 0, 0],
        [7127, 1903, 1016, 632, 0, 0, 0],
        [1, 2537, 1016, 632, 0, 0, 0],
        [1019, 2537, 1016, 632, 0, 0, 0],
        [2037, 2537, 1016, 632, 0, 0, 0],
        [3055, 2537, 1016, 632, 0, 0, 0],
        [4073, 2537, 1016, 632, 0, 0, 0],
        [5091, 2537, 1020, 632, 0, 0, 0]
      ],
      'animations': {
        'play': { 'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37] ,next : false}
        },
    });
  },
  "loadSpriteInfo":{
    "scaleX":1.04,
    "scaleY":1.1
  },
  "rewardPosition":[  //结算页面内容显示
    [640,40],//牛奶
    [544,40],//饮料
    [450,40],//矿泉
    [450,200],//home
    [572,200] //重玩
  ],
  "puzzle_mainfest": [ //图片，动画 加载
    {src: "img/bg.png", id: "bg"},
    //游戏背景图
    {src: "img/puzzle_bg.png", id: "puzzle_bg"},
    //旋转按钮
    {src: "img/rotate_n.png", id: "nszBtn"},
    {src: "img/Rotate_s.png", id: "sszBtn"},
    {src: "img/drag_1.png", id: "drag_1"},
    {src: "img/drag_2.png", id: "drag_2"},
    {src: "img/drag_3.png", id: "drag_3"},
    {src: "img/drag_4.png", id: "drag_4"},
    {src: "img/drag_5.png", id: "drag_5"},
    {src: "img/drag_6.png", id: "drag_6"},
    {src: "img/drag_7.png", id: "drag_7"},
    //背景透明层
    {src: "img/img_1.png", id: "img_1"},
    {src: "img/img_2.png", id: "img_2"},
    {src: "img/img_3.png", id: "img_3"},
    {src: "img/img_4.png", id: "img_4"},
    {src: "img/img_5.png", id: "img_5"},
    {src: "img/img_6.png", id: "img_6"},
    {src: "img/img_7.png", id: "img_7"},

    {src: "img/timeBg.png", id:"timeBg"},
    {src: "img/target.png",id:"load-target"},
    {src: "img/result.png", id: "result"},
    {src: "img/circle.png", id: "circle"},
    {src: "img/numbers.png", id: "number"},
    {src: "img/huhu-right.png", id:"huhu-right"},
    {src: "img/door.png", id:"load-door"},
    {src: "img/end_replay.png", id:"end_replay"},
    {src: "img/end_home.png", id:"end_home"}
  ],

  "puzzle_spritesheets":function(){ //所有动画
    spritesheets["circle"] = new createjs.SpriteSheet({
      "images": [images["circle"]],
      "frames": [
        [1, 1, 210, 210, 0, 0, 0],
        [213, 1, 210, 210, 0, 0, 0],
        [425, 1, 210, 210, 0, 0, 0],
        [637, 1, 210, 210, 0, 0, 0],
        [849, 1, 210, 210, 0, 0, 0],
        [1061, 1, 210, 210, 0, 0, 0],
        [1273, 1, 210, 210, 0, 0, 0],
        [1485, 1, 210, 210, 0, 0, 0],
        [1697, 1, 210, 210, 0, 0, 0],
        [1909, 1, 210, 210, 0, 0, 0],
        [2121, 1, 210, 210, 0, 0, 0],
        [2333, 1, 210, 210, 0, 0, 0],
        [2545, 1, 210, 210, 0, 0, 0],
        [2757, 1, 210, 210, 0, 0, 0],
        [2969, 1, 210, 210, 0, 0, 0],
        [3181, 1, 210, 210, 0, 0, 0],
        [3393, 1, 210, 210, 0, 0, 0]
      ],
      "animations": {
        "play": {
          "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
          "speed": 1.1
        }
      },
    });
    spritesheets["number"] = new createjs.SpriteSheet({
      "images": [images["number"]],
      "frames": [
        [1, 1, 210, 210, 0, 0, 0],
        [213, 1, 210, 210, 0, 0, 0],
        [425, 1, 210, 210, 0, 0, 0],
        [637, 1, 210, 210, 0, 0, 0],
        [849, 1, 210, 210, 0, 0, 0],
        [1061, 1, 210, 210, 0, 0, 0],
        [1273, 1, 210, 210, 0, 0, 0],
        [1485, 1, 210, 210, 0, 0, 0],
        [1697, 1, 210, 210, 0, 0, 0],
        [1909, 1, 210, 210, 0, 0, 0],
        [2121, 1, 210, 210, 0, 0, 0],
        [2333, 1, 210, 210, 0, 0, 0],
        [2545, 1, 210, 210, 0, 0, 0],
        [2757, 1, 210, 210, 0, 0, 0],
        [2969, 1, 210, 210, 0, 0, 0],
        [3181, 1, 210, 210, 0, 0, 0],
        [3393, 1, 210, 210, 0, 0, 0],
        [3605, 1, 210, 210, 0, 0, 0],
        [3817, 1, 210, 210, 0, 0, 0],
        [4029, 1, 210, 210, 0, 0, 0],
        [4241, 1, 210, 210, 0, 0, 0],
        [4453, 1, 210, 210, 0, 0, 0],
        [4665, 1, 210, 210, 0, 0, 0],
        [4877, 1, 210, 210, 0, 0, 0],
        [5089, 1, 210, 210, 0, 0, 0],
        [5301, 1, 210, 210, 0, 0, 0],
        [5513, 1, 210, 210, 0, 0, 0],
        [5725, 1, 210, 210, 0, 0, 0],
        [5937, 1, 210, 210, 0, 0, 0],
        [6149, 1, 210, 210, 0, 0, 0],
        [6361, 1, 210, 210, 0, 0, 0],
        [6573, 1, 210, 210, 0, 0, 0],
        [6785, 1, 210, 210, 0, 0, 0],
        [6997, 1, 210, 210, 0, 0, 0],
        [7209, 1, 210, 210, 0, 0, 0],
        [7421, 1, 210, 210, 0, 0, 0],
        [7633, 1, 210, 210, 0, 0, 0],
        [7845, 1, 210, 210, 0, 0, 0],
        [8057, 1, 210, 210, 0, 0, 0],
        [8269, 1, 210, 210, 0, 0, 0],
        [8481, 1, 210, 210, 0, 0, 0],
        [8693, 1, 210, 210, 0, 0, 0],
        [8905, 1, 210, 210, 0, 0, 0],
        [9117, 1, 210, 210, 0, 0, 0],
        [9329, 1, 210, 210, 0, 0, 0],
        [9541, 1, 210, 210, 0, 0, 0],
        [9753, 1, 210, 210, 0, 0, 0],
        [9965, 1, 210, 210, 0, 0, 0],
        [10177, 1, 210, 210, 0, 0, 0],
        [10389, 1, 210, 210, 0, 0, 0],
        [10601, 1, 210, 210, 0, 0, 0],
        [10813, 1, 210, 210, 0, 0, 0],
        [11025, 1, 210, 210, 0, 0, 0],
        [11237, 1, 210, 210, 0, 0, 0],
        [11449, 1, 210, 210, 0, 0, 0],
        [11661, 1, 210, 210, 0, 0, 0],
        [11873, 1, 210, 210, 0, 0, 0],
        [12085, 1, 210, 210, 0, 0, 0],
        [12297, 1, 210, 210, 0, 0, 0],
        [12509, 1, 210, 210, 0, 0, 0],
        [12721, 1, 210, 210, 0, 0, 0],
        [12933, 1, 210, 210, 0, 0, 0],
        [13145, 1, 210, 210, 0, 0, 0],
        [13357, 1, 210, 210, 0, 0, 0],
        [13569, 1, 210, 210, 0, 0, 0],
        [13781, 1, 210, 210, 0, 0, 0],
        [13993, 1, 210, 210, 0, 0, 0],
        [14205, 1, 210, 210, 0, 0, 0],
        [14417, 1, 210, 210, 0, 0, 0],
        [14629, 1, 210, 210, 0, 0, 0],
        [14841, 1, 210, 210, 0, 0, 0],
        [15053, 1, 210, 210, 0, 0, 0],
        [15265, 1, 210, 210, 0, 0, 0],
        [15477, 1, 210, 210, 0, 0, 0],
        [15689, 1, 210, 210, 0, 0, 0],
        [15901, 1, 210, 210, 0, 0, 0]
      ],
      "animations": {
        "play": {
          "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
        }
      },
    });
    spritesheets["load-door"] = new createjs.SpriteSheet({
      "images":[images["load-door"]],
      "frames":[
        [1, 1, 1016, 632, 0, 0, 0],
        [1019, 1, 1016, 632, 0, 0, 0],
        [2037, 1, 1016, 632, 0, 0, 0],
        [3055, 1, 1016, 632, 0, 0, 0],
        [4073, 1, 1016, 632, 0, 0, 0],
        [5091, 1, 1016, 632, 0, 0, 0],
        [6109, 1, 1016, 632, 0, 0, 0],
        [7127, 1, 1016, 632, 0, 0, 0],
        [1, 635, 1016, 632, 0, 0, 0],
        [1019, 635, 1016, 632, 0, 0, 0],
        [2037, 635, 1016, 632, 0, 0, 0],
        [3055, 635, 1016, 632, 0, 0, 0],
        [4073, 635, 1016, 632, 0, 0, 0],
        [5091, 635, 1016, 632, 0, 0, 0],
        [6109, 635, 1016, 632, 0, 0, 0],
        [7127, 635, 1016, 632, 0, 0, 0],
        [1, 1269, 1016, 632, 0, 0, 0],
        [1019, 1269, 1016, 632, 0, 0, 0],
        [2037, 1269, 1016, 632, 0, 0, 0],
        [3055, 1269, 1016, 632, 0, 0, 0],
        [4073, 1269, 1016, 632, 0, 0, 0],
        [5091, 1269, 1016, 632, 0, 0, 0],
        [6109, 1269, 1016, 632, 0, 0, 0],
        [7127, 1269, 1016, 632, 0, 0, 0],
        [1, 1903, 1016, 632, 0, 0, 0],
        [1019, 1903, 1016, 632, 0, 0, 0],
        [2037, 1903, 1016, 632, 0, 0, 0],
        [3055, 1903, 1016, 632, 0, 0, 0],
        [4073, 1903, 1016, 632, 0, 0, 0],
        [5091, 1903, 1016, 632, 0, 0, 0],
        [6109, 1903, 1016, 632, 0, 0, 0],
        [7127, 1903, 1016, 632, 0, 0, 0],
        [1, 2537, 1016, 632, 0, 0, 0],
        [1019, 2537, 1016, 632, 0, 0, 0],
        [2037, 2537, 1016, 632, 0, 0, 0],
        [3055, 2537, 1016, 632, 0, 0, 0],
        [4073, 2537, 1016, 632, 0, 0, 0],
        [5091, 2537, 1020, 632, 0, 0, 0]
      ],
      'animations': {
        'play': { 'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37] ,next : false}
        },
    });
  }
}