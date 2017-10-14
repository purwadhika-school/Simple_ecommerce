import React, {Component} from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import { BASE_API_URL } from '../lib/util'
import axios from 'axios';


class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            message:'',
            error: false,
            redirect: false
        }
        
    }

    onLogin = (e) => {
        e.preventDefault();

        
        if(this.state.email === '' || this.state.password ==='' ){
            this.setState ({message:'password dan login harus diisi !'})

            
        }  else if(this.state.email != ''&& this.state.password !=''){
            const params ={
                "email": this.state.email,
                "password":this.state.password
                
            }
            
            axios.post(BASE_API_URL + '/Users/login',params)
                .then(res=>{
                    console.log(res)
                    if(res.status === 200 ){
                        this.setState({ 
                            message:'Login success!!',
                            redirect: true
                        })
                        localStorage.setItem('token', res.data.id)

                        
                    }else if(res.status === 401)
                    this.setState({ message: 'email dan password anda salah' })
                })
                .catch(err=>{
                    console.log(err)
                    this.setState({ message: 'email dan password anda salah' })
                })
        } 
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to='/'/>;
        }

        return(
            <div>
                <br/><br/>
                <div className="card Login">
                    <div className="card-block">
                        <form onSubmit={this.onLogin}>
                          <h4> Silahkan masuk ke dalam akun anda </h4>
                          <h6> {this.state.message}</h6>
                            <input 
                                type="email" 
                                className="email" 
                                placeholder="E-mail" 
                                onChange= {(event)=>this.setState({email:event.target.value})} />
                            <br/>
                            <input 
                                type="password" 
                                className="password" 
                                placeholder="Password"
                                onChange={(event)=>this.setState({password:event.target.value})}         />
                            <br/>
                            <button type="submit" className="btn btn-primary"> Login </button>
                            <br/>
                            <Link to="/Signup"> SignUp </Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default Login;