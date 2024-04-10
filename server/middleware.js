import express from "express";
import cors from "cors"
import webpush from "web-push";


//hardcode database - todo - add SQL db
const subDatabase = []

// set up webpush
webpush.setVapidDetails(
    'mailto:lwoolydev@gmail.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );

export default function(app) {
    app.use(cors())
    app.use(express.json())
    app.use(express.static('public'))


    // could put this in a seperate file? - subscription from service worker saved.
    app.post('/save-subscription', (req, res) => {
        subDatabase.push(req.body)
        console.log(subDatabase[0])
        console.log('subscription added')
        res.json({status: 'success', message: "Subscription saved"})
    })

    // this get request fires the notification - could be another way CRON etc.
    app.get('/send-notification', (req, res) => {
        // webpush to send notification to subscribers saved in database
        try {
            webpush.sendNotification(subDatabase[0], 'go surfing')
            res.json({status: 'success', message: "message sent to web push"})
        } catch (error) {
            console.log(`Notification not sent: ${error}`)
        }
    })
}