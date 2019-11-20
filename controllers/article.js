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
        try {
            const ret = await ArticleModel.createArticle(title, content, tabs)
            const data = await ArticleModel.getArticleDetail(ret.id)
            ctx.body = {
                code: 'S_OK',
                data
            }

        } catch (err) {
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
                ctx.body = {
                    code: 'S_OK',
                    data
                }

            } catch (err) {
                ctx.body = {
                    code: 'ERROR',
                    data
                }
            }
        } else {
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
        const start = ctx.request.body.start
        const limit = ctx.request.body.limit
        const tabs = ctx.request.body.tabs ? ctx.request.body.tabs.toString() : ''
        let desc = ctx.request.body.desc
        try {
            let data = await ArticleModel.listArticles(start, limit, tabs, desc)
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



    /** 删除文章
      * @param ctx
      * @returns {Promise.<void>}
      */
    static async delete(ctx) {
        let id = ctx.request.body.id
        if (id) {
            try {
                let data = await ArticleModel.deleteArticle(id)
                ctx.body = {
                    code: 'S_OK',
                }
    
            } catch (err) {
                ctx.body = {
                    code: 'ERROR',
                    data: err
                }
            }

        } else {
            ctx.body = {
                code: 'REQUIRE_ID',
            }
        }
    }
     /** 更新文章
      * @param ctx
      * @returns {Promise.<void>}
      */
    static async update(ctx) {
        const id = ctx.request.body.id
        const title = ctx.request.body.title
        const content = ctx.request.body.content
        const tabs = ctx.request.body.tabs ? ctx.request.body.tabs.toString() : ''
        try {
            await ArticleModel.updateArticle(id, title, content, tabs)
            ctx.body = {
                code: 'S_OK'
            }
        } catch(err) {
            ctx.body = {
                code: 'ERROR',
                data: err
            }
        }
    }
}

module.exports = articleController