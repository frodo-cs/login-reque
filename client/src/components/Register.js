import React from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import "./css/Main.css"

class Register extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
          username: '',
          fullname: '',
          password: '',
          error: { username:'', password:'', fullname:''}
        }
    }

    isValid(){
        if(!this.state.fullname){
            this.setState({
              error: {
                fullname: 'Full name cannot be blank'
              }
            })
            return false
        }

        if(!this.state.username){
          this.setState({
            error: {
              username: 'Username cannot be blank'
            }
          })
          return false
        }
    
        if(!this.state.password){
          this.setState({
            error: {
              password: 'Password cannot be blank'
            }
          })
          return false
        }
    
        return true
    }

    onSubmit(e){
        e.preventDefault();
    
        if(this.isValid()){
          const newUser = {
            fullname: this.state.fullname,
            username: this.state.username,
            password: this.state.password,
          }
      
          axios.post('http://localhost:5000/add_user', newUser)
          .then(res => console.log(res.data))
      
          console.log(`Form submitted`) 
          this.props.history.push('/')
        }
    }    

    onChangeFullName(e){
        this.setState({
            fullname: e.target.value
        })
    }

    onChangeUserName(e){
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    cancel = () => {
        this.props.history.push('/')
    }

    render () {    
        return (
          <div className='MainBody'>
            <Form style={{"width":"50%"}}  onSubmit={this.onSubmit.bind(this)}>
                <Form.Group>
                    <Form.Label>Full name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name" onChange={this.onChangeFullName.bind(this)}/>
                    <Form.Text className="text-muted">{this.state.error.fullname}</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" onChange={this.onChangeUserName.bind(this)}/>
                    <Form.Text className="text-muted">{this.state.error.username}</Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.onChangePassword.bind(this)}/>
                    <Form.Text className="text-muted">{this.state.error.password}</Form.Text>
                </Form.Group>
                <Form.Row  style={{"marginBottom":"10px"}}>
                    <Button variant="primary" type="submit" size="lg" block>Register</Button>
                </Form.Row>
                <Form.Row>
                    <Button variant="secondary" type="button" size="sm" block onClick={this.cancel}>Cancel</Button>
                </Form.Row>
            </Form>
          </div>
        )
    }
  }
  
  export default Register 