import { sendWebpushNotification } from "../../../services/webpush/index.js";
import { getSWSubscriptionsFromDB } from "../SWsubscriptions/queries.js";

export async function sendPushNotification(req, res) {
  // webpush to send notification to subscribers saved in database
  // Send notification
  try {
    //get subscribers from DB
    const subscriptions = await getSWSubscriptionsFromDB();

    //Send notification
    await Promise.all(
      subscriptions.map(async ({ data: subscription }) => {
        try {
          await sendWebpushNotification(subscription, "testing message");
        } catch (err) { // manage error from unsubcribed here
          console.log(err.statusCode);
          //unsubscribe if 410 status recieved (Gone - expired or unsubscribed)
          if (err.statusCode === 410) {

            //TODO - add id to db query and use it to remove db instances for subscriptions that have gone.
            console.log("remove");
          }
        }
      })
    );
    //Send success response
    res.json({
      status: "success",
      message:
        "Attempted to send messages to all previous web push subscribers",
    });
  } catch (error) {
    console.log(`Notification not sent: ${error}`);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}
