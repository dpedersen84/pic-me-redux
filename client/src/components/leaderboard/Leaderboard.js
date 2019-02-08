import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PicFeed from "../pics/PicFeed";
import Spinner from "../spinner/Spinner";
import { getPics } from "../../actions/picActions";

class Leaderboard extends Component {
  componentDidMount() {
    this.props.getPics();
  }

  render() {
    const { pics, loading } = this.props.pics;
    let picContent;

    if (loading) {
      picContent = <Spinner />;
    } else if (pics === null) {
      picContent = <h1>No pics have been uploaded :(</h1>;
    } else {
      picContent = <PicFeed pics={pics} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto pt-3">{picContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Leaderboard.propTypes = {
  pics: PropTypes.object.isRequired,
  getPics: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  pics: state.pics
});

export default connect(
  mapStateToProps,
  { getPics }
)(Leaderboard);
