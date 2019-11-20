const router = require('koa-router')()
const ArticleController = require('../controllers/article')


router.prefix('/api')

// 创建文章
router.post('/createArticle', ArticleController.create)
// 获取文章
router.post('/getArticleInfo', ArticleController.detail)
// 列举文章
router.post('/listArticles', ArticleController.list)
// 修改文章
router.post('/updateArticle', ArticleController.update)
// 删除文章
router.post('/deleteArticle', ArticleController.delete)
module.exports = router