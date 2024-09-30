import React from 'react'
import { Navbar, Nav,Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UseLogout from '../Hooks/UseLogout';

function TopBar() {

    let logout = UseLogout();

    let options = [
        {
          value: "Home",
          path: "/index",
          role: ["admin", "user", "organizer"]
        },
        {
          value: "Create",
          path: "/createEvent",
          role: ["organizer"]
        },
        {
          value: "All_Events",
          path: "/allEvents",
          role: ["admin", "user", "organizer"]
        },
        {
          value: "Organizers_Approval",
          path: "/pendingOrganizers",
          role: ["admin"]
        },
        {
          value: "Event_Approval",
          path: "/eventApprovals",
          role: ["admin"]
        },
        {
          value: "Event_DashBoard",
          path: "/cancelEvents",
          role: ["organizer"]
        }
      ]

      const role = sessionStorage.getItem('role')

  return <>
    <Navbar bg='dark' variant='dark' expand='lg' sticky='top'>
        <Container>
            <Navbar.Brand><Link to='/index' className='non-link'>Event Master</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {
                        options.filter((option)=>option.role.includes(role)).map((e)=>{
                            return <Nav.Item key={e.path} className='mr-10'><Link to={e.path} className='non-link'>{e.value}</Link></Nav.Item>
                        })
                    }
                </Nav>
                <Button variant='danger' className='mr-10' onClick={()=>logout()}>Logout</Button>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  </>
}

export default TopBar