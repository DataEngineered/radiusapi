const express = require('express');
const rosRest = require('ros-rest');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path: ".env"});
const port = process.env.SERVER_PORT;

const clientRosRest = rosRest({
    host: process.env.ROS_HOST,
    user: process.env.ROS_USER,
    password: process.env.ROS_PSWD,
    port: process.env.ROS_PORT,
    secure: false,
});

app.use(express.json());

app.get('/userman/user/v1', async (req, res) => {
    const {name} = req.query;
    try {
        let query = '/user-manager/user';
        if (name) {
            query += `?name=${name}`;
        }
        const userList = await clientRosRest.print(query);
        res.json(userList.data);
    } catch (err) {
        res.send({error: err.message});
    }
});

app.put('/userman/user/add/v1', async (req, res) => {
    const {name, password, group} = req.body;
    try {
        const userAdd = await clientRosRest.add('/user-manager/user', {
            name: name,
            password: password,
            group: group,
        });
        res.send({
            status: 'User has been added to the Userman',
            user: userAdd.data
        });
    } catch (err) {
        res.status(400).send({error: err.message});
    }
})

app.patch('/userman/user/update/v1', async (req, res) => {
    const {name} = req.query;
    const {password, group, attributes} = req.body;
    try {
        let query = '/user-manager/user';
        if (name) {
            query += `/${name}`;
        }
        const userUpdate = await clientRosRest.set(query, {
            password: password,
            group: group,
            attributes: attributes,
        });
        res.send({
            status: 'User has been updated',
            user: userUpdate.data
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
});

app.delete('/userman/user/delete/v1', async (req, res) => {
    const {name} = req.query;
    try {
        let query = '/user-manager/user';
        if (name) {
            query += `/${name}`;
        }
        const userDelete = await clientRosRest.remove(query);
        res.send({
            status: 'User has been deleted'
        });
    } catch (err) {
        res.status(500).send({error: err.message});
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});