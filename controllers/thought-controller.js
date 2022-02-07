const { Thought, User } = require('../models')

const thoughtController = {
    //Create a new thought 
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then(dbThought => {
                if (!dbThought) {
                    res.status(400).json({ message: 'No thought found with this ID!' })
                    return;
                }
                res.json(dbThought)
            })
            .catch(err => res.json(err))
    },
    //GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughts => {
                res.json(dbThoughts)
            })
            .catch(err => res.json(err))
    },
    //GET a single thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(dbThought => {
                if (!dbThought) {
                    res.status(400).json({ message: 'No User ID associated with that thought' })
                    return
                }
                res.json(dbThought)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },
    //PUT to update a thought by id
    updateThoughtById({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
            .then(dbThought => {
                if (!dbThought) {
                    res.status(400).json({ message: 'No thought with that ID to update' })
                    return
                }
                res.json(dbThought)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    //DELETE to remove a thought by id
    removeThoughtById({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId },)
            .then(deletedThought => {
                if (!deletedThought) {
                    res.status(400).json({ message: 'There is no thought with that ID to delete' })
                    return
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                )
            })
            .then(dbthought => {
                if (!dbthought) {
                    res.status(400).json({ message: 'This thought has now been deleted!' });
                    return
                }
                res.json(dbthought)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    //ADD reaction to though
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbReaction => {
                if (!dbReaction) {
                    res.status(400).json({ message: 'There is no thought associated with that ID' })
                    return
                }
                res.json(dbReaction)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    //DELETE remove a reaction 
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then(dbReaction => {
                if (!dbReaction) {
                    return res.status(404).json({ message: 'There is no reaction to delete' })
                }
                res.json(dbReaction);
            })
            .catch(err => res.json(err))
    }
}

module.exports = thoughtController