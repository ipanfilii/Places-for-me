<?php
  header('Access-Control-Allow-Origin:*'); 
  header("Access-Control-Allow-Credentials: true");
  header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
  header('Access-Control-Max-Age: 100000');
  header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization','Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Headers: origin, X-Requested-With, Authorization, Content-Type');
  header('Content-type: application/json');
  
   $db = new mysqli('localhost','root','' );

    //verify connection
    if($db->connect_errno > 0) {   
      die('Unable to connect to database [' . $db->connect_error . ']');
    } else {
        //connected
    }

      $query = 'SELECT * FROM `myplaces`.`room_types` WHERE 1 ';
      if(!$result = $db->query($query))
		{
			die('There was an error running the query [' . $db->error . ']');
		}
	
	while($row = $result->fetch_array())
		{
			$types[] = array(
				'id' => $row['id'],
				'name' => $row['name'],
				'short_name' => $row['short_name'],
				'base_price' => $row['base_price'],
				'max_occupancy' => $row['max_occupancy'],
				'base_availability' => $row['base_availability']
			);	
		}
		echo json_encode($types);
?>