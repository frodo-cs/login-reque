import React from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import styled from 'styled-components'
import AppContext from '../context/app-context'

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }

    .navbar-brand, .navbar-nav .nav-link {
        color: #bbb;

        &:hover {
            color: white;
        }
    }
`;

class Navigation extends React.Component {
    static contextType = AppContext

    logout = () => {
        this.context.resetUser()
    }

    home = () => {
        var link = "/"
        if (this.context.user !== "Default"){
            link = this.context.admin === 1 ? "/admin" : "/user/" + this.context.user
        } 
        return link
    }
    
    render () {
      return (
        <Styles>
            <Navbar expand='lg'>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                        { this.context.user !== "Default" ? 
                            <Nav.Item>
                                <Nav.Link href='/' onClick={this.logout}>Logout</Nav.Link>
                            </Nav.Item>
                            :
                            <Nav.Item>
                                <Nav.Link href='/'>LoginApp</Nav.Link>
                            </Nav.Item>
                        }
                        </Nav>             
                    </Navbar.Collapse>
            </Navbar>
        </Styles>  
      )
    }
}

export default Navigation