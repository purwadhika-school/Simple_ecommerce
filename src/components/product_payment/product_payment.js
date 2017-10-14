import React,{Component} from 'react';
import './product_payment.css';

class ProductPayment extends Component{
	render(){
		return(

			<div className="card productpayment">
                    <img className="card-img-top" src={this.props.imgUrl} alt="Product" ></img>
                    <div className="card-block">
                        <h4 className="card-title">{this.props.title}</h4>
                        <p className="card-text">Price: Rp{this.props.price}</p>
                    </div>
             </div>
		);
	}
}
	


export default ProductPayment;