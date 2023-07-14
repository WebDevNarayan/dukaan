import useUser from "../../hooks/useUser"
import {  useNavigate } from "react-router-dom"
import { useEffect } from "react"

const onRedirecting = () => {
    <>
        <div>
            <h1>
                Redirecting you to the login page...
            </h1>
        </div>
    </>
}

const withPageAuthRequired = (Component) => {
    return (props) => {
        const { user, isLoading} = useUser()
        const navigate = useNavigate()
        
        useEffect(() => {
            if (user || isLoading) return
            navigate(`/auth/login`)
        },[user, isLoading]
        )


        if (user) return <Component user={user} {...props} />

        return onRedirecting()
    }
}

export default withPageAuthRequired;