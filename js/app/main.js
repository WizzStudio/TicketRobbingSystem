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

	const judgeParams = (name, stuNum, tel) => {
		/* TODO: 判断input框字段 */
	}


	const _init = () => {

	}

	window.onload = () => {
		// setTimeout(() => {
		// 	$('#js-input-name').trigger('click').focus()
		// }, 2000)

	}
	// request.sayHello()
	// al.showHello()
	// al.showErrorMessage('fuck')
	let btn = new Particles('button.js-submit-button', {
		duration: 3000,
	})

	$('.js-submit-button').on('click', () => {
		btn.disintegrate()
	})

	util.autoCalcHeight($('#js-main'))

	// util.changeBg($('#js-main'),'https://avatars2.githubusercontent.com/u/768052?v=4')
	// $('#js-main').css('height', '10rem')
	util.changeText($('#js-act-title'), '6月15日，相约校歌赛')
	$('#js-loader').hide()
	changeTheme()
});