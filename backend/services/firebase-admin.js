
const admin = require('firebase-admin');

const type = 'service_account';
const project_id = process.env.FIREBASE_PROJECT_ID;
const private_key_id = process.env.FIREBASE_PRIVATE_KEY_ID;
const private_key = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g,'\n');
const client_email = process.env.FIREBASE_CLIENT_EMAIL;
const client_id = process.env.FIREBASE_CLIENT_ID;
const auth_uri = 'https://accounts.google.com/o/oauth2/auth';
const token_uri = 'https://oauth2.googleapis.com/token';
const auth_provider_x509_cert_url = 'https://www.googleapis.com/oauth2/v1/certs';
const client_x509_cert_url = process.env.FIREBASE_CLIENT_X509_CERT_URL;

admin.initializeApp({
  credential: admin.credential.cert({
      type,
      project_id,
      private_key_id,
      private_key,
      client_email,
      client_id,
      auth_uri,
      token_uri,
      auth_provider_x509_cert_url,
      client_x509_cert_url
  })
});

module.exports = admin;