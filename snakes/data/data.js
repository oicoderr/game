var spritesheets = new Array();
var gameAllConfig = {
  "name":"snakes",
  "sndBgSrc":"snake_bg.mp3",
  "effectSoundsFile":"snake_game_effect.mp3",
  "effectData":[
    {'duration': 1150, 'id': 'broken', 'startTime': 0},
    {'duration': 4076, 'id': 'countDown', 'startTime': 1650},
    {'duration': 4703, 'id': 'gameover', 'startTime': 6226},
    {'duration': 575, 'id': 'snake_die', 'startTime': 11429},
    {'duration': 392, 'id': 'snake_eat', 'startTime': 12504},
    {'duration': 523, 'id': 'snake_graphical', 'startTime': 13396},
    {'duration': 601, 'id': 'snake_hit', 'startTime': 14419},
    {'duration': 2613, 'id': 'snake_yun', 'startTime': 15520}
  ],
  "loadManiFest":[
    {id:"huhu-out",src:"img/huhu_out.png"},
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
  "loadSprite":function(){
    spritesheets["game-load"] = new createjs.SpriteSheet({
      "images": [load_preload.getResult("huhu-out")],
      "frames": [
        [1, 1, 233, 127, 0, 0, 0],
        [1, 130, 233, 127, 0, 0, 0],
        [1, 259, 233, 127, 0, 0, 0],
        [1, 388, 233, 127, 0, 0, 0],
        [1, 517, 233, 127, 0, 0, 0],
        [1, 646, 233, 127, 0, 0, 0],
        [1, 775, 233, 127, 0, 0, 0],
        [1, 904, 233, 127, 0, 0, 0],
        [1, 1033, 233, 127, 0, 0, 0],
        [1, 1162, 233, 127, 0, 0, 0],
        [1, 1291, 233, 127, 0, 0, 0],
        [1, 1420, 233, 127, 0, 0, 0]
      ],
      "animations": {
        "play": { "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],speed:1.4 }
      },
    });
  },
  "loadSpriteInfo":{
    "x":400,
    "y":300
  },
  "rewardPosition":[
    [650,420],//milk
    [540,420],//juice
    [440,420],//mineral
    [430,525],//end_home
    [590,525]//end_replay
  ],
  "snakes_mainfest": [
    {src:"img/snake_bg.jpg",id:"snake-bg"},
    {src:"img/scoreBlank.png",id:"scoreBlank"},
    {src:"img/graphBlank.png",id:"graphBlank"},
    {src:"img/huhu_out.png",id:"huhu-out"},
    {src:"img/door.png",id:"load-door"},
    {src:"img/blank.png",id:"snake-blank"},
    {src:"img/target.png",id:"snake-target"},
    {src:"img/snake/head_0.png",id:"snake-head0"},
    {src:"img/snake/body_0.png",id:"snake-body0"},
    {src:"img/snake/head_1.png",id:"snake-head1"},
    {src:"img/snake/body_1.png",id:"snake-body1"},
    {src:"img/snake/head_2.png",id:"snake-head2"},
    {src:"img/snake/body_2.png",id:"snake-body2"},
    {src:"img/snake/head_3.png",id:"snake-head3"},
    {src:"img/snake/body_3.png",id:"snake-body3"},
    {src:"img/snake/head_4.png",id:"snake-head4"},
    {src:"img/snake/body_4.png",id:"snake-body4"},
    {src:"img/snake/head_5.png",id:"snake-head5"},
    {src:"img/snake/body_5.png",id:"snake-body5"},
    {src:"img/ball/ball_0.png",id:"ball-0"},
    {src:"img/ball/ball_1.png",id:"ball-1"},
    {src:"img/ball/ball_2.png",id:"ball-2"},
    {src:"img/ball/ball_3.png",id:"ball-3"},
    {src:"img/ball/ball_4.png",id:"ball-4"},
    {src:"img/ball/ball_5.png",id:"ball-5"},
    {src:"img/ball/obstacle.png",id:"obstacle"},

    {src:"img/graphical/00.png",id:"graphical-00"},
    {src:"img/graphical/01.png",id:"graphical-01"},
    {src:"img/graphical/02.png",id:"graphical-02"},
    {src:"img/graphical/03.png",id:"graphical-03"},
    {src:"img/graphical/04.png",id:"graphical-04"},
    {src:"img/graphical/05.png",id:"graphical-05"},

    {src:"img/graphical/10.png",id:"graphical-10"},
    {src:"img/graphical/11.png",id:"graphical-11"},
    {src:"img/graphical/12.png",id:"graphical-12"},
    {src:"img/graphical/13.png",id:"graphical-13"},
    {src:"img/graphical/14.png",id:"graphical-14"},
    {src:"img/graphical/15.png",id:"graphical-15"},

    {src:"img/graphical/20.png",id:"graphical-20"},
    {src:"img/graphical/21.png",id:"graphical-21"},
    {src:"img/graphical/22.png",id:"graphical-22"},
    {src:"img/graphical/23.png",id:"graphical-23"},
    {src:"img/graphical/24.png",id:"graphical-24"},
    {src:"img/graphical/25.png",id:"graphical-25"},

    {src:"img/graphical/30.png",id:"graphical-30"},
    {src:"img/graphical/31.png",id:"graphical-31"},
    {src:"img/graphical/32.png",id:"graphical-32"},
    {src:"img/graphical/33.png",id:"graphical-33"},
    {src:"img/graphical/34.png",id:"graphical-34"},
    {src:"img/graphical/35.png",id:"graphical-35"},

    {src:"img/graphical/40.png",id:"graphical-40"},
    {src:"img/graphical/41.png",id:"graphical-41"},
    {src:"img/graphical/42.png",id:"graphical-42"},
    {src:"img/graphical/43.png",id:"graphical-43"},
    {src:"img/graphical/44.png",id:"graphical-44"},
    {src:"img/graphical/45.png",id:"graphical-45"},

    {src:"img/graphical/50.png",id:"graphical-50"},
    {src:"img/graphical/51.png",id:"graphical-51"},
    {src:"img/graphical/52.png",id:"graphical-52"},
    {src:"img/graphical/53.png",id:"graphical-53"},
    {src:"img/graphical/54.png",id:"graphical-54"},
    {src:"img/graphical/55.png",id:"graphical-55"},

    {src:"img/graphical/60.png",id:"graphical-60"},
    {src:"img/graphical/61.png",id:"graphical-61"},
    {src:"img/graphical/62.png",id:"graphical-62"},
    {src:"img/graphical/63.png",id:"graphical-63"},
    {src:"img/graphical/64.png",id:"graphical-64"},
    {src:"img/graphical/65.png",id:"graphical-65"},

    {src:"img/graphical/70.png",id:"graphical-70"},
    {src:"img/graphical/71.png",id:"graphical-71"},
    {src:"img/graphical/72.png",id:"graphical-72"},
    {src:"img/graphical/73.png",id:"graphical-73"},
    {src:"img/graphical/74.png",id:"graphical-74"},
    {src:"img/graphical/75.png",id:"graphical-75"},

    {src:"img/graphical/80.png",id:"graphical-80"},
    {src:"img/graphical/81.png",id:"graphical-81"},
    {src:"img/graphical/82.png",id:"graphical-82"},
    {src:"img/graphical/83.png",id:"graphical-83"},
    {src:"img/graphical/84.png",id:"graphical-84"},
    {src:"img/graphical/85.png",id:"graphical-85"},

    {src:"img/countDown.png",id:"countDown"},
    {src:"img/mask.png",id:"mask"},
    {src:"img/result.png",id:"result"},
    {src:"img/end_home.png",id:"end_home"},
    {src:"img/end_replay.png",id:"end_replay"},
    {src:"img/end/end-snake0.png",id:"end-snake0"},
    {src:"img/end/end-snake1.png",id:"end-snake1"},
    {src:"img/end/end-snake2.png",id:"end-snake2"},
    {src:"img/end/end-snake3.png",id:"end-snake3"},
    {src:"img/end/end-snake4.png",id:"end-snake4"},
    {src:"img/end/end-snake5.png",id:"end-snake5"},

  ],
  "snakes_spritesheets":function(){
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
    spritesheets["countDown"] = new createjs.SpriteSheet({
      "images":[images["countDown"]],
      "frames": [
        [1, 1, 318, 326, 0, 0, 0],
        [321, 1, 318, 326, 0, 0, 0],
        [641, 1, 318, 326, 0, 0, 0],
        [961, 1, 318, 326, 0, 0, 0],
        [1281, 1, 318, 326, 0, 0, 0],
        [1601, 1, 318, 326, 0, 0, 0],
        [1921, 1, 318, 326, 0, 0, 0],
        [2241, 1, 318, 326, 0, 0, 0],
        [2561, 1, 318, 326, 0, 0, 0],
        [2881, 1, 318, 326, 0, 0, 0],
        [3201, 1, 318, 326, 0, 0, 0],
        [3521, 1, 318, 326, 0, 0, 0],
        [3841, 1, 318, 326, 0, 0, 0],
        [4161, 1, 318, 326, 0, 0, 0],
        [4481, 1, 318, 326, 0, 0, 0],
        [4801, 1, 318, 326, 0, 0, 0],
        [5121, 1, 318, 326, 0, 0, 0],
        [5441, 1, 318, 326, 0, 0, 0],
        [5761, 1, 318, 326, 0, 0, 0],
        [6081, 1, 318, 326, 0, 0, 0],
        [6401, 1, 318, 326, 0, 0, 0],
        [6721, 1, 318, 326, 0, 0, 0],
        [7041, 1, 318, 326, 0, 0, 0],
        [7361, 1, 318, 326, 0, 0, 0],
        [7681, 1, 318, 326, 0, 0, 0],
        [8001, 1, 318, 326, 0, 0, 0],
        [8321, 1, 318, 326, 0, 0, 0],
        [8641, 1, 318, 326, 0, 0, 0],
        [8961, 1, 318, 326, 0, 0, 0],
        [9281, 1, 318, 326, 0, 0, 0],
        [9601, 1, 318, 326, 0, 0, 0],
        [9921, 1, 318, 326, 0, 0, 0],
        [10241, 1, 318, 326, 0, 0, 0],
        [10561, 1, 318, 326, 0, 0, 0],
        [10881, 1, 318, 326, 0, 0, 0],
        [11201, 1, 318, 326, 0, 0, 0],
        [11521, 1, 318, 326, 0, 0, 0],
        [11841, 1, 318, 326, 0, 0, 0],
        [12161, 1, 318, 326, 0, 0, 0],
        [12481, 1, 318, 326, 0, 0, 0],
        [12801, 1, 318, 326, 0, 0, 0],
        [13121, 1, 318, 326, 0, 0, 0],
        [13441, 1, 318, 326, 0, 0, 0],
        [13761, 1, 318, 326, 0, 0, 0],
        [14081, 1, 318, 326, 0, 0, 0]
      ],
      "animations": {
        "play": { "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],speed:1.2 }
      },
    });
    spritesheets["obstacle"] = new createjs.SpriteSheet({
      "images":[images["obstacle"]],
      "frames": [
        [1, 1, 75, 74, 0, 0, 0],
        [78, 1, 75, 74, 0, 0, 0],
        [155, 1, 75, 74, 0, 0, 0],
        [232, 1, 75, 74, 0, 0, 0],
        [309, 1, 75, 74, 0, 0, 0],
        [386, 1, 75, 74, 0, 0, 0],
        [463, 1, 75, 74, 0, 0, 0],
        [540, 1, 75, 74, 0, 0, 0],
        [617, 1, 75, 74, 0, 0, 0],
        [694, 1, 75, 74, 0, 0, 0],
        [771, 1, 75, 74, 0, 0, 0],
        [848, 1, 75, 74, 0, 0, 0],
        [925, 1, 75, 74, 0, 0, 0],
        [1002, 1, 75, 74, 0, 0, 0],
        [1079, 1, 75, 74, 0, 0, 0],
        [1156, 1, 75, 74, 0, 0, 0],
        [1233, 1, 75, 74, 0, 0, 0],
        [1310, 1, 75, 74, 0, 0, 0],
        [1387, 1, 75, 74, 0, 0, 0],
        [1464, 1, 75, 74, 0, 0, 0],
        [1541, 1, 75, 74, 0, 0, 0],
        [1618, 1, 75, 74, 0, 0, 0],
        [1695, 1, 75, 74, 0, 0, 0],
        [1772, 1, 75, 74, 0, 0, 0],
        [1849, 1, 75, 74, 0, 0, 0]
      ],

      "animations": {
        "stop":{"frames":[0]},
        "huang": { "frames": [ 1, 2, 3, 4, 5, 6] },
        "broken":{ "frames":[ 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]}

      },
    });
  }
}
