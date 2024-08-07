import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import {Link, Outlet} from 'react-router-dom'

export default function NavBar() {

  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container fluid>

          <Navbar.Brand>:3</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
            <Nav className="me-auto">

              <Link className="nav-link" to='/'>Home</Link>
              <Link className="nav-link" to='/dashboard'>Dashboard/Login</Link>

              <NavDropdown title="Dropdown" id="basic-nav-dropdown">

                <NavDropdown.Item>
                  <Link className="nav-link dropdown-link" to='/profile' >Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link className="nav-link dropdown-link" to='/settings' >Settings</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item>
                  <Button>Logout</Button>
                </NavDropdown.Item>

              </NavDropdown>

            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
      <Outlet/>
    </div>
  )
}