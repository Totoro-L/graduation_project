<?php
  include 'include/connect.php';
  header('Content-Type:text/html;charset=utf-8');

  // session_start();

  $user_name = $_POST['userName'];
  $pass_word = $_POST['passWord'];
  $user_role = $_POST['userRole'];
  $ret = "0";

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');

  $check_query = mysql_query("select * from account_info where user_name='$user_name' and pass_word='$pass_word' limit 1");
  $result = mysql_fetch_array($check_query);
  if($result){
    if($result["user_role"] == "0" && $user_role != "0"){
      $ret = "2";
    }
    else if($result["user_role"] != "0" && $user_role == "0"){
      $ret = "3";
    }
    else{
      $_SESSION['username'] = $username;
      $_SESSION['userid'] = $result['ad_id'];
      $ret = "0";
    }
  } else {
    $ret = "1";
  }

  $json_arr = array("return"=>$ret);
  $json_obj = json_encode($json_arr);
  echo $json_obj;