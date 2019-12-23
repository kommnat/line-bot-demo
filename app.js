// Reply with two static messages

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/webhook', (req, res) => {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.sendStatus(200) 
    // console.log('Hello World');
})

app.post('/webhook', (req, res) => {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    if(msg == 'chelsea' || msg == 'Chelsea' ){
        reply(reply_token, msg)
    }else if(msg == 'list' || msg == 'list'){
        reply1(reply_token, msg)
    }
    
    res.sendStatus(200)
})
app.listen(port)

function reply(reply_token ,msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {tXOxbBNHDvyxUTITtlUkErraVe0AtpyFeb8Shb3+33rcl826FIjNK6eoMvgfU/6Fnmj1h9nNG6Km+ZeN6YG9BFg5phdOAhZscsvKT23QR8i6lr4f112jGMLQqLG/1mwQrQCJANMtk/SqfnhPjiy2gAdB04t89/1O/w1cDnyilFU=}'
    }  
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            'type': 'image',
            'originalContentUrl': 'https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100',
            'previewImageUrl': 'https://upload.wikimedia.org/wikipedia/th/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png'
        },]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function reply1(reply_token ,msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {tXOxbBNHDvyxUTITtlUkErraVe0AtpyFeb8Shb3+33rcl826FIjNK6eoMvgfU/6Fnmj1h9nNG6Km+ZeN6YG9BFg5phdOAhZscsvKT23QR8i6lr4f112jGMLQqLG/1mwQrQCJANMtk/SqfnhPjiy2gAdB04t89/1O/w1cDnyilFU=}'
    }  
    let body = JSON.stringify({
        replyToken: reply_token,
       
        messages: [ {
            "type": "flex",
            "altText": "Flex Message",
            "contents": {
              "type": "bubble",
              "direction": "ltr",
              "header": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "baseline",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "text",
                        "text": "สถานะ",
                        "flex": 2,
                        "size": "lg",
                        "weight": "bold",
                        "color": "#AAAAAA"
                      },
                      {
                        "type": "text",
                        "text": "รอดำเนินการ",
                        "flex": 5,
                        "size": "lg",
                        "weight": "bold",
                        "color": "#666666",
                        "wrap": true
                      }
                    ]
                  }
                ]
              },
              "hero": {
                "type": "image",
                "url": "https://news.mthai.com/app/uploads/2019/09/cropped-%E0%B8%A3%E0%B8%93%E0%B8%A3%E0%B8%87%E0%B8%84%E0%B9%8C%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%9A%E0%B8%82%E0%B8%A2%E0%B8%B0_190921_0010.jpg",
                "size": "full",
                "aspectRatio": "1.51:1",
                "aspectMode": "fit"
              },
              "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "margin": "lg",
                    "contents": [
                      {
                        "type": "box",
                        "layout": "baseline",
                        "spacing": "sm",
                        "contents": [
                          {
                            "type": "text",
                            "text": "ประเภท",
                            "flex": 2,
                            "size": "lg",
                            "weight": "bold",
                            "color": "#AAAAAA",
                            "action": {
                              "type": "message",
                              "label": "เปลี่ยนประเภท",
                              "text": "เปลี่ยนประเภทของ ขยะนอกถังมาเก็บด้วย"
                            }
                          },
                          {
                            "type": "text",
                            "text": "ขยะ",
                            "flex": 5,
                            "size": "lg",
                            "weight": "bold",
                            "color": "#666666",
                            "wrap": true
                          }
                        ]
                      },
                      {
                        "type": "box",
                        "layout": "baseline",
                        "spacing": "sm",
                        "contents": [
                          {
                            "type": "text",
                            "text": "คำอธิบาย",
                            "flex": 2,
                            "size": "sm",
                            "color": "#AAAAAA"
                          },
                          {
                            "type": "text",
                            "text": "ขยะนอกถังมาเก็บด้วย",
                            "flex": 5,
                            "size": "sm",
                            "color": "#666666",
                            "wrap": true
                          }
                        ]
                      },
                      {
                        "type": "box",
                        "layout": "baseline",
                        "spacing": "sm",
                        "contents": [
                          {
                            "type": "text",
                            "text": "ตำแหน่ง",
                            "flex": 2,
                            "size": "sm",
                            "color": "#AAAAAA"
                          },
                          {
                            "type": "text",
                            "text": "[ตำแหน่งที่ถูกรายงาน]",
                            "flex": 5,
                            "size": "sm",
                            "color": "#666666",
                            "wrap": true
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "button",
                    "action": {
                      "type": "message",
                      "label": "กำลังดำเนินการ",
                      "text": "กำลังดำเนินการ ขยะนอกถังมาเก็บด้วย"
                    },
                    "color": "#805637",
                    "margin": "lg",
                    "style": "primary"
                  },
                  {
                    "type": "button",
                    "action": {
                      "type": "message",
                      "label": "เสร็จสิ้น",
                      "text": "ดำเนินการเรื่อง ขยะนอกถังมาเก็บด้วย เสร็จแล้ว"
                    },
                    "color": "#805637",
                    "margin": "sm",
                    "style": "primary"
                  },
                  {
                    "type": "button",
                    "action": {
                      "type": "message",
                      "label": "ไม่เกี่ยวข้อง",
                      "text": "ดำเนินการเปลี่ยน ขยะนอกถังมาเก็บด้วย เป้นไม่เกี่ยวข้อง"
                    },
                    "color": "#805637",
                    "margin": "sm",
                    "style": "primary"
                  }
                ]
              }
            }
          }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}