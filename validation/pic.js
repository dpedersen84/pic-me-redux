const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePicInput(data) {
  let errors = {};

  data.image = !isEmpty(data.image) ? data.image : "";
  data.caption = !isEmpty(data.caption) ? data.caption : "";

  if (Validator.isEmpty(data.image)) {
    errors.image = "You must select an image";
  }

  if (Validator.isEmpty(data.caption)) {
    errors.caption = "You must enter a caption for your image";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
