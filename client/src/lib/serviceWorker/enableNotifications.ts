import { checkPermission } from "./checkPermission"
import { registerServiceWorker } from "./registerServiceWorker"
import { requestNotificationPermission } from "./requestNotificationPermission"

export default async function enableNotifications() {
    console.log('subsciption button clicked')
    checkPermission()
    await requestNotificationPermission()
    // buttonVisibility(subscribeBtn)
    await registerServiceWorker()
}

 