
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 5000;
const mongoDB = require('./db');
mongoDB();

// Use the cors middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ["POST", "GET"], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow sending cookies with requests
}));
app.use(cors());

app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
