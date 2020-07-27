import React, {Component} from 'react'
import AppContext from './app-context'
import Axios from 'axios'

class GlobalState extends Component{

    state = {
        user: '',
        admin: '0'
    }

    updateUser = user => {
        this.setState({
            user: user,
        })
    }

    updateAdmin = admin => {
        this.setState({admin: admin})
    }

    resetUser = () => {
        Axios.post('http://localhost:5000/resetUser').then( res => {
            if (res.data){
                this.setState({
                user: 'Default',
                admin: '0'
                })   
            }
        }) 
    }

    componentDidMount(){
        Axios.get('http://localhost:5000/currentUser').then(res =>{
            this.setState({
                user: res.data
            })
        })
    }

    render(){
        return <AppContext.Provider value={{
            user: this.state.user,
            admin: this.state.admin,
            updateUser: this.updateUser,
            updateAdmin: this.updateAdmin,
            resetUser: this.resetUser
        }}>{this.props.children}</AppContext.Provider>
    }    

}

export default GlobalState