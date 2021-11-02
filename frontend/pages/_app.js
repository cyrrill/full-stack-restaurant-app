import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import { initializeApp } from 'firebase/app'
import { Provider } from 'react-redux'
import store from '../store'
import firebaseConfig from '../config/firebase'
import Layout from '../components/layout'
import AuthListen from '../components/auth-listen'

initializeApp(firebaseConfig)

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <AuthListen />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
