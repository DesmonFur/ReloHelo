import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
export class Post extends Component {
  state = {
    post: []
  };

  componentDidMount() {
    this.getSinglePost();
  }

  //   componentDidUpdate(prevProps,prevState){
  //       this.getSinglePost()
  //   }

  getSinglePost = () => {
    const { postid } = this.props.match.params;
    axios.get(`/api/post/${postid}`).then(res => {
      console.log(postid);
      this.setState({
        post: res.data
      });
    });
  };

  render() {
    console.log(this.props.match.params.postid);
    console.log(this.state);
    let mappedPost = this.state.post.map(post => {
      return (
        <Posts>
          <div key={post.id}>
            <h1> Title:{post.title}</h1>
            <h1> Content:{post.content}</h1>
          </div>
          <img src={post.img} alt="post" />
          <h2> Username: {post.username}</h2>
          <img src={post.profile_pic} alt="profile" />
        </Posts>
      );
    });
    return <div>{mappedPost}</div>;
  }
}

const Posts = styled.div`
  display: flex;
  border: 1px solid red;
  justify-content: space-between;
`;



export default Post;
