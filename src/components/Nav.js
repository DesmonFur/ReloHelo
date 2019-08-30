import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../ducks/reducer";
import { Link } from "react-router-dom";
import axios from "axios";
export class Nav extends Component {
  componentDidMount() {
    try {
      this.getMe();
    } catch (err) {
      this.props.history.push("/");
    }
  }

  getMe = () => {
    axios.get("/api/auth/me").then(res => {
      this.props.setUser(res.data.user);
    });
  };

  logout = () => {
    axios.post("/api/auth/logout").then(res => {
      this.props.history.push("/");
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.username}
        <img src={this.props.profile_pic} alt="profile" />
        <Link to="/dashboard">
          <button>Home</button>
        </Link>
        <Link to="new">
          <button>New Post</button>
        </Link>
        <Link to="/">
          <button onClick={this.logout}>Logout</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { username, profile_pic, userId } = reduxState;
  return { username, profile_pic, userId };
}

export default connect(
  mapStateToProps,
  { setUser }
)(Nav);
