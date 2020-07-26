const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 5000;

//  Init Middleware
app.use(logger);

//  Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  Set Static Folder
const staticPath = path.join(__dirname, 'public');

app.use(express.static(staticPath));


//  Members API
app.use('/api/members', require('./routes/api/members'));

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
