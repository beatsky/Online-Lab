const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')

require('./middlewares/socket.js')
// require('./middlewares/socket2.js')
// require('./middlewares/socket3.js')

// routes
const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// app.use(socket)
// middlewares
app.keys = ['all you need is love!']
app.use(session({
	key: 'sess_id',
	maxAge: 1000*60*60*12,
	overwrite: true,
	httpOnly: true,
	signed: true
}, app))

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
