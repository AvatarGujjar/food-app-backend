const express = require('express')
// const cors = require('cors');
const app = express()
const port = 5000
const mongoDB = require('./db'); 
mongoDB();

// app.use(cors(
//   {
//     origin: ["https//food-app-mern-qgwr.vercel.app"],
//     methods: ["POST", "GET"],
//     credentials: true
//   }
// ));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.get('/', (req, res)=>{
  res.send('hello world!---')
})
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




// This allows all origins

// Your routes and other middleware

