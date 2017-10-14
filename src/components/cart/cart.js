import React, {Component} from 'react';
import './cart.css';
import {
  Link
} from 'react-router-dom';
import {BASE_API_URL} from '../lib/util';
import axios from 'axios';
import Header from '../header/header';



class Cart extends Component{
    constructor(props){
        super(props)

        this.state = {
            dataApiOrder: [],
            dataApiCart: [],
            totalPrice: 0,
            orderID: null,
            token: null
            // qty: 1,
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData = async () => {
        const token = await this.getToken()
        const order = await this.getOrder(token)
        const cart = await this.getCart(order, token)
        const totalPrice = await this.getTotalPrice(cart)
    }



    getToken = async () => {
        const token = await localStorage.getItem('token')
        this.setState({ token: token })
        return token 
    }

    getOrder = async (token) => {
        try { 
            let response = await axios.get( BASE_API_URL +'/orders?access_token=' + token + '&filter[where][user_id]=' + token + '&filter[where][status]=OPEN')
            let responseJson = await response;
            console.log(responseJson.data)
            this.setState({ 
                dataApiOrder: responseJson.data[0],
                orderID: responseJson.data[0].id
            })
            return responseJson.data[0]
        } catch(error){
            console.error(error);
        }
    }

    getCart = async (order, token) => {
        console.log(order, token)
        try {
            let response = await axios.get(BASE_API_URL + '/carts?access_token=' + token + '&filter[where][cart_id]=' + order.cart_id)
            let responseJson = await response;
            console.log(responseJson.data)
            this.setState({ dataApiCart: response.data })
            return responseJson.data
        } catch(error){
            console.log(error);
        }
    }

    getTotalPrice = async (cart) => {
        let totalPrice = 0;

        if (cart){
            cart.map((item, index) => {
                totalPrice = item.price + totalPrice
            })
        }

        this.setState({ totalPrice: totalPrice })
        return totalPrice
    }


    render(){
        if (this.state.dataApiCart.length > 0){
            return <Cart_thumbnail 
                data={this.state.dataApiCart} 
                total_price={this.state.totalPrice} 
                orderID={this.state.orderID}
                token={this.state.token}
                />
        } return <div>Loading ...</div>        
    }
}





const Cart_thumbnail = (props) => {
    const Product = props.data.map((res, index) => {
        return (
            <div className="card cart" key={index}>
                <div className="card-block">
                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-4">
                            <img src={res.image} alt="Product" className="img-thumbnail"></img>
                        </div>
                        <div className="col-sm-6">
                            <h6 className="card-title">{res.product_name}</h6>
                            <h6 className="card-title">Rp. {res.price}</h6>
                            {/* <p className="card-text">Quantity
                                <input type="number" className="quantity" placeholder="Quantity" />
                            </p> */}
                            {/* <p className="card-text">Subtotal
                                <input type="number" className="quantity" placeholder="Total harga" />
                            </p> */}
                        </div>
                        <div className="col-sm-1"></div>
                    </div>
                </div>
            </div>    
        )
    })


    const buyHandler = () => {
        const params = {
            "totalPrice": props.total_price
        }
    
        axios.put(BASE_API_URL + '/orders/' + props.orderID + '?access_token=' + props.token, params)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }



    return (
        <div>
            <Header className="App-main" />
            <div className="container">
                <h4>Shopping Cart</h4>
                <div className="row"> 
                    {Product}
                    <br/> <br/> <br/> <br/>
                </div><br/>
                <h6>Total Price: Rp. {props.total_price}</h6>
                <Link to={"/payment/" + props.orderID}>
                    <button 
                        onClick={() => buyHandler()}
                        type="submit" className="btn btn-primary">Buy</button>
                </Link>
                <br/> <br/> <br/> <br/>
            </div>
        </div>
       ); 
}

        

export default Cart;