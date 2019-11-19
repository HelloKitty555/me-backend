const db = require('../config/db')
const Sequelize = db.sequelize
const Article = Sequelize.import('../schema/article')
// 自动创建表
Article.sync({ force: false })

class ArticleModel {
    /**
     * 新建文章
     * @param data
     * @returns {Promise<*>}
     */
    static async createArticle(title, content, tabs) {
        return await Article.create({
            title: title,
            content: content,
            tabs: tabs,
            author: '谢梓健',
            category: '博客'
        })
    }

    /**
     * 获取文章详情数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getArticleDetail(id) {
        return await Article.findOne({
            where: {
                id,
            },
        })
    }
    /**
    * 列出文章列表数据
    * @param start
    * @param limit 
    * @returns {Promise<Model>}
    */
    static async listArticles(start, limit, tabs) {
        const query = {
            where: {
                tabs: {
                    [Op.like]: `%1%`
                }
            },
            order: [
                ['create_time', 'DESC']
            ]
        }
        if (start && limit) {
            query.offset = start
            query.limit = limit
        }
        return await Article.findAndCountAll(query)
    }
    /**
    * 删除文章
    * @param id 文章id
    * @returns {Promise<Model>}
    */
    static async deleteArticle(id) {
        return await Article.destroy({
            where: {
                id: id
            }
        })
    }
    /**
     * 更新文章内容
     * @param id
     * @param content
     * @returns {Promise<Model>}
     */
    static async updateArticle(id, content) {
        return await Article.update({
            where: {
                id: id
            }
        })
    }
}

module.exports = ArticleModel