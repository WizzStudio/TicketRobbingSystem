/* API Layer */
define((require) => {
	const ajax = require('jquery').ajax
	const dialog = require('./dialog')
	const baseUrl = 'http://47.95.253.94:8081'
	const request = (url = '/', method = 'get', data = {}) => {
		return new Promise((resolve, reject) => {
			let baseConfig = {
				url: baseUrl + url,
				method: method,
				success: (data, _, xhr) => {
					if (xhr.getResponseHeader('Authorization')) {
						data.token = xhr.getResponseHeader('Authorization')
					}
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
				baseConfig.contentType = 'application/json; charset=utf-8'
				if (window.sessionStorage.getItem('token')) {
					// console.log('存储token', window.sessionStorage.getItem('token'))
					// baseConfig['headers'] = {
					// 	Authorization: window.sessionStorage.getItem('token')
					// }
					// if (url === '/sql') {
					// 	console.log('get')
					// 	// baseConfig.responseType = 'blob'
					// 	// baseConfig.contentType = 'application/vnd.ms-excel; charset=utf-8'
					// }
					data.token = window.sessionStorage.getItem('token')
				}
				baseConfig.data = JSON.stringify(data)
			}
			// console.log(baseConfig)
			ajax(baseConfig)
		})
	}

	/*TODO 【修改活动接口】 【短信接口逻辑需要重审核】 【获取单条活动信息的接口有疑问】*/

	// 获取活动详情（时间/标题/背景图..)
	const getActDetail = () => {
		return request()
	}

	// 查询所有活动
	const getAllAct = () => {
		return request(`/usertbls`, 'get')
	}

	// 查询单条活动信息
	const getAct = (id) => {
		return request(`/activity?id=${id}`, 'get')
	}


	// 抢票
	const rushTicket = (stuName, stuNumber, tel) => {
		return request('/tickets', 'post', {
			stuName: stuName,
			stuId: stuNumber,
			phoneNum: tel
		})
	}

	// 查询抢票结果
	const getRushResult = () => {
		return request('/tickets', 'get')
	}

	// 短信发送接口
	const sendMessage = (id) => {
		return request('/message', 'post', {actid: id})
	}

	const loginAdmin = (userName, password) => {
		return request('/login', 'post', {userName, password})
	}

	const registerAdmin = (userName, password) => {
		return request('/user', 'post', {userName, password})
	}


	const getXls = (id) => {
		return request('/sql', 'post', {actid: id})
	}

	const addAct = (actInfo) => {
		return request('/activity', 'post', {
			// Id: actInfo.id,
			begTime: actInfo.begTime,
			endTime: actInfo.endTime,
			actStartTime: actInfo.actStartTime,
			Content: actInfo.Content,
			name: actInfo.name,
			description: actInfo.description,
			theme: actInfo.theme,
			tickets: actInfo.tickets,
			imgUrl: actInfo.imgUrl
			// params: actInfo.params
		})
	}

	const deleteAct = (actId) => {
		return	request('/activity', 'delete', {actid: actId})
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
		getAct,
		getXls
	}
})