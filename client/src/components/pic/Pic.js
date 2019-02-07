import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PicItem from "../pics/PicItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Spinner from "../spinner/Spinner";
import { getPic } from "../../actions/picActions";

class Pic extends Component {
  componentDidMount() {
    this.props.getPic(this.props.match.params.id);
  }

  render() {
    const { pic, loading } = this.props.pics;
    let picContent;

    if (pic === null || loading || Object.keys(pic).length === 0) {
      picContent = <Spinner />;
    } else {
      picContent = (
        <div>
          <PicItem pic={pic} showActions={false} />
          <CommentForm picId={pic._id} />
          <CommentFeed picId={pic._id} comments={pic.comments} />
        </div>
      );
    }

    return (
      <div className="pic">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/leaderboard" className="btn btn-light mb-3">
                Back to Leaderboard
              </Link>
              {picContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Pic.propTypes = {
  getPic: PropTypes.func.isRequired,
  pics: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  pics: state.pics
});

export default connect(
  mapStateToProps,
  { getPic }
)(Pic);
