import React, {Component} from 'react';
import './ps.css';
import {Link} from 'react-router-dom';



class Ps extends Component{
    render(){
        return(

            <div className="container">
                <div className="row">
                   
                    <div className="col-sm-3"></div>
                   
                    <div className="col-sm-6">
                        <div className="card ps">
                             <div className="card-block">
                                <h1>Payment Success</h1>
                                <h1>Thank You</h1>
                                <Link to="/">
                                <a href="">Back to homepage</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                   
                    <div className="col-sm-3"></div> 

                </div>
            </div>

        );
    }
}




export default Ps;