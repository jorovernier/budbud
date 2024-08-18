import { Button, Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import Logo from '../assets/budbud-logo.png'

export default function NavBar() {

  return (
    <div>
      <Navbar className="bg-nyan p-2">
        <Container fluid>
          <Image src={Logo} height={50}/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
            <Nav className="me-auto p-3">

              <Link className="nav-link" to='/'>Home</Link>
              <Link className="nav-link" to='/dashboard'>Dashboard/Login</Link>

              <NavDropdown title="Dropdown" id="basic-nav-dropdown">

                <NavDropdown.Item  className='dd'>
                  <Link className="nav-link dropdown-link" to='/profile' >Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item  className='dd'>
                  <Link className="nav-link dropdown-link" to='/settings' >Settings</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item className='ddlo'>
                  <Button className='bg-reseda btn-reseda'>Logout</Button>
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