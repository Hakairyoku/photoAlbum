const router = require('express').Router();
const { Friend } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

router.get('/', async (req, res) => {
    try {
        const friends = await Friend.findAll();
        res.status(200).json({ message: 'success', friends });
    } catch ({ message }) {
        res.status(500).json({ error: message });
    }
});

router.get('/:id', verifyAccessToken, async (req, res) => {
    try {
        const { user } = res.locals;
        const { id } = req.params;
        const friend = await Friend.findOne({ where: { id: id, userId: user.id } }); 
        res.status(200).json({ message: 'success', friend });
    } catch ({message}) {
        res.status(500).json({ error: message });
    }
});



module.exports = router;