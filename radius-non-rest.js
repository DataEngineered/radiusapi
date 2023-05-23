const rosRest = require('ros-rest');
const turu = require('timers/promises');
const dotenv = require('dotenv');
dotenv.config({path: ".env"});

const clientRosRest = rosRest({
    host: process.env.ROS_HOST,
    user: process.env.ROS_USER,
    password: process.env.ROS_PSWD,
    port: process.env.ROS_PORT,
    secure: false,
});

const fetchAllIPAddress = async () => {
    try {
        const res = await clientRosRest.print('ip/address');
        console.log('result: ', res.data);
    } catch (err) {
        console.log('error: ', err);
    }
};

const fetchOneIPAddress = async () => {
    try {
        const res = await clientRosRest.print('ip/address/*3');
        console.log('result: ', res.data);
    } catch (err) {
        console.log('error: ', err)
    }
}

const addIpAddress = async () => {
    try {
        const res = await clientRosRest.add('ip/address', {
            address: '192.168.57.15/27',
            network: '192.168.57.1',
            interface: 'ether4'
        })
        console.log('Data: ', res.data);
    } catch (err) {
        console.log('error: ', err);
    }
}

const updateIpAddress = async () => {
    try {
        const res = await clientRosRest.set('ip/address/*8', {
            comment: 'Tes bro'
        })
        console.log('Data: ', res.data);
    } catch (err) {
        console.log('Error: ', err);
    }
}

const deleteIpAddress = async () => {
    try {
        const res = await clientRosRest.remove('ip/address/*8');
        console.log('Deleted');
    } catch (err) {
        console.log('Error: ', err);
    }
}

// fetchAllIPAddress();
// fetchOneIPAddress();
addIpAddress();
updateIpAddress();
deleteIpAddress();