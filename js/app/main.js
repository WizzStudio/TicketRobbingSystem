define((require) => {
	/*TODO 【对接getAct接口】【前端也做一个时间判断】【恶意用户测试】*/

	// dependencies
	const $ = require('jquery')
		, validator = require('validator')
		, Particles = require('particles')
		, request = require('./request')
		, al = require('./dialog')
		, util = require('./utils')

	// Element
	const $main = $('#js-main')
		, $mainTitle = $('#js-act-title')
		, $mainBox = $('.js-mainBox')
		, $loader = $('#js-loader')
		, $inputName = $('#js-input-name')
		, $inputStuNum = $('#js-input-stuNum')
		, $inputTel = $('#js-input-tel')
		, $submitBtn = $('.js-submit-button')
		, $clearBtn = $('.js-clear-button')
		, $rush = $('#js-rush')
		, $cardTitle = $('#js-rush-act-title')
		, $cardStartTime = $('#js-rush-act-startTime')
		, $cardEndTime = $('#js-rush-act-endTime')
		, $cardName = $('#js-rush-act-name')
		, $cardStuNum = $('#js-rush-act-stuNum')
		, $cardTel = $('#js-rush-act-tel')
		, $footer = $('#js-main-footer')
		, $rushBtn = $('.js-rush-button')
		, $rushedText = $('.js-rushed-text')

	// configuration
	const btnDurationTime = 600

	const submitBtn = new Particles('button.js-submit-button', {
		duration: btnDurationTime,
	})

	const clearBtn = new Particles('button.js-clear-button', {
		duration: btnDurationTime
	})

	// 查询URL参数
	const getQueryVariable = (variable) => {
		let query = window.location.search.substring(1);
		let vars = query.split("&");
		for (let i = 0; i < vars.length; i++) {
			let pair = vars[i].split("=");
			if (pair[0] == variable) {
				return pair[1];
			}
		}
		return (false);
	}

	// 改变主题
	const changeTheme = (theme) => {
		let themeMap = {
			'dark': 'theme-dark',
			'light': 'theme-light'
		}
		$('.js-theme-config').addClass(themeMap[theme])
	}

	// 渲染活动详情i
	const renderAct = () => {
		request.getAct(getQueryVariable('actid'))
			.then(res => {
				let actInfo = res.actinfo
				let actAtr  = res.actatr
				/*TODO 需要绑定 theme 解析时间戳*/
				util.changeText($mainTitle, actInfo.name)
				util.changeText($('#js-rush-act-title'),actInfo.name)
				util.changeText($('#js-act-des'), actInfo.des)
				util.changeBg($('#js-main'), actInfo.imgurl)

			})
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
		const showStateError = () => {
			clearState()
		}
		let stateHook = {
			'0': showState0,
			'1': showState1,
			'2': showState2,
			'3': showState3,
			'-1': showStateError
		}
		if (!util.getStore('state')) return showState0()
		stateHook[util.getStore('state')]()
	}


	const _init = () => {
		if (!getQueryVariable('actid')) {
			/* BAD 这个流程判断可以做到渲染DOM和加载require.js之前*/
			util.setStore('state', '-1')
			judgeState()
			util.removeAllStore()
			al.showErrorMessage('没有该活动！')
			setTimeout(() => {
				$('body').empty()
			}, 2000)
			return false
		}

		// 防止不同活动间的冲突数据问题
		if (util.getStore('actId') !== getQueryVariable('actid')) {
			util.removeAllStore()
		}

		// 存储活动id
		util.setStore('actId', getQueryVariable('actid'))

		// 渲染活动详情数据
		renderAct()

		// 抢票
		$rushBtn.on('click', util.debounce(() => {
			/* DEV 压力测试*/
			// for(let i =0; i<600; i++ ) {
			// 	request.rushTicket(Math.random().toString(),Math.random().toString(),Math.random().toString())
			// }
			request.rushTicket(util.getStore('name'), util.getStore('stuNum'), util.getStore('tel'))
				.then(res => {
					if (res.result) {
						return al.showErrorMessage(res.des)
					}
					al.showSuccessMessage('抢票成功')
					util.setStore('state', '3')
					judgeState()
				})
				.catch(err => {
					console.error('错误')
				})
		}, 1000))
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
		util.autoCalcHeight($main) // 计算高度
		changeTheme('light') // 改变主题
		util.changeText($mainTitle, '6月15日，相约校歌赛') // 改变活动标题
		judgeState() // 判断状态
		// util.changeBg($('#js-main'),'/assets/devPics/bg.jpeg')
	}
	// $submitBtn.on('click', () => {
	// 	if (judgeParams($inputName.val(), $inputStuNum.val(), $inputTel.val()) === 'success') {
	// 		submitBtn.disintegrate()
	// 	}
	// })


	// util.changeBg($('#js-main'),'https://avatars2.githubusercontent.com/u/768052?v=4')

	_init()
});