import React from 'react'
import { Form, Button } from 'react-bootstrap'
import "./css/Main.css"
import Axios from 'axios'
import AppContext from '../context/app-context'

class Login extends React.Component {
    static contextType = AppContext

    constructor(props){
        super(props)
  
        this.state = {
          username: "",
          password: "",
          error: { username:'', password:'', message:''}
        }
    }

    isValid(){
        if(!this.state.username){
          this.setState({
            error: {
              username: 'Username missing'
            }
          })
          return false
        }
    
        if(!this.state.password){
          this.setState({
            error: {
              password: 'Password missing'
            }
          })
          return false
        }
    
        return true
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

    register = () => {
        this.props.history.push('/register')
    }

    componentDidMount(){
        this.context.resetUser()
    }

    onSubmit(e){
        e.preventDefault();
    
        if(this.isValid()){   
            const user = {
                username: this.state.username,
                password: this.state.password,
            }
            
            Axios.post('http://localhost:5000/login', user)
            .then(res => {
                if(res.data){
                    if(res.data.validated === 1) {
                        this.context.updateUser(res.data.username)
                        this.context.updateAdmin(res.data.admin)
                        if(this.context.admin === 1) {
                            this.props.history.push('/admin')
                        } else {
                            this.props.history.push('/user/' + res.data.username)
                        }   
                    } else {
                        this.setState({
                            error : {
                                message: "User has not been validated"
                            }
                        })
                    }
                } else {
                    this.setState({
                        error : {
                            message: "Incorrect username or password"
                        }
                    })
                }           
            })           
        }
    }   

    render () {    
        return (
          <div className='MainBody'>
            <Form onSubmit={this.onSubmit.bind(this)}>
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
                <Form.Group>
                    <Form.Text className="text-muted">{this.state.error.message}</Form.Text>
                </Form.Group>
                <Form.Row style={{"marginBottom":"10px"}}>
                    <Button variant="primary" type="submit" size="lg" block>Login</Button>
                </Form.Row>
                <Form.Row>
                    <Button variant="secondary" type="button" size="sm" block onClick={this.register}>Register</Button>
                </Form.Row>
            </Form>
          </div>
        )
    }
  }
  
  export default Login