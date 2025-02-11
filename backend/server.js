require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_BASE_URL || 'http://localhost:3000',
  methods: "GET, POST, PUT, DELETE",
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

connectDB()
  .then(() => {

    app.use('/', eventRoutes);

    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server started on port ${port}`));
  });
