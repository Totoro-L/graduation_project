<?php
  include '../include/connect.php';
  header('Content-type:text/json'); 

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');
//审核车位
  $id = $_POST['id'];
  $res = $_POST['res'];

  if($res){
  	mysqli_query($hand,"UPDATE park_info SET park_sta='2'
    WHERE id='$id'");
  }
  else{
  	mysqli_query($hand,"UPDATE park_info SET park_sta='3'
    WHERE id='$id'");
  }
  $json_arr = array("result"=>'1');
  $json_obj = json_encode($json_arr);
  echo $json_obj;
