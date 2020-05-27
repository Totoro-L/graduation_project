//腾讯地图
//前端定位组件
document.write("<script type='text/javascript' src='https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js'></script>");
//移动端事件选择组件
document.write("<script type='text/javascript' src='../../js/utils/timeChoose/mobiscroll.custom.min.js'></script>");
document.write("<link href='../../js/utils/timeChoose/mobiscroll.custom.min.css' rel='stylesheet' type='text/css' />");

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
//时间选择(model:1 普通控件；2 日期控件；3 日期时间控件；4 时间控件)
function timeCheck(model){
	var theme = "ios";
    var mode = "scroller";
    var display = "bottom";
    var lang="zh";

    if(model == 1){
    	// Select demo initialization
	    $('#demo_select').mobiscroll().select({
	        theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
	        mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
	        display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
	        lang: lang        // Specify language like: lang: 'pl' or omit setting to use default
	    });
    }
    
    else if(model == 2){
    	// Date demo initialization
	    $('#demo_date').mobiscroll().date({
	        theme: theme,
	        mode: mode,
	        display: display,
	        lang: lang
	    });
    }
    
    else if(model == 3){
    	// Date & Time demo initialization
	    $('.demo_datetime').mobiscroll().datetime({
	        theme: theme,
	        mode: mode,
	        display: display,
	        lang: lang,
	        dateFormat:"yyyy-mm-dd",
	        minDate: new Date(2000,3,10,9,22),
	        maxDate: new Date(2030,7,30,15,44),
	        stepMinute: 1
	    });
    }
    
    else{
    	// Time demo initialization
	    $('#demo_time').mobiscroll().time({
	        theme: theme,
	        mode: mode,
	        display: display,
	        lang: lang
	    });
    } 
}
//模态(sta:1 打开；0 关闭)
function model(sta){
	if(sta == 1){
		$('.model').show();
		$('body').css({
		　　"overflow-x":"hidden",
		　　"overflow-y":"hidden"
		});
	}
	else{
		$('.model').hide();
		$('body').css({
		　　"overflow-x":"auto",
		　　"overflow-y":"auto"
		});
	}
}
//经纬度间距离计算
function calDistance(lng1,lng2,lat1,lat2){
	function Rad(d){
       return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
    }
	var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var  b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里
    //s=s.toFixed(4);
    return s;
}
//日期字符转变为时间戳  格式：date = '2015-03-05 17:59:00'
function stringToTime(date){
	date = date.substring(0,18);    
	date = date.replace(/-/g,'/'); 
	var time = new Date(date).getTime();
	return time;
}
//获取当前时间  格式：date = '2015-03-05 17:59:00'
function getFormatDate(){
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}
//二维码函数
    //中文字符处理
function toUtf8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}
  	//生成二维码
function outputQRCod(txt, width, height) {
    //先清空
    $("#code").empty();
    //中文格式转换
    var str = toUtf8(txt);
    //生成二维码
    $("#code").qrcode({
        render: "table",
        width: width,
        height: height,
        text: str
    });
}
/* 
* 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒 
* 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00 
* 返回精度为：秒，分，小时，天
*/
function timeDiff(time1, time2, dif) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
    time1 = time1.replace(/\-/g, "/");
    time2 = time2.replace(/\-/g, "/");

    //将计算间隔类性字符转换为小写
    dif = dif.toLowerCase();
    var sTime = new Date(time1);      //开始时间
    var eTime = new Date(time2);  //结束时间
    //作为除数的数字
    var number = 1;
    switch (dif) {
        case "second":
            number = 1000;
            break;
        case "minute":
            number = 1000 * 60;
            break;
        case "hour":
            number = 1000 * 3600;
            break;
        case "day":
            number = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(number));
}
//车主底部导航
function bottomClick(){
    $("#appoint-btn").click(function(){
        location.href = "http://www.park.com/templates/user-temp/carAppoint.html";
    });
    $("#order-btn").click(function(){
        location.href = "http://www.park.com/templates/user-temp/carOrder.html";
    });
    $("#user-btn").click(function(){
        location.href = "http://www.park.com/templates/user-temp/carUser.html";
    });
}