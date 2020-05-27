<?php
  include '../include/connect.php';
  header('Content-Type:text/html;charset=utf-8');
  $json = '';
  $data = array();
  class Order 
  {
    public $id;
    public $carownId;
    public $carNum;
    public $villageAddress;
    public $garageName;
    public $parkName;
    public $orderTime;
    public $preinTime;
    public $preoutTime;
    public $getinTime;
    public $getoutTime;
    public $cancelTime;
    public $orderPrice;
    public $orderSta;
  }

  $get_some = $_POST['getSome'];

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');
  session_start();
  $putSome = $_SESSION['userid'];
  $sql = "select * from order_info where carown_id='$putSome'";
  $result = mysqli_query($hand,$sql);
  if($result){
    while ($row = mysqli_fetch_array($result,MYSQL_ASSOC))
  	{
      $order = new Order();
      $order->id = $row["id"];
      $order->carownId = $row["carown_id"];
      $order->carNum = $row["car_num"];
      $order->villageAddress = $row["village_address"];
      $order->garageName = $row["garage_name"];
      $order->parkName = $row["park_name"];
      $order->orderTime = $row["order_time"];
      $order->preinTime = $row["prein_time"];
      $order->preoutTime = $row["preout_time"];
      $order->getinTime = $row["getin_time"];
      $order->getoutTime = $row["getout_time"];
      $order->cancelTime = $row["cancel_time"];
      $order->orderPrice = $row["order_price"];
      $order->orderSta = $row["order_sta"];

      $data[] = $order;
    }

  	$json = json_encode($data);//把数据转换为JSON数据.
  	echo $json;
  }else{
   	echo "查询失败";
  }