import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      userType: "",
      secretKey: ""
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { userType, secretKey, name, email, password } = this.state;

    if (userType === "Admin" && secretKey !== "282000") {
      alert("Invalid Admin");
      return;
    }

    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomin: true,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        userType,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister");
      if (data.status === "ok") {
        alert("Signup Successful");
        // Reset form fields after successful submission
        this.setState({
          name: "",
          email: "",
          password: "",
          userType: "",
          secretKey: "",
        });
        // Redirect the user to the sign-in page
        window.location.href = "./Signin";
      } else {
        alert("Something went wrong");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong");
    });
  };

  render() {
    const { userType } = this.state;

    return (
      <div>
        <div>
          <div className='Signin-con'>
            <div className='h-screen flex flex-grow items-center justify-center' id="Signin">
              <form
                className='signin flex flex-col border shadow-2xl rounded-md p-9'
                onSubmit={this.handleSubmit}
              >
                <div className='text-white text-3xl text-center mb-5'>
                  <h2>Signin</h2>
                </div>
                <div className='flex text-white'>
                  <p>Register as</p>
                  <input className='ml-3 mr-2'
                    type="radio"
                    name="UserType"
                    value="User"
                    onChange={e => this.setState({ userType: e.target.value })}
                  />
                  User
                  <input className='ml-3 mr-2'
                    type="radio"
                    name="UserType"
                    value="Admin"
                    onChange={e => this.setState({ userType: e.target.value })}
                  />
                  Admin
                </div>
                {userType === "Admin" ? (
                  <input
                    className="input-box text-white text-base py-2 bg-transparent placeholder-white"
                    placeholder='Secret Key'
                    type="password"
                    id="Secret Key"
                    onChange={e => this.setState({ secretKey: e.target.value })}
                  />) : null}
                <input
                  className="input-box text-white text-base py-2 bg-transparent placeholder-white"
                  placeholder='User Name'
                  type="text"
                  id="Username"
                  name="Username"
                  // required
                  onChange={e => this.setState({ name: e.target.value })}
                />
                <input
                  className="input-box text-white text-base py-2 bg-transparent placeholder-white"
                  placeholder='Email Address'
                  type="email"
                  id="email"
                  name="email"
                  // required
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <input
                  className="input-box text-white text-base font-normal w-72 py-2 bg-transparent placeholder-white"
                  placeholder='Password'
                  type="password"
                  id="password"
                  name="password"
                  // required
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <div className="button w-72 h-11 rounded-lg text-center leading-10 mt-10 mb-8">
                  <button type="submit" className="w-36 text-white">
                    Sign Up
                  </button>
                </div>
                <div className='ml-auto'>
                  <span className="text-white text-sm">Already registered? </span>
                  <Link to='/Signin' className="signup-btn text-sm font-bold">
                    Sign In
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;
