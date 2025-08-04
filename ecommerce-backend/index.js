const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get('/api/products', (req, res) => {
  res.json([{ id: 1, name: "Sample Product", price: 250 }]);
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
  })
  .catch(err => console.error(err));
