// 业主车位上传地址添加
function parkAdd(val,getName){
	$(getName).empty();
	if(val.length == 0){
		$(getName).append('<option>'+'---请选择---'+'</option>');
	}
	else{
		for(var i = 0; i < val.length; i++){
    	    $(getName).append('<option>'+val[i].retname+'</option>');
    	};
	}
}
//业主车位列表显示  0为待审核，1为占用中，2为未占用，3为审核失败
function parkInUser(data){
	$("#park-show1").empty();
	var con = '';
	$.each(data,function(index,val){
		if(val.parkSta == 0){
			con = '<li val=\"'+val.id+'\">'+
					'<span class=\"park-sta\">待审核</span>'+
					'<span class=\"park-name\">'+val.parkName+'</span>'+
				'</li>';
		}
		else if(val.parkSta == 3){
			con = '<li val=\"'+val.id+'\">'+
					'<span class=\"park-sta\">审核失败</span>'+
					'<span class=\"park-name\">'+val.parkName+'</span>'+
				'</li>';
		}
		else if(val.parkSta == 1){
			con = '<li val=\"'+val.id+'\">'+
				'<span class=\"park-sta\">占用中</span>'+
				'<span class=\"park-name\">'+val.parkName+'</span>'+
				'<span class=\"park-del1\">共享开始时间：'+val.shareStart+'</span>'+
				'<span class=\"park-del2\">共享结束时间：'+val.shareOver+'</span>'+
				'<span class=\"park-del2\">占用开始时间：'+val.preinTime+'</span>'+
				'<span class=\"park-del2\">占用结束时间：'+val.preoutTime+'</span>'+
			'</li>';
		}
		else if(val.parkSta == 2){
			var start = val.shareStart;
			var end = val.shareOver;

			var beginTime = stringToTime(val.shareStart);
			var endTime = stringToTime(val.shareOver);
			var timeNow = new Date().getTime();

			if(timeNow > endTime){
				start = "共享时间已过期，请重新选择！";
				end = "共享时间已过期，请重新选择！";
			}
			else if(Number.isNaN(beginTime) || Number.isNaN(endTime)){
				start = "还未共享，请选择共享时间！";
				end = "还未共享，请选择共享时间";
			}
			con = '<li val=\"'+val.id+'\">'+
				'<span class=\"park-sta\">未占用</span>'+
				'<span class=\"park-name\">'+val.parkName+'</span>'+
				'<span class=\"park-del1\">共享开始时间：'+start+'</span>'+
				'<span class=\"park-del2\">共享结束时间：'+end+'</span>'+
				'<span class=\"park-share\">选择时间</span>'+
			'</li>';
		}
		$("#park-show1").append(con);
	});
}