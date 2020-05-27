//前后端交互，ajax传递json（url:php地址，data：传递的json；返回JSON对象）
function ajaxJSON(url, data){
    var ret = "result none!";
    $.ajax({
        type: "POST",  //数据提交方式（post/get）
        url: url,  //提交到的url
        data: data,//提交的数据
        dataType: "json",//返回的数据类型格式
        async: false,
        success : function(result) {
            result = JSON.stringify(result);
            ret = JSON.parse(result);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            var errorRet = 'XMLHttpRequest.status：' + XMLHttpRequest.status + '\nXMLHttpRequest.readyState：' + XMLHttpRequest.readyState + '\ntextStatus：' + textStatus;
            console.log(errorRet);
        }
    });
    return ret;
}
//前后端交互，ajax传递formdata（url:php地址，data：传递的表单数据;返回地址字符串,见PHP详情）
function ajaxForm(url, formdata){
    var ret = "result none!";
    $.ajax({
        type: "POST",  //数据提交方式（post/get）
        url: url,  //提交到的url
        data: formdata,//提交的数据
        contentType: false,
        processData: false,
        async: false,
        success : function(result) {
            ret = result;
            // console.log(result);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            var errorRet = 'XMLHttpRequest.status：' + XMLHttpRequest.status + '\nXMLHttpRequest.readyState：' + XMLHttpRequest.readyState + '\ntextStatus：' + textStatus;
            console.log(errorRet);
        }
    });
    return ret;
}

