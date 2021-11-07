import { useState } from 'react'
import router from 'next/router'
import { Form, Button, Toast } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function Register() {

  const [showErrorToast, setShowErrorToast] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  function firebaseRegister(email, password) {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(getAuth(), email, password)
      .then(() => resolve(true))
      .catch(() => reject(false))
    })
  }

  function doRegister() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    firebaseRegister(email, password)
      .then(() => {
        setShowSuccessToast(true)
        setTimeout(() => router.push('/'), 3500)
      })
      .catch(() => setShowErrorToast(true))
  }

  function doGoogle() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(getAuth(), provider)
    .then((result) => {
      setShowSuccessToast(true)
      setTimeout(() => router.push('/'), 3500)
    }).catch((error) => {
      setShowErrorToast(true)
    });
  }

  const boxStyle = {
    borderRadius: "0.5rem",
    border: "1px solid #e0e0e0",
    textAlign: "center",
  }

  const customBtnStyle =  {
    display: "inline-block",
    background: "white",
    color: "#444",
    width: "100%", //190px",
    borderRadius: "5px",
    border: "thin solid #888",
    boxShadow: "1px 1px 1px grey",
    whiteSpace: "nowrap",
    marginBottom: "20px",
    marginTop: "20px",
    cursor: "pointer"
  }

  const spanIcon =  {
    background: "url('/images/google.png') transparent 5px 50% no-repeat",
    display: "inline-block",
    verticalAlign: "middle",
    width: "42px",
    height: "42px",
  }
  const spanButtonText = {
    display: "inline-block",
    verticalAlign: "middle",
    paddingRight: "42px",
    fontSize: "14px",
    fontWeight: "bold",
    fontFamily: "'Roboto', sans-serif",
  }

  return (
    <>
    <div className="title">
      <h1>Register</h1>
    </div>
    <main className="main">
      <div className="col-md-7 col-lg-4 col-xl-4 mx-auto" style={boxStyle}>
        <Form className="pt-5 px-5">
          <div className="mb-3">
            <Form.Control type="email" id="email" placeholder="Email" required />
          </div>
          <div className="mb-3">
            <Form.Control type="password" id="password" placeholder="Password" required />
          </div>
          <div className="d-grid gap-2">
            <Button variant="dark" onClick={doRegister} size="lg">Register</Button>
          </div>
        </Form>

        <br/>
        - or -

        <div className="px-5">
          <div id="customBtn" className="px-5" style={customBtnStyle} onClick={()=>doGoogle()}>
            <span style={spanIcon}></span>
            <span style={spanButtonText}>Google</span>
          </div>
        </div>
        <br/>

      </div>

      <div className="toast-container position-absolute bottom-0 start-0 p-3" style={{zIndex: 11}}>
        <Toast onClose={() => setShowErrorToast(false)} show={showErrorToast} delay={5000} autohide>
          <Toast.Header className="text-danger">
            <strong className="me-auto">Registration Failed</strong>
          </Toast.Header>
          <Toast.Body>There was an error registering, please try again.</Toast.Body>
        </Toast>
        <Toast onClose={() => setShowSuccessToast(false)} show={showSuccessToast} delay={3000} autohide>
          <Toast.Header className="text-success">
            <strong className="me-auto">Registration Success</strong>
          </Toast.Header>
          <Toast.Body>Your account was successfully created, welcome! :)</Toast.Body>
        </Toast>
      </div>

    </main>
    </>
  )
}