const clarifai = require("clarifai");

const app = new Clarifai.App({
    apiKey: 'b14f0460f3e04b78981bcfa379353335'
});

const handleAPI = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("unable to work with API"))
}

const handleImagePut = (req, res, db) => {
    const {id} = req.body;

    db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json("unable to get entries"))
}

module.exports = {
    handleImagePut: handleImagePut,
    handleAPI: handleAPI
}