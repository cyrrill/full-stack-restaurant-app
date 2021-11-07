import functions from 'firebase-functions';
import admin from 'firebase-admin';
import fetch from 'node-fetch';

admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
});


/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 * @param {Object} context Details about the event.
 */
const createProfile = async(userRecord, context) => {

  const { email, displayName, uid } = userRecord;

  const res = await fetch(functions.config().backendUrl + '/users', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, displayName, uid }),
  })
  response.send(await res.json());
};

export const authOnCreate = functions.auth.user().onCreate(createProfile);
