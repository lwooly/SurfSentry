import { ReactNode, createContext, useState } from "react";

interface NotificationVisibilityContextType {
    enableNotifyVisible: boolean;
    setEnableNotifyVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const NotificationVisibilityContext = createContext<NotificationVisibilityContextType>({
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