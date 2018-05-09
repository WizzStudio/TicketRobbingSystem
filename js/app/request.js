/* API Layer */
define((require) => {
	const ajax = require('jquery').ajax
	const dialog = require('./dialog')
	const baseUrl = ''
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
						status:err.status,
						statusText: err.statusText
					})
				}
			}
			if (method.toUpperCase() === 'POST') {
				baseConfig.data = data
			}
			ajax(baseConfig)
		})
	}

	// 获取活动详情（时间/标题/背景图..)
	const getActDetail = () => {
		return request()
	}

	// 抢票
	const rushTicket = () => {
		return request('/tickets', 'post')
	}

	// 查询抢票结果
	const getRushResult = () => {
		return request('/tickets', 'get')
	}

	return {
		sayHello: () => {
			return request('/test', 'get')
		}
	}
})