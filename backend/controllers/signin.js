const handleSignin = async (req, res, db, bcrypt) => {
    try {
        const login = await db.select('email', 'hash').from('login')
                            .where('email', '=', req.body.email);
        const { email, hash } = login[0];
        const isValid = bcrypt.compareSync(req.body.password, hash);
        if (isValid) {
            try {
                const user = await db.select('*').from('users').where('email', '=', email);
                res.json(user[0]);
            } catch (e) {
                res.status(400).json('Unable to get user.')
            };
        } else {
            res.status(400).json('Incorrect username or password.');
        };
    } catch (e) {
        res.status(400).json('Incorrect username or password');
    };
};

module.exports = {
    handleSignin
}