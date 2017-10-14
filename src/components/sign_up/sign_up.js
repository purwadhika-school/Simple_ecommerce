import React, {Component} from 'react';
import './sign_up.css';
import {
    Link
  } from 'react-router-dom';
import axios from 'axios';
import{ BASE_API_URL } from '../lib/util';
  
class Signup extends Component{
    constructor(props){
        super(props)

        this.state={
            email:'',
            password:'',
            confirm_pass:'',
            error: false,
            message:'',
        }
    }

    onSignup = (e)=>{
        e.preventDefault();


        console.log(this.state.email)
        if (this.state.password === this.state.confirm_pass){
            this.setState({
                error: false
            })      

            const params ={
                "email": this.state.email,
                "password": this.state.password
            }
            axios.post(BASE_API_URL + '/Users', params)
                .then(res=>{
                    console.log(res)
                    if(res.status === 200){
                        this.setState({ message: 'Signup success! You can now login' })
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        }   else{
            this.setState({
               error: true 
            })
        }

    }

    render(){
        return(
            <div>
                <br/><br/>
                <div className="card Signup">
                    <div className="card-block">
                        <form onSubmit={this.onSignup}>
                            <h4>Daftar akun baru sekarang</h4>
                            <h6>{this.state.error && 'Password dan Confirm Password harus sama'}</h6>
                            <h6>{this.state.message !='' && this.state.message}</h6>
                            <input 
                                type="email"
                                className="email"
                                placeholder="E-mail"
                                onChange={(event)=> this.setState({ email: event.target.value })} />
                            <br/>
                            <input 
                                type="password"
                                className="password"
                                placeholder="Password"
                                onChange={(event)=> this.setState({ password:event.target.value })}  />
                            <br/>
                            <input 
                                type="password"
                                className="password"
                                placeholder="Confirm Password"
                                onChange ={(event)=>this.setState({ confirm_pass: event.target.value })}  />
                            <br/>
                            <button type="submit" className="btn btn-primary">Sign Up!</button>
                            <br/>
                            <Link to="/Login">
                            <a href="#">Log in</a>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }    
}


export default Signup;