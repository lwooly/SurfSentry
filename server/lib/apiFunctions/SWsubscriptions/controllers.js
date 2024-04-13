import { addSWSubscriptionToDB, getSWSubscriptionsFromDB } from "./queries.js"

export async function addSWSubscription(req, res) {
    console.log(req.body)
    try {
        await addSWSubscriptionToDB(req.body)
    console.log('subscription added')
    res.json({status: 'success', message: "Subscription saved"})
    } catch (err) {
        console.log('Subscription not saved', err)
    }
    
}
