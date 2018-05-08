define((require) => {
	// 动态计算高度
	const autoCalcHeight = ($dom) => {
		$dom.css('height', window.innerHeight)
	}

	// 动态改变背景图片
	const changeBg = ($dom, url) => {
		$dom.css('background', `url('${url}')  center no-repeat`)
		$dom.css('background-size', 'cover')
	}

	return {
		autoCalcHeight,
		changeBg
	}
});