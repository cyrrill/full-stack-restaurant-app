import React from 'react'
import Image from 'next/image'
import { OverlayTrigger, Popover, Button, Badge, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {
  addDish,
  removeDish,
  deleteDish,
  emptyCart,
  selectDishes,
  selectTotal,
  selectQuantity
} from '../store/cart-slice'

export default function CartButton() {

  const quantity = useSelector(selectQuantity)
  const dishesMap = useSelector(selectDishes)

  const dishes = []
  for (const [key, value] of Object.entries(dishesMap)) {
    dishes.push({...value, _id: key})
  }

  const dishesArray = dishes.map(dish => (
    <tr key={dish._id}>
      <td><Image src={ dish.imageUrl } height="50px" width="50px" /></td>
      <td>{ dish.name }</td>
      <td>{ '$' + (dish.price / 100) }</td>
      <td>{ dish.quantity }</td>
      <td>{ '$' + (dish.quantity * dish.price / 100) }</td>
    </tr>
  ))

  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={
          <Popover id="popover-positioned-bottom" style={{maxWidth: "450px"}}>
            <Popover.Header>Shopping Cart</Popover.Header>
            <Popover.Body>
              <Table style={{width: "350px"}}>
                <tbody>
                {dishesArray}
                </tbody>
              </Table>
            </Popover.Body>
          </Popover>
        }
      >
        <Button variant="dark" >
          <Image src="/images/cart.png" width="50px" height="50px" />
          <Badge pill bg="danger">{ quantity }</Badge>
        </Button>
      </OverlayTrigger>
    </>
  )
}
