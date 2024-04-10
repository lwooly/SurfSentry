import { addSWSubscriptionToDB, getSWSubscriptionsFromDB } from "./queries.js"

// export function getSWSubscriptions(req, res) {
//     getSWSubscriptionsFromDB()
// }

export function addSWSubscription(req, res) {
    addSWSubscriptionToDB(req.body)
    console.log('subscription added')
    res.json({status: 'success', message: "Subscription saved"})
}
