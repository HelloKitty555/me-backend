const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')

const index = require('./routes/index')
const article = require('./routes/article')
const comment = require('./routes/comment')
const replyComment = require('./routes/replyComment')
const file = require('./routes/file')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
// 设置跨域
// app.use(async (ctx, next) => {
//   ctx.set("Access-Control-Allow-Origin", "*")
//   await next()
// })

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(article.routes(), article.allowedMethods())
app.use(file.routes(), article.allowedMethods())
app.use(comment.routes(), comment.allowedMethods())
app.use(replyComment.routes(), replyComment.allowedMethods())
// app.use(cors())
// 跨域
app.use(cors(
  {
  origin: function (ctx) {
    return '*'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}
))
// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})
// 端口监听设置
app.listen(4001)
module.exports = app
