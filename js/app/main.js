define((require) => {
	let request = require('./request')
	let $ = require('jquery')
	request.sayHello()
	console.log($('.test'))
});