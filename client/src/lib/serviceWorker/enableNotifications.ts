import { checkPermission } from "./checkPermission"
import { registerServiceWorker } from "./registerServiceWorker"
import { requestNotificationPermission } from "./requestNotificationPermission"

export default async function enableNotifications(userId:string, accessToken:string) {
    checkPermission()
    await requestNotificationPermission()
    // buttonVisibility(subscribeBtn)
    await registerServiceWorker(userId, accessToken)
}

 