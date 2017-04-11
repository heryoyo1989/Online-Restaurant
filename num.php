<?php
	$con = mysqli_connect('localhost', 'root', 'root','final');
	
    $query = "SELECT count(item_id) AS num FROM final.items";
	
	$result = mysqli_query($con,$query);
	
	$row = mysqli_fetch_assoc($result);
	
	echo $row["num"];
?>