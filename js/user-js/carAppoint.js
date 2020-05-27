document.write("<script type='text/javascript' src='../../js/utils/commonFunction.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/ajaxUse.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/content.js'></script>");

//腾讯地图获取经纬度
function showPosition(position) {
    var latitude = position.lat;        
    var longitude = position.lng;
    var timer = null;
    //页面数据获取 act:navi 距离排序；price 价格排序；time 时间筛选;其他 预约详情显示
    function polling(act,chooseId){
		var url = "../../manage/user-manage/carAppoint.php";
		var data = {
			"appRange" : 0,
			"appBegin" : '',
			"appEnd" : ''
		}
		var dataJSON = "result none!";
		$.ajax({
		    type: "POST",  //数据提交方式（post/get）
		    url: url,  //提交到的url
		    data: data,//提交的数据
		    dataType: "json",//返回的数据类型格式
		    success : function(result) {
		        result = JSON.stringify(result);
		        dataJSON = JSON.parse(result);

		        //距离获取
				$.each(dataJSON,function(index,val){
					var navi = calDistance(longitude,val.localon,latitude,val.localat);
					navi = navi.toFixed(1);
					eval("val.navi=navi");
				});
				if(act == "navi"){   //距离排序
					var naviRank = dataJSON;
					naviRank = naviRank.sort(function(a,b){
						return Number(a.navi)-Number(b.navi);
					});
					pDataIn(naviRank);
				}
				else if(act == "price"){   //价格排序
					var priceRank = dataJSON;
					priceRank = priceRank.sort(function(a,b){
						return Number(a.price)-Number(b.price);
					});
					pDataIn(priceRank);
				}
				else if(act == "time"){    //时间筛选
					var beginTime = stringToTime($("#begin-time").val());
					var endTime = stringToTime($("#end-time").val());
					//共享开始时间<开始时间<结束时间<共享结束时间
					var filterTime = [];
					var i = 0;
					$.each(dataJSON,function(index,val){
						var shareStart = stringToTime(val.shareStart);
						var shareOver = stringToTime(val.shareOver);
						if(beginTime>shareStart && shareOver>endTime){
							filterTime[i] = val;
							i++;
						}
					});
					pDataIn(filterTime);
				}
				else if(act == "del"){    //预约详情
					//判断是否添加车辆信息
					var userJSON = {
						"kind" : 2
					}
					var url = "../../manage/user-manage/carUser.php";
					var returnJSON = ajaxJSON(url, userJSON);
					if(returnJSON.carNum == ''){
						alert("请添加车辆信息！");
						location.href = "http://www.park.com/templates/user-temp/carUser.html";
					}
					else{
						//预约详情
						var appointGet = $.grep(dataJSON, function(n,i){
							return n.id == chooseId;
						});
						// console.log(appointGet[0]);
						appointDataIn(appointGet[0]);
						model(1);
						$('#appoint-del').show();
						$("#appoint-del").addClass("bottom-move");
						$("#appoint-click").click(function(){
							var appointBegin = $("#appoint-begin").val();
							var appointEnd = $("#appoint-end").val();
							var shareBegin = stringToTime(appointGet[0].shareStart);
							var shareEnd = stringToTime(appointGet[0].shareOver);
							if(appointBegin=="" || appointEnd==""){
								alert("请选择预约时间段");
							}
							else if(stringToTime(appointEnd)<=stringToTime(appointBegin)){
								alert("结束时间应晚于开始时间");
							}
							else if(stringToTime(appointBegin)<shareBegin || shareEnd<stringToTime(appointEnd)){
								alert("请选择可预约时间段内时间");
							}
							else{
								var orderJSON = {
									"id" : appointGet[0].id,
									"villageAddress" : appointGet[0].villageAddress,
									"garageName" : appointGet[0].garageName,
									"parkName" : appointGet[0].parkName,
									"orderTime" : getFormatDate(),
									"preinTime" : $("#appoint-begin").val(),
									"preoutTime" : $("#appoint-end").val(),
								 	"orderPrice" : appointGet[0].price               //增加
								}
								var url = "../../manage/user-manage/orderIn.php";
								var returnJSON = ajaxJSON(url, orderJSON);
								var orderGo = JSON.stringify(returnJSON, null, 4);
								console.log(orderGo);
								sessionStorage.setItem("orderJSON",orderGo);
								alert("预约成功！");
								location.href = "http://www.park.com/templates/user-temp/carOrder.html";
							}
						});
					}
				}
		    },
		    error:function(XMLHttpRequest, textStatus, errorThrown){
		        var errorRet = 'XMLHttpRequest.status：' + XMLHttpRequest.status + '\nXMLHttpRequest.readyState：' + XMLHttpRequest.readyState + '\ntextStatus：' + textStatus;
		        console.log(errorRet);
		    }
		});
	};
	//距离排序
	$("#top-navi").click(function(){
		clearInterval(timer);
		polling("navi");
		timer = setInterval(
			function(){polling("navi")}
		,1000);
		$(".right-time input").val('');
		$("#appoint-option1 li").removeClass("active");
		$("#top-navi").addClass("active");
		$("#top-choose img").attr("src","../../images/choose.png");
	});
	//价格排序
	$("#top-price").click(function(){
		clearInterval(timer);
		polling("price");
		timer = setInterval(
			function(){polling("price")}
		,1000);
		$(".right-time input").val('');
		$("#appoint-option1 li").removeClass("active");
		$("#top-price").addClass("active");
		$("#top-choose img").attr("src","../../images/choose.png");
	});
	//筛选时间
	$("#right-btn2").click(function(){
		//现在时间<开始时间<结束时间 两者均不得为空
		if($("#begin-time").val() && $("#end-time").val()){
			var timeNow = new Date().getTime();
			var beginTime = stringToTime($("#begin-time").val());
			var endTime = stringToTime($("#end-time").val());
			
			if(timeNow<beginTime && beginTime<endTime){
				clearInterval(timer);
				polling("time");
				timer = setInterval(
					function(){polling("time")}
				,1000);
				model(0);
				$(".right-choose").hide();
				$("#appoint-option1 li").removeClass("active");
				$("#top-choose").addClass("active");
				$("#top-choose img").attr("src","../../images/choose-active.png");
			}
			else{
				alert("输入时间有误，现在时间<开始时间<结束时间");
			}
		}
		else{
			alert("请输入开始时间和结束时间");
		}
	});	
	//默认距离排序
	$("#top-navi").click();
	//预约详情
	$("#appoint-show1").on("click",".show-li",function(){
		var chooseId = $(this).attr("value");
		clearInterval(timer);
		polling("del",chooseId);
	});
};
function showErr() {
    console.log("定位失败");
};

//页面主体功能
function appointInit() {
    var geolocation = new qq.maps.Geolocation("XPKBZ-PRTLD-A574B-PBIOL-SL2HF-DQFYO", "myapp");
    geolocation.getLocation(showPosition, showErr);
}

$(document).ready(function(){
	window.scrollTo(0,0);
	bottomClick();
	appointInit();

	//模态
	$('.model').click(function(){
		model(0);
		$(".right-time input").val('');
		$(".right-choose").hide();
		$('#appoint-del').hide();
	})
	//筛选框出现
	$("#top-choose").click(function(){
		model(1);
		$(".right-choose").show();
		$(".right-choose").addClass("right-move");
	})
	//筛选重置
	$("#right-btn1").click(function(){
		$(".right-time input").val('');
		$('.model').click();
		$("#top-navi").click();
	});
	//时间选择
	timeCheck(3);
	
	//预约详情关闭
	$(".del-img").click(function(){
		model(0);
	    $('#appoint-del').hide();
	    $('#appoint-begin').val('');
	    $('#appoint-end').val('');
	    $("#top-navi").click();
	});
});