import React, {Component} from 'react';
import './header.css';
import {
  Link
} from 'react-router-dom';
import axios from 'axios'
import { Redirect } from 'react-router'
import { BASE_API_URL } from '../lib/util'


class Header extends Component{
    constructor(props) {
        super(props)

        this.state = {
            tokenState: null,
        }
    }
    

    componentDidMount(){
        this.getToken()
    }

    getToken = async () => {
        const tokenVariable = await localStorage.getItem('token')
        console.log(tokenVariable)
        this.setState({
            tokenState: tokenVariable
        })
    }


    logoutHandler = () => {
        console.log('logout')
        axios.post(BASE_API_URL + '/Users/logout?access_token=' + this.state.tokenState)
            .then(result => {
                console.log(result)
                localStorage.clear()
                this.setState({
                    tokenState: null
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    render(){
        return(
            <header>
                <div className="logo">Shop Online</div> 
                
                <nav>
                    <ul>
                        <li>
                            <Link to="/"> Home </Link>
                        </li>
                        {this.state.tokenState && 
                        <li>
                            <Link to="/cart" > Cart </Link>
                        </li>}
                        {!this.state.tokenState &&
                        <li>
                            <Link to="/Login"> Login </Link>
                        </li>
                        }
                        {!this.state.tokenState && 
                        <li>
                            <Link to="/Signup"> SignUp </Link>
                        </li>
                        }
                        {this.state.tokenState && 
                        <li>
                            <button onClick={() => this.logoutHandler()}>Logout</button>
                        </li>
                        }
                    </ul>
                </nav>
            </header>
        );
    }
}


export default Header;