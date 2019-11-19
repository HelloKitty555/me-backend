const ArticleModel = require('../modules/article')

class articleController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        let title = ctx.request.body.title
        let content = ctx.request.body.content
        let tabs = ctx.request.body.tabs.toString()
        console.log('接受到的参数为')
        console.log(ctx.request.body)
            try {
                const ret = await ArticleModel.createArticle(title, content, tabs)
                const data = await ArticleModel.getArticleDetail(ret.id)
                ctx.response.status = 200
                ctx.body = {
                    code: 'S_OK',
                    data
                }

            } catch (err) {
                ctx.response.status = 412
                ctx.body = {
                    code: 'ERROR',
                    data: err
                }
            }
        } 

    /**
     * 获取文章详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let id = ctx.request.body.id
        if (id) {
            try {
                let data = await ArticleModel.getArticleDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 'S_OK',
                    data
                }

            } catch (err) {
                ctx.response.status = 412
                ctx.body = {
                    code: 'ERROR',
                    data
                }
            }
        } else {
            ctx.response.status = 416
            ctx.body = {
                code: 'REQUIRE_ID',
            }
        }
    }
       /**
     * 列举文章列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async list(ctx) {
        let start = ctx.request.body.start
        let limit = ctx.request.body.limit
        let tabs =  ctx.request.body.tabs.toString()
        console.log('测试')
        console.log(tabs)
        try {
                let data = await ArticleModel.listArticles(start, limit, tabs)
                ctx.body = {
                    code: 'S_OK',
                    data: data.rows,
                    total: data.count
                }

        } catch (err) {
                ctx.body = {
                    code: 'ERROR',
                    data: err
                }
            }
        }
    }

module.exports = articleController