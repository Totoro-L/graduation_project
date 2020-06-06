// 物业车库管理
document.write("<script type='text/javascript' src='../../js/utils/commonFunction.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/ajaxUse.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/property.js'></script>");
document.write("<script type='text/javascript' src='../../js/utils/owner.js'></script>");

//地图坐标选择
var map;
var marker;
function mapChoose(){
    var MapLat = 39.916527;
    var MapLon = 116.397128;
    var center = new qq.maps.LatLng(39.916527, 116.397128);
    map = new qq.maps.Map(document.getElementById('mapContainer'), {
        center: center,
        zoom: 13
    });
    //获取当前位置设置中心点
    citylocation = new qq.maps.CityService({
        complete: function (result) {
            MapLat = result.detail.latLng.lat;
            MapLon = result.detail.latLng.lng;
            map.setCenter(result.detail.latLng);
            //添加标记
            marker= new qq.maps.Marker({
                position: result.detail.latLng,
                draggable: true,
                map: map
            });
            //添加到提示窗
            var info = new qq.maps.InfoWindow({
                map: map
            });
            qq.maps.event.addListener(marker, 'mouseup', function (e) {
                //获取经纬度 e.latLng
                //获取坐标 e.cursorPixel
                info.open();
                info.setContent('<div style="text-align:center;white-space:nowrap;' +
                    'margin:10px;">坐标：' + e.latLng.lat + ',' + e.latLng.lng + '</div>');
                info.setPosition(e.latLng);
                
                MapLat = e.latLng.lat;
                MapLon = e.latLng.lng;
            });
        }
    });
    //调用searchLocalCity()方法 根据用户IP查询城市信息。
    citylocation.searchLocalCity();
    // 搜索
    $('#btn-search').click(function(){
        $.ajax({
            type:'get',
            url:'http://apis.map.qq.com/ws/geocoder/v1/?address='+$('#text').val()+'&key='+'XPKBZ-PRTLD-A574B-PBIOL-SL2HF-DQFYO'+'&output=jsonp',
            dataType:'jsonp',
            jsonp:'callback',
            success:function(data) {
                if(!data.result){
                    alert('请输入准确地址!');
                }
                else{
                    var posi=data.result.location;
                    MapLat = posi.lat;
                    MapLon = posi.lng;
                    var centerS = new qq.maps.LatLng(posi.lat,posi.lng);
                    map.setCenter(centerS);
                    marker.setPosition(centerS);
                }
            },
            error:function() {
                alert('fail');
            }
        });
    });
    //确定
    $('#btn-yes').click(function(){
        MapLon = toFloat(MapLon,6);
        MapLat = toFloat(MapLat,6);
        $('#lon').val(MapLon);
        $('#lat').val(MapLat);
        $('#mapModal').hide();
    });
}
// 添加车库初始状态
function removeAdd(){
    // 小区地址
        var userJSON = {
            "getsome" : 0
        }
        var url = "../../manage/user-manage/selectGet.php";
        var returnJSON = ajaxJSON(url, userJSON);
        parkAdd(returnJSON,"#commu-select");

    $("#lots-name-input").val('');
    $("#lon").val('');
    $("#lat").val('');
    // 车库平面图没有重置！！！！！！！
    $("#lots-price-select option:first").prop("selected", 'selected');
};
// 添加车库
function addLots(){
    //添加车库按钮
    $("#add-lots").click(function(){
        clearInterval(timer);
        removeAdd();
        model(1);
        $(".add-lots-page").show();
    });
    // 地图
        //关闭地图
    $('.incorrect').click(function(){
        $('#mapModal').hide();
    });
        //打开地图
    $('#mapclick').click(function(){
        $('#mapModal').show();
        mapChoose();
    });
    function backLots(){
        model(0);
        $('#mapModal').hide();
        $(".add-lots-page").hide();
        proLotsInit();
    }
    // 上传车库平面图
    $("#del-file-up").click(function(){
        $("#file-path").click();
    });
    $("#file-path").change(function(evet){
        var path = $("#file-path").val();
        var files = event.target.files;
        var txtFile = files[0];
        var testSuf = [".GIF", ".JPG", ".JPEG", ".PNG"];
        if(!photoJudge(path, testSuf)){
            alert('文件格式错误');
        }
        else{
            var URL = window.URL || window.webkitURL;
            var txtFile = URL.createObjectURL(txtFile);
            console.log(txtFile);
        }
    });
    // 确认提交
    $("#lots-up").click(function(){
        var regFile = $("#file-path").val();
        if($("#lots-name-input").val() == ''){
            alert('请输入车库名称');
        }
        else if($("#commu-select option:selected").text() == "---请选择---"){
            alert('请选择小区地址');
        }
        else if(typeof regFile == "undefined" || regFile == null || regFile == ""){
            alert('请上传车库平面图');
        }
        else if($("#lon").val() == '' || $("#lat").val() == ''){
            alert('请拾取车库地址坐标');
        }
        else{
            var url2 = "../../manage/include/fileSave.php";  //文件存储
            var formData = new FormData($('form')[0]);
            formData.append('file',$(':file')[0].files[0]);
            var retFile = ajaxForm(url2, formData);

            var userJSON = {
                "villageAddress" : $("#commu-select option:selected").text(),
                "garageName" : $("#lots-name-input").val(),
                "longitude" : $("#lon").val(),
                "latitude" : $("#lat").val(),
                "garagePhoto" : retFile,
                "parkPrice" : $("#lots-price-select option:selected").text()
            }
            var url = "../../manage/property-manage/inLots.php";
            var returnJSON = ajaxJSON(url, userJSON);
            if(returnJSON.return){
                alert('车库添加成功');
                $("#lots-back").click();
            }
        }
    });
    //模态
    $('.model').click(function(){
        backLots();
    });
    //返回
    $('#lots-back').click(function(){
        backLots();
    });
}
// 页面数据轮询
function proGetLots(){
    var url = "../../manage/property-manage/proLots.php";
    var data = {
        "getSome" : "Lots"
    };
    $.ajax({
        type: "POST",  //数据提交方式（post/get）
        url: url,  //提交到的url
        data: data,//提交的数据
        dataType: "json",//返回的数据类型格式
        success : function(result) {
            result = JSON.stringify(result);
            var dataJSON = JSON.parse(result);
            getLotsData(dataJSON);
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
function proLotsInit(){
    clearInterval(timer);
    proGetLots();
    timer = setInterval(
        function(){proGetLots()}
    ,1000);
}

$(document).ready(function(){
    proLotsInit();
    bottomClickPro();
    addLots();
});