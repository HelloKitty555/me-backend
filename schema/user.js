const moment = require('moment')

// 定义用户的数据表结构
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        // 用户id
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 用户账号
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'user_id',
        },
        // 用户密码
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password'
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