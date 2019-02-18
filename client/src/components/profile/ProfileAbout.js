import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import { getUserPics } from "../../actions/picActions";

class ProfileAbout extends Component {
  componentDidMount() {
    const { user } = this.props.auth;
    this.props.getUserPics(user.id);
  }

  render() {
    const { profile } = this.props;
    // const { pics } = this.props.pics;

    // Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{firstName} does not have a bio.</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            {/* <hr />
            <h3 className="text-center text-info">Latest Pic</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {" "}
                <img src={pics[0]} />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  pics: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getUserPics: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  pics: state.pics,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserPics }
)(ProfileAbout);
