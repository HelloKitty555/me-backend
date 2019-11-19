const ReplyCommentModel = require('../modules/replyComment')

class replyCommentController {
  /**
    * 新建回复
    * @param ctx
    * @returns {Promise.<void>}
    */
  static async create(ctx) {
    // 接收客服端
    let article_id = ctx.request.body.article_id
    let comment_id = ctx.request.body.comment_id
    let replyCommenter_name = ctx.request.body.replyCommenter_name
    let replyComment_content = ctx.request.body.replyComment_content
    if (article_id && comment_id && replyCommenter_name && replyComment_content) {
      try {
        const ret = await ReplyCommentModel.createReplyComment(replyCommenter_name, replyComment_content, article_id, comment_id)
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
        code: 'REQUIRE_PARAMS_MISS',
      }
    }
  }

  /**
    * 列出回复
    * @param ctx
    * @returns {Promise.<void>}
    */
  static async list(ctx) {
    let comment_id = ctx.request.body.comment_id
    if (comment_id) {
      try {
        const result = await ReplyCommentModel.listReplyComments(comment_id)
        ctx.body = {
          code: 'S_OK',
          data: result
        }
      }
      catch(err) {
        ctx.body = {
          code: 'ERROR',
          data: err
        }
      }
    } else {
      ctx.body = {
        code: 'REQUIRE_PARAMS_MISS',
      }
    }
  }
}

module.exports = replyCommentController