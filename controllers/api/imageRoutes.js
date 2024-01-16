const router = require('express').Router();
const { Image } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        console.log("got to this route");
        console.log(req.body);
        const newImage = await Image.create({
            url: req.body.url,
            event_id: req.body.event_id
        });

        res.status(200).json(newImage);
    } catch (err) {
        res.status(400).json(err);
    }
});



module.exports = router;