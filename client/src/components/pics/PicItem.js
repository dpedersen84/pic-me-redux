import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePic, addLike, removeLike } from "../../actions/picActions";

class PicItem extends Component {
  onDeleteClick(id) {
    this.props.deletePic(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;

    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { pic, auth, showActions } = this.props;

    return (
      <div className="card mb-3">
        <img src={pic.image} alt={pic.caption} className="card-img-top" />
        <div className="card-body">
          <p className="card-text">{pic.caption}</p>
          {showActions ? (
            <span>
              <button
                onClick={this.onLikeClick.bind(this, pic._id)}
                type="button"
                className="btn btn-light mr-1"
              >
                <i
                  className={classnames("text-secondary fas fa-thumbs-up", {
                    "text-info": this.findUserLike(pic.likes)
                  })}
                />
                <span className="badge badge-light">{pic.likes.length}</span>
              </button>
              <button
                onClick={this.onUnlikeClick.bind(this, pic._id)}
                type="button"
                className="btn btn-light mr-1"
              >
                <i className="text-secondary fas fa-thumbs-down" />
              </button>
              <Link to={`/pic/${pic._id}`} className="btn btn-info mr-1">
                Comments
              </Link>
              {pic.user === auth.user.id ? (
                <button
                  onClick={this.onDeleteClick.bind(this, pic._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </span>
          ) : null}
        </div>
        <div className="card-footer">
          <small className="text-muted">Pic uploaded by {pic.name}</small>
        </div>
      </div>
    );
  }
}

PicItem.defaultProps = {
  showActions: true
};

PicItem.propTypes = {
  pic: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePic: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePic, addLike, removeLike }
)(PicItem);
