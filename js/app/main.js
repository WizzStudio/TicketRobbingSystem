define((require) => {
	const $ = require('jquery')
	const validator = require('validator') // 输入校验库
	const Particles = require('particles')
	const request = require('./request')
	const al = require('./dialog')
	const util = require('./utils')


	// 改变主题
	const changeTheme = (theme) => {
		let themeMap = {
			'dark': 'theme-dark',
			'light': 'theme-light'
		}
		$('.js-theme-config').addClass(themeMap[theme])
	}

	// 校验填写参数
	const judgeParams = (name, stuNum, tel) => {
		if (!name.length || name.length > 10) return al.showErrorMessage('请填写正确的姓名')
		if (!stuNum.length) return al.showErrorMessage('请填写学号')
		if (!tel.length) return al.showErrorMessage('请填写电话')

		if (!validator.isMobilePhone(tel, 'zh-CN')) return al.showErrorMessage('非电话号码格式')
		if (!validator.isNumeric(stuNum)) return al.showErrorMessage('学号出现非数字')

		return 'success'
	}

	// 校验当前客户端状态
	const judgeState = () => {
		// 先判断UA做重定向
		//
	}


	const _init = () => {

	}

	// request.sayHello()
	// al.showHello()
	// al.showErrorMessage('fuck')
	let btn = new Particles('button.js-submit-button', {
		duration: 3000,
	})



	$('.js-submit-button').on('click', () => {
		if (judgeParams($('#js-input-name').val(), $('#js-input-stuNum').val(), $('#js-input-tel').val()) === 'success') {
			btn.disintegrate()
		}
	})

	util.autoCalcHeight($('#js-main'))

	// util.changeBg($('#js-main'),'https://avatars2.githubusercontent.com/u/768052?v=4')
	// $('#js-main').css('height', '10rem')
	util.changeText($('#js-act-title'), '6月15日，相约校歌赛')
	$('#js-main').show()
	$('#js-loader').hide()
	changeTheme()
});