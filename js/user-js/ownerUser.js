document.write("<script type='text/javascript' src='../../js/utils/commonFunction.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/ajaxUse.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/owner.js'></script>");

//页面初始化
function userInit(){
	var userJSON = {
		"kind" : 0
	}
	var url = "../../manage/user-manage/carUser.php";
	var returnJSON = ajaxJSON(url, userJSON);
	$("#nameuser").html(returnJSON.userName);
	$("#userImg").attr("src",returnJSON.photoPath);
}

$(document).ready(function(){
	bottomClickOwner();
	//页面初始化
	userInit();
	//切换至业主模式
	$("#change-to").click(function(){
		location.href = "http://www.park.com/templates/user-temp/carAppoint.html";
		// 角色更改。。。。
	});
	//退出登录
	$("#login-out").click(function(){
		//销毁session
	    $.ajax({
	      cache: false,
	      type: "GET",
	      url : "../../manage/include/session.php",
	      success: function(ret){
	            alert("系统退出成功");
	            location.href = "http://www.park.com/templates/login.html";
	      },
	      error:function(){
	        alert("请求失败");
	      }
	    });
	});
});
