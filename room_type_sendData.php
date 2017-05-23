<?php
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 100000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization','Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Headers: origin, X-Requested-With, Authorization, Content-Type');
    header('Content-type: application/json');
    //getting the input
    $postdata = file_get_contents("php://input");
    $db = new mysqli('localhost', 'root', '' );
    //verify connection
    if($db->connect_errno > 0){   
        die('Unable to connect to database [' . $db->connect_error . ']');
    }
    else{
        //connected
    }
	
    if( $postdata){
        $data = json_decode($postdata);
        if( $data->name != "" && $data->short_name != "" && $data->base_availability != 0 && $data->base_price != 0  && $data->max_occupancy != 0 ){
            $query = 'SELECT * FROM `myplaces`.`room_types`
                      WHERE name= "'.$data->name.'" AND short_name="'.$data->short_name.'" AND base_availability="'.$data->base_availability.'" AND base_price="'.$data->base_price.'" AND max_occupancy="'.$data->max_occupancy.'"; ';
        if(!$result = $db->query($query)){
           die('There was an error running the query [' . $db->error . ']');
        }
        
        if($result->num_rows == 1){
          $response = '{"success":false}';  
            echo $response;
        }
        else
			{
				$insert_query = 'INSERT INTO `myplaces`.`room_types`(name,short_name,base_availability,base_price,max_occupancy) VALUES ("'.$data->name.'","'.$data->short_name.'","'.$data->base_availability.'","'.$data->base_price.'","'.$data->max_occupancy.'");';
				if(!$result = $db->query($insert_query))
					{
						die('There was an error running the query [' . $db->error . ']');
					}
					
				//if($data->right == 1)
//					{
						$insert_query_rooms = 'INSERT INTO `myplaces`.`rooms`(number) VALUES ("'.$data->room_number.'");';
	//				}
				if(!$result_rooms = $db->query($insert_query_rooms))
					{
						die('There was an error running the query [' . $db->error . ']');
					}
				 $response = '{"success":true}';  
            echo $response;
				
			}
        }
    }
	
?>