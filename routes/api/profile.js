const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Input Validation
const validateProfileInput = require("../../validation/profile");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route         GET api/profile/test
// @description   Tests profile route
// @access        Public
router.get("/test", (req, res) => res.json({ msg: "Profile Route Works" }));

// @route         POST api/profile
// @description   Create or edit user's profile
// @access        Private

// @route         GET api/profile/
// @description   Get current users profile
// @access        Private

// @route         GET api/profile/handle/:handle
// @description   Get profile by handle
// @access        Public

// @route         GET api/profile/user/:user_id
// @description   Get profile by user id
// @access        Public

// @route         DELETE api/profile/
// @description   Delete user and profile
// @access        Private

module.exports = router;
