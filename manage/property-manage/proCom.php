<?php
  include '../include/connect.php';
  header('Content-Type:text/html;charset=utf-8');
  $json = '';
  $data = array();
  class Community 
  {
    public $id;
    public $villageAddress;
    public $villageName;
    public $userName;
  }

  $get_some = $_POST['getSome'];

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');

  $sql = "select * from community_info";
  $result = mysqli_query($hand,$sql);

  session_start();
  $user_id = $_SESSION['userid'];
  $check_query = mysqli_query($hand, "select * from account_info where id='$user_id' limit 1");
  $result_pro = mysqli_fetch_array($check_query);

  if($result && $result_pro){
    while ($row = mysqli_fetch_array($result,MYSQL_ASSOC))
  	{
      $community = new Community();
      $community->id = $row["id"];
      $community->villageAddress = $row["village_address"];
      $community->villageName = $row["village_name"];
      $community->userName = $result_pro["user_name"];

      $data[] = $community;
    }

  	$json = json_encode($data);//把数据转换为JSON数据.
  	echo $json;
  }else{
   	echo "查询失败";
  }