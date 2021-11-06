import React from 'react'
import nookies from 'nookies'
import { Container, Table } from 'react-bootstrap'


const curr = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

function History(props) {

  const dishes = props.dishes
  const orders = props.orders.map(o => (
    <tr key={o._id}>
      <td>{(new Date(o.createdAt)).toLocaleDateString('en-US')}</td>
      <td>
        {o.items.map(d => (
          <div key={d._id}>
            {d.quantity} x {dishes[d._id].name} = {curr.format(d.quantity * dishes[d._id].price / 100)}<br/>
          </div>
        ))}
      </td>
      <td>{curr.format(o.total/100)}<br/></td>
    </tr>
  ))

  return (
    <Container style={{textAlign:"center"}}>
      <div className="title">
        <h2>Order History</h2>
      </div>
      <div className="description">
        Here you can see your previous orders
      </div>
      <div className="main">
        <Table striped bordered hover style={{width:"500px", marginLeft:"auto", marginRight:"auto"}}>
          <thead>
            <th>Date</th>
            <th style={{width:"300px"}}>Dishes</th>
            <th>Total</th>
          </thead>
          <tbody>
            {orders}
          </tbody>
        </Table>
      </div>
    </Container>
  )
}

export async function getServerSideProps(ctx) {
  const accessToken = nookies.get(ctx).token
  const ordersRes = await fetch(`${process.env.BACKEND_URL}/checkout/history`, {
    headers: { 'Authorization': 'Bearer ' + accessToken }
  })
  const orders = await ordersRes.json()

  const dishesRes = await fetch(`${process.env.BACKEND_URL}/restaurants/dishes`)
  const dishes = await dishesRes.json()

  let dishDictionary = {}
  dishes.forEach(d => {
    dishDictionary[d._id.toString()] = {...d}
    delete dishDictionary[d._id.toString()]._id
  })

  return { props: { orders, dishes: dishDictionary } }
}

export default History;