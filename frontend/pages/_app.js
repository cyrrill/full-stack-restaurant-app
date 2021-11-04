import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import { initializeApp } from 'firebase/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../store/store'
import firebaseConfig from '../config/firebase'
import Layout from '../components/layout'
import AuthListen from '../components/auth-listen'

initializeApp(firebaseConfig)

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthListen />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
