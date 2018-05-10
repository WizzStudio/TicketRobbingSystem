define((require) => {
	// dependencies
	const $ = require('jquery')
	const validator = require('validator')
	const Particles = require('particles')
	const request = require('./request')
	const al = require('./dialog')
	const util = require('./utils')

	// Element
	const $main = $('#js-main')
	const $mainTitle = $('#js-act-title')
	const $mainBox = $('.js-mainBox')
	const $loader = $('#js-loader')
	const $inputName = $('#js-input-name')
	const $inputStuNum = $('#js-input-stuNum')
	const $inputTel = $('#js-input-tel')
	const $submitBtn = $('.js-submit-button')
	const $clearBtn = $('.js-clear-button')
	const $rush = $('#js-rush')
	const $cardTitle = $('#js-rush-act-title')
	const $cardStartTime = $('#js-rush-act-startTime')
	const $cardEndTime = $('#js-rush-act-endTime')
	const $cardName = $('#js-rush-act-name')
	const $cardStuNum = $('#js-rush-act-stuNum')
	const $cardTel = $('#js-rush-act-tel')
	const $footer = $('#js-main-footer')


	// configuration
	const btnDurationTime = 600

	const submitBtn = new Particles('button.js-submit-button', {
		duration: btnDurationTime,
	})

	const clearBtn = new Particles('button.js-clear-button', {
		duration: btnDurationTime
	})


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

	const updateInfo = (actInfo) => {
		/* TODO 还要更新活动信息*/
		$cardName.text('')
		$cardStuNum.text('')
		$cardTel.text('')
		$cardName.text(util.getStore('name'))
		$cardStuNum.text(util.getStore('stuNum'))
		$cardTel.text(util.getStore('tel'))
	}

	// 校验当前客户端状态 0 新用户 1 存储了信息的用户
	const judgeState = () => {
		const clearState = () => {
			$mainBox.hide()
			$loader.hide()
			$rush.hide()
		}
		const resetBtn = () => {
			$('.particles-wrapper').css('visibility', 'visible').css('transform', 'translateX(0)')
			$('.particles-wrapper>button').css('transform', 'translateX(0)')
		}
		const showState0 = () => {
			clearState()
			$mainBox.show()
			$footer.show()
			$submitBtn.unbind('click')
			$submitBtn.on('click', () => {
				if (judgeParams($inputName.val(), $inputStuNum.val(), $inputTel.val()) === 'success') {
					submitBtn.disintegrate()
					util.setInfo($inputName.val(), $inputTel.val(), $inputStuNum.val())
					util.setStore('state', '1')
					window.setTimeout(() => {
						al.showSuccessMessage('存储成功！')
						resetBtn()
						judgeState()
					}, btnDurationTime)
				}
			})
		}
		const showState1 = () => {
			clearState()
			updateInfo()
			$rush.show()
			$footer.show()
			$rush.css('display', 'flex').css('align-items', 'center').css('flex-flow', 'column nowrap')
			$clearBtn.unbind('click')
			$clearBtn.on('click', () => {
				clearBtn.disintegrate()
				util.removeAllStore()
				util.setStore('state', '0')
				window.setTimeout(() => {
					al.showSuccessMessage('清除成功！')
					resetBtn()
					judgeState()
				}, btnDurationTime)

			})
		}
		let stateHook = {
			'0': showState0,
			'1': showState1
		}
		if (!util.getStore('state')) return showState0()
		stateHook[util.getStore('state')]()
	}


	const _init = () => {
		util.autoCalcHeight($main) // 计算高度
		changeTheme() // 改变主题
		util.changeText($mainTitle, '6月15日，相约校歌赛') // 改变活动标题
		judgeState() // 判断状态
		// util.changeBg($('#js-main'),'https://avatars2.githubusercontent.com/u/768052?v=4')
	}

	// request.sayHello()
	// al.showHello()
	// al.showErrorMessage('fuck')


	// $submitBtn.on('click', () => {
	// 	if (judgeParams($inputName.val(), $inputStuNum.val(), $inputTel.val()) === 'success') {
	// 		submitBtn.disintegrate()
	// 	}
	// })


	// util.changeBg($('#js-main'),'https://avatars2.githubusercontent.com/u/768052?v=4')
	// $('#js-main').css('height', '10rem')

	// $mainBox.show()
	// $loader.hide()

	_init()
});