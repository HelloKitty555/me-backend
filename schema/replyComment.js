const moment = require('moment')

// 定义文章评论的数据表结构
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('replyComment', {
        // 回复id
        replyComment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 回复者昵称
        replyCommenter_name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'replyCommenter_name',
        },
        // 是否是作者
        isAuthor: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'isAuthor'
        },
        // 回复内容
        replyComment_content: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'replyComment_content'
        },
        // 评论id（外键）
        comment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'comment_id',
            references: {
                model: 'comment',
                key: 'comment_id',
            }
        },
        // 文章id（外键）
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'article_id',
            references: {
                model: 'article',
                key: 'id',
            }
        }
    }, {
        // 使用第一个参数作为表名
        freezeTableName: true,
        // 软删除记录，自动在删除的记录上添加update_time字段
        paranoid: true,
        // 自定义默认字段的名称
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        createdAt: 'create_time'
    })

}