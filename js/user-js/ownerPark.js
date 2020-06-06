document.write("<script type='text/javascript' src='../../js/utils/commonFunction.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/ajaxUse.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/owner.js'></script>");


//车位数据轮询获取
function parkGet(){
	// var arr = ['未入场','未出场','已完成','已取消','已超时'];
	var url = "../../manage/user-manage/ownerPark.php";
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

            parkInUser(dataJSON);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            var errorRet = 'XMLHttpRequest.status：' + XMLHttpRequest.status + '\nXMLHttpRequest.readyState：' + XMLHttpRequest.readyState + '\ntextStatus：' + textStatus;
            console.log(errorRet);
        }
    });
}
var timer = null;
function mainPark(){
	// 车位上传
	$("#add-park").click(function(){
		clearInterval(timer);
		$("#park-del").show();
		// 小区地址
		var userJSON = {
			"getsome" : 0
		}
		var url = "../../manage/user-manage/selectGet.php";
		var returnJSON = ajaxJSON(url, userJSON);
		parkAdd(returnJSON,"#commu-select");

		// 车库地址
		function seletGar(){
			var userJSON = {
				"getsome" : 1,
				"villageAddress" : $("#commu-select option:selected").text()
			}
			var url = "../../manage/user-manage/selectGet.php";
			var returnJSON = ajaxJSON(url, userJSON);
			console.log(returnJSON);
			parkAdd(returnJSON,"#lots-select");
		}
		seletGar();	
		$("#commu-select").change(function(){
			seletGar();	
		});

		//上传车位凭证
		$("#del-file-up").click(function(){
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

		// 确认上传
		$("#del-btn-up").click(function(){
			var regFile = $("#file-path").val();
			if($("#del-park-up").val() == ''){
				alert('请输入车位名称');
			}
			else if($("#commu-select option:selected").text() == "---请选择---" || $("#lots-select option:selected").text() == "---请选择---"){
				alert('请选择地址');
			}
			else if(typeof regFile == "undefined" || regFile == null || regFile == ""){
				alert('请上传凭证文件');
			}
			else{
				var url2 = "../../manage/include/fileSave.php";  //文件存储
				var formData = new FormData($('form')[0]);
 				formData.append('file',$(':file')[0].files[0]);
 				var retFile = ajaxForm(url2, formData);

				var userJSON = {
					"villageAddress" : $("#commu-select option:selected").text(),
					"garageName" : $("#lots-select option:selected").text(),
					"parkName" : $("#del-park-up").val(),
					"parkFile" : retFile
				}
				var url = "../../manage/user-manage/parkIn.php";
				var returnJSON = ajaxJSON(url, userJSON);
				if(returnJSON.return){
					alert('上传车位成功，请等待审核');
					$(".del-img").click();
				}
			}
		});
	});
	//页面轮询
	clearInterval(timer);
	parkGet();
	timer = setInterval(
		function(){parkGet()}
	,1000);
}
$(document).ready(function(){
	bottomClickOwner();
	mainPark();
	//时间选择
	timeCheck(3);
	//共享车位
	$("#park-show1").on("click",".park-share",function(){
		clearInterval(timer);
		var chooseId = $(this).parent().attr("val");
		model(1);
		$("#park-share-add").show();
		$("#park-share-add").addClass("bottom-move");

		$("#park-share-sure").click(function(){
			// 时间判断 现在时间<共享开始时间<共享结束时间
			var beginTime = stringToTime($("#share-begin").val());
			var endTime = stringToTime($("#share-over").val());
			var timeNow = new Date().getTime();
			if(timeNow<beginTime && beginTime<endTime){
				var userJSON = {
					"id" : chooseId,
					"shareStart" : $("#share-begin").val(),
					"shareOver" : $("#share-over").val()
				}
				var url = "../../manage/user-manage/parkShare.php";
				var returnJSON = ajaxJSON(url, userJSON);
				if(returnJSON){
					alert("车位共享成功！");
					$('.model').click();
					parkGet();
					timer = setInterval(
						function(){parkGet()}
					,1000);
				}
			}
			else{
				alert("请选择正确的时间段（现在时间<共享开始时间<共享结束时间）");
			}
			
		});
	});
	//模态
	$('.model').click(function(){
		model(0);
		$("#park-share-add input").val('');
		$('#park-share-add').hide();
	})
	//上传车位关闭
	$(".del-img").click(function(){
	    $("#park-del").hide();
	    $("#del-park-up").val('');
	    $("#commu-select").html('<option selected = \"selected\" disabled=\"disabled\">---请选择---</option>');
	    $("#lots-select").html('<option selected = \"selected\" disabled=\"disabled\">---请选择---</option>');
	    $("#file-path").val('');
	    
	    clearInterval(timer);
		parkGet();
		timer = setInterval(
			function(){parkGet()}
		,1000);
	});
});