import { buttonVisibility } from "./buttonVisibility.js"
import { checkPermission } from "./checkPermission.js"
import { registerServiceWorker } from "./registerServiceWorker.js"
import { requestNotificationPermission } from "./requestNotificationPermission.js"

console.log('client side js')
const subscribeBtn = document.querySelector('#subscribe')
buttonVisibility(subscribeBtn)

subscribeBtn.addEventListener('click', async () => {
    checkPermission()
    await requestNotificationPermission()
    buttonVisibility(subscribeBtn)
    await registerServiceWorker()
})






