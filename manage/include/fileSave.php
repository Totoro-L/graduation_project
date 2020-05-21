<?php
  //图片存储
  header('Content-Type:text/html;charset=utf-8');
  
  $photo_path = $_FILES['file'];

  $dirpath = "../../upload";
  $filename = $_FILES['file']['name'];
  $queryPath = './'.$dirpath.'/'.$filename;
  //move_uploaded_file将浏览器缓存file转移到服务器文件夹
  if(move_uploaded_file($_FILES['file']['tmp_name'],$queryPath)){
  	echo $queryPath;
  }