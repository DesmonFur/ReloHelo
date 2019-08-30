import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios'
export class Form extends Component {
  state = {
    title: "",
    content: "",
    img: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // createPost = () => {
  //     const {userId: userid} = this.props
  //     const {title,img,content} = this.state
  //     axios.post(`/api/post/${userid}`, {title,img,content})
  //     this.props.history.push('/dashboard')
  // }

  createPost = () => {
      // const {userId: userid} = this.props
      const {title,img,content} = this.state
      axios.post(`/api/post/:userid`, {title,img,content})
      this.props.history.push('/dashboard')
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <input onChange={this.handleChange} type="text" name="title" />
        <textarea
          onChange={this.handleChange}
          rows="4"
          type="text"
          name="content"
          cols="50"
        />
        <input onChange={this.handleChange} type="text" name="img" />
        <img src={this.state.img} alt="preview" />
        <button onClick={this.createPost}>Create Post</button>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { userId } = reduxState;
  return { userId };
}

export default connect(mapStateToProps)(Form);
