const db = require('../config/db')
const Sequelize = db.sequelize
const ReplyComment = Sequelize.import('../schema/replyComment')
// 自动创建表
ReplyComment.sync({force: false})

class ReplyCommentModel {
  /**
   * 新建回复
   * @param data
   * @returns {Promise<*>}
   */
  static async createReplyComment(replyCommenter_name, replyComment_content, article_id, comment_id) {
      return await ReplyComment.create({
        replyCommenter_name: replyCommenter_name,
        replyComment_content: replyComment_content,
        article_id: article_id,
        comment_id: comment_id
      })
  }
   /**
   * 作者回复
   * @param data
   * @returns {Promise<*>}
   */
  static async authorReply(article_id, comment_id, replyComment_content) {
    return await ReplyComment.create({
      replyCommenter_name: '谢梓健',
      replyComment_content: replyComment_content,
      article_id: article_id,
      comment_id: comment_id,
      isAuthor: true
    })
}
    /**
   * 列出回复
   * @param data
   * @returns {Promise<*>}
   */
  static async listReplyComments(comment_id) {
    const query = {
      where: {
        comment_id: comment_id
      }
    }
    return await ReplyComment.findAll(query)
  }

}

module.exports = ReplyCommentModel