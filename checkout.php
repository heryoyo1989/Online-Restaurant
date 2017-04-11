<?php
	session_start();
	
	$con = mysqli_connect('localhost', 'root', 'root','final');
	
	//order
	
	$user_name=$_SESSION["username"];
	
	 
	 
	
	if($user_name!=""){
		$items=$_GET["items"];
	
      //new id
		$query1 = "SELECT max(order_id) as maxid FROM final.orders";
		
		$result = mysqli_query($con,$query1);
		
		$row = mysqli_fetch_assoc($result);
		
		$new_id =$row["maxid"]+1;
		
	  //time
	   date_default_timezone_set("America/Chicago");
		$time=date("Y-m-d H:i:s"); 
	
		$item_arr = explode("~~", $items);
	
		for($i=0;$i<count($item_arr)-1;$i++){
			//update item arr
			//get the inv and minus 1
			$query3 = "SELECT inventory FROM final.items WHERE item_id='$item_arr[$i]'";
			
			$result3=mysqli_query($con,$query3);
			
			$row3 = mysqli_fetch_assoc($result3);
			
			$new_inv=$row3["inventory"]-1;
			
			//update the new inv
			
			$query4 = "UPDATE final.items SET inventory='$new_inv' WHERE item_id='$item_arr[$i]'";
			
			mysqli_query($con,$query4);
			
			//insert into orders

			$query2 = "INSERT INTO final.orders VALUES ('$new_id','$user_name','$item_arr[$i]',1,'$time')";//number and date
		
			mysqli_query($con,$query2);
		}
		echo "Check Out Successfully!";
	}else{
		echo "You didn't log in!";
	} 
	
	
	
	
	
?>