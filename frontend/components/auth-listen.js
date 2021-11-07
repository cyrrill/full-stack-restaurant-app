import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import nookies from 'nookies'
import { setToken } from '../store/auth-slice'
import firebaseConfig from '../config/firebase';

export default function AuthListen() {

  const dispatch = useDispatch()

  useEffect(async () => {

    const firebase = await import('firebase/app');
    const auth = await import('firebase/auth');
    const app = firebase.initializeApp(firebaseConfig)

    auth.getAuth(app).onIdTokenChanged(nextOrObserver => {
      if (nextOrObserver) {
        const { accessToken, displayName, email } = nextOrObserver
        const tokenData = { accessToken, displayName, email }
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
