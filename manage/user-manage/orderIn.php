<?php
  // 预约生成订单
  include '../include/connect.php';
  header('Content-Type:text/html;charset=utf-8');
  session_start();

  $park_id = $_POST['id'];
  $village_address = $_POST['villageAddress'];
  $garage_name = $_POST['garageName'];
  $park_name = $_POST['parkName'];
  $order_time = $_POST['orderTime'];
  $prein_time = $_POST['preinTime'];
  $preout_time = $_POST['preoutTime'];
  $order_price = $_POST['orderPrice'];
  $carown_id = $_SESSION['userid'];

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

  $order = new Order();

  $hand = mysqli_connect("$db_host","$db_user","$db_pwd")or die('数据库连接失败');
  mysqli_select_db($hand,"$db_name")or die('数据库无此库');

  $check_query = mysqli_query($hand, "select * from account_info where id='$carown_id' limit 1");
  $resss = mysqli_fetch_array($check_query);
  $car_num = $resss["car_num"];

  $sql = "INSERT INTO order_info (village_address, garage_name, park_name, order_time, prein_time, preout_time, carown_id,order_price,car_num)
        VALUES ('$village_address', '$garage_name', '$park_name', '$order_time', '$prein_time', '$preout_time', '$carown_id','$order_price','$car_num')";

  
  $result = mysqli_query($hand,$sql);
  $id = mysqli_insert_id($hand);

  mysqli_query($hand,"UPDATE park_info SET prein_time='$prein_time',preout_time='$preout_time',park_sta='1'
      WHERE id='$park_id'");
  
  //判断数据库是否插入成功
  if($result && $resss){
        $order->id = $id;
        $order->carownId = $carown_id;
        $order->carNum = $car_num;
        $order->villageAddress = $village_address;
        $order->garageName = $garage_name;
        $order->parkName = $park_name;
        $order->orderTime = $order_time;
        $order->preinTime = $prein_time;
        $order->preoutTime = $preout_time;
        $order->getinTime = "0000-00-00 00:00:00";
        $order->getoutTime = "0000-00-00 00:00:00";
        $order->cancelTime = "0000-00-00 00:00:00";
        $order->orderPrice = $order_price;
        $order->orderSta = '0';

        $json = json_encode($order);//把数据转换为JSON数据.
        echo $json;
  }
  else {
    echo "失败";
  }
