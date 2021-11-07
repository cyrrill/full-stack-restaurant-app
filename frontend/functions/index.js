import functions from 'firebase-functions';
import admin from 'firebase-admin';
import fetch from 'node-fetch';

admin.initializeApp();

// export const helloWorld = functions.https.onRequest((request, response) => {
//     functions.logger.info("Hello logs!", {structuredData: true});
//     response.send("Hello from Firebase!");
// });

/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 */
const createProfile = async userRecord => {
  const { email, displayName, uid, photoURL } = userRecord;
  const res = await fetch(functions.config().backend.url + '/users', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, displayName, uid, photoURL }),
  })
};

export const authOnCreate = functions.auth.user().onCreate(createProfile);
