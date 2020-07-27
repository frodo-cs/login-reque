import React from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import "./css/Main.css"
import AppContext from '../context/app-context'

class User extends React.Component {
    static contextType = AppContext

    constructor(props){
      super(props)

      this.state = {
        username: "",
        fullname: ""
      }
    }
    
    componentDidMount(){
      axios.get('http://localhost:5000/user/' + this.props.match.params.id)
        .then(response => {
          this.setState({
            username: response.data[0].username,
            fullname: response.data[0].full_name
          })
        })
        .catch(function (error) {
          console.log(error)
        }) 
    }

    render () {    
        return (
          <div className='MainBody'>
            <Form style={{"width":"50%"}}>
                <Form.Group>
                    <Form.Label>Full name</Form.Label>
                    <Form.Control type="text" placeholder={this.state.fullname} disabled/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder={this.state.username} disabled/>
                </Form.Group>
            </Form>
          </div>
        )
    }
  }
  
  export default User