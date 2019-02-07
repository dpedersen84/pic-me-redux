import React, { Component } from "react";
import PropTypes from "prop-types";
import PicItem from "./PicItem";

class PicFeed extends Component {
  render() {
    const { pics } = this.props;
    return pics.map(pic => <PicItem key={pic._id} pic={pic} />);
  }
}

PicFeed.propTypes = {
  pics: PropTypes.array.isRequired
};

export default PicFeed;
