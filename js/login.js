document.write("<script type='text/javascript' src='../js/utils/commonFunction.js'></script>");
document.write("<script type='text/javascript' src='../js/utils/ajaxUse.js'></script>");

//用户端模式
function userMode(){
	$(".property-box").removeClass("active");
	$(".user-box").addClass("active");
	$(".role-choose").show();
	$("#register-a").show();
	$("input:radio[value='2']").prop('checked', 'true');
	return 1;
};
//物业端模式
function propertyMode(){
	$(".user-box").removeClass("active");
	$(".property-box").addClass("active");
	$(".role-choose").hide();
	$("#register-a").hide();
	return 0;
}
$(document).ready(function(){
	var userRole = 2;
	//默认用户端登录
	userMode();
	//用户端与物业端切换
	$(".user-box").click(function(){
		userRole = userMode();
	});
	$(".property-box").click(function(){
		userRole = propertyMode();
	});
	//移动端
	$("#login-click").click(function(){
		var regUser =/^[\da-zA-Z_\u4e00-\u9f5a]{4,10}$/;   //用户名，4-10位，中文、字母、数字和下划线组成
		var regPass =/^\w{6,10}$/;  //密码，6-10位，字母、数字、下划线组成
		if(dataCheck(regUser, "#user-name") && dataCheck(regPass, "#user-pass") ){   //用户名密码验证
			var data = {
				"userName" : $("#user-name").val(),
				"passWord" : $("#user-pass").val(),
				"userRole" : $('input:radio:checked').val()
			}
			// console.log(data);
			var url = "../manage/login.php";
			var ret = ajaxJSON(url, data);
			console.log(ret);
		}   
		else{
			alert("输入格式错误");
		}
	});
});
