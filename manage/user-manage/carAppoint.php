<?php
  include '../include/connect.php';
  header('Content-Type:text/html;charset=utf-8');
  ini_set('date.timezone','Asia/Shanghai');

  $json = '';
  $data = array();
  class Park 
  {
    public $id;
    public $villageAddress;
    public $garageName;
    public $parkName;
    public $parkownId;
    public $shareStart;
    public $shareOver;
    public $preinTime;
    public $preoutTime;
    public $parkSta;
    public $localon;
    public $localat;
    public $price;
  }

  $app_range = $_POST['appRange'];
  $app_begin = $_POST['appBegin'];
  $app_end = $_POST['appEnd'];

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');
  $time_now = date("Y-m-d H:i:s");
  // var_dump($time_now);
  $sql = "select * from park_info where park_sta='2'";
  $result = mysqli_query($hand,$sql);
  if($result){
    while ($row = mysqli_fetch_array($result,MYSQL_ASSOC))
  	{
      if(strtotime($row["share_over"]) > strtotime($time_now)){
        $park = new Park();
        $park->id = $row["id"];
        $park->villageAddress = $row["village_address"];
        $park->garageName = $row["garage_name"];
        $park->parkName = $row["park_name"];
        $park->parkownId = $row["parkown_id"];
        $park->shareStart = $row["share_start"];
        $park->shareOver = $row["share_over"];
        $park->preinTime = $row["prein_time"];
        $park->preoutTime = $row["preout_time"];
        $park->parkSta = $row["park_sta"];

        $villageAddress = $row["village_address"];
        $garageName = $row["garage_name"];

        $sql_lots="select * from lots_info where village_address='$villageAddress' and garage_name='$garageName' ";
        $resultSet = mysqli_query ($hand, $sql_lots);
        $getsom = mysqli_fetch_array($resultSet);
        
        $park->localon = $getsom["longitude"];
        $park->localat = $getsom["latitude"];
        $park->price = $getsom["park_price"];
        

        $data[] = $park;
      }
  		
	  }
  	$json = json_encode($data);//把数据转换为JSON数据.
  	echo $json;
  }else{
   	echo "查询失败";
  }