define((require) => {
	const $ = require('jquery')
	const validator = require('validator') // 输入校验库
	const request = require('./request')
	const al = require('./dialog')
	const util = require('./utils')

	// 改变主题
	const changeTheme = () => {
		$('.js-theme-config').addClass('theme-dark')
	}


	const _init = () => {

	}

	// request.sayHello()
	// al.showHello()
	util.autoCalcHeight($('#js-main'))
	// util.changeBg($('#js-main'),'https://avatars2.githubusercontent.com/u/768052?v=4')
	// $('#js-main').css('height', '10rem')
	util.changeText($('#js-act-title'), 'hello world')
	$('#js-loader').hide()
	changeTheme()
});