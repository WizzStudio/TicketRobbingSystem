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
	const $rushBtn = $('.js-rush-button')
	const $rushedText = $('.js-rushed-text')

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

	// 更新票信息
	const updateInfo = (actInfo) => {
		/* TODO 还要更新活动信息*/
		$cardName.text('')
		$cardStuNum.text('')
		$cardTel.text('')
		$cardName.text(util.getStore('name'))
		$cardStuNum.text(util.getStore('stuNum'))
		$cardTel.text(util.getStore('tel'))
	}

	// 在抢票时间内无法清除信息，按钮变为抢票
	const judgeRushTime = () => {
		/* TODO 判断是否在抢票时间内 */
		if (parseInt(util.getStore('state')) === 1 && 1) {
			util.setStore('state', '2')
			judgeState()
		}
	}

	// 重置按钮
	const resetBtn = () => {
		$('.particles-wrapper').css('visibility', 'visible').css('transform', 'translateX(0)')
		$('.particles-wrapper>button').css('transform', 'translateX(0)')
	}

	// 清除输入框内容
	const clearInput = () => {
		$inputName.val('')
		$inputStuNum.val('')
		$inputTel.val('')
	}

	// Eventlistener
	// 清除信息
	$clearBtn.on('click', () => {
		clearBtn.disintegrate()
		util.removeAllStore()
		util.setStore('state', '0')
		window.setTimeout(() => {
			al.showSuccessMessage('清除成功！')
			resetBtn()
			clearInput()
			judgeState()
		}, btnDurationTime)
	})

	// 抢票
	$rushBtn.on('click', () => {
		/* TODO  发送抢票请求 */
		al.showSuccessMessage('抢票成功')
		util.setStore('state', '3')
		judgeState()
	})

	// 校验当前客户端状态 0 新用户 1 存储了信息的用户
	const judgeState = () => {
		const clearState = () => {
			$mainBox.hide()
			$loader.hide()
			$rush.hide()
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
			judgeRushTime()
			$clearBtn.css('display', 'flex').css('align-items', 'center').css('justify-content', 'center')
			$rush.css('display', 'flex').css('align-items', 'center').css('flex-flow', 'column nowrap')
			$clearBtn.show()
			$footer.show()
			$rush.show()
			// $clearBtn.unbind('click')
			// $clearBtn.on('click', () => {
			// 	clearBtn.disintegrate()
			// 	util.removeAllStore()
			// 	util.setStore('state', '0')
			// 	window.setTimeout(() => {
			// 		al.showSuccessMessage('清除成功！')
			// 		resetBtn()
			// 		judgeState()
			// 	}, btnDurationTime)
			//
			// })
		}
		const showState2 = () => {
			clearState()
			updateInfo()
			$rush.css('display', 'flex').css('align-items', 'center').css('flex-flow', 'column nowrap')
			$rushBtn.css('display', 'flex').css('align-items', 'center').css('justify-content', 'center')
			$clearBtn.show()
			$rushBtn.show()
			$footer.show()
			// $rushBtn.unbind('click')
			// $rushBtn.on('click', () => {
			// 	/* TODO  发送抢票请求 */
			// 	al.showSuccessMessage('抢票成功')
			// 	util.setStore('state', '3')
			// 	judgeState()
			// })
		}
		const showState3 = () => {
			clearState()
			$rush.css('display', 'flex').css('align-items', 'center').css('flex-flow', 'column nowrap')
			updateInfo()
			$rush.show()
			$clearBtn.hide()
			$rushBtn.hide()
			$rushedText.show()

			/* DEV */
			$clearBtn.show()
		}
		let stateHook = {
			'0': showState0,
			'1': showState1,
			'2': showState2,
			'3': showState3
		}
		if (!util.getStore('state')) return showState0()
		stateHook[util.getStore('state')]()
	}


	const _init = () => {
		util.autoCalcHeight($main) // 计算高度
		changeTheme('light') // 改变主题
		util.changeText($mainTitle, '6月15日，相约校歌赛') // 改变活动标题
		judgeState() // 判断状态
		// util.changeBg($('#js-main'),'/assets/devPics/bg.jpeg')
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

	// request.rushTicket('s','1','21')
	_init()
});