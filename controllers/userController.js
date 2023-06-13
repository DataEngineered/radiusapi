const userModel = require('../models/radiusModels');

exports.getUserList = async (req, res) => {
    const { name } = req.query;
    try {
        const userList = await userModel.getUserList(name);
        res.json(userList);
    } catch (err) {
        res.send({ error: err.message });
    }
};

exports.addUser = async (req, res) => {
    const { name, password, group } = req.body;
    try {
        const userAdd = await userModel.addUser(name, password, group);
        res.send({
            status: 'User has been added to the Userman',
            user: userAdd
        });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const { name } = req.query;
    const { password, group, attributes } = req.body;
    try {
        const userUpdate = await userModel.updateUser(name, password, group, attributes);
        res.send({
            status: 'User has been updated',
            user: userUpdate
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { name } = req.query;
    try {
        const userDelete = await userModel.deleteUser(name);
        res.send({
            status: 'User has been deleted'
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};