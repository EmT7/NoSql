const { User, Thought } = require('../models');

const userController = {
    //POST a new user
    addUser({ body }, res) {
        User.create(body)
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => res.status(400).json(err));
    },
    //GET all users 
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.status(400).json(err)
            })
    },
    //GET a single user by its id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(400).json({ message: 'There is no user with that ID!' });
                    return
                }
                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    //Update a user by its _id
    updateUserById({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(400).json({ message: 'There is no user with that ID to update' });
                    return
                }
                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    //DELETE to remove user by id
    deleteUserById({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(400).json({ message: 'There is no user with that ID to delete' })
                    return
                }
                res.json(dbUser)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    //POST to add a new friend to a user's friend list
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then(dbFriend => {
                if (!dbFriend) {
                    res.status(404).json({ message: 'There is no user with that ID to associate with a friend' })
                    return
                }
                res.json(dbFriend)
            })
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            })
    },
    //DELETE to remove a friend from a user's friend list
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbFriend => {
                if (!dbFriend) {
                    res.status(404).json({ message: 'There is no user with that ID' })
                    return
                }
                res.json(dbFriend)
            })
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            })
    }
}

//export userController object
module.exports = userController;