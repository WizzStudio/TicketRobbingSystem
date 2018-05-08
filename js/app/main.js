define((require) => {
	const request = require('./request')
	const $ = require('jquery')
	const al = require('./dialog')
	const util = require('./utils')
	// request.sayHello()
	// al.showHello()
	util.autoCalcHeight($('#js-main'))
	// util.changeBg($('#js-main'),'https://avatars2.githubusercontent.com/u/768052?v=4')
	// $('#js-main').css('height', '10rem')
});