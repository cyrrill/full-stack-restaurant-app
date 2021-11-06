import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Container, Row, Col } from 'react-bootstrap'
import Cart from '../components/cart'
import CheckoutForm from "../components/checkout-form"
import nookies from 'nookies'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51JqddAAPxH3OsO2Y6yOIRQzp5uKoBSSLIo4Wy1GECrGKWfR70ZbQzxI6oVrwLkBbnnRw2Ncuh0Mb3MM4ddCoeypP00pBBK7zD0')

function Checkout(data) {

  const options = {
    clientSecret: data.clientSecret,
    appearance: { theme: 'stripe' }
  }

  return (
    <Container>
      <div className="title">
        <h2>Checkout</h2>
      </div>
      <div className="description">
        Enter your details and we will confirm and send your order asap!
      </div>
      <main className="main">
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
      </main>
    </Container>
  )
}

export async function getServerSideProps(ctx) {
  const accessToken = nookies.get(ctx).token
  const dishes = nookies.get(ctx).checkout
  const items = dishes ? JSON.parse(dishes) : []
  const res = await fetch(`${process.env.BACKEND_URL}/checkout/create-payment-intent`, {
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