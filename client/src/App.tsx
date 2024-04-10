import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import axios from 'axios'

import enableNotifications from "./utils/serviceWorker/enableNotifications"
import sendNotification from "./services/sendNotification"


function App() {

  return (
    <>
       <div>
        <button onClick={enableNotifications}>Enable Notifications</button>
        <button onClick={sendNotification}>Send Notification</button>
       </div>
    </>
  )
}

export default App
