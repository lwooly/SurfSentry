const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error ('No support for service worker')
    }
}

export const registerServiceWorker = async () => {
    try {
        checkPermission()
        const registration = await navigator.serviceWorker.register('./js/serviceWorker.js')
        return registration;
    } catch (err) {
        console.log(`Failed to register service worker. Error: ${err}`)
    }
}

