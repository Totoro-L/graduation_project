<?php
  include '../include/connect.php';
  header('Content-Type:text/html;charset=utf-8');
  session_start();
  $json = '';
  $data = array();
  $parkown_id = $_SESSION['userid'];
  class Park 
  {
    public $parkName;
    public $shareStart;
    public $shareOver;
    public $preinTime;
    public $preoutTime;
    public $id;
    public $parkSta;
  }

  // $get_some = $_POST['getSome'];

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');
  

  $sql = "select * from park_info where parkown_id='$parkown_id'";
  $result = mysqli_query($hand,$sql);
  if($result){
    while ($row = mysqli_fetch_array($result,MYSQL_ASSOC))
  	{
      $park = new Park();
      $park->parkName = $row["village_address"].$row["garage_name"].$row["park_name"];
      $park->shareStart = $row["share_start"];
      $park->shareOver = $row["share_over"];
      $park->id = $row["id"];
      $park->parkSta = $row["park_sta"];
      $park->preinTime = $row["prein_time"];
      $park->preoutTime = $row["preout_time"];


      $data[] = $park;
    }

  	$json = json_encode($data);//把数据转换为JSON数据.
  	echo $json;
  }else{
   	echo "查询失败";
  }