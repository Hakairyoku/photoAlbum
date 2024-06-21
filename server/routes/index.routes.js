const router = require('express').Router();
const albumRoutes = require('./api/album.routes');
const photoRoutes = require('./api/photo.routes');
const authRoutes = require('./api/auth.routes');
const friendRoutes = require('./api/friend.routes');
const userRoutes = require('./api/user.routes');
const tokensRoutes = require('./api/tokens.routes')

router.use('/albums', albumRoutes);
router.use('/photos', photoRoutes);
router.use('/auth', authRoutes);
router.use('/friends', friendRoutes);
router.use('/users', userRoutes);
router.use('/tokens', tokensRoutes)


module.exports = router;