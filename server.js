const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all routes

// Define your other routes and server logic here

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
