const router = require('koa-router')()

global.live = "rtmp://58.200.131.2:1935/livetv/hunantv"

router.get('/', async (ctx, next) => {
  let user
  let live = global.live
  if (!ctx.session.user) {
  	user = false
  }else{
  	user = true
  }
  await ctx.render('lab', {
  	user,
    live
  })
})


router.get('/order', async (ctx, next) => {
  await ctx.render('order', {
  })
})



module.exports = router


