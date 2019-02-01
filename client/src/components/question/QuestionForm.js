import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../form/TextFieldGroup";

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log("search");
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="question-form mt-4">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <TextFieldGroup
              placeholder="Answer"
              name="text"
              value={this.state.text}
              onChange={this.onChange}
              error={errors.text}
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Search
          </button>
        </form>
      </div>
    );
  }
}

QuestionForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(QuestionForm);
