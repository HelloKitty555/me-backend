const db = require('../config/db')
const Sequelize = db.sequelize
const User = Sequelize.import('../schema/user')
const sequelize = require('sequelize')
const Op = sequelize.Op
// 自动创建表
User.sync({ force: false })

class UserModel{
     /**
     * 用户登录
     * @param data
     * @returns {Promise<*>}
     */
    static async login(user_id) {
      return await User.findOne({
         where: {
           user_id
         }
      })
  }
  /**
     * 用户登录
     * @param data
     * @returns {Promise<*>}
     */
    static async register(user_id, password) {
      console.log('测试')
      console.log(user_id)
      console.log(password)
      return await User.create({
         user_id: user_id,
         password: password
      })
  }
}
module.exports = UserModel