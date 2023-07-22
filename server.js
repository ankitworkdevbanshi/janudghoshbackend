const express = require('express');
const app = express();
app.use(express.json())
const PORT = 5000; // Change this to the desired port number
let cors = require('cors')
// Middleware to parse JSON and urlencoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
let path = require('path')
// Parse application/json
let bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));

console.log(path.join(__dirname, 'uploads/posts'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads/posts')));

let {pool} = require('./db/index')

let userRoutes = require('./routes/userRoutes')
let postRoutes = require('./routes/postRoutes')





app.get('/', (req, res) => {
  res.send('Hello, this is the homepage!');
});



app.use('/user',userRoutes)
app.use('/post',postRoutes)











app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
