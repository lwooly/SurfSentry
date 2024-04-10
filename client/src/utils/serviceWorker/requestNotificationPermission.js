
export const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if(permission === 'default') {
       console.log('Notification permissions not granted')
    }
}