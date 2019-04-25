const router = require('koa-router')()
var nodeExcel = require('node-excel-export');

// 预约申请
router.get('/order', async (ctx, next) => {
  await ctx.render('order', {
  })
})

// 主页
router.get('/', async (ctx, next) => {
  let user = true
  // if(ctx.session.user){
  //   user = true
  // }else{
  //   let now = new Date().toLocaleDateString().split('/').join('-')
  //   let time = new Date().toTimeString().split(':')[0]
  //   console.log(time)
  //   for (let i = 0; i < global.orderList.length; i++) {
      
  //     if (now == global.orderList[i].time.split(' ')[0] || time >= global.orderList[i].time.split(' ')[1].split(':')[0]) {

  //       user = true
  //     }
  //   }
  // }
  await ctx.render('index', {
    user
  })
})


router.get('/damping', async (ctx, next) => {
  let user = true
  await ctx.render('lightlab', {
    user
  })
})





// excel下载相关配置
let calcObj = function(save){
  if(!save){
    return
  }
  let arr = []
  for (let i = 0; i < save.data.length; i++) {
  let obj = {data: '', time: ''}
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
    displayName: 'Time/s', 
    headerStyle: styles.headerDark, 
    width: '10'
  },
  data: {
    displayName: 'Amp/g',
    headerStyle: styles.headerDark,
    width: '10'
  }
}


// excel 下载数据
router.get('/excel', async (ctx, next) => {
  if (!global.save.data.length) {
    ctx.body = '当前暂无实验数据'
  } else {
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
  }
});

module.exports = router