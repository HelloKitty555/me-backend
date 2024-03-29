const router = require('koa-router')()
const ReplyCommentController = require('../controllers/replyComment')
router.prefix('/api')

// 新建回复
router.post('/createReplyComment', ReplyCommentController.create)
// 作者回复
router.post('/authorReply', ReplyCommentController.authorReply)
// 列出回复
router.post('/listReplyComments', ReplyCommentController.list)

module.exports = router