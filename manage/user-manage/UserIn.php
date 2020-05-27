<?php
  include '../include/connect.php';
  header('Content-Type:text/html;charset=utf-8');

  session_start();

  $car_num = $_POST['carNum'];
  $prove_file = $_POST['proveFile'];
  $user_id = $_SESSION['userid'];
  $ret = "0";

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');
  
  $sql = "UPDATE account_info SET car_num='$car_num',prove_file='$prove_file'
      WHERE id='$user_id'";
  $result = mysqli_query($hand,$sql);
  //判断数据库是否插入成功
  if($result){
    $ret = "1";
  }
  else {
    echo "数据库插入失败";
  }

  $json_arr = array("return"=>$ret);
  $json_obj = json_encode($json_arr);
  echo $json_obj;