import React, { Component } from "react";
import api from "./../../services/api";
import "./New.css";

export default class New extends Component {
  state = {
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  };

  handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", this.state.image);
    data.append("author", this.state.author);
    data.append("place", this.state.place);
    data.append("description", this.state.description);
    data.append("hashtags", this.state.hashtags);

    await api.post("posts", data);
    this.props.history.push("/");
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeImage = e => {
    this.setState({ image: e.target.files[0] });
  };
  render() {
    return (
      <form id="new-post">
        <label for="selecao-arquivo">Selecionar um arquivo &#187;</label>
        <input
          id="selecao-arquivo"
          type="file"
          onChange={this.handleChangeImage}
        />
        <input
          type="text"
          name="author"
          placeholder="Autor"
          onChange={this.handleChange}
          value={this.state.author}
        />
        <input
          type="text"
          name="place"
          placeholder="Local"
          onChange={this.handleChange}
          value={this.state.place}
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          onChange={this.handleChange}
          value={this.state.description}
        />
        <input
          type="text"
          name="hashtags"
          placeholder="Hashtags"
          onChange={this.handleChange}
          value={this.state.hashtags}
        />
        <button type="submit" onClick={this.handleSubmit}>
          Enviar
        </button>
      </form>
    );
  }
}
