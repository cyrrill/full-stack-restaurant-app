import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import nookies from 'nookies'
import firebaseConfig from '../config/firebase'
import { AuthContext } from '../components/auth-context'

initializeApp(firebaseConfig)

function MyApp({ Component, pageProps }) {

  const [auth, setAuth] = useState(null)

  useEffect(() => {

    getAuth().onIdTokenChanged(nextOrObserver => {
      if (nextOrObserver) {
        const { accessToken, displayName, email } = nextOrObserver
        const token = { accessToken, displayName, email }
        nookies.set(undefined, 'token', accessToken, { path: '/' })
        setAuth(token)
      } else {
        nookies.set(undefined, 'token', '', { path: '/' })
        setAuth(false)
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={auth}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContext.Provider>
  )
}

export default MyApp
