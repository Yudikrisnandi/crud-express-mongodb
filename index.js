const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');


const todos = require('./routes/todos'); 
const users = require('./routes/users'); 
const PORT = process.env.PORT;

const app = express();
app.use(cors())


connectDB();

app.use(bodyParser.json());

app.use("/api/v1/todos", todos);
app.use("/api/v1/user", users);
app.get("/", (req, res) => res.send("Welcome to the Users API!"));
app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));
