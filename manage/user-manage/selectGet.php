<?php
// 获取业主车位选择地址下拉列表
  include '../include/connect.php';
  header('Content-Type:text/html;charset=utf-8'); 

  $getsome = $_POST['getsome'];
  $ret = "0";  
  $data = array();
  class Reti 
  {
    public $retname;
  }

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');

  // 小区地址添加
  if($getsome == 0){
  	$sql = "select * from community_info";
  	$result = mysqli_query($hand,$sql);
  	if($result){
  		while ($row = mysqli_fetch_array($result,MYSQL_ASSOC))
  		{
  			$reti = new Reti();
  			$reti->retname = $row["village_address"]."-".$row["village_name"];
  			$data[] = $reti;
  		}
  		$json = json_encode($data);
  		echo $json;
  	}
  	else{
  		echo "查询失败";
  	}
  }
  else{
  	$village_address = $_POST["villageAddress"];
  	$sql = "select * from lots_info where village_address='$village_address' ";
  	$result = mysqli_query($hand,$sql);
  	if($result){
  		while ($row = mysqli_fetch_array($result,MYSQL_ASSOC))
  		{
  			$reti = new Reti();
  			$reti->retname = $row["garage_name"];
  			
  			$data[] = $reti;
  		}
  		$json = json_encode($data);
  		echo $json;
  	}
  	else{
  		echo "查询失败";
  	}
  }