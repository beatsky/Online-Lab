const router = require('koa-router')()
var nodeExcel = require('node-excel-export');
global.live = "rtmp://58.200.131.2:1935/livetv/hunantv"

router.get('/lab', async (ctx, next) => {
  let user
  let live = global.live
  if (!ctx.session.user) {
  	user = false
  }else{
  	user = true
  }
  await ctx.render('bslab', {
  	user,
    live
  })
})


router.get('/order', async (ctx, next) => {
  await ctx.render('order', {
  })
})

router.get('/', async (ctx, next) => {
  let user
  if(ctx.session.user){
    user = true
  }else{
    let now = new Date().toLocaleDateString().split('/').join('-')
    let time = new Date().toTimeString().split(':')[0]
    console.log(time)
    for (let i = 0; i < global.orderList.length; i++) {
      
      if (now == global.orderList[i].time.split(' ')[0] || time >= global.orderList[i].time.split(' ')[1].split(':')[0]) {

        user = true
      }
    }
  }
  await ctx.render('index', {
    user
  })
})






let calcObj = function(save){
  let arr = []
  let obj = {data: '', time: ''}
  for (var i = 0; i < save.data.length; i++) {
    obj.data = save.data[i];
    obj.time = save.time[i];
    arr.push(obj)
  }
  return arr
}

const styles = {
  headerDark: {
    fill: {
      fgColor: {
        rgb: 'FF000000'
      }
    },
    font: {
      color: {
        rgb: 'FFFFFFFF'
      },
      sz: 14,
      bold: true,
      underline: true
    }
  }
};

const specification = {
  time: { 
    displayName: '标志位', 
    headerStyle: styles.headerDark, 
    width: '10'
  },
  data: {
    displayName: '峰值',
    headerStyle: styles.headerDark,
    width: '10'
  }
}

// excel 下载数据
router.get('/excel', async (ctx, next) => {
  let report = nodeExcel.buildExport(
    [ 
      {
        name: 'Report', 
        specification: specification, 
        data: calcObj(global.save)
      }
    ]
  );
    ctx.set('Content-Type', 'application/vnd.openxmlformats');
    ctx.set("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    ctx.body = report
});


 



module.exports = router