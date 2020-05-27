document.write("<script type='text/javascript' src='../../js/utils/commonFunction.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/ajaxUse.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/content.js'></script>");

//页面初始化
function userInit(){
	var userJSON = {
		"kind" : 0
	}
	var url = "../../manage/user-manage/carUser.php";
	var returnJSON = ajaxJSON(url, userJSON);
	$("#nameuser").html(returnJSON.userName);
	$("#userImg").attr("src",returnJSON.photoPath);
	if(returnJSON.isFull == 0){
		$(".alarm").show();
	}
	else{
		$(".alarm").hide();
	}
}
//车辆信息
function userCar(){
	var userJSON = {
		"kind" : 2
	}
	var url = "../../manage/user-manage/carUser.php";
	var returnJSON = ajaxJSON(url, userJSON);
	carDataIn(returnJSON);
}
//基本信息
function userInfor(){
	var userJSON = {
		"kind" : 1
	}
	var url = "../../manage/user-manage/carUser.php";
	var returnJSON = ajaxJSON(url, userJSON);
	myDataIn(returnJSON);
}
//账户信息
function accountInfor(){
	var userJSON = {
		"kind" : 3
	}
	var url = "../../manage/user-manage/carUser.php";
	var returnJSON = ajaxJSON(url, userJSON);
	accDataIn(returnJSON);
}

$(document).ready(function(){
	bottomClick();
	//页面初始化
	userInit();
	
	//车辆信息
	$("#car-infor").click(function(){
		userCar();
		//功能页面返回
		$("#back-btn").click(function(){
			$("#user-del").hide();
		});
		//下载资质文件
		$("#downfile").click(function(){
			var url = $("#downfile").attr("val");
			window.location.href = url;
		});
		//资质文件上传
		$("#upfile").click(function(){
			$("#file-path").click();
		});
		$("#file-path").change(function(evet){
			var path = $("#file-path").val();
			var files = event.target.files;
			var txtFile = files[0];
			var testSuf = [".DOC", ".JPG", ".JPEG", ".PDF"];
			if(!photoJudge(path, testSuf)){
				alert('文件格式错误');
			}
			else{
				var URL = window.URL || window.webkitURL;
		        var txtFile = URL.createObjectURL(txtFile);
				console.log(txtFile);
			}
		});
		$("#yes-btn").click(function(){
			var regCar = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
			var regFile = $("#file-path").val();
			if(dataCheck(regCar,"#inputCar")){
				if(typeof regFile == "undefined" || regFile == null || regFile == ""){
					alert("请上传资质文件");
				}
				else{
					var url2 = "../../manage/include/fileSave.php";  //文件存储
					var formData = new FormData($('form')[0]);
 					formData.append('file',$(':file')[0].files[0]);
 					var retFile = ajaxForm(url2, formData);

					var url = "../../manage/user-manage/UserIn.php";
					var userJSON = {
						"carNum" : $("#inputCar").val(),
						"proveFile" : retFile
					}
					var returnJSON = ajaxJSON(url, userJSON);
					alert('车辆信息上传成功');
					$("#user-del").hide();
					userInit();
				}
			}
			else{
				alert("请输入正确格式的车牌号");
			}
		});
	});
	//基本信息
	$("#sta-infor").click(function(){
		userInfor();
		 //功能页面返回
		$("#back-btn").click(function(){
			$("#user-del").hide();
		});
	});
	//账户信息
	$("#account-infor").click(function(){
		accountInfor();
		 //功能页面返回
		$("#back-btn").click(function(){
			$("#user-del").hide();
		});
	});
	//切换至业主模式！！！session没改
	$("#change-to").click(function(){
		location.href = "http://www.park.com/templates/user-temp/ownerPark.html";
	});
});
