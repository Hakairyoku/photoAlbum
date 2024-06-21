const router = require('express').Router();
const { User, Album } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

router.get('/:email', verifyAccessToken, async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const albums = await Album.findAll({ where: { userId: user.id } });
    res.status(200).json({ message: 'success', albums });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;