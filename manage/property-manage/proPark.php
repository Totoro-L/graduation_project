<?php
  include '../include/connect.php';
  header('Content-Type:text/html;charset=utf-8');
  $json = '';
  $data = array();
  class Park 
  {
    public $id;
    public $villageAddress;
    public $garageName;
    public $parkName;
    public $parkownId;
    public $parkFile;
    public $parkSta;
    public $userName;
  }

  $get_some = $_POST['getSome'];

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');

  $sql = "select * from park_info";
  $result = mysqli_query($hand,$sql);

  session_start();
  $user_id = $_SESSION['userid'];
  $check_query = mysqli_query($hand, "select * from account_info where id='$user_id' limit 1");
  $result_pro = mysqli_fetch_array($check_query);

  if($result && $result_pro){
    while ($row = mysqli_fetch_array($result,MYSQL_ASSOC))
  	{
      $user_id = $row["parkown_id"];
      $sql_user="select call_num from account_info where id='$user_id'";
      $resultSet = mysqli_query ($hand, $sql_user);
      $row_user = mysqli_fetch_array($resultSet);

      $park = new Park();
      $park->id = $row["id"];
      $park->villageAddress = $row["village_address"];
      $park->garageName = $row["garage_name"];
      $park->parkName = $row["park_name"];
      $park->parkownId = $row_user["call_num"];
      $park->parkFile = $row["park_file"];
      $park->parkSta = $row["park_sta"];
      $park->userName = $result_pro["user_name"];

      $data[] = $park;
    }

  	$json = json_encode($data);//把数据转换为JSON数据.
  	echo $json;
  }else{
   	echo "查询失败";
  }