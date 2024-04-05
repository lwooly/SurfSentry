import { registerServiceWorker } from "./clientFns.js"

console.log('client side js')

const subscribeBtn = document.querySelector('#subscribe')

subscribeBtn.addEventListener('click', () => {
    registerServiceWorker()
})

