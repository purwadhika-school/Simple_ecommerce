import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


// Components
// import Header from '../components/header/header';
import Login from '../components/login/login';
import Payment from '../components/payment/payment';
import Product from '../components/product/product';
import ProductPayment from '../components/product_payment/product_payment';
import Signup from '../components/sign_up/sign_up';
import Pdp from '../components/product_detail_page/pdp';
import Cart from '../components/cart/cart';
import Ps from '../components/payment_success/ps';




class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <Header className="App-main" /> */}
          <Route exact path='/' component={Product} />
          <Route exact path='/pdp/:id' component={Pdp} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/payment/:order_id' component={Payment} />
          <Route exact path='/paymentsuccess' component={Ps} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/Signup' component={Signup} />
        </div>
      </Router>
    );
  }
}

export default App;
