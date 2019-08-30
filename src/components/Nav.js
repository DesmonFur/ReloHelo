import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../ducks/reducer";
import { Link } from "react-router-dom";
export class Nav extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.username}
        <img src={this.props.profileImg} alt="profile" />
        <Link to='/dashboard'>
            <button>Home</button>
        </Link>
        <Link to='new'>
            <button>New Post</button>
        </Link>
        <Link to='/'>
            <button>Logout</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { username, profileImg, userId } = reduxState;
  return { username, profileImg, userId };
}

export default connect(
  mapStateToProps,
  { setUser }
)(Nav);
