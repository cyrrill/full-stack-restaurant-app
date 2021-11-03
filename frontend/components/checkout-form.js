import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { selectToken } from '../store/auth-slice'
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

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector(selectToken)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: process.env.NEXT_PUBLIC_STRIPE_REDIRECT,
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
      setMessage(error.message);
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
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="group">
        <label>
          <span>Name</span>
        </label>
        <div>
          <input id="name" name="name" className="field" placeholder="Jane Doe" />
        </div>
      </div>
        <div className="group">
        <label>
          <span>Address</span>
        </label>
        <div>
          <input id="address-line1" name="address_line1" className="field" placeholder="77 Winchester Lane" />
        </div>
        <label>
          <span>City</span>
        </label>
        <div>
          <input id="address-city" name="address_city" className="field" placeholder="Coachella" />
        </div>
        <label>
          <span>State</span>
        </label>
        <div>
          <input id="address-state" name="address_state" className="field" placeholder="CA" />
        </div>
        <label>
          <span>ZIP</span>
        </label>
        <div>
          <input id="address-zip" name="address_zip" className="field" placeholder="92236" />
        </div>
      </div>
      <PaymentElement id="payment-element" />
      <br/>
      <button disabled={isLoading || !stripe || !elements} id="submit" style={styles}>
        <span id="button-text">
          {isLoading ? <div className={styles.spinner} id="spinner"></div> : "Pay now"}
        </span>
      </button>
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
    /* spinner/processing state, errors */
    .spinner,
    .spinner:before,
    .spinner:after {
      border-radius: 50%;
    }

    .spinner {
      color: #ffffff;
      font-size: 22px;
      text-indent: -99999px;
      margin: 0px auto;
      position: relative;
      width: 20px;
      height: 20px;
      box-shadow: inset 0 0 0 2px;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
    }

    .spinner:before,
    .spinner:after {
      position: absolute;
      content: '';
    }

    .spinner:before {
      width: 10.4px;
      height: 20.4px;
      background: #5469d4;
      border-radius: 20.4px 0 0 20.4px;
      top: -0.2px;
      left: -0.2px;
      -webkit-transform-origin: 10.4px 10.2px;
      transform-origin: 10.4px 10.2px;
      -webkit-animation: loading 2s infinite ease 1.5s;
      animation: loading 2s infinite ease 1.5s;
    }

    .spinner:after {
      width: 10.4px;
      height: 10.2px;
      background: #5469d4;
      border-radius: 0 10.2px 10.2px 0;
      top: -0.1px;
      left: 10.2px;
      -webkit-transform-origin: 0px 10.2px;
      transform-origin: 0px 10.2px;
      -webkit-animation: loading 2s infinite ease;
      animation: loading 2s infinite ease;
    }
    `}</style>
  </>
  )
}