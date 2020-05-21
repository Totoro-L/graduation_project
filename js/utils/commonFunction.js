//输入框验证（reg：正则，inputName：输入框jQ元素名;正确返回1，错误返回0）
function dataCheck(reg, inputName){
	if(reg.test($(inputName).val())){       //输入正确
		return 1;
	}
	else{
		return 0;
	}
}
//文件格式判断（FileName：上传获取的文件名，testSuf：类型数组;匹配返回1，不匹配返回0）
function photoJudge(FileName, testSuf){
	ret = 0;
	FileSuf=FileName.lastIndexOf(".");
	FileSuf=FileName.substring(FileSuf,FileName.length).toUpperCase();
	$.each(testSuf, function(index, value){
  		if(FileSuf == value){
			ret = 1;
		}
	});
	return ret;
}