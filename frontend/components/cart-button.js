import React from 'react'
import Image from 'next/image'
import { OverlayTrigger, Popover, Button, Badge } from 'react-bootstrap'

export default function CartButton() {



  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={
          <Popover id="popover-positioned-bottom">
            {/* <Popover.Header as="h3">Shopping Cart</Popover.Header> */}
            <Popover.Body>
              <strong>Holy guacamole!</strong> Check this info.
            </Popover.Body>
          </Popover>
        }
      >
        <Button variant="dark" >
          <Image src="/images/cart.png" width="50px" height="50px" />
          <Badge pill bg="danger">9</Badge>
        </Button>
      </OverlayTrigger>
    </>
  )
}
