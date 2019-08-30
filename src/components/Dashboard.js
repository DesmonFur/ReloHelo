import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
export class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      myPosts: true,
      posts: []
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  searchTitle = () => {
    const { search } = this.state;
    const { userId } = this.props;
    // console.log(this.props.userId)
    axios.get(`/api/posts/${userId}?title=${search}&myPosts=${!this.state.myPosts}`).then(res => {
      this.setState({
        posts: res.data
      });
      console.log(res.data)
    });
  };

  flipPost = () =>{
      this.setState({
          myPosts: !this.state.myPosts
      })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getPosts = () => {
    axios.get("/api/posts").then(res => {
      this.setState({
        posts: res.data
      });
    });
  };
  render() {
    let mapped = this.state.posts.map(post => {
      return (
          <Flex key={post.id}>
              <Link to={`/post/${post.id}`}>
          <Title>{post.title}</Title>
          <Content>{post.content}</Content>
          <User>{post.username}</User>
          <img src={post.profile_pic} alt="profile" />

          </Link>
        </Flex>
      );
    });
    return (
      <div>
        <input onChange={this.handleChange} name="search" type="text" />
        <button onClick={this.searchTitle}>Search</button>
        <input onChange={this.flipPost} name="myPosts" type="checkbox" />
        myPosts
        {mapped}
      </div>
    );
  }
}

const Flex = styled.div`
  display: flex;
  justify-content: space-around;
  border: 1px solid red;
`;

const Title = styled.h1`
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;
const Content = styled.h2`
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;
const User = styled.h2`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;

function mapStateToProps(reduxState){
    const {userId} = reduxState
    return {userId}
}

export default connect(mapStateToProps)(Dashboard);
