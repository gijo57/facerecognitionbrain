
const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('Incorrect form submission.')
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(async trx => {
        try {
            const loginEmail = await trx.insert({
                hash,
                email,
            })
            .into('login')
            .returning('email');
    
            const user = {
                name,
                email: loginEmail[0],
                joined: new Date()
            };
            const newUser = await trx('users').returning('*').insert(user);
            res.json(newUser[0]);
        } catch (e) {
            res.status(400).json('Unable to register.');
        };
    });
};

module.exports = {
    handleRegister
}