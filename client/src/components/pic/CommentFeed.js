import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, picId } = this.props;

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} picId={picId} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  picId: PropTypes.string.isRequired
};

export default CommentFeed;
