<?php
  // 添加小区
  include '../include/connect.php';
  header('Content-Type:text/html;charset=utf-8');
  session_start();

  $village_name = $_POST['villageName'];
  $village_address = $_POST['villageAddress'];
  $property_id = $_SESSION['userid'];

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');

  $check_query = mysqli_query($hand, "select * from account_info where id='$property_id' limit 1");
  $resss = mysqli_fetch_array($check_query);
  $property_name = $resss["user_name"];

  $sql = "INSERT INTO community_info (village_address, village_name, property_id, property_name)
        VALUES ('$village_address', '$village_name', '$property_id', '$property_name')";

  
  $result = mysqli_query($hand,$sql);
  $id = mysqli_insert_id($hand);

  $json_arr = array("return"=>"0");
  $json_obj = json_encode($json_arr);
  echo $json_obj;