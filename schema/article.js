const moment = require('moment')

// 定义文章的数据表结构
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('article', {
        // 文章ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 文章标题
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'title',
        },
        // 文章作者
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'author'
        },
        // 文章内容
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'content'
        },
        // 文章分类
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'category'
        },
        // 文章标签
        tabs: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'tabs'
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