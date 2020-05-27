<?php
  include '../include/connect.php';
  header('Content-type:text/json'); 

  session_start();

  $kind = $_POST['kind'];
  $user_id = $_SESSION['userid'];
  class Init 
  {
    public $isFull;
    public $userName;
    public $photoPath;
    public $carNum;
    public $proveFile;
    public $callNum;
    public $mailBox;
    public $userPayoff;
  }

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');

  $check_query = mysqli_query($hand, "select * from account_info where id='$user_id' limit 1");
  $result = mysqli_fetch_array($check_query);
  $data = new Init();
  
  if($result){
    // 页面初始化
    if($kind == 0){
      if($result["car_num"] == ""){
        $data->isFull = 0;
      }
      else{
        $data->isFull = 1;
      }
      $data->userName = $result["user_name"];
      $data->photoPath = $result["photo_path"];
    }
    //车辆信息
    else if($kind == 2){
      $data->proveFile = $result["prove_file"];
      $data->carNum = $result["car_num"];
    }
    //基本信息
    else if($kind == 1){
      $data->photoPath = $result["photo_path"];
      $data->userName = $result["user_name"];
      $data->callNum = $result["call_num"];
      $data->mailBox = $result["mail_box"];
    }
    //账户信息
    else if($kind == 3){
      $data->userPayoff = $result["user_payoff"];
    }
  }
  else{
      echo "查询失败";
  }
  


  $json_obj = json_encode($data);
  echo $json_obj;