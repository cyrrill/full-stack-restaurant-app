import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { selectToken } from '../store/auth-slice'
import { Spinner, Form  } from "react-bootstrap";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const val = id => document.getElementById(id).value

/**
 * Checkout form provided by Stripe.com
 */

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const token = useSelector(selectToken)

  // https://stackoverflow.com/questions/285522/find-html-label-associated-with-a-given-input
  const labels = document.getElementsByTagName('label');
  for (var i = 0; i < labels.length; i++) {
      if (labels[i].htmlFor != '') {
          var elem = document.getElementById(labels[i].htmlFor);
          if (elem) {
              elem.label = labels[i];
          }
      }
  }

  const inputList = document.getElementsByTagName('input')
  for (let item of inputList) {
    item.addEventListener('change', event => {
      if (event.target.value) {
        event.target.classList.remove('input-invalid')
        if (event.target.label) {
          event.target.label.style.display = 'none'
        }
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return
    }

    setMessage('')
    let inputs, index
    let valid = true

    inputs = document.getElementsByTagName('input');
    for (index = 0; index < inputs.length; ++index) {
        if (!inputs[index].value) {
          inputs[index].classList.add('input-invalid')
          valid = false
          if (inputs[index].label) {
            inputs[index].label.style.display = 'block'
          }
        }
    }
    document.getElementById('payment-form').checkValidity()

    if (!valid) {
      return
    }
    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: (process.env.NEXT_PUBLIC_STRIPE_REDIRECT),
        receipt_email: token.email,
        shipping: {
          name: val('name'),
          address: {
            city: val('address-city'),
            line1: val('address-line1'),
            postal_code: val('address-zip'),
            state: val('address-state')
          }
        }
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      //setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  const styles = {
    background: "#5469d4",
    fontFamily: "Arial, sans-serif",
    color: "#ffffff",
    borderRadius: "4px",
    border: 0,
    padding: "12px 16px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    display: "block",
    transition: "all 0.2s ease",
    boxShadow: "0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)",
    width: "100%"
  }

  return (
    <>
    <form id="payment-form">
      <div className="group">
        <label>
          <span>Name</span>
        </label>
        <div>
          <input id="name" name="name" className="field" placeholder="Jane Doe" />
          <label htmlFor="name" className="invalid-feedback" style={{display:"none"}}>Enter a name</label>
        </div>
      </div>
        <div className="group">
        <label>
          <span>Address</span>
        </label>
        <div>
          <input id="address-line1" name="address_line1" className="field" placeholder="77 Winchester Lane" />
          <label htmlFor="address-line1" className="invalid-feedback" style={{display:"none"}}>Enter an address</label>
        </div>
        <label>
          <span>City</span>
        </label>
        <div>
          <input id="address-city" name="address_city" className="field" placeholder="Coachella" />
          <label htmlFor="address-city" className="invalid-feedback" style={{display:"none"}}>Enter a city</label>
        </div>
        <label>
          <span>State</span>
        </label>
        <div>
          <input id="address-state" name="address_state" className="field" placeholder="CA" />
          <label htmlFor="address-state" className="invalid-feedback" style={{display:"none"}}>Enter a state</label>
        </div>
        <label>
          <span>ZIP</span>
        </label>
        <div>
          <input id="address-zip" name="address_zip" className="field" placeholder="92236" />
          <label htmlFor="address-zip" className="invalid-feedback" style={{display:"none"}}>Enter a zip code</label>
        </div>
      </div>
      <PaymentElement id="payment-element" />
      <br/>
      { isLoading
        ? <Spinner animation="border" variant="primary" />
        : <button disabled={isLoading || !stripe || !elements} id="submit" style={styles} onClick={(e) => handleSubmit(e)}>
            <span id="button-text">
              Pay now
            </span>
          </button>
      }
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>

    <style jsx>{`
    .field {
      line-height: 18.4px;
      margin: 0px;
      padding-bottom: 12px;
      padding-left: 12px;
      padding-right: 51.2px;
      padding-top: 12px;
      background-color: white;
      border-radius: 5px;
      border-color: rgb(230, 230, 230);
      border-style: solid;
      border-width: 0.994318px;
      transition: background 0.15s ease, border 0.15s ease, box-shadow 0.15s ease, color 0.15s ease;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02);
      margin-bottom: 12px;
    }
    label {
      font-size: 14.88px;
      font-weight: 400;
      line-height: 17.112px;
      box-sizing: border-box;
      display: block;
      margin-bottom: 4px;
    }
    .input-invalid {
      border-color: red;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02), 0 0 0 1px red;
    }
    .invalid-feedback {
      box-sizing: border-box;
      display: block;
      height: 16.3636px;
      margin-bottom: 4px;
      margin-left: 0px;
      margin-right:0px;
      margin-top: 0px;
      padding-bottom: 0px;
      padding-left: 0px;
      padding-right: 0px;
      padding-top: 0px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-size: 14.88px;
      font-weight: 400!important;
      line-height: 5px;
      color: rgb(223, 27, 65);
    }
    `}</style>
  </>
  )
}