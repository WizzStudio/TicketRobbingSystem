/* API Layer */
define((require) => {
	const ajax = require('jquery').ajax
	const baseUrl = ''
	const request = (url = '/', method = 'get') => {
		return new Promise((resolve, reject) => {
			ajax({
				url: baseUrl + url,
				method: method,
				success: (data) => {
					resolve(data)
				},
				error: err => (reject(err))
			})
		})
	}


	return {
		sayHello: () => {
			return request('/test', 'get')
		}
	}
})