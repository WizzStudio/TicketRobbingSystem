/* API Layer */
define((require) => {
	const ajax = require('jquery').ajax
	const dialog = require('./dialog')
	const baseUrl = 'http://47.94.212.99:8080'
	const request = (url = '/', method = 'get', data = {}) => {
		return new Promise((resolve, reject) => {
			let baseConfig = {
				url: baseUrl + url,
				method: method,
				success: (data) => {
					resolve(data)
				},
				error: err => {
					dialog.showError(`${err.status} ${err.statusText}`, '服务器开小差了~')
					reject({
						status: err.status,
						statusText: err.statusText
					})
				}
			}
			if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'DELETE') {
				baseConfig.data = JSON.stringify(data)
				baseConfig.contentType = 'application/json; charset=utf-8'
			}
			ajax(baseConfig)
		})
	}

	// 获取活动详情（时间/标题/背景图..)
	const getActDetail = () => {
		return request()
	}

	// 查询所有活动
	const getAllAct = () => {
		return request()
	}

	// 查询单条活动信息
	const getAct = (id) => {
		return request('', 'post', {
			actId: id
		})
	}


	// 抢票
	const rushTicket = (stuName, stuNumber, tel) => {
		return request('/tickets', 'post', {
			stuName: stuName,
			stuId: stuNumber,
			phoneNumber: tel
		})
	}

	// 查询抢票结果
	const getRushResult = () => {
		return request('/tickets', 'get')
	}

	// 短信发送接口
	const sendMessage = () => {
		return request('/message')
	}

	const loginAdmin = (userName, password) => {
		return request('/login', 'post', {userName, password})
	}

	const registerAdmin = (userName, password) => {
		return request('/user', 'post', {userName, password})
	}

	const addAct = (actInfo) => {
		return request('/activity', 'post', {
			Id: actInfo.id,
			begTime: actInfo.begTime,
			endTime: actInfo.endTime,
			actStartTime: actInfo.actStartTime,
			Content: actInfo.content,
			name: actInfo.name,
			description: actInfo.description,
			theme: actInfo.theme,
			tickets: actInfo.tickets,
			params: actInfo.params
		})
	}

	const deleteAct = (actId) => {
		request('/activity', 'delete', {Id: actId})
	}

	return {
		rushTicket,
		getActDetail,
		getAllAct,
		sendMessage,
		getRushResult,
		registerAdmin,
		loginAdmin,
		deleteAct,
		addAct,
		getAct
	}
})