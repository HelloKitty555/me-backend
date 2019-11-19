const router = require('koa-router')()
const fileController = require('../controllers/file')
const multer = require('../config/multer-config')

router.prefix('/api')

router.post('/uploadFile', multer.array('avatar'), fileController.uploadFile)
router.post('/getQiniuUploadToken', fileController.getQiniuUploadToken)

module.exports = router