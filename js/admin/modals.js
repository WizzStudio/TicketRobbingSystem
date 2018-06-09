define(require => {
	const layer = require('../lib/layer/layer')
	const al = require('../app/dialog')
	const request = require('../app/request')
	const vali = require('validator')
	const dayjs = require('dayjs')
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
		for (let item of Object.values(data)) {
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
				btn2: () => {
					act.name = $('#act-name').val()
					act.begTime = $('#act-startDate').val() + ' ' + $('#act-startTime').val()
					act.endTime = $('#act-endDate').val() + ' ' + $('#act-endTime').val()
					act.actStartTime = $('#rush-startDate').val() + ' ' + $('#rush-startTime').val()
					act.Content = $('#act-message').val()
					act.tickets = $('#act-tickets').val()
					act.theme = $('#act-theme').val()
					act.imgUrl = $('#act-bgURL').val()
					act.description = $('#act-desc').val()
					/* DEV */
					console.log(act)
					if (!validateParams(act)) return false
					request.addAct(act)
						.then(res => {
							if (res.result) {
								al.showErrorMessage(res.des)
								return false
							}
							al.showSuccessMessage('新建成功！')
							window.location.reload()
						})
				},
				...basicConfig
			});
		})
	}

	//
	const showActDetail = (actAtr,actinfo) => {
		layer.ready(() => {
			$('#js-act-name').val(actinfo.name)
			$('#js-act-startTime').val(dayjs(parseInt(actAtr.begtime)).format('YYYY-MM-DD HH:mm'))
			$('#js-act-endTime').val(dayjs(parseInt(actAtr.endtime)).format('YYYY-MM-DD HH:mm'))
			$('#js-rush-startTime').val(dayjs(parseInt(actAtr.seckilltime)).format('YYYY-MM-DD HH:mm'))
			$('#js-act-message').val(actinfo.textdetail)
			$('#js-act-tickets').val(actAtr.tickets)
			$('#js-act-theme').val(actinfo.theme)
			$('#js-act-bgURL').val(actinfo.imgurl)
			$('#js-act-desc').val(actinfo.des)
			layer.open({
				title: '查看活动',
				btn: ['关闭'],
				content: $showAct,
				...basicConfig
			});
		})
	}

	const confirmMessage = (cbfn) => {
		layer.ready(() => {
			layer.open({
				title: '发送',
				btn: ['关闭','确认'],
				btn2: () => {
					cbfn()
				},
				content: '注意：短信只能发送一次，请注意查看导出数据核对数量无误后点击确定发送短信',
				type:0,
				area: ['200px', '200px']
			});
		})
	}

	const confirmDialog = (title,content, cbfn) => {
		layer.ready(() => {
			layer.open({
				title: title,
				btn: ['关闭','确认'],
				btn2: () => {
					cbfn()
				},
				content: content,
				type:0,
				area: ['200px', '200px']
			});
		})
	}

	const showExcel = (url) => {
		console.log(url)
		layer.ready(() => {
			$('#js-excel').attr('href',url)
			layer.open({
				title: '查看链接',
				btn: ['关闭'],
				content: $('#js-modal-excel'),
				type:1,
				area: ['200px', '200px']
			});
		})
	}

	return {
		showDemo,
		showActModal,
		addActModal,
		showActDetail,
		confirmMessage,
		confirmDialog,
		showExcel
	}
})