const express = require('express');
const firebaseAuth = require('../middleware/firebase-auth');
const firebaseAdmin = require('../services/firebase-admin');
const router = express.Router();
const User = require('../models/user');


router.post('/', async function(req, res) {

  // #swagger.tags = ['User']
  // #swagger.description = 'Webhook for CloudFunctions `onAuthCreate` trigger'
  // #swagger.parameters['email'] = { description: 'User email on account', type: 'string', in: 'body' }
  // #swagger.parameters['displayName'] = { description: 'Display name for user', type: 'string', in: 'body' }
  // #swagger.parameters['uid'] = { description: 'Google Firebase UserID', type: 'string', in: 'body' }
  // #swagger.parameters['photoURL'] = { description: 'User avatar', type: 'string', in: 'body' }

  const { email, displayName, uid, photoURL } = req.body;
  const existingUser = await firebaseAdmin.auth().getUser(uid);
  if (existingUser && existingUser.email === email) {
    return res.json(await User.create({
      _id: uid,
      email,
      displayName,
      description: '',
      imageUrl: photoURL
    }))
  }
  res.status(401).send({})
});

router.get('/me', firebaseAuth, async function(req, res) {

  // #swagger.tags = ['User']
  // #swagger.description = 'Allows user to retrieve their own profile'
  // #swagger.security = [{ "jwt": [] }]

  res.json(await User.findById(req.user.uid));
});

router.put('/me', firebaseAuth, async function(req, res) {

  // #swagger.tags = ['User']
  // #swagger.description = 'Allows user to update their own profile'
  // #swagger.parameters['displayName'] = { description: 'Display name for user', type: 'string', in: 'body' }
  // #swagger.parameters['description'] = { description: 'User description', type: 'string', in: 'body' }
  // #swagger.parameters['imageUrl'] = { description: 'User avatar', type: 'string', in: 'body' }
  // #swagger.security = [{ "jwt": [] }]

  const { displayName, description, imageUrl } = req.body;
  let fbData = { displayName }
  let dbData = { displayName, description}
  fbData.photoURL = dbData.imageUrl = imageUrl || null;
  await firebaseAdmin.auth().updateUser(req.user.uid, fbData);
  res.json(await User.findByIdAndUpdate(req.user.uid, {
    displayName,
    description,
    imageUrl
  }, { new: true }));
});

router.post('/register', async function(req, res) {

  // #swagger.tags = ['User']
  // #swagger.description = 'Allows user registration directly on API via Admin SDK'
  // #swagger.parameters['displayName'] = { description: 'Display name for user', type: 'string', in: 'body' }
  // #swagger.parameters['email'] = { description: 'User email on account', type: 'string', in: 'body' }
  // #swagger.parameters['password'] = { description: 'Authentication password to set', type: 'string', in: 'body' }

  const { displayName, email, password } = req.body

  if (!displayName || !email || !password) {
    return res.status(401)
  }

  try {
    const existingUser = await firebaseAdmin.auth().getUserByEmail(email);
    if (existingUser) {
      return res.status(401).json({error: 'User already exists'});
    }
  } catch {
    // We expect this, means no user exists, so continue
  }

  try {
    const newUser = await firebaseAdmin.auth().createUser({
      displayName,
      password,
      email
    })
  } catch {
    res.status(401).json({error: 'Failed to create user'});
  }

  res.status(201).json({uid: newUser.uid});
});

module.exports = router;
