import React, {Component} from 'react';
import './payment.css';
import {
    Link
} from 'react-router-dom';
import axios from 'axios'
import { Redirect } from 'react-router'
import { BASE_API_URL } from '../lib/util'


class Payment extends Component{
    state = {
        totalPrice: 0,
        orderID: '',
        cardNo: '',
        month: '',
        year: '',
        cvv: '',
        msg: '',
        redirect: false,
        token: null
    }

    componentDidMount(){
        console.log(this.props.match.params.order_id)
        this.getData()
    }

    getData = async () => {
        const token = await this.getToken()
        const order = await this.getOrder(token)
    }

    getToken = async () => {
        const token = await localStorage.getItem('token')
        this.setState({ token: token })
        return token
    }

    getOrder = async (token) => {
        try {
            let response = await axios.get(BASE_API_URL + '/orders/' + this.props.match.params.order_id + '?access_token=' + token)
            let responseJson = await response;
            this.setState({ 
                totalPrice: responseJson.data.totalPrice,
                orderID: responseJson.data.order_id
            })
            return responseJson.data
        } catch(error){
            console.log(error);
        }
    }

    payHandler = () => {
        const { cardNo, month, year, cvv } = this.state

        if (cardNo === '' || month === '' || year === '' || cvv === '') {
            this.setState({ msg: 'Please fill all data!' })
        } else {
            this.payment()
        }
    }

    payment = () => {
        const payloads = {
            "status": "CLOSED"
        }

        axios.put(BASE_API_URL + '/orders/' + this.props.match.params.order_id + '?access_token=' + this.state.token, payloads)
            .then(res => {
                console.log(res)
                this.setState({ redirect: true })
            })
            .catch(err => {
                console.log(err)
            })
    }


    

    render(){
        if (this.state.redirect) {
            return <Redirect to='/paymentsuccess'/>;
        }

        return (
            <div className="container">
                <br/><br/>
                <div className="row">
                    <div className="card payment">
                        <div className="card-block">
                                <h6>Order ID: {this.state.orderID}</h6>
                                <h6>Total Price: Rp. {this.state.totalPrice}</h6>
                                <br/>
                                {this.state.msg && <h5>{this.state.msg}</h5>}
                                <br/>
                                <h4> Pembayaran Via Kartu Visa/Mastercard/JCB</h4>
                                <input 
                                    onChange= {(event) => this.setState({ cardNo: event.target.value })}
                                    type="number" className="nomorkartu" placeholder="Nomer Kartu"/>
                                    
                                
                                <div className ="form-inline">
                                    <p className="dua">Waktu Kadaluarsa</p>    
                                    <input 
                                        onChange= {(event) => this.setState({ month: event.target.value })}
                                        type="number" className="quantity" placeholder="Month" />
                                    <input 
                                        onChange= {(event) => this.setState({ year: event.target.value })}
                                        type="number" className="quantity" placeholder="Year" />
                                    <input 
                                        onChange= {(event) => this.setState({ cvv: event.target.value })}
                                        type="number" className="quantity" placeholder="CVV" />

                                </div>
                                <br/>
                                 


                                <Link to="/">
                                    <button type="submit" className="btn btn-primary float-left" >Cancel</button>
                                </Link>
                                
                                {/* <Link to="/paymentsuccess"> */}
                                    <button 
                                        onClick={() => this.payHandler()}
                                        type="submit" className="btn btn-primary float-right">Pay</button>
                                {/* </Link> */}
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Payment;