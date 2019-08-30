import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../ducks/reducer";
export class Auth extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state.username)
    console.log(this.state.password)
  };

  registerUser = () => {
    const { username, password } = this.state;
    axios
      .post("/api/auth/register", { username, password })
      .then(res => {
        this.setState({
          username: res.data[0],
          profileImg: res.data[0]
        });

        this.props.setUser(
          res.data[0].username,
          res.data[0].profile_pic,
          res.data[0].id
        );
        this.props.history.push("/dashboard");
      })
      .catch(err => alert(err));
  };

  login = () => {
    const { username, password } = this.state;
    axios.post("/api/auth/login", { username, password }).then(res => {
      this.setState({
        username: res.data[0],
        profileImg: res.data[0]
      });
      console.log(res.data);
      const {username,profile_pic:profileImg,id:userId} = res.data[0]
      this.props.setUser(
     {username,profileImg,userId}
      );
      this.props.history.push("/dashboard");
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <input onChange={this.handleChange} type="text" name="username" placeholder='login' />
        <button onClick={this.login}>Login</button>
        <input onChange={this.handleChange} type="text" name="password" placeholder='password' />
        <button onClick={this.registerUser}>Register</button>
      </div>
    );
  }
}

export default connect(
  null,
  { setUser }
)(withRouter(Auth));
