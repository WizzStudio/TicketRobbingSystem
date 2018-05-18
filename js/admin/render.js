define(require => {
	const $ = require('jquery')
	// elemets
	const $actTable = $('#js-actTable').children('tbody')
	const $login = $('#js-admin-login')
	const $main = $('#js-admin-main')

	// templates
	const tableItem = data => (
		`
			<tr>
			<td>${data.name}</td>
     <td>${data.actStartTime}</td>
     <td>${data.tickets}</td>
     <td>${data.actURL}</td>
     <td>
         <div class="btn-group btn-group-xs btn-group" role="group" aria-label="...">
             <button id="admin-op-info" type="button" class="btn btn-info" data-id="${data.id}">查看详情</button>
             <button id="admin-op-export" type="button" class="btn btn-success" data-id="${data.id}">导出数据</button>
             <button id="admin-op-delete" type="button" class="btn btn-danger" data-id="${data.id}">删除活动</button>
         </div>
     </td>
</tr>`
	)

	// 渲染表单
	const renderTable = data => {
		$actTable.empty()
		$actTable.append(`<tr>
                    <td>活动名称</td>
                    <td>活动时间</td>
                    <td>放票数量</td>
                    <td>活动链接</td>
                    <td>操作</td>
                </tr>`)
		for (let i of [1, 1, 1]) {
			$actTable.append(tableItem({name: 'ha', actStartTime: '2008-12', tickets: 12, actURL: 'www.baidu.com', id: '3'}))
		}
	}

	const init = () => {
		renderTable()
	}

	init()
})