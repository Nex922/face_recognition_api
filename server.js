const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_HOST,
    port: '5432',
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME
  }
});

const app = express();

app.use(bodyParser.json())
app.use(cors());

app.get('/', (req, res)=>{
	res.send(database.users);
})

//req, res are included automatically
app.post('/signin', signin.handleSignIn(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfile(db));
app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.listen(process.env.PORT || 3000, ()=> {
	console.log(`APP is running on port ${process.env.PORT}`);
})



