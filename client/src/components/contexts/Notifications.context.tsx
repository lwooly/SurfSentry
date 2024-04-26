import { createContext, useState } from "react";

export const NotificationVisibilityContext = createContext({
    enableNotifyVisible: true,
    setEnableNotifyVisible: () => {}
})


export const NotificationVisibilityProvider = ({children}) => {
    const [enableNotifyVisible, setEnableNotifyVisible] = useState(true);

    const contextValues = {
        enableNotifyVisible,
        setEnableNotifyVisible
    }


    return (
        <NotificationVisibilityContext.Provider value={contextValues}>
            {children}
        </NotificationVisibilityContext.Provider>
    )


}