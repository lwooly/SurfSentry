
const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

const PUBLIC_KEY = 'BL7DJwC2j2_vWeEsFiaQktqFnBPg431VKl0Ayhi4T12a-zYR8XGREE_TNHhngD8fdSebqdiVb6mJ6TT4avyJ8Oc'


// subscribe to webpush subscription - push subscription to backend api database
const saveSubscription = async (subscription) => {
    try {
        const response = await fetch('http://localhost:3000/save-subscription', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(subscription)
        })
        const data = await response.json()
        console.log(`Subscription saved: ${data}`)
        return data
        } catch (err) {
        console.log(err)
        throw new Error('Subscription not saved')
    }
}

// register service worker with push manager
self.addEventListener('activate', async (e) => {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY)
    })
    // save subscription to backed
    const response = await saveSubscription(subscription)
    console.log(response)
})

// show notification from push manager
self.addEventListener('push', e => {
    const data = e.data.text()
    console.log(data)
    self.registration.showNotification('test', {body: data})
})