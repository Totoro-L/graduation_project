<?php
  include '../include/connect.php';
  header('Content-Type:text/html;charset=utf-8');

  $user_name = $_POST['userName'];
  $pass_word = $_POST['passWord'];
  $call_num = $_POST['callNum'];
  $mail_box = $_POST['mailBox'];
  $user_role = $_POST['userRole'];
  $photo_path = $_POST['photoPath'];
  $ret = "0";

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');


  // 判断用户名是否重复
  $sql_user="select user_name from account_info where user_name='$user_name'";
  $resultSet = mysqli_query ($hand, $sql_user);
  $row = mysqli_fetch_array($resultSet);
  //判断用户名是否存在
  if ($user_name == $row['user_name']) {
    $ret = "1";
  }
  else{
    //判断手机号是否重复
    $sql_user="select call_num from account_info where call_num='$call_num'";
    $resultSet = mysqli_query ($hand, $sql_user);
    $row = mysqli_fetch_array($resultSet);
    if ($call_num == $row['call_num']) {
      $ret = "2";
    }
    else{
      //判断邮箱是否注册
      $sql_user="select mail_box from account_info where mail_box='$mail_box'";
      $resultSet = mysqli_query ($hand, $sql_user);
      $row = mysqli_fetch_array($resultSet);
      if ($mail_box == $row['mail_box']) {
        $ret = "3";
      }
      else{
        $sql = "INSERT INTO account_info (user_name, pass_word, call_num, mail_box, user_role, photo_path)
        VALUES ('$user_name', '$pass_word', '$call_num', '$mail_box', '$user_role', '$photo_path')";
        $result = mysqli_query($hand,$sql);
        //判断数据库是否插入成功
        if($result){
          $ret = "0";
        }
        else {
          $ret = "4";
        }
      }
    }
  }

  $json_arr = array("return"=>$ret);
  $json_obj = json_encode($json_arr);
  echo $json_obj;