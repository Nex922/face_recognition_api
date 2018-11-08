const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port: '5432',
    user : 'smartbrain',
    password : 'test',
    database : 'smart-brain'
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
});

const app = express();

app.use(bodyParser.json())
app.use(cors());

app.get('/', (req, res)=>{
	res.send(database.users);
})

app.post('/signin', (req,res) => {
	const { email, password } = req.body;

	// Load hash from your password DB.
	// bcrypt.compare("bacon", hash, function(err, res) {
	//     // res == true
	// });

	if(email === database.users[0].email &&
	 password === database.users[0].password) {
		res.json(database.users[0])
	} else {
		res.status(403).json('Wrong username or password');
	}
})

app.post('/register', (req,res) => {
	const { email, name, password } = req.body;
	if (!email || !name || !password) {
		res.status(400).json('Missing data');
	}

	db('users')
		.returning('*')
		.insert({
			email: email,
			name: name,
			joined: new Date()
		})
		.then(user => {
			res.status(200).json(user[0]);
		})
		.catch(err => res.status(400).json("Cannot register user."))
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;

	database.users.forEach(user => {
		if(user.id === Number(id)){
			found = true;
			return res.json(user)
		} 
	})
	if (!found) res.status(404).json('User not found');
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;

	database.users.forEach(user => {
		if(user.id === Number(id)){
			found = true;
			user.entries++;
			return res.json(user.entries);
		} 
	})
	if (!found) res.status(404).json('User not found');
})

app.listen(3000, ()=> {
	console.log('APP is running on port 3000');
})
