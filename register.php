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

    $db = new mysqli('192.168.43.95', 'root', '' );

    //verify connection
    if($db->connect_errno > 0){   
        die('Unable to connect to database [' . $db->connect_error . ']');
    }
    else{
        //connected
    }

	
    if( $postdata){
        $data = json_decode($postdata);
        if( $data->pwd != "" && $data->user != "" && $data->email != ""){
            $query = 'SELECT * FROM `myplaces`.`users`
                      WHERE username= "'.$data->user.'" AND password="'.$data->pwd.'" AND email="'.$data->email.'"; ';

        if(!$result = $db->query($query)){
           die('There was an error running the query [' . $db->error . ']');
        }
        
        if($result->num_rows == 1){
          $response = '{"success":false}';  
            echo $response;
        }
        else
			{
				$insert_query = 'INSERT INTO `myplaces`.`users`(username,password,email,user_right) VALUES ("'.$data->user.'","'.$data->pwd.'","'.$data->email.'","'.$data->right.'");';

				if(!$result = $db->query($insert_query))
					{
						die('There was an error running the query [' . $db->error . ']');
					}
					
				if($data->right == 1)
					{
						$insert_query_hotels = 'INSERT INTO `myplaces`.`hotels`(name,address,username) VALUES ("'.$data->hotel_name.'","'.$data->hotel_address.'","'.$data->user.'");';
					}
				if(!$result_hotels = $db->query($insert_query_hotels))
					{
						die('There was an error running the query [' . $db->error . ']');
					}
				 $response = '{"success":true}';  
            echo $response;
				
			}
        }
    }
	
?>