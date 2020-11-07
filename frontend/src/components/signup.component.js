import React, { Component } from "react";
import axios from 'axios';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          firstname: '',
          lastname: '',
          email: '',
          password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };
    
      handleSubmit = e => {
        e.preventDefault();
    
        const { firstname, lastname, email, password } = this.state;
    
        const user = {
          firstname,
          lastname,
          email,
          password
        };
    
        axios
          .post('http://localhost:3001/signup', user)
          .then(() => console.log('Ok'))
          .catch(err => {
            console.error(err);
          });
      };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name"  onChange={this.handleInputChange}/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" onChange={this.handleInputChange}/>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={this.handleInputChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.handleInputChange}/>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p>
            </form>
        );
    }
}