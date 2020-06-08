<?php
  include 'include/connect.php';
  header('Content-Type:text/html;charset=utf-8');
  ini_set('date.timezone','Asia/Shanghai');

  $id = $_POST['id'];
  $method = $_POST['method'];

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');

  if($method == 'overtime'){   //超时
    mysqli_query($hand,"UPDATE order_info SET order_sta='4'
    WHERE id='$id'");
    $json_arr = array("return"=>1);
    $json_obj = json_encode($json_arr);
    echo $json_obj;
  }



  