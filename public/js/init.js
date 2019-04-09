var myChart = echarts.init(document.getElementById('chart'));
var option = {};
var socket = io.connect('http://118.25.92.237:3001');
// var socket = io.connect('http://127.0.0.1:3001');
var maxY = 0.5
function rangeY() {
	maxY = document.getElementById('peak').value
	console.log(maxY)
}

// 图表自适应
var chart = document.getElementById('chart');
window.addEventListener('resize', function(){
	myChart.resize();
})

// 图表更改峰值
var peak = document.getElementById('peak')
peak.oninput = function(){
	maxY = peak.value
}

socket.on('message', 
	function (data) {
		// console.log(data)
		if(data.length <= 1){
			return
		}
		if (data.time[0]<20) {
			$('#mator').css({
			background: '#00a9f4'
			})
			$('#mator').text('开')
		}
		myChart.setOption(option = {
			title:{
				text:'time/s',
				right:'0',
				bottom: '15'
			},
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				data: data.time,
			},
			yAxis: {
				splitLine: {
					show: false
				},
				max: maxY
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
	title:{
		text:'time/s',
		right:'0',
		bottom: '15'
	},
	tooltip: {
		trigger: 'axis'
	},
	xAxis: {
		data: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
	},
	yAxis: {
		splitLine: {
			show: false
		},
	},
	series: {
		name: '实验波形图',
		type: 'line',
		data: [255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255, 161, 255]
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
