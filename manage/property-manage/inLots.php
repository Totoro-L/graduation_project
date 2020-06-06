<?php
  // 添加车库
  include '../include/connect.php';
  header('Content-Type:text/html;charset=utf-8');

  $village_address = $_POST['villageAddress'];
  $garage_name = $_POST['garageName'];
  $longitude = $_POST['longitude'];
  $latitude = $_POST['latitude'];
  $garage_photo = $_POST['garagePhoto'];
  $park_price = $_POST['parkPrice'];
  
  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');

  $sql = "INSERT INTO Lots_info (village_address, garage_name, longitude, latitude, garage_photo, park_price)
        VALUES ('$village_address', '$garage_name', '$longitude', '$latitude', '$garage_photo', '$park_price')";

  
  $result = mysqli_query($hand,$sql);
  $id = mysqli_insert_id($hand);

  $json_arr = array("return"=>"1");
  $json_obj = json_encode($json_arr);
  echo $json_obj;