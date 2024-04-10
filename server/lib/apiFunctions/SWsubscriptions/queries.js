//mock DB for now
const subDatabase = []

export function getSWSubscriptionsFromDB() {
    console.log(subDatabase)
    return subDatabase // only one while testing
}

export function addSWSubscriptionToDB(subscription) {
    subDatabase.push(subscription)
    console.log(subDatabase[0])
    return subDatabase
}