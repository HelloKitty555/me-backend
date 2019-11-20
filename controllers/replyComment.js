const ReplyCommentModel = require('../modules/replyComment')

class replyCommentController {
  /**
    * 新建回复
    * @param ctx
    * @returns {Promise.<void>}
    */
  static async create(ctx) {
    const article_id = ctx.request.body.article_id
    const comment_id = ctx.request.body.comment_id
    const replyCommenter_name = ctx.request.body.replyCommenter_name
    const replyComment_content = ctx.request.body.replyComment_content

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
    * 作者回复
    * @param ctx
    * @returns {Promise.<void>}
    */
   static async authorReply(ctx) {
    const article_id = ctx.request.body.article_id
    const comment_id = ctx.request.body.comment_id
    const replyComment_content = ctx.request.body.replyComment_content

    if (article_id && comment_id && replyComment_content) {
      try {
        await ReplyCommentModel.authorReply(article_id, comment_id, replyComment_content)
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