define(require => {
	const layer = require('../lib/layer/layer')
	const $addModal = $('#js-modal-addAct')
	const $showAct = $('#js-modal-showAct')
	let basicConfig = {
		type: 1,
		area: ['500px', '600px']
	}

	const showDemo = () => {
		layer.ready(function () {
			layer.open({
				type: 2,
				title: '欢迎页',
				maxmin: true,
				area: ['800px', '500px'],
				content: 'http://layer.layui.com/test/welcome.html',
				end: function () {
					layer.tips('Hi', '#about', {tips: 1})
				}
			});
		});
	}

	// 新增活动
	const addActModal = () => {

	}

	// 查看活动
	const showActModal = () => {
		layer.ready(() => {
			layer.open({
				title: '新建活动',
				btn: ['取消', '新建'],
				content: $addModal,
				btn2: ()=>{
					console.log('新建')
					return false
				},
				...basicConfig
			});
		})
	}

	return {
		showDemo,
		showActModal,
		addActModal
	}
})