define(['jquery', '../app/request', '../app/dialog', '../app/utils' , './render','./modals','bootstrap','DP_CN'],($, request, al, util, renderFn, modals) => {
	// const $ = require('jquery')
	// const request = require('../app/request')
	// const al = require('../app/dialog')
	// const util = require('../app/utils')
	// const renderFn = require('./render')
	// const modals = require('./modals')
	/* TODO [登录后逻辑] 【获取活动列表】 【添加活动】 【删除活动】 【修改活动】*/
	// elements
	const $actTable = $('#js-actTable').children('tbody')
	const $addActBtn = $('#js-addAct')
	const $login = $('#js-admin-login')
	const $main = $('#js-admin-main')
	const $name = $('#js-admin-name')
	const $loginBtn = $('#js-btn-login')


	// 判断是否登录
	const isLogin = () => {
		return !!util.getSession('login') // 登录的用户名
	}

	const clearState = () => {
		$login.hide()
		$main.hide()
	}

	// 未登录
	const state0 = () => {
		let $body = $('body')
		clearState()
		util.removeAllSession()
		$name.html('登录')
		// util.changeBg($body, 'http://cdn.helloyzy.cn/react.png') // DEV 用于更换登录背景图
		$body.css('height', window.innerHeight)
		$login.find('.l-box__allMid').css('height', window.innerHeight - 200)
		$login.show()
	}

	// 登录过
	const state1 = () => {
		clearState()
		$name.html(util.getSession('login'))
		$main.show()
	}

	const changeState = () => {
		isLogin() ? state1() : state0()
	}

	const init = () => {
		// listener
		$actTable.find('td').on('click', (e) => {
			if ($(e.target).attr('id') === 'admin-op-info') {
				// 查看
				console.log($(e.target).attr('data-id'))
			}
			if ($(e.target).attr('id') === 'admin-op-export') {
				// 导出用户数据
				console.log($(e.target).attr('data-id'))
			}
			if ($(e.target).attr('id') === 'admin-op-delete') {
				// 删除
				console.log($(e.target).attr('data-id'))
			}
		}) // 表单操作按钮
		$addActBtn.on('click', () => {
			modals.showActModal();
		}) // 新增活动按钮
		$name.on('click', (e) => {
			e.preventDefault()
			state0()
		}) // 用户名点击事件
		$loginBtn.on('click', () => {
			let userName = $('#js-input-username').val()
			let password = $('#js-input-password').val()
			if (!userName || !password) return al.showErrorMessage('用户名或密码不能为空')
			request.loginAdmin(userName, password).then((res) => {
				if (res.result) {
				 return al.showErrorMessage(res.des)
				}
				util.setSession('token', res.token)
				al.showSuccessMessage('登录成功！')
				util.setSession('login', `${userName}，退出请点击`)
				request.getAllAct()
					.then(res => {
						/* TODO 渲染数据*/
						console.log(res)
					})
				changeState()
			})

		})
		changeState()
		$('#js-loader').hide()
	}

	init()
})