const rosRest = require('ros-rest');

const clientRosRest = rosRest({
    host: process.env.ROS_HOST,
    user: process.env.ROS_USER,
    password: process.env.ROS_PSWD,
    port: process.env.ROS_PORT,
    secure: false,
});

exports.getUserList = async (name) => {
    try {
        let query = '/user-manager/user';
        if (name) {
            query += `?name=${name}`;
        }
        const userList = await clientRosRest.print(query);
        return userList.data;
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.getSessionList = async (user, active) => {
    try {
        const query = '/user-manager/session/print';
        if (user || active) {
            const sessionList = await clientRosRest.command(query, {
                '.proplist': '.id,user,active',
                '.query': [`user=${user}`, `active=${active}`, '#&']
            });
            return sessionList.data;
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.addUser = async (name, password, group) => {
    try {
        const userAdd = await clientRosRest.add('/user-manager/user', {
            name: name,
            password: password,
            group: group,
        });
        return userAdd.data;
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.updateUser = async (name, password, group, attributes) => {
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
        return userUpdate.data;
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.deleteUser = async (name) => {
    try {
        let query = '/user-manager/user';
        if (name) {
            query += `/${name}`;
        }
        const userDelete = await clientRosRest.remove(query);
        return userDelete.data;
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.deleteSession = async (id) => {
    try {
        const query = '/user-manager/session/remove';
        const sessionDelete = await clientRosRest.command(query, {
            ".id": `*${id}`
        });
        return sessionDelete.data;
    } catch (err) {
        throw new Error(err.message);
    }
};