import { useEffect } from "react"
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import nookies from 'nookies'
import { emptyCart } from '../store/cart-slice'

function Complete(props) {

  const dispatch = useDispatch()

  useEffect(() => {
    if (props.success) {
      dispatch(emptyCart())
    }
  }, [])

  return (
    <div className="container">
      <div className="title">
        <h1>{props.message}</h1>
      </div>
      <div className="main" style={{textAlign: "center"}}>
        {props.order && props.order._id ?
        <div style={{fontSize: "16px"}}>
          Your order <strong>{props.order._id}</strong> has been received and will be delivered shortly
        </div> : ''}
        <div>
          {/* Copyright pngtree.com */}
          <img src="/images/delivery.png" />
        </div>
        <div>
          <Button variant="success" href="/">Order something new :)</Button>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {

  const accessToken = nookies.get(ctx).token
  const dishes = nookies.get(ctx).checkout
  const items = dishes ? JSON.parse(dishes) : []

  const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
  const paymentIntent = await stripe.paymentIntents.retrieve(
    ctx.query.payment_intent
  )

  let message, order, success
  switch (paymentIntent.status) {
    case "succeeded":
      message = "Payment succeeded!"
      order = await storeOrder(accessToken, paymentIntent, items)
      success = true
      break
    case "processing":
      message = "Your payment is processing."
      break
    case "requires_payment_method":
      message = "Your payment was not successful, please try again."
      break
    default:
      message = "Something went wrong."
      break
  }
  return { props:{ message, order, success } }
}

async function storeOrder(accessToken, paymentIntent, items) {
  const res = await fetch('http://backend:8080/checkout/order', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ items, paymentIntent }),
  })
  return await res.json()
}

export default Complete