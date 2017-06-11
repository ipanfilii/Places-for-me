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
        if( $data->pwd != "" && $data->user != "" ){
            $query = 'SELECT * 
                      FROM `myplaces`.`users`
                      WHERE username = "'.$data->user.'" AND password="'.$data->pwd.'"; ';

        if(!$result = $db->query($query)){
           die('There was an error running the query [' . $db->error . ']');
        }
        
        if($result->num_rows == 1){
            $dataUser = $result->fetch_assoc();
            $response = '{
                "success":true,
                "username":"'.$dataUser['username'].'",
                "email":"'.$dataUser['email'].'",
                "user_id":"'.$dataUser['id'].'",
				"right": "'.$dataUser['user_right'].'"
                }';   
            echo $response;
        }
        else{
            $response = '{"success":false, "username":"user"}';  
            echo $response;
        }
        }
    }
	else {
	$user = $_GET['user'];
    if(isset($user) ){
            $query = 'SELECT * 
                        FROM `myplaces`.`users`
                        WHERE username = "'.$user.'"';
						
						

            if(!$result = $db->query($query)){
                 die('There was an error running the query [' . $db->error . ']');
            }

           
           
     if($result->num_rows == 1){
            $dataUser = $result->fetch_assoc();
            $response = '{
                "success":true,
                "username":"'.$dataUser['username'].'",
                "email":"'.$dataUser['email'].'",
                "user_id":"'.$dataUser['id'].'",
				"right":"'.$dataUser['user_right'].'"
                }';   
            echo $response;
        }
        else{
            $response = '{"success":false, "username":"user"}';  
            echo $response;
        }
    }
	}
?>