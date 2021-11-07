import React, { useState } from 'react'
import Router from 'next/router'
import nookies, { parseCookies  } from 'nookies'
import { Form, Image, Button, Toast, ToastContainer } from 'react-bootstrap'

const val = id => document.getElementById(id).value

const save = async(setShowToast) => {
  if(!document.getElementById('form').reportValidity()) {
    return
  }
  const token = parseCookies().token
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
    method: 'PUT',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      displayName: val('displayName'),
      description: val('description'),
      imageUrl: val('imageUrl')
     }),
  })
  await res.json()
  setTimeout(() => {Router.reload(window.location.pathname)}, 1000)
  setShowToast(true)
}

const boxStyle = {
  borderRadius: "0.5rem",
  border: "1px solid #e0e0e0",
  textAlign: "center",
}

function Profile(props) {

  const [showToast, setShowToast] = useState(false)

  const user = props.user
  return (
    <>
    <div className="title">
      <h1>User Profile</h1>
    </div>
    <div className="description">
      Update your profile info and save it
    </div>
    <main className="main">
      <div className="col-md-7 col-lg-4 col-xl-4 mx-auto" style={boxStyle}>
      <Form id="form" className="pt-5 px-5">
        <div className="mb-3">
          <Form.Control type="email" id="email" placeholder="Email" value={user.email} disabled />
        </div>
        <div className="mb-3">
          <Form.Control type="text" id="displayName" placeholder="Display Name" defaultValue={user.displayName} required />
        </div>
        <div className="mb-3">
          <Form.Control type="text" id="description" placeholder="Description" defaultValue={user.description} required />
        </div>
        <div className="mb-3">
            <Form.Control type="url" id="imageUrl" placeholder="Image URL" defaultValue={user.imageUrl} pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(.jpg|.jpeg|.webp|.png|.gif)" />
            {user.imageUrl ? <><br/><Image src={user.imageUrl} height="100px" /></> : ''}
        </div>
        <div className="d-grid gap-2">
          <Button variant="dark" onClick={() => save(setShowToast)} size="lg">Save</Button>
        </div>
        <br/>
      </Form>
      </div>
      <ToastContainer className="toast-container position-absolute bottom-0 start-0 p-3" style={{zIndex: 11}}>
      <Toast autohide={true} delay="3000" show={showToast}>
          <Toast.Header className="text-success">
            <strong className="me-auto">Success</strong>
          </Toast.Header>
        <Toast.Body>Profile saved</Toast.Body>
      </Toast>
      </ToastContainer>
    </main>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const accessToken = nookies.get(ctx).token
  const res = await fetch(`${process.env.BACKEND_URL}/users/me`, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  return { props: { user: data } }
}

export default Profile;