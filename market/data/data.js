var gameAllConfig = {
  "content": {
    "market":{
      "type":"gameMarket",
      "background":{
        "type":"bitmap",
        "id":"gameMarket-bg"
      },
      "episodes":[
        {
          "sound":"qgameMarket",
          "core":{
            "type":"bitmap",
            "id":"gameMarket-core",
            "x":512,
            "y":225,
            "label":1
          },
          "moveObj":{
            "type":"sprite",
            "id":"gameMarket-car"
          },
          "sure":{
            "type":"bitmap",
            "id":"animals-cat"
          },
          "switchSprite":{
            "type":"sprite",
            "id":"load-door"
          },
          "sceneOne":[
            {
              "type": "bitmap",
              "id": "gameMarket-left",
              "x": 200,
              "y": 520,
              "targetImg":{
                "type":"bitmap",
                "id":"gameMarket-left1",
                "label":-1
              }
            },
            {
              "type": "bitmap",
              "id": "gameMarket-middle",
              "x": 500,
              "y": 520,
              "targetImg":{
                "type":"bitmap",
                "id":"gameMarket-middle1",
                "label":1
              }
            },
            {
              "type": "bitmap",
              "id": "gameMarket-right",
              "x": 800,
              "y": 520,
              "targetImg":{
                "type":"bitmap",
                "id":"gameMarket-right1",
                "label":0
              }
            }
          ],
          "sceneTwo":{
            "subBackground":{
              "type":"bitmap",
              "id":"gameMarket-subBg"
            },
            "srcImgs": [
              {
                "id": "gameMarket-1",
                "type": "bitmap",
                "x": 150,
                "y": 500,
                "label": 1
              },
              {
                "id": "gameMarket-2",
                "type": "bitmap",
                "x": 310,
                "y": 500,
                "label": 2
              },
              {
                "id": "gameMarket-3",
                "type": "bitmap",
                "x": 450,
                "y": 500,
                "label": 3
              },
              {
                "id": "gameMarket-4",
                "type": "bitmap",
                "x": 600,
                "y": 500,
                "label": 4
              },
              {
                "id": "gameMarket-5",
                "type": "bitmap",
                "x": 740,
                "y": 500,
                "label": 5
              },
              {
                "id": "gameMarket-6",
                "type": "bitmap",
                "x": 860,
                "y": 500,
                "label": 6
              }
            ],
            "desImgs": [
              {
                "id": "gameMarket-1T",
                "type": "bitmap",
                "x": 522,
                "y": 317,
                "label": 1
              },
              {
                "id": "gameMarket-2T",
                "type": "bitmap",
                "x": 680,
                "y": 289,
                "label": 2
              },
              {
                "id": "gameMarket-3T",
                "type": "bitmap",
                "x": 520,
                "y": 123,
                "label": 3
              },
              {
                "id": "gameMarket-4T",
                "type": "bitmap",
                "x": 522,
                "y": 215,
                "label": 4
              },
              {
                "id": "gameMarket-5T",
                "type": "bitmap",
                "x": 522,
                "y": 225,
                "label": 5
              },
              {
                "id": "gameMarket-6T",
                "type": "bitmap",
                "x": 360,
                "y": 288,
                "label": 6
              }
            ],
            "rightDrag": 6
          }
        }
      ]
    }
  },
  "market_manifest": [
    {src: "img/gameMarket/door.png", id:"gameMarket-door"},
    {src: "img/gameMarket/car.png", id:"gameMarket-car"},
    {src: "img/gameMarket/bg.jpg", id:"gameMarket-bg"},
    {src: "img/gameMarket/question-one/core.png", id:"gameMarket-core"},
    {src: "img/gameMarket/question-one/left1.png", id:"gameMarket-left1"},
    {src: "img/gameMarket/question-one/middle.png", id:"gameMarket-middle1"},
    {src: "img/gameMarket/question-one/right3.png", id:"gameMarket-right1"},
    {src: "img/gameMarket/question-one/sanjiao.png", id:"gameMarket-middle"},
    {src: "img/gameMarket/question-one/right.png", id:"gameMarket-right"},
    {src: "img/gameMarket/question-one/square.png", id:"gameMarket-left"},
    {src: "img/gameMarket/question-one/scene2/1.png", id:"gameMarket-1"},
    {src: "img/gameMarket/question-one/scene2/1T.png", id:"gameMarket-1T"},
    {src: "img/gameMarket/question-one/scene2/2.png", id:"gameMarket-2"},
    {src: "img/gameMarket/question-one/scene2/2T.png", id:"gameMarket-2T"},
    {src: "img/gameMarket/question-one/scene2/3.png", id:"gameMarket-3"},
    {src: "img/gameMarket/question-one/scene2/3T.png", id:"gameMarket-3T"},
    {src: "img/gameMarket/question-one/scene2/4.png", id:"gameMarket-4"},
    {src: "img/gameMarket/question-one/scene2/4T.png", id:"gameMarket-4T"},
    {src: "img/gameMarket/question-one/scene2/5.png", id:"gameMarket-5"},
    {src: "img/gameMarket/question-one/scene2/5T.png", id:"gameMarket-5T"},
    {src: "img/gameMarket/question-one/scene2/6.png", id:"gameMarket-6"},
    {src: "img/gameMarket/question-one/scene2/6T.png", id:"gameMarket-6T"},
    {src: "img/gameMarket/question-one/scene2/01T.png", id:"gameMarket-01T"},
    {src: "img/gameMarket/question-one/scene2/02T.png", id:"gameMarket-02T"},
    {src: "img/gameMarket/question-one/scene2/03T.png", id:"gameMarket-03T"},
    {src: "img/gameMarket/question-one/scene2/04T.png", id:"gameMarket-04T"},
    {src: "img/gameMarket/question-one/scene2/05T.png", id:"gameMarket-05T"},
    {src: "img/gameMarket/question-one/scene2/06T.png", id:"gameMarket-06T"},
    {src: "img/gameMarket/question-one/scene2/subBg.jpg", id:"gameMarket-subBg"},
    {src: "img/gameMarket/question-one/cat.png", id:"animals-cat"},

  ],
}
