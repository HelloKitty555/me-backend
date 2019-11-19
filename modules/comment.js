const db = require('../config/db')
const Sequelize = db.sequelize
const Comment = Sequelize.import('../schema/comment')
// 自动创建表
Comment.sync({force: false})


class CommentModel {
  /**
   * 新建评论
   * @param data
   * @returns {Promise<*>}
   */
  static async createComment(article_id, commenter_name, comment_content) {
      return await Comment.create({
        commenter_name: commenter_name,
        comment_content: comment_content,
        article_id: article_id
      })
  }
   /**
   * 列出评论
   * @param params 
   * @returns {Promise<Model>}
   */
  static async listComments(params) {
      const query = {
        where: {
          article_id: params.article_id
        }
      }
      if (params.start && params.limit) {
        query.offset = params.start
        query.limit = params.limit
      }
      return await Comment.findAndCountAll(query)
  }
   /**
   * 删除评论
   * @param comment_id 评论id
   * @returns {Promise<Model>}
   */
  static async deleteComment(comment_id) {
      return await Comment.destroy({
          where: {
              comment_id: comment_id
          }
      })
  }
  /**
   * 更新文章内容
   * @param id
   * @param content
   * @returns {Promise<Model>}
   */
  // static async updateArticle(id, content) {
  //     return await Article.update({
  //         where: {
  //             id: id
  //         }
  //     })
  // }
}

module.exports = CommentModel