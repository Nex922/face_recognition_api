const handleSignIn = (db, bcrypt) => (req, res) => {
	const { email, password } = req.body;

	db.select('email', 'hash').from('login').where('email', email)
	.then(data => {
		const dataEmail = data[0].email;
		const dataHash = data[0].hash;
		const isValid = bcrypt.compareSync(password, dataHash);
		if(isValid) {
			db.select('*').from('users').where('email', dataEmail)
			.then(user => {
				res.json(user[0])
			})
			.catch(err => {
				res.status(400).json("Error getting user data")
			})
		} else {
			res.status(403).json("Invalid email or password")
		}
	})
	.catch(err => {
		res.status(400).json("Error getting user data")
	})
}

module.exports = {
	handleSignIn: handleSignIn
}