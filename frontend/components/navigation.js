import Image from 'next/image'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectToken } from '../auth-slice'

export default function Navigation() {

  const token = useSelector(selectToken)
  console.log(token)

  return (
      <Navbar variant="dark" bg="dark" expand="lg" style={{overflowY: "visbile", height: "75px"}}>
        <Container>
        <Navbar.Brand href="/">
          <Image src="/images/logo.png" alt="Cyrils Restaurants" width="110px" height="110px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {token === null
          ? ''
          : <Navbar.Collapse className="justify-content-end">
            {!!token
              ? <>
                <Navbar.Text>
                  <Nav.Link className="nav-link">{token.displayName || token.email}</Nav.Link>
                </Navbar.Text>
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
