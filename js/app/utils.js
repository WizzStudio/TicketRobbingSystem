define((require) => {
	const vali = require('validator')
	const al = require('./dialog')
	/**
	 *  存储本地STORE
	 * @param name
	 * @param content
	 */
	const setStore = (name, content) => {
		if (!name) return;
		if (typeof content !== 'string') {
			content = JSON.stringify(content);
		}
		window.localStorage.setItem(name, content);
	}

	/**
	 * 获取本地STORE
	 * @param name 存贮的名字
	 */
	const getStore = name => {
		if (!name) return;
		return window.localStorage.getItem(name);
	}

	/**
	 * 删除本地STORE
	 * @param name
	 */
	const removeStore = name => {
		if (!name) return;
		window.localStorage.removeItem(name);
	}

	/**
	 * 清除所有的localStorage
	 */
	const removeAllStore = () => {
		for (let i of Object.keys(window.localStorage)) {
			window.localStorage.removeItem(i)
		}
	}

	// 动态计算高度
	const autoCalcHeight = ($dom) => {
		$dom.css('height', window.innerHeight)
	}

	// 动态改变背景图片
	const changeBg = ($dom, url) => {
		$dom.css('background', `url('${url}')  center no-repeat`)
		$dom.css('background-size', '100% 100%')
	}

	// 动态改变文本
	const changeText = ($dom, text) => {
		$dom.hide()
		$dom.text(text)
		$dom.show()
	}

	// 存储个人信息到localStorage
	const setInfo = (name, tel, stuNum) => {
		if (!vali.isMobilePhone(tel, 'zh-CN')) return al.showError('存储失败！', '非电话号码格式')
		if (!vali.isNumeric(stuNum)) return al.showError('存储失败！', '学号出现非数字')
		setStore('name', name)
		setStore('tel', tel)
		setStore('stuNum', stuNum)
	}

	// 清除信息
	const clearInfo = () => {
		removeAllStore()
	}

	// 函数防抖
	const debounce = (fn, boomTime) => {
		let timer = null;
		return () => {
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(fn, boomTime);
		};
	};

	const removeAllSession = () => {
		for (let i of Object.keys(window.sessionStorage)) {
			window.sessionStorage.removeItem(i)
		}
	}

	const getSession = name => {
		if (!name) return;
		return window.sessionStorage.getItem(name);
	}

	const setSession = (name, content) => {
		if (!name) return;
		if (typeof content !== 'string') {
			content = JSON.stringify(content);
		}
		window.sessionStorage.setItem(name, content);
	}

	return {
		autoCalcHeight,
		changeBg,
		changeText,
		clearInfo,
		setInfo,
		setStore,
		removeAllStore,
		getStore,
		debounce,
		getSession,
		setSession,
		removeAllSession
	}
});