const handleProfile = (req, res, db) => {
	const { id } = req.params;

	db.select('*').from('users').where('id', id).then(user => {
		if (user.length) {
			res.status(200).json(user[0]);
		} else {
			res.status(404).json('User not found');
		}
	})
}

module.exports = {
	handleProfile: handleProfile
}