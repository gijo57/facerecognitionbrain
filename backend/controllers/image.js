const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'c560ac46822d414a9ac55061f79b9bdf'
  });

const handleApiCall = (req, res) => {
    app.models
    .predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(res.status(400).json('unable to work with API'))
};

const handleImage = async (req, res, db) => {
    const id = req.body.id;

    try {
        const entries = await db('users').where('user_id', '=', id)
            .increment('entries', 1)
            .returning('entries');
        res.json(entries[0]);
    } catch {
        res.status(400).json('Unable to get entries.');
    };
};

module.exports = {
    handleImage,
    handleApiCall
};