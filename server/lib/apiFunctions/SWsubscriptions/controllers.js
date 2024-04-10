import { addSWSubscriptionToDB, getSWSubscriptionsFromDB } from "./queries.js"

//hardcode database - todo - add SQL db
const subDatabase = []

export function getSWSubscriptions(req, res) {
    getSWSubscriptionsFromDB()
}

export function addSWSubscription(req, res) {
    addSWSubscriptionToDB(req.body)
    console.log('subscription added')
    res.json({status: 'success', message: "Subscription saved"})
}


// get all subscriptions from DB and notify.