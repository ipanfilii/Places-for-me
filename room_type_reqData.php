<?php
  header('Access-Control-Allow-Origin:*'); 
  header("Access-Control-Allow-Credentials: true");
  header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
  header('Access-Control-Max-Age: 100000');
  header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization','Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Headers: origin, X-Requested-With, Authorization, Content-Type');
  header('Content-type: application/json');
  
   $postdata = file_get_contents("php://input");
   $db = new mysqli('192.168.43.95','root','' );

    //verify connection
    if($db->connect_errno > 0) {   
      die('Unable to connect to database [' . $db->connect_error . ']');
    } else {
        //connected
    }

	
	if( $postdata){
	$data = json_decode($postdata);
	 if( $data->hotelid != null)
		{
			
						$query = 'SELECT * FROM `myplaces`.`room_types` WHERE hotelID = "'.$data->hotelid.'" ;';
						if(!$result = $db->query($query))
							{
								die('There was an error running the query [' . $db->error . ']');
							}
		}
	while($row = $result->fetch_array())
		{
			$types[] = array(
				'name' => $row['name'],
				'short_name' => $row['short_name'],
				'base_price' => $row['base_price'],
				'max_occupancy' => $row['max_occupancy'],
				'base_availability' => $row['base_availability']
			);	
		}
		echo json_encode($types);
		}
?>