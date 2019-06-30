import React, { Component } from "react";
import api, { baseURL } from "./../../services/api";
import Post from "../../components/Post/Post";
import io from "socket.io-client";

import "./Feed.css";
export default class Feed extends Component {
  state = {
    feed: []
  };

  componentDidMount = async () => {
    this.registerToSocket();

    try {
      const response = await api.get("posts");
      console.log(response.data);
      this.setState({
        feed: response.data
      });
    } catch (e) {
      console.log(e);
    }
  };

  registerToSocket = () => {
    const socket = io(baseURL);
    socket.on("post", newPost => {
      this.setState({
        feed: [newPost, ...this.state.feed]
      });
    });
    socket.on("liker", like => {
      this.setState({
        feed: this.state.feed.map(post => (post._id === like._id ? like : post))
      });
    });
  };

  handleLike = id => {
    api.post(`/posts/${id}/liker`);
  };

  render() {
    return (
      <>
        {this.state.feed.length ? (
          <section id="post-list">
            {this.state.feed.map(el => (
              <Post
                key={el._id}
                place={el.place}
                handleLike={() => this.handleLike(el._id)}
                author={el.author}
                hashtags={el.hashtags}
                description={el.description}
                likes={el.likes}
                image={el.image}
              />
            ))}
          </section>
        ) : (
          <p>loading...</p>
        )}
      </>
    );
  }
}
