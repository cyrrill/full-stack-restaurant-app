import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import nookies from 'nookies'
import { setToken } from '../store/auth-slice'


export default function AuthListen() {

  const dispatch = useDispatch()

  useEffect(async () => {

    const auth = await import('firebase/auth');
    auth.getAuth().onIdTokenChanged(nextOrObserver => {
      if (nextOrObserver) {
        const { accessToken, displayName, email, photoURL } = nextOrObserver
        const tokenData = { accessToken, displayName, email, photoURL }
        nookies.set(undefined, 'token', accessToken, { path: '/' })
        dispatch(setToken(tokenData))
      } else {
        nookies.set(undefined, 'token', '', { path: '/' })
        dispatch(setToken(false))
      }
    })
  }, [])

  return (<div></div>)
}
