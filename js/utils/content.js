//carAppoint车主车位列表显示内容
// id,villageAddress,garageName,parkName,parkownId,shareStart,shareOver,preinTime,preoutTime,parkSta,$localon,$localat,$price,+navi
function pDataIn(data){
	function pContent(val){
		var content = '<li class=\"show-li\" value=\"'+val.id+'\">'+
							'<p class=\"show-title\">'+val.villageAddress+val.garageName+val.parkName+'</p>'+
							'<p class=\"show-detail\">可预约开始时间：'+val.shareStart+'</p>'+
							'<p class=\"show-detail\">可预约结束时间：'+val.shareOver+'</p>'+
							'<div class=\"right-div\">'+
								'<span class=\"show-navi\">'+
									val.navi+'km'+
								'</span>'+
								'<span class=\"show-price\">'+
									'￥'+val.price+'/h'+
								'</span>'+
							'</div>'+
						'</li>';
		return content;
	};	
	$("#appoint-show1").empty();
	$.each(data,function(index,val){
		var pCon = pContent(val);
		$("#appoint-show1").append(pCon);
	});
};
//车主预约详情显示
// id,villageAddress,garageName,parkName,parkownId,shareStart,shareOver,preinTime,preoutTime,parkSta,$localon,$localat,$price,+navi
function appointDataIn(val){
	var content = '<li id=\"property-name\">小区名称:<br>'+
					'<span>'+val.villageAddress+'</span>'+
				'</li>'+
				'<li id=\"lots-name\">车库名称:<br>'+
					'<span>'+val.garageName+'</span>'+
				'</li>'+
				'<li id=\"park-name\">车位名称：<br>'+
					'<span>'+val.parkName+'</span>'+
				'</li>'+
				'<li id=\"del-navi\">距离：<span>'+val.navi+'km</span></li>'+
				'<li id=\"del-price\">价格：<span>'+val.price+'元/时</span></li>'+
				'<li id=\"can-begin\">可预约开始时间：<span>'+val.shareStart+'</span></li>'+
				'<li id=\"can-end\">可预约结束时间：<span>'+val.shareOver+'</span></li>';
	$(".del-read").html(content);
}
//车主订单详情显示
//"id" ,"village_address","garage_name","park_name","order_time","prein_time","preout_time","price"
function orderGoData(val,kind){  //kind:0 未完成；1 已完成；2 已取消
	if(kind === 0){
		var li1='<li id=\"del-QR\">'+
					'<div id=\"code\"></div>'+
				'</li>';
		var li2='<li id=\"del-price\">价格：'+
					'<span>'+val.orderPrice+'元/时</span>'+
				'</li>'+
				'<li id=\"del-getin\">入场时间：'+
					'<span>'+val.getinTime+'</span>'+
				'</li>';
		var li3='<li id=\"del-btn1\">'+
					'<button id=\"park-photo\" type=\"button\">车库平面图</button>'+
					'<button id=\"park-navi\" type=\"button\">导航</button>'+
				'</li>'+
				'<li id=\"del-btn2\">'+
					'<button id=\"order-none\" type=\"button\">取消订单</button>'+
				'</li>';
	}
	else if(kind === 1){
		var li1='<li class=\"order-top-title\">'+
					'<img src=\"'+"../../images/done.png"+'\">'+
					'<p>已完成</p>'+
				'</li>';
		var li2='<li id=\"del-price\">订单总价：'+
					'<span>'+val.orderPrice+'</span>'+
				'</li>'+
				'<li id=\"del-getin\">入场时间：'+
					'<span>'+val.getinTime+'</span>'+
				'</li>'+
				'<li id=\"del-getout\">出场时间：'+
					'<span>'+val.getoutTime+'</span>'+
				'</li>';
		var li3='<li id=\"del-btn\">'+
					'<button id=\"delete-order\" type=\"button\">删除订单</button>'
				'</li>';
	}
	else if(kind === 2){
		var li1='<li class=\"order-top-title\">'+
					'<img src=\"'+"../../images/cancel.png"+'\">'+
					'<p>已取消</p>'+
				'</li>';
		var li2='<li id=\"del-price\">取消时间：'+
					'<span>'+val.cancelTime+'</span>'+
				'</li>';
		var li3='<li id=\"del-btn\">'+
					'<button id=\"delete-order\" type=\"button\">删除订单</button>'
				'</li>';
	}
	var content = li1+
				'<li id=\"del-id\">订单编号：'+
					'<span>'+val.id+'</span>'+
				'</li>'+
				'<li id=\"del-commu\">小区名称：'+
					'<span>'+val.villageAddress+'</span>'+
				'</li>'+
				'<li id=\"del-property\">车库名称：'+
					'<span>'+val.garageName+'</span>'+
				'</li>'+
				'<li id=\"del-park\">车位名称：'+
					'<span>'+val.parkName+'</span>'+
				'</li>'+li2+
				'<li id=\"del-begin\">开始时间：'+
					'<span>'+val.preinTime+'</span>'+
				'</li>'+
				'<li id=\"del-end\">结束时间：'+
					'<span>'+val.preoutTime+'</span>'+
				'</li>'+
				'<li id=\"del-in\">下单时间：'+
					'<span>'+val.orderTime+'</span>'+
				'</li>'+li3;
	$(".del-show").html(content);
	$("#order-del").show();
}
//车主订单列表显示
//$id;$carownId;$carNum;$villageAddress;$garageName;$parkName;$orderTime;$preinTime;$preoutTime;$getinTime;$getoutTime;$cancelTime;$orderPrice;$orderSta;
//0为未入场，1为未出场，2为已完成，3为已取消，4为超时
function pOrderIn(val){
	//获取当前时间
	function getNow(s) {
	return s < 10 ? '0' + s: s;
	}
	 
	var myDate = new Date();            
	 
	var year=myDate.getFullYear();        //获取当前年
	var month=myDate.getMonth()+1;   //获取当前月
	var date=myDate.getDate();            //获取当前日
	 
	 
	var h=myDate.getHours();              //获取当前小时数(0-23)
	var m=myDate.getMinutes();          //获取当前分钟数(0-59)
	var s=myDate.getSeconds();
	 
	var now=year+'-'+getNow(month)+"-"+getNow(date)+" "+getNow(h)+':'+getNow(m)+":"+getNow(s);
	// 时间差计算
	function timeDiff(time1, time2, dif) {
	    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
	    time1 = time1.replace(/\-/g, "/");
	    time2 = time2.replace(/\-/g, "/");

	    //将计算间隔类性字符转换为小写
	    dif = dif.toLowerCase();
	    var sTime = new Date(time1);      //开始时间
	    var eTime = new Date(time2);  //结束时间
	    //作为除数的数字
	    var number = 1;
	    switch (dif) {
	        case "second":
	            number = 1000;
	            break;
	        case "minute":
	            number = 1000 * 60;
	            break;
	        case "hour":
	            number = 1000 * 3600;
	            break;
	        case "day":
	            number = 1000 * 3600 * 24;
	            break;
	        default:
	            break;
	    }
	    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(number));
	}
	if(val.orderSta == 0){
		var pname = '未入场';
		var day = timeDiff(now, val.preinTime, 'day');
		var hour = timeDiff(now, val.preinTime, 'hour');
		hour = hour%24;
		var minute = timeDiff(now, val.preinTime, 'minute');
		minute = minute % 60;
		var allDel = '距离入场时间还有'+day+'天'+hour+'时'+minute+'分';
	} 
	else if(val.orderSta == 1){
		var pname = '未出场';
		var day = timeDiff(now, val.preoutTime, 'day');
		var hour = timeDiff(now, val.preoutTime, 'hour');
		hour = hour%24;
		var minute = timeDiff(now, val.preoutTime, 'minute');
		minute = minute % 60;
		var allDel = '距离结束时间还有'+day+'天'+hour+'时'+minute+'分';
	} 
	else if(val.orderSta == 2){
		var pname = '已完成';
		var allDel = "下单时间："+val.orderTime;
	} 
	else if(val.orderSta == 3){
		var pname = '已取消';
		var allDel = "取消时间："+val.cancelTime;
	} 
	else if(val.orderSta == 4){
		var pname = '已超时';
		var day = timeDiff(val.preoutTime, now, 'day');
		var hour = timeDiff(val.preoutTime, now, 'hour');
		hour = hour%24;
		var minute = timeDiff(val.preoutTime, now, 'minute');
		minute = minute % 60;
		var allDel = '您已超时停车'+day+'天'+hour+'时'+minute+'分！';
	} 
	var content = '<li class=\"show-li\" value=\"'+val.id+'\">'+
				'<p class=\"order-img-name\">'+pname+'</p>'+
				'<p class=\"show-title\">'+val.villageAddress+val.garageName+val.parkName+'</p>'+
				'<p class=\"show-detail\">预约入场时间：'+val.preinTime+'</p>'+
				'<p class=\"show-detail\">预约出场时间：'+val.preoutTime+'</p>'+
				'<p class=\"show-all-detail\">'+allDel+'</p>'+
			'</li>';
	// console.log(content);
	$("#order-show").append(content);
}
//车主我的车位信息
function carDataIn(val){
	var carNum = val.carNum;
	var carFile = val.proveFile;
	var content = '';
	//未添加车位
	if(carNum == ''){
		content = '<div id=\"carinfor-img\">'+
					'</div>'+
					'<ul id=\"carinfor-del\">'+
						'<li id=\"car-num\">车牌号：'+
							'<input id="inputCar" type=\"text\" placeholder=\"请输入车牌号\">'+
						'</li>'+
						'<li id=\"car-file\">资质文件：'+
							'<button id=\"upfile\">上传资质文件</button>'+
							'<input type=\"file\" name=\"filePath\" style=\"display:none\" id=\"file-path\"/>'+
						'</li>'+
						'<li id=\"car-btn1\">'+
							'<button id=\"back-btn\">返回</button>'+
							'<button id=\"yes-btn\">确认</button>'+
						'</li>'+
					'</ul>';
	}
	//已添加车位
	else{
		content = '<div id=\"carinfor-img\">'+
					'</div>'+
					'<ul id=\"carinfor-del\">'+
						'<li id=\"car-num\">车牌号：'+
							'<span>'+carNum+'</span>'+
						'</li>'+
						'<li id=\"car-file\">资质文件：'+
							'<button id=\"downfile\" val=\"'+carFile+'\">下载资质文件</button>'+
						'</li>'+
						'<li id=\"car-btn1\">'+
							'<button id=\"back-btn\">返回</button>'+
						'</li>'+
					'</ul>';
	}
	
	$("#user-del").html(content);
	$("#user-del").show();
}
//车主我的基本信息
function myDataIn(val){
	var content = '<div class=\"title-img\">'+
						'<img src=\"'+val.photoPath+'\">'+
					'</div>'+
					'<ul id=\"user-mine-info\">'+
						'<li id=\"myname\">用户名：'+
							'<span>'+val.userName+'</span>'+
						'</li>'+
						'<li id=\"phone\">手机：'+
							'<span>'+val.callNum+'</span>'+
						'</li>'+
						'<li id=\"mail\">邮箱：'+
							'<span>'+val.mailBox+'</span>'+
						'</li>'+
					'</ul>'+
					'<div id=\"car-btn2\">'+
						'<button id=\"back-btn\">返回</button>'+
					'</div>';
	$("#user-del").html(content);
	$("#user-del").show();
}
//车主我的账户信息
function accDataIn(val){
	var content = '<div id=\"acc-num\">'+
						'￥'+val.userPayoff+
					'</div>'+
					'<div class=\"acc-btn\">'+
						'<button id=\"acc-add-btn\">充值</button>'+
						'<button id=\"acc-out-btn\">提现</button>'+
					'</div>'+
					'<div class=\"acc-btn\">'+
						'<button id=\"back-btn\" class=\"acc-back-btn\">返回</button>'+
					'</div>';
	$("#user-del").html(content);
	$("#user-del").show();
}