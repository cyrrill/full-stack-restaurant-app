import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Container, Row, Col } from 'react-bootstrap'
import Cart from '../components/cart'
import CheckoutForm from "../components/checkout-form"
import nookies from 'nookies'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

function Checkout(data) {

  const options = {
    clientSecret: data.clientSecret,
    appearance: { theme: 'stripe' }
  }

  return (
    <main className="main">
    <Container>
      <Row></Row>
      <br/><br/><br/>
      <Row>
        <Col>
          <Cart checkout={false} readonly={true} />
        </Col>
        <Col>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </Col>
      </Row>
    </Container>
    </main>
  )
}

export async function getServerSideProps(ctx) {
  const accessToken = nookies.get(ctx).token
  const dishes = nookies.get(ctx).checkout
  const items = dishes ? JSON.parse(dishes) : []
  const res = await fetch('http://backend:8080/checkout/create-payment-intent', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + accessToken,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ items }),
  })
  const data = await res.json()
  return { props: { clientSecret: data.clientSecret } }
}

export default Checkout