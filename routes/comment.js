const router = require('koa-router')()
const CommentController = require('../controllers/comment')
router.prefix('/api')

// 新建评论
router.post('/createComment', CommentController.create)
// 列出评论
router.post('/listComments', CommentController.list)
// 删除评论
router.post('/deleteComment', CommentController.delete)

module.exports = router