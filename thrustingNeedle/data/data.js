var spritesheets = new Array();
var gameAllConfig = {
  "name": "thrustingNeedle",
  "sndBgSrc": "snake_bg.mp3",
  "effectSoundsFile": "snake_game_effect.mp3",
  "effectData": [
    {'duration': 1150, 'id': 'broken', 'startTime': 0},
    {'duration': 4076, 'id': 'countDown', 'startTime': 1650},
    {'duration': 4703, 'id': 'gameover', 'startTime': 6226},
    {'duration': 575, 'id': 'snake_die', 'startTime': 11429},
    {'duration': 392, 'id': 'snake_eat', 'startTime': 12504},
    {'duration': 523, 'id': 'snake_graphical', 'startTime': 13396},
    {'duration': 601, 'id': 'snake_hit', 'startTime': 14419},
    {'duration': 2613, 'id': 'snake_yun', 'startTime': 15520}
  ],
  "loadManiFest": [
    {id: "load-door", src: "img/door.png"},
    {id: "replay-btn", src: "img/btn_replay.png"},
    {id: "home-btn", src: "img/btn_home.png"},
    {id: "snd-btn", src: "img/btn_snd.png"},
    {id: "nosnd-btn", src: "img/btn_nosnd.png"},
    {id: "replay-click", src: "img/replay_click.png"},
    {id: "home-click", src: "img/home_click.png"},
    {id: "pop", src: "img/pop.png"},
    {id: "sure", src: "img/sure.png"},
    {id: "cancel", src: "img/cancel.png"}
  ],
  "loadSprite": function () {
    spritesheets["load-door"] = new createjs.SpriteSheet({
      "images": [load_preload.getResult("load-door")],
      "frames": [
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
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
          next: false
        }
      },
    });
  },
  "rewardPosition": [
    [50, 85],//milk
    [50, 5],//juice
    [50, -100],//mineral
    [-85, 180],//end_home
    [83, 180]//end_replay
  ],
  "thrustingNeedle_manifest": [
    {src: "img/bg.png", id: "bg"},
    {src: "img/ball.png", id: "ball"},
    {src: "img/home.png", id: "end_home"},
    {src: "img/needle.png", id: "needle"},
    {src: "img/replay.png", id: "end_replay"},
    {src: "img/result.png", id: "result"},
    {src: "img/pop.png", id: "pop"},
    {src: "img/sure.png", id: "sure"},
    {src: "img/cancel.png", id: "cancel"},
  ],
  "totalTime": 60,
  "content": [{
    direction: "anticlockwise", // 逆时针
    numbers: [3, 4, 5, 6, 7, 8, 9],
    answers: [5, 6],
    answerIndex: [2, 3],
    grade: "easy"
  }, {
    direction: "clockwise", // 顺时针
    numbers: [2, 4, 6, 8, 10, 12, 14, 16],
    answers: [10, 12],
    answerIndex: [4, 5],
    grade: "normal"
  }, {
    direction: "clockwise", // 顺时针
    numbers: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23],
    answers: [7, 11, 17],
    answerIndex: [3, 5, 8],
    grade: "difficult"
  }]
}
