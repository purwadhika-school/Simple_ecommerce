import React, {Component} from 'react';
import './pdp.css';
import {
  Link
} from 'react-router-dom';
import axios from 'axios';
import { BASE_API_URL } from '../lib/util';
import Header from '../header/header';
import moment from 'moment'



class Pdp extends Component{
    constructor(props){
        super(props)

        this.state = {
            product_detail_api: {},
            
        }
    }

    componentWillMount(){
        console.log(this.props)
        console.log(this.props.match.params.id)
        this.getProduct()
    }

    getProduct = async () => {
        try{
            let response = await axios.get(BASE_API_URL + '/productdetails?filter[where][product_id]=' + this.props.match.params.id)
            let responseJson = await response;
            console.log(responseJson.data)
            console.log(responseJson.data[0])
            this.setState({ product_detail_api: response.data[0] })
        }catch(error){
            console.error(error);
        }
    }

    render(){
        if(this.state.product_detail_api){
            return(
                <div className="container">
                    <Product_detail data={this.state.product_detail_api} />
                </div>
            )
        }
        return <div>Loading...</div>
    }
}




const Product_detail = (props) => {
    
    const addToCart = async () => {
        const token = await getToken()
        const order = await getOrder(token)
        const cart = await postCart(order, token)
        console.log(order)
    }




    const getToken = async () => {
        const token = await localStorage.getItem('token')
        return token
    }


    const getOrder = async (token) => {
        try {
            let response = await axios.get(BASE_API_URL + '/orders?access_token=' + token + '&filter[where][user_id]=' + token + '&filter[where][status]=OPEN')
            let responseJson = await response;
            const getTime = new Date().getTime()

            if (!responseJson.data[0]){
                let params = {
                    "user_id": token,
                    "order_id": "ORDER_" + getTime,
                    "cart_id": "CART_" + getTime,
                    "status": "OPEN"
                }

                return axios.post(BASE_API_URL + '/orders?access_token=' + token, params)
                    .then(res => {
                        return res.data
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } 

            return responseJson.data[0]
            
        } catch(error) {
            console.error(error);
        }
    }


    const postCart = (order, token) => {
        const payloads = {
            "user_id": token,
            "cart_id": order.cart_id,
            "product_id": props.data.product_id,
            "product_name": props.data.product_name,
            "image": props.data.image,
            "price": props.data.price,
            "quantity": 1
        }
        
        axios.post(BASE_API_URL + '/carts?access_token=' + token, payloads)
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })
    }


    return(
        <div>
            <Header className="App-main" />
            <div className="row">
                <div className="col-sm-5">    
                    <img src={props.data.image} alt="Product" className="img-thumbnail"></img>
                </div>
                <div className="col-sm-7">
                    <div className="card pdp">
                        <div className="card-block">
                            <h4 className="card-title">{props.data.product_name}</h4>
                            <p className="card-text">Price: Rp {props.data.price}</p>
                            <p>{props.data.description} </p>
                            <button 
                                onClick={() => addToCart()}
                                type="submit" className="btn btn-primary float-left" >Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Pdp;