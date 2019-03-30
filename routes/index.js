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
  await ctx.render('lab', {
  	user,
    live
  })
})


router.get('/order', async (ctx, next) => {
  await ctx.render('order', {
  })
})

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
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