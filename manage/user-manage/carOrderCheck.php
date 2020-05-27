<?php
  include '../include/connect.php';
  header('Content-Type:text/html;charset=utf-8');
  ini_set('date.timezone','Asia/Shanghai');

  $ret = "0";
  $id = $_POST['id'];
  $act = $_POST['act'];

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');

  $check_query = mysqli_query($hand, "select * from order_info where id='$id' limit 1");
  $result = mysqli_fetch_array($check_query);

  if($result){
    $village_address = $result['village_address'];
    $garage_name = $result['garage_name'];
    $park_name = $result['park_name'];

    if($act == 0){   //查看车库平面图
      $check_query = mysqli_query($hand, "select * from lots_info where village_address='$village_address' and garage_name='$garage_name' limit 1");
      $res = mysqli_fetch_array($check_query);
      $ret = $res['garage_photo'];
      $json_arr = array("garagePhoto"=>$ret);
      $json_obj = json_encode($json_arr);
      echo $json_obj;
    }
    else if($act == 1){   //取消订单
      $time_now = date("Y-m-d H:i:s");
      mysqli_query($hand,"UPDATE order_info SET cancel_time='$time_now',order_sta='3'
      WHERE id='$id'");
      mysqli_query($hand,"UPDATE park_info SET park_sta='2',prein_time='0000-00-00 00:00:00',preout_time='0000-00-00 00:00:00'
      WHERE village_address='$village_address' and garage_name='$garage_name' and park_name='$park_name'");

      $json_arr = array("result"=>'1');
      $json_obj = json_encode($json_arr);
      echo $json_obj;
    }
    else if($act == 2){   //导航
      $check_query = mysqli_query($hand, "select * from lots_info where village_address='$village_address' and garage_name='$garage_name' limit 1");
      $res = mysqli_fetch_array($check_query);

      $longitude = $res['longitude'];
      $latitude = $res['latitude'];

      $json_arr = array("longitude"=>$longitude,"latitude"=>$latitude);
      $json_obj = json_encode($json_arr);
      echo $json_obj;
    }
  }else {
    echo "查询失败";
  }

  
  

  