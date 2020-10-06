
const handleProfile = async (req, res, db) => {
    const id = req.params.id;
    try {
        const user = await db.select('*').from('users').where({user_id: id});
        if (user.length) {
            res.json(user[0]);
        } else {
            res.status(404).json('User not found.');
        }
    } catch (e) {
        res.status(400).json('Error getting user.');
    }
}

module.exports = {
    handleProfile
};