<?php
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Credentials: true");
  header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
  header('Access-Control-Max-Age: 100000');
  header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization','Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Headers: origin, X-Requested-With, Authorization, Content-Type');
  header('Content-type: application/json');

    $db = new mysqli('localhost', 	'root', '' );

    //verify connection
    if($db->connect_errno > 0) {   
      die('Unable to connect to database [' . $db->connect_error . ']');
    } else {
        //connected
    }

    $lat = $_GET['lat'];
    $lng = $_GET['lng'];
    $user = $_GET['user'];
    $address = $_GET['address'];
    $location = $_GET['location'];

    if($lat!=null && $lng!=null && $user!=null && $address!=null) {
      $query = 'INSERT INTO `myplaces`.`locations` (user, lat, lng, address, location)
                VALUES ("'.$user.'", "'.$lat.'", "'.$lng.'" ,"'.$address.'", "'.$location.'")';
		 if(!$result = $db->query($query)) {
       		 die('There was an error running the query [' . $db->error . ']');
	 	 } else {
	   		 echo '{"success":true}';
	 	 }
	}