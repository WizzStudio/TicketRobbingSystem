define(require => {
	const $ = require('jquery')
	// elemets
	const $actTable = $('#js-actTable').children('tbody')
	const $login = $('#js-admin-login')
	const $main = $('#js-admin-main')

	// templates
	const tableItem = data => (
		`<tr>
			<td>${data.actinfo ? data.actinfo.name : '无' }</td>
     <td>${data.actatr ? data.actatr.seckilltime : '无'}</td>
     <td>${data.actatr ? data.actatr.tickets : '无'}</td>
     <td><a href="http://p3.helloyzy.cn?actid=${data.actatr ? data.actatr.actid : 0}">http://p3.helloyzy.cn?actid=${data.actatr ? data.actatr.actid : 0}</td>
     <td>
         <div class="btn-group btn-group-xs btn-group" role="group" aria-label="...">
             <button id="admin-op-info" type="button" class="btn btn-info" data-id="${data.actatr ? data.actatr.actid : 0}">查看详情</button>
             <button id="admin-op-export" type="button" class="btn btn-success" data-id="${data.actatr ? data.actatr.actid : 0}">导出数据</button>
             <button id="admin-op-delete" type="button" class="btn btn-danger" data-id="${data.actatr ? data.actatr.actid : 0}">删除活动</button>
             <button id="admin-op-message" type="button" class="btn btn-success" data-id="${data.actatr ? data.actatr.actid : 0}">发送短信</button>
         </div>
     </td>
</tr>`
	)

	// 渲染表单
	const renderTable = (dataArray = []) => {
		$actTable.empty()
		$actTable.append(`<tr>
                    <td>活动名称</td>
                    <td>活动时间</td>
                    <td>放票数量</td>
                    <td>活动链接</td>
                    <td>操作</td>
                </tr>`)
		for (let item of dataArray) {
			$actTable.append(tableItem(item))
		}
	}


	return {
		renderTable
	}
}
)