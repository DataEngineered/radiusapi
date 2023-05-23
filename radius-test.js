const express = require('express');
const rosRest = require('ros-rest');
const util = require('util');
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

app.get('/ip/addresses/v1', async (req, res) => {
    try {
        const addresses = await clientRosRest.print('/ip/address');
        console.log('result: ', addresses);
        res.json(addresses.data);
    } catch (err) {
        const errString = util.inspect(err, { depth: null });
        res.status(500).send({error: err.message})
        console.log('error: ', err);
    }
});

app.get('/ip/addresses/v1/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const addresses = await clientRosRest.print(`/ip/address/*${id}`);
        console.log('result: ', addresses);
        res.json(addresses.data);
    } catch (err) {
        const errString = util.inspect(err, { depth: null });
        res.status(500).send({error: err.message})
        console.log('error: ', err);
    }
});

app.put('/ip/addresses/add/v1', async (req, res) => {
    const
    {ipAddressAdd, networkAdd, interfaceAdd, commentAdd} = req.body;
    try {
        const addressesAdd = await clientRosRest.add('/ip/address', {
            address: ipAddressAdd,
            network: networkAdd,
            interface: interfaceAdd,
            comment: commentAdd,
        });
        console.log(addressesAdd);
        res.send('IP Address successfully added');
    } catch (err) {
        console.log(err);
    }
});

app.patch('/ip/addresses/update/v1/:id', async (req, res) => {
    const {id} = req.params;
    const
    {ipAddressUpdate, networkUpdate, interfaceUpdate, commentUpdate} = req.body;
    try {
        const addressessUpdate = await clientRosRest.set(`/ip/address/*${id}`, {
            address: ipAddressUpdate,
            network: networkUpdate,
            interface: interfaceUpdate,
            comment: commentUpdate,
        });
        console.log(addressessUpdate);
        res.send('IP Address successfully updated');
    } catch (err) {
        console.log(err);
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

