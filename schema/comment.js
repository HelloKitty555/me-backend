const moment = require('moment')

// 定义文章评论的数据表结构
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('comment', {
        // 评论id
        comment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 评论者昵称
        commenter_name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'commenter_name',
        },
        // 文章id
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'article_id',
            references: {
                model: 'article',
                key: 'id',
            }
        },
        // 评论内容
        comment_content: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'comment_content'
        },
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