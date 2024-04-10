import { sendWebpushNotification } from "../../../services/webpush/index.js"
import { getSWSubscriptionsFromDB } from "../SWsubscriptions/queries.js"

export function sendPushNotification(req, res) {
    // webpush to send notification to subscribers saved in database

    // Send notification
    try {
        //get subscribers from DB
        const subscriber = getSWSubscriptionsFromDB()
        //Send notification
        sendWebpushNotification(subscriber, 'testing message')

        //Send success response
        res.json({status: 'success', message: "message sent to web push"})
    } catch (error) {
        console.log(`Notification not sent: ${error}`)
    }
}