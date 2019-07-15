var gameAllConfig = {
  "manifest_magicalColor": [
    {src: "img/game_bg.jpg", id: "gameBg"},
    // {src:"img/huhu_out.png",id:"huhu-out"},
    // {src:"img/door.png",id:"load-door"},
    {src: "img/countDown.png", id: "countDown"},
    {src: "img/mask.png", id: "mask"},
    {src: "img/btn_jump.png", id: "jumpBtn"},
    {src: "img/btn_right.png", id: "rightBtn"},
    {src: "img/btn_left.png", id: "leftBtn"},
    {src: "img/btn_yellow.png", id: "yellow"},
    {src: "img/btn_yellow_down.png", id: "yellowDown"},
    {src: "img/btn_green.png", id: "green"},
    {src: "img/btn_green_down.png", id: "greenDown"},
    {src: "img/land.png", id: "land"},
    {src: "img/stand.png", id: "stand"},
    {src: "img/run.png", id: "run"},
    {src: "img/jump.png", id: "jump"},
    {src: "img/star.png", id: "star"},
  ],
  "levels": [
    {
      "name": "level1",
      "startLabel": 1,
      "backgroundColor": "#2db6b5", //绿
      "lands": [
        {
          "x": 0,
          "y": 450,
        },
        {
          "x": 128,
          "y": 450,
        },
        {
          "x": 256,
          "y": 450,
        },
        {
          "x": 384,
          "y": 450,
        },
        {
          "x": 512,
          "y": 450,
        },
        {
          "x": 640,
          "y": 450,
        },
        {
          "x": 768,
          "y": 450,
        },
        {
          "x": 896,
          "y": 450,
        }
      ],
      "buttons": [
        {
          "type": "green",
          "color": "#2db6b5",
          "x": 90,
          "y": 600,
          "label": 1,
        },
        {
          "type": "yellow",
          "color": "#f6de7b",
          "x": 200,
          "y": 600,
          "label": 2
        }
      ],
      "walls": [
        {
          "x": 600,
          "y": 322,
          "type": "portrait",
          "color": "#2db6b5",
          "label": 1
        },
        {
          "x": 300,
          "y": 322,
          "type": "portrait",
          "color": "#f6de7b",//黄
          "label": 2
        }
      ],
      "dodo": {
        "id": "dodo",
        "x": 120,
        "y": 370,
        "stand": "dodoStand",
        "run": "dodoRun",
        "jump": "dodoJump",
        "scale": -1
      },
      "star": {
        "id": "door",
        "x": 800,
        "y": 300,
      }
    },
    {
      "name": "level2",
      "startLabel": 2,
      "backgroundColor": "#f6de7b", //绿
      "lands": [
        {
          "x": 0,
          "y": 450,
        },
        {
          "x": 128,
          "y": 450,
        },
        {
          "x": 256,
          "y": 450
        },
        {
          "x": 384,
          "y": 350,
          "isBarrier": true
        },
        {
          "x": 512,
          "y": 450,
        },
        {
          "x": 640,
          "y": 450,
        },
        {
          "x": 768,
          "y": 450,
        },
        {
          "x": 896,
          "y": 450,
        }
      ],
      "buttons": [
        {
          "type": "green",
          "color": "#2db6b5",
          "x": 90,
          "y": 600,
          "label": 1,
        },
        {
          "type": "yellow",
          "color": "#f6de7b",
          "x": 200,
          "y": 600,
          "label": 2
        }
      ],
      "walls": [
        {
          "x": 675,
          "y": 322,
          "type": "portrait",
          "color": "#2db6b5",
          "label": 1
        },
        {
          "x": 256,
          "y": 400,
          "type": "landscape",
          "color": "#f6de7b",//黄
          "label": 2
        }
      ],
      "dodo": {
        "id": "dodo",
        "x": 120,
        "y": 370,
        "stand": "dodoStand",
        "run": "dodoRun",
        "jump": "dodoJump",
        "scale": -1
      },
      "star": {
        "id": "door",
        "x": 800,
        "y": 300,
      }
    }
  ]
}
