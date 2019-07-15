var spritesheets = new Array();
var gameAllConfig = {
  "name": "planWater",
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
    [52, 65],//milk
    [54, -10],//juice
    [54, -113],//mineral
    [-75, 170],//end_home
    [80, 170]//end_replay
  ],
  "planWater_manifest": [
    {src: "img/bg.png", id: "bg"},
    {src: "img/result.png", id: "result"},
    {src: "img/end_home.png", id: "end_home"},
    {src: "img/end_replay.png", id: "end_replay"},
    {src: "img/sure.png", id: "sure"},
    {src: "img/cancel.png", id: "cancel"},
    {src: "img/pop.png", id: "pop"},
    {src: "img/flow.png", id: "flow"},
    {src: "img/full.png", id: "full"},
    {src: "img/downLeftFlow.png", id: "downLeftFlow"},
    {src: "img/water.png", id: "water"},
    {src: "img/o.png", id: "o"},
    {src: "img/x.png", id: "x"},
    {src: "img/pipe_downLeft.png", id: "pipeDL"},
    {src: "img/pipe_downRight.png", id: "pipeDR"},
    {src: "img/pipe_horizontal.png", id: "pipeH"},
    {src: "img/pipe_vertical.png", id: "pipeV"},
    {src: "img/huhu-anxious.png", id: "huhu-anxious"},
    {src: "img/huhu-drink.png", id: "huhu-drink"},
    {src: "img/huhu-slip.png", id: "huhu-slip"},
    {src: "img/huhu-bling.png", id: "huhu-bling"},
    {src: "img/huhu.png", id: "huhu"},
    {src: "img/huhu-happy.png", id: "huhu-happy"},
    {src: "img/circle.png", id: "circle"},
    {src: "img/numbers.png", id: "number"}
  ],
  "totalTime": 90,
  "content": [
    {
      buckets: [
        {
          id: "bucket1",
          isDown: true,
          isFull: true,
          x: 152,
          y: 119,
          label: 3,
          isAnswer: false
        }, {
          id: "bucket2",
          isDown: true,
          isFull: true,
          x: 442,
          y: 119,
          label: 3,
          isAnswer: false
        }, {
          id: "bucket3",
          isDown: false,
          isFull: false,
          x: 260,
          y: 440,
          label: 2,
          scaleX: 1,
          isAnswer: false
        }
      ],
      basins: [
        {
          id: "basin1",
          x: 390,
          y: 607,
          isAnswer: true,
          label: 4
        }],
      pipes: [
        {
          type: "pipeDL",
          x: 463,
          y: 281.7
        }, {
          type: "pipeDR",
          x: 186.5,
          y: 326.5
        }, {
          type: "pipeV",
          x: 172,
          y: 229
        }, {
          type: "pipeV",
          x: 172,
          y: 274.5
        }, {
          type: "pipeV",
          x: 462.5,
          y: 229
        }, {
          type: "pipeH",
          x: 411.7,
          y: 282.2
        }, {
          type: "pipeH",
          x: 364.5,
          y: 281.6
        }],
      answers: [
        {
          label: 1,
          y: 117
        }, {
          label: 2,
          y: 203
        }, {
          label: 3,
          y: 285
        }, {
          label: 4,
          y: 368
        }, {
          label: 6,
          y: 450
        }, {
          label: 7,
          y: 530
        }],
      flows: [
        {
          id: "flow1",
          type: "downLeftFlow",
          scaleX: -1,
          x: 186,
          y: 293,
          height: 194
        }, {
          id: "flow2",
          type: "downLeftFlow",
          scaleX: 1,
          x: 265,
          y: 247,
          height: 238
        }, {
          id: "flow3",
          type: "downLeftFlow",
          scaleX: -1,
          x: 346,
          y: 405,
          height: 238
        }],
      orders: [
        {
          id: "flow1",
          type: "flow",
          time: 500
        }, {
          id: "flow2",
          type: "flow",
          time: 600
        }, {
          id: "flow3",
          type: "flow",
          time: 1550
        }, {
          id: "bucket3",
          type: "bucket",
          time: 800
        }, {
          id: "basin1",
          type: "basin",
          time: 1500,
          upTime: 1500
        }],
      huhu: {
        x: 271,
        y: 463,
      }
    },
    {
      buckets: [
        {
          id: "bucket1",
          isDown: true,
          isFull: true,
          x: 152,
          y: 119,
          label: 8,
          isAnswer: false
        }, {
          id: "bucket2",
          isDown: true,
          isFull: true,
          x: 442,
          y: 119,
          label: 2,
          isAnswer: false
        }, {
          id: "bucket3",
          isDown: false,
          isFull: false,
          x: 260,
          y: 440,
          scaleX: 1,
          label: 3,
          isAnswer: false
        }
      ],
      basins: [
        {
          id: "basin1",
          x: 403,
          y: 582,
          isAnswer: true,
          label: 7
        }],
      pipes: [
        {
          type: "pipeDR",
          x: 186.5,
          y: 326.5
        }, {
          type: "pipeV",
          x: 172,
          y: 229
        }, {
          type: "pipeV",
          x: 172,
          y: 274.5
        }, {
          type: "pipeV",
          x: 462.5,
          y: 229
        }, {
          type: "pipeV",
          x: 462.5,
          y: 277
        }, {
          type: "pipeV",
          x: 462.5,
          y: 326
        }, {
          type: "pipeV",
          x: 462.5,
          y: 374
        }],
      answers: [
        {
          label: 1,
          y: 117
        }, {
          label: 4,
          y: 203
        }, {
          label: 3,
          y: 285
        }, {
          label: 6,
          y: 368
        }, {
          label: 7,
          y: 450
        }, {
          label: 9,
          y: 530
        }],
      flows: [
        {
          id: "flow1",
          type: "downLeftFlow",
          scaleX: -1,
          x: 186,
          y: 293,
          height: 194
        }, {
          id: "flow2",
          type: "flow",
          scaleX: 1,
          x: 415,
          y: 375,
          height: 243
        }, {
          id: "flow3",
          type: "downLeftFlow",
          scaleX: -1,
          x: 346,
          y: 405,
          height: 212
        }],
      orders: [{
        id: "flow1",
        type: "flow",
        time: 500
      }, {
        id: "flow2",
        type: "flow",
        time: 400
      }, {
        id: "flow3",
        type: "flow",
        time: 1550
      }, {
        id: "bucket3",
        type: "bucket",
        time: 800
      }, {
        id: "basin1",
        type: "basin",
        time: 600,
        upTime: 2500
      }],
      huhu: {
        x: 281,
        y: 438,
      }
    },
    {
      buckets: [
        {
          id: "bucket1",
          isDown: true,
          isFull: true,
          x: 152,
          y: 120,
          scaleX: 1,
          label: 2,
          isAnswer: false
        }, {
          id: "bucket2",
          isDown: true,
          isFull: true,
          x: 410,
          y: 120,
          scaleX: 1,
          label: 5,
          isAnswer: false
        }, {
          id: "bucket3",
          isDown: true,
          isFull: true,
          x: 594,
          y: 120,
          scaleX: 1,
          label: 4,
          isAnswer: false
        }, {
          id: "bucket4",
          isDown: false,
          isFull: false,
          x: 249,
          y: 437,
          scaleX: 1,
          label: 3,
          isAnswer: false
        }, {
          id: "bucket5",
          isDown: false,
          isFull: false,
          x: 546,
          y: 372,
          scaleX: -1,
          label: 3,
          isAnswer: false
        }
      ],
      basins: [
        {
          id: "basin1",
          x: 418,
          y: 582,
          isAnswer: true,
          order: 3,
          label: 5
        }],
      pipes: [
        {
          type: "pipeDR",
          x: 186.5,
          y: 326.5
        }, {
          type: "pipeV",
          x: 172,
          y: 229
        }, {
          type: "pipeV",
          x: 172,
          y: 274.5
        }, {
          type: "pipeV",
          x: 429,
          y: 229
        }, {
          type: "pipeV",
          x: 429,
          y: 277
        }, {
          type: "pipeH",
          x: 378,
          y: 326
        }, {
          type: "pipeH",
          x: 339,
          y: 326
        }, {
          type: "pipeH",
          x: 384,
          y: 436
        }, {
          type: "pipeDL",
          x: 429,
          y: 326
        }],
      answers: [
        {
          label: 1,
          y: 117
        }, {
          label: 4,
          y: 203
        }, {
          label: 5,
          y: 285
        }, {
          label: 7,
          y: 368
        }, {
          label: 8,
          y: 450
        }, {
          label: 9,
          y: 530
        }],
      flows: [
        {
          id: "flow1",
          type: "downLeftFlow",
          scaleX: -1,
          x: 186,
          y: 293,
          height: 190
        }, {
          id: "flow2",
          type: "downLeftFlow",
          scaleX: 1,
          x: 238,
          y: 300,
          height: 180
        }, {
          id: "flow3",
          type: "flow",
          scaleX: 1,
          x: 565,
          y: 175,
          height: 240
        }, {
          id: "flow4",
          type: "downLeftFlow",
          scaleX: 1,
          x: 415,
          y: 340,
          height: 275
        }, {
          id: "flow5",
          type: "downLeftFlow",
          scaleX: -1,
          x: 383,
          y: 405,
          height: 228
        }],
      orders: [{
        id: "flow1",
        type: "flow",
        time: 500
      }, {
        id: "flow2",
        type: "flow",
        time: 400
      }, {
        id: "flow3",
        type: "flow",
        time: 1
      }, {
        id: "flow4",
        type: "flow",
        time: 1550
      }, {
        id: "flow5",
        type: "flow",
        time: 1550
      }, {
        id: "bucket4",
        type: "bucket",
        time: 800
      }, {
        id: "bucket5",
        type: "bucket",
        time: 800
      }, {
        id: "basin1",
        type: "basin",
        time: 2000,
        upTime: 1300
      }],
      huhu: {
        x: 296,
        y: 440,
      }
    }
  ],
  "planWater_spritesheets": function() {
    spritesheets["flow"] = new createjs.SpriteSheet({
      "images": [images["flow"]],
      "frames": [
        [1, 1, 32, 331, 0, 0, 0],
        [35, 1, 32, 331, 0, 0, 0],
        [69, 1, 32, 331, 0, 0, 0],
        [103, 1, 32, 331, 0, 0, 0],
        [137, 1, 32, 331, 0, 0, 0],
        [171, 1, 32, 331, 0, 0, 0],
        [205, 1, 32, 331, 0, 0, 0],
        [239, 1, 32, 331, 0, 0, 0],
        [273, 1, 32, 331, 0, 0, 0],
        [307, 1, 32, 331, 0, 0, 0],
        [341, 1, 32, 331, 0, 0, 0],
        [375, 1, 32, 331, 0, 0, 0],
        [409, 1, 32, 331, 0, 0, 0],
        [443, 1, 32, 331, 0, 0, 0],
        [477, 1, 32, 331, 0, 0, 0],
        [511, 1, 32, 331, 0, 0, 0],
        [545, 1, 32, 331, 0, 0, 0],
        [579, 1, 32, 331, 0, 0, 0],
        [613, 1, 32, 331, 0, 0, 0],
        [647, 1, 32, 331, 0, 0, 0]
      ],
      "animations": {
        "play": {
          "frames": [0, 1, 2, 3, 4, 5],
          "next": "keep",
          speed: 0.8
        },
        "keep": {
          "frames": [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
          "next": "end",
          speed: 0.8
        },
        "end": {
          "frames": [16, 17, 18, 19, 20],
          "next": false,
          speed: 0.8
        }
      },
    });
    spritesheets["downLeftFlow"] = new createjs.SpriteSheet({
      "images": [images["downLeftFlow"]],
      "frames": [
        [1, 1, 50, 405, 0, 0, 0],
        [53, 1, 50, 405, 0, 0, 0],
        [105, 1, 50, 405, 0, 0, 0],
        [157, 1, 50, 405, 0, 0, 0],
        [209, 1, 50, 405, 0, 0, 0],
        [261, 1, 50, 405, 0, 0, 0],
        [313, 1, 50, 405, 0, 0, 0],
        [365, 1, 50, 405, 0, 0, 0],
        [417, 1, 50, 405, 0, 0, 0],
        [469, 1, 50, 405, 0, 0, 0],
        [521, 1, 50, 405, 0, 0, 0],
        [573, 1, 50, 405, 0, 0, 0],
        [625, 1, 50, 405, 0, 0, 0],
        [677, 1, 50, 405, 0, 0, 0],
        [729, 1, 50, 405, 0, 0, 0],
        [781, 1, 50, 405, 0, 0, 0],
        [833, 1, 50, 405, 0, 0, 0],
        [885, 1, 50, 405, 0, 0, 0],
        [937, 1, 50, 405, 0, 0, 0],
        [989, 1, 50, 405, 0, 0, 0],
        [1041, 1, 50, 405, 0, 0, 0],
        [1093, 1, 50, 405, 0, 0, 0]
      ],
      "animations": {
        "play": {
          "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
          "next": false,
          speed: 0.8
        }
      },
    });
    spritesheets["huhu-anxious"] = new createjs.SpriteSheet({
      "images": [images["huhu-anxious"]],
      "frames": [
        [1, 1, 371, 218, 0, 0, 0],
        [374, 1, 371, 218, 0, 0, 0],
        [747, 1, 371, 218, 0, 0, 0]
      ],
      "animations": {
        "play": {
          "frames": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
          speed: 0.9,
          next: false
        }
      }
    });
    spritesheets["huhu-drink"] = new createjs.SpriteSheet({
      "images": [images["huhu-drink"]],
      "frames": [
        [1, 1, 371, 218, 0, 0, 0],
        [1, 221, 371, 218, 0, 0, 0],
        [1, 441, 371, 218, 0, 0, 0],
        [1, 661, 371, 218, 0, 0, 0],
        [1, 881, 371, 218, 0, 0, 0],
        [1, 1101, 371, 218, 0, 0, 0],
        [1, 1321, 371, 218, 0, 0, 0]
      ],
      "animations": {
        "play": {
          "frames": [0, 1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 6],
          next: false
        }
      }
    });
    spritesheets["huhu-slip"] = new createjs.SpriteSheet({
      "images": [images["huhu-slip"]],
      "frames": [
        [1, 1, 371, 218, 0, 0, 0],
        [374, 1, 371, 218, 0, 0, 0],
        [747, 1, 371, 218, 0, 0, 0],
        [1120, 1, 371, 218, 0, 0, 0],
        [1493, 1, 371, 218, 0, 0, 0],
        [1866, 1, 371, 218, 0, 0, 0],
        [2239, 1, 371, 218, 0, 0, 0],
        [2612, 1, 371, 218, 0, 0, 0],
        [2985, 1, 371, 218, 0, 0, 0],
        [3358, 1, 371, 218, 0, 0, 0],
        [3731, 1, 371, 218, 0, 0, 0],
        [4104, 1, 371, 218, 0, 0, 0],
        [4477, 1, 371, 218, 0, 0, 0],
        [4850, 1, 371, 218, 0, 0, 0],
        [5223, 1, 371, 218, 0, 0, 0],
        [5596, 1, 371, 218, 0, 0, 0]
      ],
      "animations": {
        "play": {
          "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
          next: false,
          speed: 0.9
        }
      }
    });
    spritesheets["huhu-bling"] = new createjs.SpriteSheet({
      "images": [images["huhu-bling"]],
      "frames": [
        [1, 1, 150, 150, 0, 0, 0],
        [153, 1, 150, 150, 0, 0, 0],
        [305, 1, 150, 150, 0, 0, 0],
        [457, 1, 150, 150, 0, 0, 0],
        [609, 1, 150, 150, 0, 0, 0],
        [761, 1, 150, 150, 0, 0, 0],
        [913, 1, 150, 150, 0, 0, 0],
        [1065, 1, 150, 150, 0, 0, 0],
        [1217, 1, 150, 150, 0, 0, 0]
      ],
      "animations": {
        "play": {
          "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8],
          next: false,
          speed: 1
        }
      }
    });
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
  }
}
