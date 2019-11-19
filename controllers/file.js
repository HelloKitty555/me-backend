const qiniu = require('qiniu')
const qiniuConfig = require('../config/qiniu-config')
class fileController {
  static async uploadFile(ctx) {
  // 返回上传文件对象返回给前端
    ctx.body = {
      code: 1, // 状态码
      data: ctx.req.files
    }
  }
  // 获取七牛云的长传凭证
  static async getQiniuUploadToken(ctx) {
    const mac = new qiniu.auth.digest.Mac(qiniuConfig.AccessKey, qiniuConfig.SecretKey)
    const options = {
      scope: qiniuConfig.bucket,
      // expires: qiniuConfig.expires,
      // returnBody: qiniuConfig.returnBody
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken=putPolicy.uploadToken(mac)
    ctx.response.status = 200
    ctx.body = {
        code: 200,
        msg: '获取上传token成功',
        data: {uploadToken: uploadToken}
    }
  }
}
module.exports = fileController