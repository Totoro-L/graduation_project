// 车位管理页面获取  0为待审核，1为占用中，2为未占用，3为审核失败
function getParkData(data){
	$("#pk").empty();
	var con = '';
	con = con + '<tr class=\"th-div\">'+
						'<th>序号</th>'+
						'<th>小区名称</th>'+
						'<th>车库名称</th>'+
						'<th>车位名称</th>'+
						'<th>业主电话</th>'+
						'<th>车位状态</th>'+
						'<th>凭证文件</th>'+
						'<th>操作</th>'+
					'</tr>';
	$.each(data,function(index,val){
		var i = index+1;
		con += '<tr val=\"'+val.id+'\">'+
						'<td class=\"td-num\">'+i+'</td>'+
						'<td class=\"td-pro\">'+val.villageAddress+'</td>'+
						'<td class=\"td-lots\">'+val.garageName+'</td>'+
						'<td class=\"td-park\">'+val.parkName+'</td>'+
						'<td class=\"td-call\">'+val.parkownId+'</td>';
		if(val.parkSta == 0){
			con += '<td class=\"td-sta\" val=\"'+val.parkSta+'\">待审核</td>'+
						'<td class=\"td-down\">'+
							'<a href=\"'+val.parkFile+'\" class=\"td-down-a\">下载</a>'+
						'</td>'+
						'<td class=\"td-do\">'+
							'<a href=\"javascript:;\" class=\"td-do-yes\">通过</a>'+
							'<a href=\"javascript:;\" class=\"td-do-no\">失败</a>'+
						'</td>'+
					'</tr>';
		}
		else if(val.parkSta == 1){
			con += '<td class=\"td-sta\" val=\"'+val.parkSta+'\">占用中</td>'+
						'<td class=\"td-down\">'+
							'<a href=\"'+val.parkFile+'\" class=\"td-down-a\">下载</a>'+
						'</td>'+
						'<td class=\"td-do\">'+
						'</td>'+
					'</tr>';
		}
		else if(val.parkSta == 2){
			con += '<td class=\"td-sta\" val=\"'+val.parkSta+'\">未占用</td>'+
						'<td class=\"td-down\">'+
							'<a href=\"'+val.parkFile+'\" class=\"td-down-a\">下载</a>'+
						'</td>'+
						'<td class=\"td-do\">'+
						'</td>'+
					'</tr>';
		}
		else if(val.parkSta == 3){
			con += '<td class=\"td-sta\" val=\"'+val.parkSta+'\">审核失败</td>'+
						'<td class=\"td-down\">'+
							'<a href=\"'+val.parkFile+'\" class=\"td-down-a\">下载</a>'+
						'</td>'+
						'<td class=\"td-do\">'+
							'<a href=\"javascript:;\" class=\"td-do-del\">删除</a>'+
						'</td>'+
					'</tr>';
		}
	});
	$("#pk").append(con);
}


// 小区管理页面获取  
function getComData(data){
	$("#pk").empty();
	var con = '';
	con = con + '<tr class=\"th-div\">'+
						'<th>序号</th>'+
						'<th>小区地址</th>'+
						'<th>小区名称</th>'+
					'</tr>';
	$.each(data,function(index,val){
		var i = index+1;
		con += '<tr val=\"'+val.id+'\">'+
					'<td class=\"td-num\">'+i+'</td>'+
					'<td class=\"td-pro\">'+val.villageAddress+'</td>'+
					'<td class=\"td-lots\">'+val.villageName+'</td>'+
				'</tr>';
	});
	$("#pk").append(con);
}

// 车库管理页面获取
function getLotsData(data){
	$("#pk").empty();
	var con = '';
	con = con + '<tr class=\"th-div\">'+
						'<th rowspan=\"2\">序号</th>'+
						'<th rowspan=\"2\">小区名称</th>'+
						'<th rowspan=\"2\">车库名称</th>'+
						'<th colspan=\"2\">详细地址</th>'+
						'<th rowspan=\"2\">价格（元/时）</th>'+
						'<th rowspan=\"2\">车库平面图</th>'+
						'<th rowspan=\"2\">操作</th>'+
					'</tr>'+
					'<tr class=\"th-div\">'+
						'<th>东经</th>'+
						'<th>北纬</th>'+
					'</tr>';
	$.each(data,function(index,val){
		var i = index+1;
		con += '<tr val=\"'+val.id+'\">'+
					'<td id=\"td-num\">'+i+'</td>'+
					'<td id=\"td-village\">'+val.villageAddress+'</td>'+
					'<td id=\"td-garage\">'+val.garageName+'</td>'+
					'<td id=\"td-lon\">'+val.longitude+'</td>'+
					'<td id=\"td-lat\">'+val.latitude+'</td>'+
					'<td id=\"td-price\">'+val.parkPrice+'</td>'+
					'<td id=\"td-photo\">'+
						'<a href=\"'+val.garagePhoto+'\" class=\"td-down-a\" id=\"down-lots-photo\">查看</a>'+
						'<span class=\"td-do-change\" id=\"lots-photo-change\">修改</span>'+
					'</td>'+
					'<td id=\"td-do\">'+
						'<span class=\"td-do-change\" id=\"lots-price-photo\">修改价格</span>'+
					'</td>'+
				'</tr>';
	});
	$("#pk").append(con);
}