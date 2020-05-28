<?php
  // 车位共享
  include '../include/connect.php';
  header('Content-Type:text/html;charset=utf-8');

  $id = $_POST['id'];
  $share_start = $_POST['shareStart'];
  $share_over = $_POST['shareOver'];

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');

  $sql = "UPDATE park_info SET share_start='$share_start',share_over='$share_over'
      WHERE id='$id'";
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
