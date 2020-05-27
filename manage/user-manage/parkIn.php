<?php
  // 预约生成订单
  include '../include/connect.php';
  header('Content-Type:text/html;charset=utf-8');
  session_start();

  $park_file = $_POST['parkFile'];
  $village_address = $_POST['villageAddress'];
  $garage_name = $_POST['garageName'];
  $park_name = $_POST['parkName'];
  $user_id = $_SESSION['userid'];

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');

  $sql = "INSERT INTO park_info (village_address, garage_name, park_name, park_file,parkown_id)
        VALUES ('$village_address', '$garage_name', '$park_name', '$park_file','$user_id')";

  $result = mysqli_query($hand,$sql);
  
  //判断数据库是否插入成功
  if($result){
        $json_arr = array("return"=>1);
        $json_obj = json_encode($json_arr);
        echo $json_obj;
  }
  else {
    echo "失败";
  }
