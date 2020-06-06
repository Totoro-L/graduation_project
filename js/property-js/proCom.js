// 物业小区管理
document.write("<script type='text/javascript' src='../../js/utils/commonFunction.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/ajaxUse.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/property.js'></script>");

// 添加小区初始状态
function removeAdd(){
	$("#com-name-input").val('');
	$("#province1 option:first").prop("selected", 'selected');
	$("#city1 option:first").prop("selected", 'selected');
	$("#district1 option:first").prop("selected", 'selected');
};
// 添加小区
function addCom(){
	//模态
	$('.model').click(function(){
		model(0);
		proComInit();
		$(".add-com-page").hide();
	});
	//返回
	$('#com-back').click(function(){
		model(0);
		proComInit();
		$(".add-com-page").hide();
	});
	//添加小区
	$("#add-com").click(function(){
		clearInterval(timer);
		removeAdd();
		model(1);
		$(".add-com-page").show();
	});
	// 提交
	$('#com-up').click(function(){
		var SeIndex1=$("#province1").get(0).selectedIndex;
		var SeIndex2=$("#city1").get(0).selectedIndex;
		var SeIndex3=$("#district1").get(0).selectedIndex;

		var villageAddress = $("#province1 option:selected").val()+$("#city1 option:selected").val()+$("#district1 option:selected").val();
		var villageName = $("#com-name-input").val();

		if(!SeIndex1){
			alert('请选择小区地址');
		}
		else if(villageName == ''){
			alert('请输入小区名称');
		}
		else{
			var data = {
				"villageAddress" : villageAddress,
				"villageName" : villageName
			}
			var url = "../../manage/property-manage/inCom.php";
			var returnJSON = ajaxJSON(url, data);
			model(0);
			$(".add-com-page").hide();
			proComInit();
		}
	});
}
// 页面数据轮询
function proGetCom(){
	var url = "../../manage/property-manage/proCom.php";
	var data = {
		"getSome" : "community"
	};
	$.ajax({
        type: "POST",  //数据提交方式（post/get）
        url: url,  //提交到的url
        data: data,//提交的数据
        dataType: "json",//返回的数据类型格式
        success : function(result) {
            result = JSON.stringify(result);
            var dataJSON = JSON.parse(result);
            getComData(dataJSON);
            // 顶部用户名
            $("#pro-name").html(dataJSON[0].userName);
            // 表格隔行换色
            $("tr:even").css("background-color", "#F4F2F2");
            $(".th-div").css("background-color", "#015478");
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            var errorRet = 'XMLHttpRequest.status：' + XMLHttpRequest.status + '\nXMLHttpRequest.readyState：' + XMLHttpRequest.readyState + '\ntextStatus：' + textStatus;
            console.log(errorRet);
        }
    });
}
var timer = null;
function proComInit(){
    clearInterval(timer);
    proGetCom();
    timer = setInterval(
        function(){proGetCom()}
    ,1000);
}

$(document).ready(function(){
    addCom();
    proComInit();
    bottomClickPro();
});