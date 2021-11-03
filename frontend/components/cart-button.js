import React from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { OverlayTrigger, Popover, Button, Badge } from 'react-bootstrap'
import { selectQuantity } from '../store/cart-slice'
import Cart from './cart'

export default function CartButton() {

  const quantity = useSelector(selectQuantity)

  return (
    <>
      <OverlayTrigger
        rootClose
        trigger="click"
        placement="bottom"
        overlay={
          quantity ?
          <Popover id="popover-positioned-bottom" style={{maxWidth: "600px"}}>
            <Popover.Header>Shopping Cart</Popover.Header>
            <Popover.Body>
              <Cart checkout={true} />
            </Popover.Body>
          </Popover>
          : <></>
        }
      >
        <Button id="cart-button" variant="dark" disabled={quantity === 0} alt="hello">
          <Image src="/images/cart.png" width="50px" height="50px" />
          { quantity ? <Badge pill bg="danger">{ quantity }</Badge> : <></> }
        </Button>
      </OverlayTrigger>
    </>
  )
}
