import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"

const useAccessToken = () => {
    const [accessToken, setAccessToken ] = useState<string | null>(null)

    const {getAccessTokenSilently} = useAuth0()
    
    useEffect(() => {
        // get access token
        (async () => {
            const token = await getAccessTokenSilently()
            setAccessToken(token)
            //cleanup
            return () => {}
        })();
    },[getAccessTokenSilently])

    return {accessToken : accessToken};
}

export default useAccessToken;