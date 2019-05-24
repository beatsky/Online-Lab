const router = require('koa-router')()

router.prefix('/users')

let orderList = []
global.orderList = []

// 登录
router.get('/login', async (ctx, next) => {
  await ctx.render('login', {
  })
})



router.post('/login', async (ctx, next) => {
	var data = await ctx.request.body
	if (data.username=='admin' && data.password==123456) {
		ctx.session.user = data.username
		ctx.response.redirect('/users')
	}else if(data.username=='shenyk' && data.password==123456){
    ctx.session.appointer = data.username
    ctx.response.redirect('/damping');
	} else {
    ctx.response.body = '用户名或密码错误'
  }
})


//登出
router.get('/logout', async (ctx, next) => {
  ctx.session.user = undefined
  console.log(ctx.session.user)
  ctx.response.redirect('/users/login');
})

// 后台管理路由
router.get('/', async (ctx, next) => {
  if (!ctx.session.user) {
  	ctx.response.redirect('/users/login');
  }
  await ctx.render('./user/index', {
  })
  ctx.response.redirect('/users/order');
})


// 已批准预约显示选中
router.get('/order', async (ctx, next) => {
  if (!ctx.session.user) {
     ctx.response.redirect('/users/login');
  }
  await ctx.render('./user/tables', {
  	orderList
  })
})


// 实验预约
router.post('/order', async (ctx, next) => {
  ctx.response.body = '预约成功';
  await orderList.push(ctx.request.body)
  global.orderList.push(ctx.request.body)
})

router.post('/approve', async (ctx, next) => {
  ctx.response.body = '已通过';
  let num = ctx.request.body
  if (num.off) {
    orderList[num.index].cur = '';
  }else{
    orderList[num.index].cur = 'checked';
  }
})


// 实验记录
router.get('/record', async (ctx, next) => {
  if (!ctx.session.user) {
     ctx.response.redirect('/users/login');
  }
  let record = global.record
  await ctx.render('./user/record', {
    record
  })
})

module.exports = router
