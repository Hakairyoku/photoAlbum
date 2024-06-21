const router = require('express').Router();

const { Photo } = require('../../db/models');

router.get('/', async (req, res) => {
    try {
        const photos = await Photo.findAll();
        res.status(200).json({ message: 'success', photos });
    } catch ({message}) {
    res.status(500).json({error: message})
    }
});

// router.get('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const photos = await Photo.findOne({ where: { id: id } });
//         res.status(200).json({ message: 'success', photos });
//     } catch ({ message }) {
//         res.status(500).json({ error: message });
//     }
// });

router.get('/:albumId', async (req, res) => {
    try {
        const { albumId } = req.params;
        console.log(req.params);
        console.log(req.params);
        console.log(albumId);
        const photo = await Photo.findAll({ where: { albumId: +albumId } });
        console.log(photo);
        res.status(200).json({ message: 'success', photo });
    } catch ({ message }) {
        res.status(500).json({ error: message });
    }
});

router.post('/', async (req, res) => {
    try {
        const {title, img, albumId } = req.body;
        const photo = await Photo.create({title, img, albumId });
        if (photo) {
            res.status(200).json({ message: 'success', photo });
            return;
        }
        res.status(400).json({message: 'something went wrong'})
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, img, albumId } = req.body;
        const result = await Photo.update({ title, img, albumId }, { where: { id: id } });
        if (result[0] > 0) {
            const photo = await Photo.findOne({ where: { id: id } });
            res.status(200).json({ message: 'success', photo });
            return;
        }
        res.status(400).json({ message: 'something went wrong' });
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Photo.destroy({ where: { id: id } });
        if (result > 0) {
            res.status(200).json({ message: 'success' });
            return;
        }
        res.status(400).json({ message: 'something went wrong' });
    } catch ({ message }) {
        res.status(500).json({ error: message });
    }
});

module.exports = router;