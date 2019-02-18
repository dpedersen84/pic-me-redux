import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../form/TextAreaFieldGroup";
import Uploader from "../uploader/Uploader";
import { addPic } from "../../actions/picActions";

class AddPic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: "",
      pic: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePicUpload = file => {
    console.log("File changed: ", file);
    if (file) {
      file.progress(info => console.log("File progress: ", info.progress));
      file.done(info => {
        console.log("File uploaded: ", info);
        this.setState({ pic: info.originalUrl });
        console.log(this.state.pic);
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;

    const picData = {
      name: user.name,
      image: this.state.pic,
      caption: this.state.caption
    };

    this.props.addPic(picData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="add-pics">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Back
              </Link>
              <h1>Add Pic</h1>
              <form onSubmit={this.onSubmit}>
                <div>
                  <Uploader
                    id="uploader"
                    name="my_pic"
                    data-images-only
                    data-tabs="file url"
                    onChange={this.handlePicUpload}
                    error={errors.image}
                  />
                </div>{" "}
                <br />
                <TextAreaFieldGroup
                  placeholder="Caption"
                  name="caption"
                  value={this.state.caption}
                  onChange={this.onChange}
                  error={errors.caption}
                  info="Say something about this pic"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-warning btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddPic.propTypes = {
  addPic: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPic }
)(withRouter(AddPic));
