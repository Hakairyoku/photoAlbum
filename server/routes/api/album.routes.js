const router = require('express').Router();
const { Album } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

router.get('/', async (req, res) => {
    try {
        const albums = await Album.findAll();
        res.status(200).json({ message: 'success', albums });
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const album = await Album.findOne({ where: { id: id } });
        res.status(200).json({ message: 'success', album });
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
});

router.post('/', verifyAccessToken, async (req, res) => {
    try {
        const { user } = res.locals;
        const { title, img } = req.body;
        const album = await Album.create({ title, img, userId: user.id });
        if (album) {
            res.status(200).json({ message: 'success', album });
            return;
        }
        res.status(400).json({ message: 'Something went wrong' });
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
});

router.put('/:id', verifyAccessToken, async (req, res) => {
    try {
        const { user } = res.locals;
        const { id } = req.params;
        const { title, img } = req.body;
        const result = await Album.update({ title, img }, { where: { id: id, userId: user.id } });
        if (result[0] > 0) {
            const album = await Album.findOne({ where: { id: id } });
            res.status(200).json({ message: 'success', album });
            return;
        }
        res.status(400).json({ message: 'Something went wrong' });
    } catch ({ message }) {
        res.status(500).json({ error: message });
    }
});

router.delete('/:id', verifyAccessToken, async (req, res) => {
    try {
        const { user } = res.locals;
        const { id } = req.params;
        const result = await Album.destroy({ where: { id: id, userId: user.id } });
        if (result > 0) {
            res.status(200).json({ message: 'success' });
            return;
        }
        res.status(400).json({ message: 'Something went wrong' });
    } catch ({ message }) {
        res.status(500).json({ error: message });
    }
});


module.exports = router;