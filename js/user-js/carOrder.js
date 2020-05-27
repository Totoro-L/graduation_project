document.write("<script type='text/javascript' src='../../js/utils/commonFunction.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/ajaxUse.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/content.js'></script>");
document.write("<script type='text/javascript' src='https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js'></script>");
document.write("<script src='../../js/utils/jquery.qrcode.min.js'></script>");
//顶部选择样式
function toActive(item){
    $("#order-option li").removeClass("active");
    $(".order-drop-down").removeClass("active");
    $(item).addClass("active");
}
//页面数据获取轮询 act:0 全部；1 其他；2 订单详情
function orderGetData(act,stat){
	var arr = ['未入场','未出场','已完成','已取消','已超时'];
	var url = "../../manage/user-manage/carOrder.php";
	var data = {
		"getSome" : "order"
	}
    $.ajax({
        type: "POST",  //数据提交方式（post/get）
        url: url,  //提交到的url
        data: data,//提交的数据
        dataType: "json",//返回的数据类型格式
        success : function(result) {
            result = JSON.stringify(result);
            var dataJSON = JSON.parse(result);
            $("#order-show").empty();
            //订单详情
            if(act == 2){
            	var appointGet = $.grep(dataJSON, function(n,i){
					return n.id == stat;
				});
				if(appointGet[0].orderSta == 2){
					orderGoData(appointGet[0],1);
				}
				else if(appointGet[0].orderSta == 3){
					orderGoData(appointGet[0],2);
				}
				else{
					orderGoData(appointGet[0],0);
					var orderJsonGo = JSON.stringify(appointGet[0], null, 4);
					console.log(orderJsonGo);
					outputQRCod(orderJsonGo, 100, 100);
				}
            }
            //全部
            if(act == 0){
				$.each(dataJSON,function(index,val){
					pOrderIn(val);
				});
            }
            //其他
            else{
            	var putInOrder= dataJSON.filter(function(item){
				    return arr[item.orderSta] == stat; 
				})
				$.each(putInOrder,function(index,val){
					pOrderIn(val);
				});
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            var errorRet = 'XMLHttpRequest.status：' + XMLHttpRequest.status + '\nXMLHttpRequest.readyState：' + XMLHttpRequest.readyState + '\ntextStatus：' + textStatus;
            console.log(errorRet);
        }
    });
}
//顶部选项
function downOrder(){
	var timer = null;
	//一级选项点击
	$("#order-option li").click(function(){
		window.scrollTo(0,0);
		//未完成下拉
		if($(this).attr("id")=="top-no-do"){
			$(".order-drop-content").show();
			toActive(".order-drop-down");
		}
		//全部
		else if($(this).attr("id")=="top-all"){
			toActive(this);
			clearInterval(timer);
			orderGetData(0);
			timer = setInterval(
				function(){orderGetData(0)}
			,1000);
		}
		//其他选项
		else{
			toActive(this);
			$(".order-drop-down").html('未完成');
			var stat = $(this).html();
			clearInterval(timer);
			orderGetData(1,stat);
			timer = setInterval(
				function(){orderGetData(1,stat)}
			,1000);
		}
	});
	//二级选项点击
	$(".order-drop-content span").click(function(){
		window.scrollTo(0,0);
		var stat = $(this).html();
		$(".order-drop-down").html(stat);
		clearInterval(timer);
		orderGetData(1,stat);
		timer = setInterval(
			function(){orderGetData(1,stat)}
		,1000);
	});
	//订单详情
	$("#order-show").on("click",".show-li",function(){
		var chooseId = $(this).attr("value");
		clearInterval(timer);
		orderGetData(2,chooseId);
		//车库平面图
		$(".del-show").on("click","#park-photo",function(){
			model(1);
			
		});
	});
}

$(document).ready(function(){
	window.scrollTo(0,0);
	bottomClick();

	//顶部选项
	downOrder();
	$("#top-all").click();
	//预约页面跳转过来
	if(sessionStorage.getItem("orderJSON") != null){
		console.log(sessionStorage.getItem("orderJSON")); 
		var orderJsonGo = JSON.parse(sessionStorage.getItem("orderJSON"));
		var orderJsonStr = sessionStorage.getItem("orderJSON");
		orderGoData(orderJsonGo,0);
		outputQRCod(orderJsonStr, 100, 100);
		$("#order-del").show();
		sessionStorage.removeItem("orderJSON");  
	}
	//未完成下拉列表显示隐藏
	$(document).click(function(){
		$(".order-drop-content").hide();
	});
	$(".order-drop-down").click(function(){
		event.stopPropagation();
		if($(".order-drop-content").is(':visible')){
			$('.order-drop-content').hide();
		}else{
			$('.order-drop-content').show();
		}
	});
	//订单详情页面隐藏
	$(".del-img").click(function(){
		model(0);
	    $('#order-del').hide();
	    $("#top-all").click();
	});
	//模态
	$('.model').click(function(){
		model(0);
	})
});
