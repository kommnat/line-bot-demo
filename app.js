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
    reply(reply_token, msg)
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
            'previewImageUrl': 'https://images.performgroup.com/di/library/GOAL/a6/bb/fifa-18-ronaldo_lx3r88bpjpk91re36ukdgomrj.jpg?t=2027563652&w=620&h=430'
        },]
        // messages: [{
        //     type: 'text',
        //     text: 'Hello'
        // },
        // {
        //     type: 'text',
        //     text: msg
        // }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}