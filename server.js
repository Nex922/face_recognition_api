const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');

const database = {
	users: [
		{
			id: 123,
			name: 'John',
			email: 'calypsonian@phacoidoscope.com',
			password: 'test',
			entries: 0,
			joined: new Date()
		},
		{
			id: 124,
			name: 'Destiny',
			email: 'gocart@octavina.edu',
			password: 'test2',
			entries: 0,
			joined: new Date()
		}
	],
}

const app = express();

app.use(bodyParser.json())

app.get('/', (req, res)=>{
	res.send(database.users);
})

app.post('/signin', (req,res) => {
	const { email, password } = req.body;

	// Load hash from your password DB.
	bcrypt.compare("bacon", hash, function(err, res) {
	    // res == true
	});

	if(email === database.users[0].email &&
	 password === database.users[0].password) {
		res.json('logging in')
	} else {
		res.status(403).json('Wrong username or password');
	}
})

app.post('/register', (req,res) => {
	const { email, name, password } = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
		database.users.push({
		id: 125,
		name: name,
		email: email,
		password: hash,
		entries: 0,
		joined: new Date()
	})
	res.json(`User ${database.users[database.users.length -1].name} created`);
	});
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
