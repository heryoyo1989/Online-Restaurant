<?php
	$con = mysqli_connect('localhost', 'root', 'root','final');
	
	$id = $_GET["id"];
	
	/*$name=$_GET["name"];
	
	$link=$_GET["link"];
	
	$price=$_GET["price"];
	
	$category= $_GET["cat"];*/
	
	$query = "SELECT item_name,pic_link,price,category,inventory FROM final.items WHERE item_id = '$id'";
				
	//$query = "INSERT INTO final.items VALUES ('$new_id','$name','$link','$price','$category')";
	
	$result = mysqli_query($con,$query);
	
	$row = mysqli_fetch_assoc($result);
	
	echo $row["item_name"];
	
	echo "~~~";
	
	echo $row["pic_link"];
	
	echo "~~~";
	
	echo $row["price"];
	
	echo "~~~";
	
	echo $row["category"];
	
	echo "~~~";
	
	echo $row["inventory"];
	

?>