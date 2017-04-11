<?php
	session_start();
	
	$con = mysqli_connect('localhost', 'root', 'root','final');
	
	//signup.php?un="+e1+"&pwd="+e2+"&email="+e4+"&phone="+e5+"&addr="+e6,
	
	$user_name=$_GET["un"];
	
	$pwd=$_GET["pwd"];
	
	$pwd_hash=hash('ripemd160', $pwd);
	
	
	$query1 = "SELECT * FROM final.users WHERE user_name = '$user_name' and password='$pwd_hash'";
	 	
	$result1 = mysqli_query($con,$query1);
	
	$rnr1 = $result1->num_rows;
	
	$query2 = "SELECT * FROM final.users WHERE user_name = '$user_name'";
	 	
	$result2 = mysqli_query($con,$query2);
	
	$rnr2 = $result2->num_rows;
	
	if($rnr1>0){
		echo "Log in Successfully";
		$_SESSION["username"] = $user_name;
	}else{
		if($rnr2>0){
			echo "Password is wrong!";
		}else{
			echo "User doesn't exist!";
		}
		
	}
	

?>