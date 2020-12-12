import './SideNav.css'
import { Navbar, Nav, Image } from 'react-bootstrap'
import logo from '../../logo.png'
import { Link } from 'react-router-dom'
const SideNav = () => {
    return (
        <Navbar className="nav flex-column" >
            < Navbar.Brand href="#home" ><Image src={logo} alt="LOGO" className="logo" /></Navbar.Brand >
            <Nav className="flex-column">
                <Link className="links" to="/">Home Page</Link>
                <Link className="links" to="/signin-page">Sign In</Link>
                <Link className="links" to="/signup-page">Sign Up</Link>
                <Link className="links" to="/watched-page">Watch List</Link>
            </Nav>
            {/* <Form inline className="search-form">
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
            </Form> */}
        </Navbar >
    )
}

export default SideNav
