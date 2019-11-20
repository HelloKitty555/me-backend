const CommentModel = require('../modules/comment')

class commentController {
    /**
      * 新建评论
      * @param ctx
      * @returns {Promise.<void>}
      */
    static async create(ctx) {
        let article_id = ctx.request.body.article_id
        let commenter_name = ctx.request.body.commenter_name
        let comment_content = ctx.request.body.comment_content
        try {
            const ret = await CommentModel.createComment(article_id, commenter_name, comment_content)
            ctx.response.status = 200
            ctx.body = {
                code: 'S_OK',
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
      * 列出评论
      * @param ctx
      * @returns {Promise.<void>}
      */
     static async list(ctx) {
         let article_id = ctx.request.body.article_id
         let start = ctx.request.body.start
         let limit = ctx.request.body.limit
         if (article_id) {
            try {
                const comments = await CommentModel.listComments({
                    article_id,
                    start,
                    limit
                })
                ctx.body = {
                    code: 'S_OK',
                    total: comments.count,
                    data: comments.rows
                }
             } catch (err) {
                ctx.body = {
                    code: 'ERROR',
                    data: err
                }
             }
         } else {
            ctx.body = {
                code: 'REQUIRE_ARTICLE_ID'
            }
         }
      
     }
      /**
      * 删除评论
      * @param ctx
      * @returns {Promise.<void>}
      */
     static async delete(ctx) {
         const comment_id = ctx.request.body.comment_id
         if (comment_id) {
            try {
                await CommentModel.deleteComment(comment_id)
                ctx.body = {
                    code: 'S_OK'
                }
            } catch(err) {
                ctx.body = {
                    code: 'ERROR',
                    data: err
                }
            }
         } else {
            ctx.body = {
                code: 'REQUIRE_COMMENT_ID'
            }
         }
     }

}

module.exports = commentController