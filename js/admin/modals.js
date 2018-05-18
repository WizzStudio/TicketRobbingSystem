define(require => {
	const layer = require('../lib/layer/layer')
	const al = require('../app/dialog')
	const vali = require('validator')
	const $addModal = $('#js-modal-addAct')
	const $showAct = $('#js-modal-showAct')

	const act = {
		begTime: '',
		endTime: '',
		actStartTime: '',
		Content: '',
		name: '',
		description: '',
		theme: '',
		tickets: ''
	}



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

	const validateParams = (data) => {
		for	(let item of Object.values(data)) {
			if (!item.length) {
				al.showErrorMessage('字段不能为空')
				return false
			}
		}
		if (!(parseInt(data.theme) === 0 || parseInt(data.theme) === 1)) {
			al.showErrorMessage('主题只能为0或1')
			return false
		}
		if (!vali.isNumeric(data.tickets)) {
			al.showErrorMessage('票数只能为数字')
			return false
		}
		return true
	}

	// 查看活动
	const showActModal = () => {
		layer.ready(() => {
			layer.open({
				title: '新建活动',
				btn: ['取消', '新建'],
				content: $addModal,
				btn2: ()=>{
					// let $actName = $('#act-name').val()
					// let $actDesc = $('#act-desc').val()
					// let $actStartTime = $('#act-startTime').val()
					// let $actRushStartTime = $('#act-rushStartTime').val()
					// let $actRushEndTime = $('#act-rushEndTime').val()
					// let $actBgURL = $('#act-bgURL').val()
					// let $actTickets = $('#act-tickets').val()
					// let $actMessage = $('#act-message').val()
					// let $actTheme = $('#act-theme').val()
					act.name = $('#act-name').val()
					act.begTime = $('#act-rushStartTime').val()
					act.endTime = $('#act-rushEndTime').val()
					act.actStartTime =$('#act-startTime').val()
					act.Content = $('#act-message').val()
					act.tickets = $('#act-tickets').val()
					act.theme =  $('#act-theme').val()
					act.imgUrl = $('#act-bgURL').val()
					act.description = $('#act-desc').val()
					if (!validateParams(act)) return false
					al.showSuccessMessage('新建成功！')
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