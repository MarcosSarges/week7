import React from "react";
import more from "./../../assets/more.svg";
import like from "./../../assets/like.svg";
import send from "./../../assets/send.svg";
import comment from "./../../assets/comment.svg";
import "./Post.css";

const Post = props => (
  <article>
    <header>
      <div className="user-info">
        <span>{props.author}</span>
        <span className="place">{props.place}</span>
      </div>
      <img src={more} alt="Mais" />
    </header>
    <img src={`http://localhost:3333/files/${props.image}`} />
    <footer>
      <div className="actions">
        <button type="button" onClick={props.handleLike}>
          <img src={like} />
        </button>
        <img src={comment} />
        <img src={send} />
      </div>
      <strong>{props.likes}</strong>
      <p>
        {props.description}
        {!!props.hashtags && (
          <span>
            {props.hashtags.includes("#") ? "" : "#"}
            {props.hashtags}
          </span>
        )}
      </p>
    </footer>
  </article>
);

export default Post;
