import { buttonVisibility } from "./buttonVisibility.js"
import { checkPermission } from "../../../client/src/utils/serviceWorker/checkPermission.js"
import { registerServiceWorker } from "../../../client/src/utils/serviceWorker/registerServiceWorker.js"
import { requestNotificationPermission } from "../../../client/src/utils/serviceWorker/requestNotificationPermission.js"

console.log('client side js')
const subscribeBtn = document.querySelector('#subscribe')
buttonVisibility(subscribeBtn)

subscribeBtn.addEventListener('click', async () => {
    console.log('subsciption button clicked')
    checkPermission()
    await requestNotificationPermission()
    buttonVisibility(subscribeBtn)
    await registerServiceWorker()
})






