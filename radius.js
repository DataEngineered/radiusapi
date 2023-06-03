const express = require('express');
const rosRest = require('ros-rest');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path: ".env"});
const port = process.env.SERVER_PORT;

const clientRosRest = rosRest({
    host: process.env.ROS_HOST_PROD,
    user: process.env.ROS_USER_PROD,
    password: process.env.ROS_PSWD_PROD,
    port: process.env.ROS_PORT_PROD,
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

app.post('/userman/session/v1', async(req, res) => {
    const {user, active} = req.body;
    try {
        const query = '/user-manager/session/print';
        if(user || active){
            const sessionList = await clientRosRest.command(query, {
                '.proplist': '.id,user,active',
                '.query': [`user=${user}`,`active=${active}`,'#&']
            });
            res.json(sessionList.data);
        }
    } catch (err) {
        res.send({error: err.message});
    }
})

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

app.post('/userman/session/delete/v1', async (req, res) => {
    const {id} = req.body;
    try {
        const query = '/user-manager/session/remove';
        const sessionDelete = await clientRosRest.command(query, {
            ".id": `*${id}`
        });
        res.send({
            status: 'Session has been deleted'
        })
    } catch (err) {
        res.status(500).send({error: err.message});
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});