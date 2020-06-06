<?php
// 车库列表显示
  include '../include/connect.php';
  header('Content-Type:text/html;charset=utf-8');
  $json = '';
  $data = array();
  class Lots 
  {
    public $id;
    public $villageAddress;
    public $garageName;
    public $longitude;
    public $latitude;
    public $parkPrice;
    public $garagePhoto;
    public $userName;
  }

  $get_some = $_POST['getSome'];

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');

  $sql = "select * from lots_info";
  $result = mysqli_query($hand,$sql);

  session_start();
  $user_id = $_SESSION['userid'];
  $check_query = mysqli_query($hand, "select * from account_info where id='$user_id' limit 1");
  $result_pro = mysqli_fetch_array($check_query);

  if($result && $result_pro){
    while ($row = mysqli_fetch_array($result,MYSQL_ASSOC))
  	{
      $lots = new Lots();
      $lots->id = $row["id"];
      $lots->villageAddress = $row["village_address"];
      $lots->garageName = $row["garage_name"];
      $lots->longitude = $row["longitude"];
      $lots->latitude = $row["latitude"];
      $lots->parkPrice = $row["park_price"];
      $lots->garagePhoto = $row["garage_photo"];
      $lots->userName = $result_pro["user_name"];

      $data[] = $lots;
    }

  	$json = json_encode($data);//把数据转换为JSON数据.
  	echo $json;
  }else{
   	echo "查询失败";
  }