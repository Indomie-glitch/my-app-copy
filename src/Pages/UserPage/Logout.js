import { useEffect } from "react"
import { useAuth } from "./contexts/AuthContext"

const Logout = () => {

    const {logOut} = useAuth()

    useEffect(() => {logOut()}, [])

    return null
}

export default Logout