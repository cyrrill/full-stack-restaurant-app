import { useSelector, useDispatch } from 'react-redux'
import { Button, Table } from 'react-bootstrap'
import Image from 'next/image'
import {
  addDish,
  removeDish,
  deleteDish,
  emptyCart,
  selectDishes,
  selectTotal,
  selectQuantity
} from '../store/cart-slice'


export default function Cart() {

    const dispatch = useDispatch();
    const quantity = useSelector(selectQuantity)
    const dishesMap = useSelector(selectDishes)
    const total = useSelector(selectTotal)

    const curr = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })

    const dishes = []
    for (const [key, value] of Object.entries(dishesMap)) {
      dishes.push({...value, _id: key})
    }

    const dishesArray = dishes.map(dish => (
      <tr key={dish._id}>
        <td><Image src={ dish.imageUrl } height="50px" width="50px" /></td>
        <td>{ dish.name }</td>
        <td>{ curr.format(dish.price / 100) }</td>
        <td>
          <Button size="sm" variant="primary" onClick={() => dispatch(removeDish(dish))}>-</Button>
          <span style={{padding: "7px", fontSize: "18px"}}>
            <strong>{ dish.quantity }</strong>
          </span>
          <Button size="sm" variant="success" onClick={() => dispatch(addDish(dish))}>+</Button>
        </td>
        <td>{ curr.format(dish.quantity * dish.price / 100) }</td>
        <td><Button size="sm" variant="danger" onClick={() => dispatch(deleteDish(dish))}>x</Button></td>
      </tr>
    ))

    return (
      <Table style={{width: "500px"}}>
        <tbody>
        {dishesArray}
        <tr>
          <td colSpan="4" style={{textAlign: "right"}}>
          <Button variant="success" onClick={() => {}}>Checkout</Button>
          </td>
          <td colSpan="2" style={{textAlign: "left"}}>
            <span style={{padding: "7px", fontSize: "18px"}}>
              { curr.format(total/100) }
            </span>
          </td>
        </tr>
        </tbody>
      </Table>
    )
}
