const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const axios = require("axios");

const Pic = require("../../models/Pic");
const Profile = require("../../models/Profile");

// Input Validation
const validatePicInput = require("../../validation/pic");
const validateCommentInput = require("../../validation/comment");

// @route         GET api/pics/test
// @description   Tests pics route
// @access        Public
router.get("/test", (req, res) => res.json({ msg: "Pics Route Works" }));

// @route         POST api/pics/
// @description   Create pic
// @access        Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePicInput(req.body);

    // Check if valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPic = new Pic({
      image: req.body.image,
      caption: req.body.caption,
      name: req.body.name,
      user: req.user.id
    });

    newPic.save().then(pic => res.json(pic));
  }
);

// @route         GET api/pics
// @description   Get pics
// @access        Public
router.get("/", (req, res) => {
  Pic.find()
    .sort({ date: -1 })
    .then(pics => res.json(pics))
    .catch(err => res.status(404).json({ nopicsfound: "No pics found" }));
});

// @route         GET api/pics/add
// @description   Get pics from search to GIPHY
// @access        Private
router.get(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const search = req.body.search;

    axios
      .get(
        `https://api.giphy.com/v1/gifs/random?q=${search}&api_key=dc6zaTOxFJmzC&limit=1`
      )
      .then(res => res.data.data.image_url);
  }
);

// @route         GET api/pics/:id
// @description   Get pic by id
// @access        Public
router.get("/:id", (req, res) => {
  Pic.findById(req.params.id)
    .then(pic => res.json(pic))
    .catch(err =>
      res.status(404).json({ nopicfound: "No pic found by that ID" })
    );
});

// @route         GET api/pics/user/:id
// @description   Get pic by user id
// @access        Public
router.get("/user/:id", (req, res) => {
  const errors = {};

  Pic.find({ user: req.params.id })
    .then(pics => {
      if (!pics) {
        errors.nopics = "There are no pics for this user";
        res.status(404).json(errors);
      }
      res.json(pics);
    })
    .catch(err =>
      res.status(404).json({ pics: "There are no pics for this user" })
    );
});

// @route         DELETE api/pics/:id
// @description   Delete pic by id
// @access        Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Pic.findById(req.params.id)
        .then(pic => {
          // Check post owner
          // Must convert id to string
          if (pic.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ unauthorized: "User not authorized to remove pic" });
          }

          // Delete pic
          pic.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ picnotfound: "No pic found" }));
    });
  }
);

// @route         POST api/pics/like/:id
// @description   Like pic by id
// @access        Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Pic.findById(req.params.id)
        .then(pic => {
          // Check if user has already liked post
          if (
            pic.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User has already liked this pic" });
          }

          // Add user id to likes array
          pic.likes.unshift({ user: req.user.id });

          pic.save().then(pic => res.json(pic));
        })
        .catch(err => res.status(404).json({ picnotfound: "No pic found" }));
    });
  }
);

// @route         POST api/pics/unlike/:id
// @description   Unlike pic by id
// @access        Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Pic.findById(req.params.id)
        .then(pic => {
          // Check if user has liked post
          if (
            pic.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User has not liked this pic" });
          }

          // Get the remove index
          const removeIndex = pic.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          pic.likes.splice(removeIndex, 1);

          pic.save().then(pic => res.json(pic));
        })
        .catch(err => res.status(404).json({ picnotfound: "No pic found" }));
    });
  }
);

// @route         POST api/pics/comments/:id
// @description   Comment on pic by id
// @access        Private
router.post(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Pic.findById(req.params.id)
      .then(pic => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        pic.comments.unshift(newComment);

        // Save
        pic.save().then(pic => res.json(pic));
      })
      .catch(err => res.status(404).json({ picnotfound: "No pic found" }));
  }
);

// @route         DELETE api/pics/comments/:id/:comment_id
// @description   Delete comment on pic by id
// @access        Private
router.delete(
  "/comments/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Pic.findById(req.params.id)
      .then(pic => {
        // Check if comment exists
        if (
          pic.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotfound: "Comment does not exist" });
        }

        // Get the remove index
        const removeIndex = pic.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        pic.comments.splice(removeIndex, 1);

        pic.save().then(pic => res.json(pic));
      })
      .catch(err => res.status(404).json({ picnotfound: "No pic found" }));
  }
);

module.exports = router;
