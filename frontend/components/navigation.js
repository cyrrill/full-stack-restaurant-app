import Image from 'next/image'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectToken } from '../store/auth-slice'
import CartButton from './cart-button'

export default function Navigation() {

  const token = useSelector(selectToken)

  return (
      <Navbar variant="dark" bg="dark" expand="lg" style={{overflowY: "visbile", height: "75px"}}>
        <Container>
        <Navbar.Brand href="/">
          <Image src="/images/logo.png" alt="Cyrils Restaurants" width="110px" height="110px" />
        </Navbar.Brand>
        <Navbar.Toggle />

        <Navbar>
          <Navbar.Text>
            <Nav.Link className="nav-link" href="/">Restaurants</Nav.Link>
          </Navbar.Text>
          <Navbar.Text>
            <Nav.Link className="nav-link" href="/dishes">All Dishes</Nav.Link>
          </Navbar.Text>
          {!!token
          ?
          <Navbar.Text>
            <Nav.Link className="nav-link" href="/history">Order History</Nav.Link>
          </Navbar.Text>
          : ''}
        </Navbar>

        {token === null
          ? ''
          : <Navbar.Collapse className="justify-content-end">
            {!!token
              ? <>
                <Navbar.Text>
                  {(window.location.href.includes('/checkout')) ? '' : <CartButton />}
                </Navbar.Text>
                <Navbar.Text>
                  <Nav.Link href="/auth/profile" className="nav-link">{token.displayName || token.email}</Nav.Link>
                </Navbar.Text>
                {token.photoURL
                  ? <Navbar.Text>
                      <Nav.Link href="/auth/profile" className="nav-link">
                        <img src={token.photoURL} height="50px" />
                      </Nav.Link>
                    </Navbar.Text>
                  : ''}
                <Navbar.Text>
                  <Nav.Link className="nav-link" href="/auth/logout">Logout</Nav.Link>
                </Navbar.Text>
                </>
              : <>
                <Navbar.Text>
                  <Nav.Link className="nav-link" href="/auth/register">Register</Nav.Link>
                </Navbar.Text>
                <Navbar.Text>
                  <Nav.Link className="nav-link" href="/auth/login">Login</Nav.Link>
                </Navbar.Text>
                </>
            }
            </Navbar.Collapse>
        }
        </Container>
      </Navbar>
  )

}
