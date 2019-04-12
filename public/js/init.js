var myChart = echarts.init(document.getElementById('chart'));
var option = {};
var socket = io.connect('http://118.25.92.237:3001');
// var socket = io.connect('http://127.0.0.1:3001');
var Y = 1
function rangeY() {
	Y = document.getElementById('peak').value
}

// 图表自适应
var chart = document.getElementById('chart');
window.addEventListener('resize', function(){
	myChart.resize();
})

// 图表更改峰值
var peak = document.getElementById('peak')
peak.oninput = function(){
	Y = peak.value
}

socket.on('message', 
	function (data) {
		// console.log(data)
		if(data.length <= 1){
			return
		}
		
		myChart.setOption(option = {
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				name: 'time/s',
				data: data.time,
			},
			yAxis: {
				splitLine: {
					show: false
				},
				name: 'Amp/g',
				max: Y,
				min: -Y
			},
			toolbox: {
				left: 'center',
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					restore: {},
					saveAsImage: {}
				}
			},
			dataZoom: [
			{
				type: 'inside'
			}],
			series: {
				name: '实验波形图',
				type: 'line',
				data: data.data,
			}
		});
	})



// 页面初始假数据
myChart.setOption(option = {
	tooltip: {
		trigger: 'axis'
	},
	xAxis: {
		name: 'time/s',
		data: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0]
	},
	yAxis: {
		splitLine: {
			show: false
		},
		name: 'Amp/g',
		max: Y,
		min: -Y
	},
	series: {
		name: '实验波形图',
		type: 'line',
		data: [0.02,0.03,0.05,0.01,0.03,0.02,0.03,0.05,0.01,0.02,0.03,0.05,0.01,0.02,0.03,0.05,0.01,0.02,0.03,0.05,0.01,0.02,0.03,0.05,0.01,0.02,0.03,0.05,0.01,0.02,0.03,0.05]
	},
	toolbox: {
		left: 'center',
		feature: {
			dataZoom: {
				yAxisIndex: 'none'
			},
			saveAsImage: {}
		}
	},
	dataZoom: [
	{
		type: 'inside'
	}]
});
