const UserModel = require('../modules/user')
const adminConfig = require('../config/admin-config')
class UserController{
   /**
     * 用户登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async login(ctx) {
      let user_id = ctx.request.body.user_id
      let password = ctx.request.body.password
      try {
          if (adminConfig.id === user_id && adminConfig.password === password) {
            ctx.body = {
              code: 'S_OK',
              token: adminConfig.token
            }
          } else {
            ctx.body = {
              code: 'UNAUTHORIZED'
            }
          }
      } catch (err) {
          ctx.body = {
              code: 'ERROR',
              data: err
          }
      }
  }
   /**
     * 用户注册
     * @param ctx
     * @returns {Promise.<void>}
     */
  static async register(ctx) {
    const user_id = ctx.request.body.user_id
    const password = ctx.request.body.password
    try {
      await UserModel.register(user_id, password)
      ctx.body = {
        code: 'S_OK'
      }
    } catch (err) {
      ctx.body = {
        code: 'ERROR',
        data: err
      }
    }
  }


}
module.exports = UserController