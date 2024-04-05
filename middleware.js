import express from "express";
import webpush from "web-push";

//hardcode database - todo - add SQL db
const subDatabase = []

webpush.setVapidDetails(
    'mailto:lwoolydev@gmail.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );

export default function(app) {
    app.use(express.json())
    app.use(express.static('public'))
    
    app.post('/save-subscription', (req, res) => {
        subDatabase.push(req.body)
        res.json({status: 'success', message: "Subscription saved"})
    })

    // this get request fires the notification
    app.get('/send-notification', (req, res) => {
        webpush.sendNotification(subDatabase[0], 'go surfing')
        res.json({status: 'success', message: "message sent to web push"})
    })
}