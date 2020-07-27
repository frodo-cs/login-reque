import React from 'react'
import { Form, Button, Table } from 'react-bootstrap'
import axios from 'axios'
import "./css/Main.css"
import AppContext from '../context/app-context'

class Admin extends React.Component {
    static contextType = AppContext
    
    constructor(props){
        super(props)
    
        this.state = {
          users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
          .then(response => {
            this.setState({
              users: response.data
            })
          })
          .catch(function (error) {
            console.log(error)
          })
          
    }

    validate(e){
        const user = e.currentTarget.getAttribute('username')
        axios.post('http://localhost:5000/validate/' + user)
        .then(console.log(user + " validated"))
        .catch(function (error) {
            console.log(error)
        })
        window.location.reload(false);
    }

    userList() {
        let comp = this
        return this.state.users.map((user, i) => {
            return <tr key={i}>
                <td>{user.full_name}</td>
                <td>{user.username}</td>
                <td><Button variant="secondary" username={user.username} type="button" size="sm" onClick={comp.validate.bind(this)}>Approve</Button></td>         
            </tr>
        })
    }

    render () {    
        return (
          <div className='MainBody'>
            <Form style={{"width":"50%"}}>
                <Table>
                    <thead>
                        <tr>
                        <th>Full name</th>
                        <th>Username</th>
                        <th>Approve</th>
                        </tr>
                    </thead>   
                    <tbody>
                        {this.userList()}     
                    </tbody>              
                </Table>                    
            </Form>
          </div>
        )
    }
  }
  
  export default Admin