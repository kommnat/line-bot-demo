// Reply with two static messages

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
const fetch = require('node-fetch');
const axios = require('axios')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
let chanel_access_token = 'Bearer {tXOxbBNHDvyxUTITtlUkErraVe0AtpyFeb8Shb3+33rcl826FIjNK6eoMvgfU/6Fnmj1h9nNG6Km+ZeN6YG9BFg5phdOAhZscsvKT23QR8i6lr4f112jGMLQqLG/1mwQrQCJANMtk/SqfnhPjiy2gAdB04t89/1O/w1cDnyilFU=}';
let url = 'http://fondue.traffy.in.th/fondue/?limit=2&reported_tos=1289&status=report';


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
    }else if(msg == 'list' || msg == 'List'){
        axios.get(url)
        .then((response) => {
         let status_problem = response.data.results[0].status; // report = รอดำเนินการ , inprogress = กำลังดำเนินการ , finish = เสร็จสิ้น
         let photo_problem = response.data.results[0].photos[0].photo;
         let type_problem = response.data.results[0].problem_type;
         let comment_problem = response.data.results[0].comment;
         let address_problem = response.data.results[0].address;
        
         console.log('response.data :',response.data)
         reply1(reply_token, status_problem, photo_problem, type_problem, comment_problem, address_problem)
        })
        
    }
    
    res.sendStatus(200)
})
app.listen(port)

function reply(reply_token ,msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': chanel_access_token
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

function reply1(reply_token, status_problem, photo_problem, type_problem, comment_problem, address_problem){
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': chanel_access_token
    }  
    let body = JSON.stringify({
        replyToken: reply_token,
       
        messages: [
            // {
            //     type: 'text',
            //     text: type_problem,
            // }
        {
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
                        "text": status_problem,
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
                "url": photo_problem,
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
                            "text": type_problem,
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
                            "text": comment_problem,
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
                            "text": address_problem,
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
          }
        ]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}