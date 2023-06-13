const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

dotenv.config({ path: ".env" });
const port = process.env.SERVER_PORT;
const app = express();

app.use(express.json());
app.use('/userman/user', userRoutes);
app.use('/userman/session', sessionRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});