import React,{Component} from "react";
import ReactDOM from 'react-dom'
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {LOGIN_URL} from '../constant_url/const';

import {LOGIN_PASSPORT} from '../constant_url/const';
import "../React_Bootstrap/login_boot.css";
import Success from './success';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:""
        };
    }
    validateForm(){
        return this.state.email.length>0 && this.state.password.length>0;
    }
    emailHandle=(e)=>{
        e.preventDefault();
        this.setState({
            email:e.target.value
        });
    }
    pwdHandle=(e)=>{
        e.preventDefault();
        this.setState({
            password:e.target.value
        });
    }
    loginHandler=(event)=>{
        event.preventDefault();
        let logUser=this.state;
        console.log(logUser);
        //debugger;


        axios.post(LOGIN_PASSPORT,{
            email: this.state.email,
            password: this.state.password,
            mode:'cors'
        }).then((res)=>{
            console.log("In Then "+res.data);
            // if(res.data.message!=='Failed'){
            if(res.data.message==='Success'){

                console.log("Res success : ",res);
                let token=jwt.sign(logUser,'Rashika'); //object,privatekey
                console.log("Token :",token);
                localStorage.setItem('user',token);

                ReactDOM.render(<div id="loguser">{logUser.email}<Success/></div>,document.getElementById('root'));
            }
            else{
                console.log("Failed to Login",res);
            }
        }).catch((err)=>{
            console.log(err);
        });



    }
    render(){
        return(
          <div className="container">
              <div className="row">
                  <div className="col-sm-6  col-md-4 col-md-offset-4 ">
                        <h1 className="text-center login-title">Sign In</h1>
                      <div className="wall">
                          <img src={'http://www.pvhc.net/img148/lonxyevkaadnagagquxa.png'} height="80px" width="80px" className="profile-img"/>
                          <form className="form-signin">
                              <input type="text" className="inputtext" placeholder="Email" required autoFocus onChange={this.emailHandle.bind(this)} value={this.state.email}/>
                              <input type="text" className="inputpwd" placeholder="Password" required autoFocus onChange={this.pwdHandle.bind(this)} value={this.state.password}/>
                              <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.loginHandler.bind(this)}>Sign in</button>
                              <label className="checkbox" >
                                  <input type="checkbox" value="remember-me"/>
                                      Remember me
                              </label>
                              <span className="clearfix"/>

                         </form>
                      </div>
                      <a href="#" className="text-center new-account">Create an account </a>
                  </div>
              </div>
          </div>
        );
    }

}