const router = require("express").Router();

const {
    getAllThoughts,
    getThoughtById,
    updateThoughtById,
    addReaction,    
    removeThoughtById,
    deleteReaction,
    addThought
} = require("../../controllers/thought-controller");

router
    .route("/")
    .get(getAllThoughts)
    .post(addThought);

router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThoughtById)
.delete(removeThoughtById)

router
    .route("/:thoughtId/reactions")
    .put(addReaction);

router
    .route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);

module.exports = router;