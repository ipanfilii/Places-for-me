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

    /**
    * get user and return all data necesary to category 'locatii preferete' from profil section
    */
    $user = $_GET['user'];

    if($user) {
      $query = 'SELECT *
                FROM `myplaces`.`locations` 
                WHERE user = "'.$user.'" ';
      if(!$result = $db->query($query)) {
        die('There was an error running the query [' . $db->error . ']');
      }
		
      while($row = $result->fetch_assoc()) {
        $response[] = array(
          'user'     => $row['user'],
          'lat'      => $row['lat'],
          'lng'      => $row['lng'],
          'address'  => $row['address'],
          'location' => $row['location']
        );
      }

      echo json_encode($response);
    }
?>