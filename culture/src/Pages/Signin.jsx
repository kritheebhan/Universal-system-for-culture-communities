import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Signin extends Component {
  constructor(props){
    super(props);
    this.state ={
        email: "",
        password: "",
    };
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);

    fetch("http://localhost:5000/Signin-user", {
      method:"POST",
      crossDomin:true,
      headers:{
          "Content-type":"application/json",
          Accept:"application/json",
          "Access-control-Allow-Origin":"*",
      },
      body: JSON.stringify({
          email,
          password,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister");
      if (data.status === "ok") {
        alert("Signin Successful");
        window.localStorage.setItem("token", data.data);
        window.localStorage.setItem("loggedIn", true);
        // Check user type and redirect accordingly
        if (data.userType === "Admin") {
          window.location.href = "./Admin"; // Redirect to AdminHome
        } else {
          window.location.href = "./Home1"; // Redirect to Home1
        }
      } else {
        alert("Signin Failed");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong");
    });
  }

  render() {
    return (
      <div>
        <div className='Signin-con '>
          <div className='h-screen flex flex-grow items-center justify-center' id="Signin">
            <form
              className='signin flex flex-col border shadow-2xl rounded-md p-9'
              onSubmit={this.handleSubmit}
            >
              <div className='text-white text-3xl text-center '>
                <h2>Signin</h2>
              </div>
              <input
                className="input-box text-white text-base py-2 bg-transparent placeholder-white"
                placeholder='Email Address'
                type="email"
                id="email"
                name="email"
                required
                onChange={e=>this.setState({email:e.target.value})}
              />
              <input
                className="input-box text-white text-base font-normal w-72 py-2 bg-transparent placeholder-white"
                placeholder='Password'
                type="password"
                id="password"
                name="password"
                required
                onChange={e=>this.setState({password:e.target.value})}
              />
              <div className="button w-72 h-11 rounded-lg text-center leading-10 mt-10 mb-8">
                <button type="submit" className="w-36 text-white">
                  Sign In
                </button>
              </div>
              <div className='ml-auto'>
                <span className="text-white text-sm">New User? </span>
                <Link to='/Signup' className="signup-btn text-sm font-bold">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
