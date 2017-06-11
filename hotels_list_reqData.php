<?php
  header('Access-Control-Allow-Origin:*'); 
  header("Access-Control-Allow-Credentials: true");
  header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
  header('Access-Control-Max-Age: 100000');
  header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization','Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Headers: origin, X-Requested-With, Authorization, Content-Type');
  header('Content-type: application/json');
  
   $db = new mysqli('192.168.43.95','root','' );

    //verify connection
    if($db->connect_errno > 0) {   
      die('Unable to connect to database [' . $db->connect_error . ']');
    } else {
        //connected
    }

      $query = 'SELECT * FROM `myplaces`.`hotels` WHERE 1 ';
      if(!$result = $db->query($query))
		{
			die('There was an error running the query [' . $db->error . ']');
		}
	
	while($row = $result->fetch_array())
		{
			$hotels_list[] = array(
				'id' => $row['id'],
				'name' => $row['name'],
				'address' => $row['address'],
				'username' => $row['username']
			);	
		}
		echo json_encode($hotels_list);
?>