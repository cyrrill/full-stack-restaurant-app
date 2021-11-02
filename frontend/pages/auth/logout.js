import router from 'next/router'
import { useEffect } from 'react'
import { getAuth } from 'firebase/auth'

export default function Logout() {

    useEffect(() => {
        getAuth().signOut().then(() => router.push('/auth/login'))
    }, [])

    return (<div></div>)
}
