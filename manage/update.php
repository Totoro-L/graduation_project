<?php
  include '../include/connect.php';
  header('Content-Type:text/html;charset=utf-8');
  ini_set('date.timezone','Asia/Shanghai');

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');

  $order_sql = "select * from order_info";
  $order_result = mysqli_query($hand,$order_sql);

  $park_sql = "select * from park_info";
  $park_result = mysqli_query($hand,$park_sql);

  if($order_result && $park_result){
    $time_now = date("Y-m-d H:i:s");
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
    echo "数据库失败";
  }
  

  