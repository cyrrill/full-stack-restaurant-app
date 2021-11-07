import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import React, { lazy, Suspense } from 'react';
import { initializeApp } from 'firebase/app';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../store/store'
import Layout from '../components/layout'
import firebaseConfig from '../config/firebase';

initializeApp(firebaseConfig);
const AuthListen = lazy(() => import('../components/auth-listen'));
const renderLoader = () => <></>;

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={renderLoader()}>
          <AuthListen />
        </Suspense>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
