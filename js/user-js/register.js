document.write("<script type='text/javascript' src='../../js/utils/commonFunction.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/ajaxUse.js'></script>");

$(document).ready(function(){
	//头像添加
	$(".add-img").click(function(){
		$("#photo-path").click();
	});
	$("#photo-path").change(function(evet){
		var path = $("#photo-path").val();
		var files = event.target.files;
		var imgFile = files[0];
		var testSuf = [".GIF", ".JPG", ".JPEG", ".PNG"];
		if(!photoJudge(path, testSuf)){
			alert('图片格式错误');
		}
		else{
			var URL = window.URL || window.webkitURL;
	        var imgFile = URL.createObjectURL(imgFile);
			$('.add-img').attr("src", imgFile);
			console.log(imgFile);
		}
	});
	//注册
	$("#regis-click").click(function(){
		var regUser =/^[\da-zA-Z_\u4e00-\u9f5a]{4,10}$/;   //用户名
		var regPass =/^\w{6,10}$/;  //密码
		var regPhone =/^1\d{10}$/;  //手机
		var regMail =/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;   //邮箱
		var regImg = $('#photo-path').val();  //头像
		if(!dataCheck(regUser, "#input-name")){
			alert('用户名格式错误');
		}
		else if(!dataCheck(regPass, "#input-pass")){
			alert('密码格式错误');
		}
		else if(!dataCheck(regPhone, "#input-phone")){
			alert('手机号格式错误');
		}
		else if(!dataCheck(regMail, "#input-mail")){
			alert('邮箱格式错误');
		}
		else if(typeof regImg == "undefined" || regImg == null || regImg == ""){
			alert('请选择头像');
		}
		else{
			var url2 = "../../manage/include/fileSave.php";  //图片存储
			var formData = new FormData($('form')[0]);
 			formData.append('file',$(':file')[0].files[0]);
 			// console.log(formData);
 			var retImg = ajaxForm(url2, formData);
 			// console.log(retImg);

			var data = {
				"userName" : $("#input-name").val(),
				"passWord" : $("#input-pass").val(),
				"photoPath" : retImg,
				"callNum" : $("#input-phone").val(),
				"mailBox" : $("#input-mail").val(),
				"userRole" : "2",
			}
			// console.log(data);
			var url1 = "../../manage/user-manage/register.php";
			var ret = ajaxJSON(url1, data);
			// console.log(ret.return);

			if(ret.return == 1){
				alert('用户名已被注册');
			}
			else if(ret.return == 2){
				alert('手机已被注册');
			}
			else if(ret.return == 3){
				alert('邮箱已被注册');
			}
			else if(ret.return == 4){
				alert('数据库插入失败');
			}
			else{
				alert('注册成功！');
				window.location.href = "http://www.park.com/templates/login.html";
			}
		}
	});
});