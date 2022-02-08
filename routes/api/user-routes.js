const router = require("express").Router();

const {
    addUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    addFriend,
    deleteFriend
} = require("../../controllers/user-controller");


router
    .route("/")
    .get(addUser)
    .post(getAllUsers);

router
    .route("/:id")
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

router
    .route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;