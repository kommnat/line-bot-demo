// Reply with two static messages

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/bot3', (req, res) => {
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
    let img = req.body.events[0]
    reply(reply_token, msg ,img)
    res.sendStatus(200)
})
app.listen(port)

function reply(reply_token ,msg ,img) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {tXOxbBNHDvyxUTITtlUkErraVe0AtpyFeb8Shb3+33rcl826FIjNK6eoMvgfU/6Fnmj1h9nNG6Km+ZeN6YG9BFg5phdOAhZscsvKT23QR8i6lr4f112jGMLQqLG/1mwQrQCJANMtk/SqfnhPjiy2gAdB04t89/1O/w1cDnyilFU=}'
    }
   
    let body = JSON.stringify({
        replyToken: reply_token,
        // messages: [{
        //     'type': 'image',
        //     'originalContentUrl': 'https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100',
        //     'previewImageUrl': 'https://upload.wikimedia.org/wikipedia/th/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png'
        // },]
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: img
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