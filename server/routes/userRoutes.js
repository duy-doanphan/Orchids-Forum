const express = require("express");
const userController = require("../controllers/userController");
const validateAccessToken = require("../middlewares/validateAccessToken");

const router = express.Router();

router.get("/get-all-user",userController.getAllUsers);

router.get("/:username", userController.getUserProfile);
router.get("/:username/comments", userController.getUserComments);
router.get("/:username/following", userController.getUserFollowing);
router.get("/:username/followers", userController.getUserFollowers);
router.put(
  "/:username/follow",
  validateAccessToken,
  userController.toggleUserFollow
);
// router.delete("/:userId", validateAccessToken, userController.deleteUser);
router.put("/:username", userController.updateUserProfile);

module.exports = router;
