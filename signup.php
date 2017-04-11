<?php
	session_start();
	
	$con = mysqli_connect('localhost', 'root', 'root','final');
	
	//signup.php?un="+e1+"&pwd="+e2+"&email="+e4+"&phone="+e5+"&addr="+e6,
	
	$user_name=$_GET["un"];
	
	$pwd=$_GET["pwd"];
	
	$email=$_GET["email"];
	
	$phone=$_GET["phone"];
	
	$addr=$_GET["addr"];
	
	$query1 = "SELECT * FROM final.users WHERE user_name = '$user_name'";
	 	
	$result1 = mysqli_query($con,$query1);
	
	$rnr1 = $result1->num_rows;
	
	if($rnr1>0){
		echo "Username exists!  Use another username!";
	}else{
		
		
		$query2 = "SELECT max(user_id) as max FROM final.users";
	//length
	
		$result2 = mysqli_query($con,$query2);
	
		$row2 = mysqli_fetch_assoc($result2);
	
		$rnr2 = $row2["max"];
	
		$id=$rnr2+1;
		
		$pwd_hash=hash('ripemd160', $pwd);
		
		$query3 = "INSERT INTO final.users VALUES ('$id','$user_name','$pwd_hash','$email','$phone','$addr')";
		
		mysqli_query($con,$query3);
		
		$_SESSION["username"] = $user_name;
		
		echo "User Created!";
		
	}
	/////////////////////////////////////
	
	
	
	
	
	//echo $id;
	 
	/////////////////////////////////////
	
	
	
	//$row = mysqli_fetch_assoc($result);
	
	/*echo $row["item_name"];
	
	echo "~~~";
	
	echo $row["pic_link"];
	
	echo "~~~";
	
	echo $row["price"];
	
	echo "~~~";
	
	echo $row["category"];*/

?>