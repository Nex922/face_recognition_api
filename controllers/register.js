const handleRegister = (db, bcrypt) => (req, res) => {
	const { email, name, password } = req.body;
	const hash = bcrypt.hashSync(password);
	if (!email || !name || !password) {
		res.status(400).json('Missing data');
	}

	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0],
				name: name,
				joined: new Date()
			})
			.then(user => {
				res.status(200).json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json("Cannot register user."))
}

module.exports = {
	handleRegister: handleRegister
};