define((require) => {
	const $ = require('jquery')
	const request = require('../app/request')
	const al = require('../app/dialog')
	const util = require('../app/utils')
	const renderFn = require('./render')
	const modals = require('./modals')


	// elements
	const $actTable = $('#js-actTable').children('tbody')
	const $addActBtn = $('#js-addAct')

	// listener
	$actTable.find('td').on('click', (e) => {
		if ($(e.target).attr('id') === 'admin-op-info') {
			console.log($(e.target).attr('data-id'))
		}
		if ($(e.target).attr('id') === 'admin-op-export') {
			console.log($(e.target).attr('data-id'))
		}
		if ($(e.target).attr('id') === 'admin-op-delete') {
			console.log($(e.target).attr('data-id'))
		}
	})

	const init = () => {
		$addActBtn.on('click', () => {
			modals.showActModal();
		})
	}

	init()
})