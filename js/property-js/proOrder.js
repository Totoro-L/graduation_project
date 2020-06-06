//物业订单管理
document.write("<script type='text/javascript' src='../../js/utils/commonFunction.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/ajaxUse.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/property.js'></script>");

// 页面数据轮询获取
function proGetData(){
	var url = "../../manage/property-manage/proPark.php";
	var data = {
		"getSome" : "park"
	}
    $.ajax({
        type: "POST",  //数据提交方式（post/get）
        url: url,  //提交到的url
        data: data,//提交的数据
        dataType: "json",//返回的数据类型格式
        success : function(result) {
            result = JSON.stringify(result);
            var dataJSON = JSON.parse(result);
            getParkData(dataJSON);
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
function proParkInit(){
    clearInterval(timer);
    proGetData();
    timer = setInterval(
        function(){proGetData()}
    ,1000);
}
// 审核车位操作
function checkPark(){
    clearInterval(timer);
    // 审核通过
    $("#pk").on("click",".td-do-yes",function(){
        var parkId = $(this).parent("td").parent("tr").attr("val");
        var parkJSON = {
            "id" : parkId,
            "res" : 1  //审核结果
        }
        var url = "../../manage/property-manage/checkPark.php";
        var returnJSON = ajaxJSON(url, parkJSON);
        if(returnJSON.result){
            alert('审核通过操作成功');
            proParkInit();
        }                       
    });
    //审核失败
    $("#pk").on("click",".td-do-no",function(){
        var parkId = $(this).parent("td").parent("tr").attr("val");
        var parkJSON = {
            "id" : parkId,
            "res" : 0  //审核结果
        }
        var url = "../../manage/property-manage/checkPark.php";
        var returnJSON = ajaxJSON(url, parkJSON);
        if(returnJSON.result){
            alert('审核失败操作成功');
            proParkInit();
        }                       
    });
}

$(document).ready(function(){
    proParkInit();
    checkPark();
});
