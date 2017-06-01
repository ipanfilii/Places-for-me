<?php
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 100000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization','Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Headers: origin, X-Requested-With, Authorization, Content-Type');
    header('Content-type: application/json');

     $db = new mysqli('localhost','root','' );
  if( $postdata){
        $data = json_decode($postdata);
    //verify connection
    if($db->connect_errno > 0) {   
      die('Unable to connect to database [' . $db->connect_error . ']');
    } else {
        //connected
    }
     // hotelid 
     // id camera
     // start date
     // end date


      $query = 'SELECT * FROM `myplaces`.`reservations`
                        WHERE   hotelID = "'.$postdata->hotelid.'" AND roomID = "'.$postdata->roomid.'" AND 
                                checkin > "'.$postdata->checkin.'" AND checkin < "'.$postdata->checkout.'" OR 
                                checkout > "'.$postdata->checkin.'" AND checkout < "'.$postdata->checkout.'"  ';

      if(!$result = $db->query($query))
		{
			die('There was an error running the query [' . $db->error . ']');
		}
	
	while($row = $result->fetch_array())
		{
			$room_list[] = array(
				'id' => $row['id'],
				'hotelID' => $row['hotelID'],
				'roomID' => $row['roomID'],
                'checkin' => $row['checkin'],
                'checkout' => $row['checkout']
			);	
		}

        if($row == null){
    		echo json_encode($room_list);
        } else {
            echo "{success:false}";
        }
  }
?>