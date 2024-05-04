import { ReactNode, createContext, useState } from "react";

export const NotificationVisibilityContext = createContext({
    enableNotifyVisible: true,
    setEnableNotifyVisible: () => {}
})


export const NotificationVisibilityProvider = ({children}:{children: ReactNode}) => {
    const [enableNotifyVisible, setEnableNotifyVisible] = useState<boolean>(true);

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