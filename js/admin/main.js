define((require) => {
	const $ = require('jquery')
	const request = require('../app/request')
	const al = require('../app/dialog')
	const util = require('../app/utils')
	const renderFn = require('./render')
	const modals = require('./modals')

	// elements
	const $actTable = $('#js-actTable').children('tbody')
	const $addActBtn = $('#js-addAct')
	const $login = $('#js-admin-login')
	const $main = $('#js-admin-main')
	const $name = $('#js-admin-name')

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
		clearState()
		util.removeAllSession()
		$login.show()
	}

	// 登录过
	const state1 = () => {
		clearState()
		$name.val(util.getSession('login'))
		$main.show()
	}

	const changeState = () => {
		isLogin() ? state1() : state0()
	}

	const init = () => {
		// listener
		$actTable.find('td').on('click', (e) => {
			if ($(e.target).attr('id') === 'admin-op-info') {
				console.log($(e.target).attr('data-id'))
			}
			if ($(e.target).attr('id') === 'admin-op-export') {
				console.log($(e.target).attr('data-id'))
			}
			if ($(e.target).attr('id') === 'admin-op-delete') {
				console.log($(e.target).attr('data-id'))
			}
		}) // 表单操作按钮
		$addActBtn.on('click', () => {
			modals.showActModal();
		}) // 新增活动按钮
		$name.on('click', (e) => {
			e.preventDefault()
			changeState()
		})

		changeState()
	}

	init()
})