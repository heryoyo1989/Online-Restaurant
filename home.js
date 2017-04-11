  //global varies
  page = 1;
   
  query="";
  
  item_to_edit = -1;
  
  item_to_del = -1;
  
  item_num=0;
  
  items=[];
  
  item_ids=[];
  
  user_name="";

  loadAll();
  
  getItem_num();
  
  function loadAll(){
		var xhttp;
  
		page = 1;
						
		xhttp = new XMLHttpRequest();
    
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var results=xhttp.responseText;
			var rst=this.responseText.split("~~~~~");
			if(rst[0]!="nouser"){
				document.getElementById("accountLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#historyModal\" onclick=\"javascript:showHistory()\"> <span class=\"glyphicon glyphicon-user\"></span>"+rst[0]+"</a>";
				document.getElementById("signoutLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#signoutModal\">Sign Out</a>";
			}
			document.getElementById("food_list").innerHTML = rst[1];
			}
		};
		query="home.php?cat='all'&mode=0&page=";
		xhttp.open("GET","home.php?cat='all'&mode=0&page="+page,true);
		xhttp.send();
  }
  
  function getItem_num(){
		var xhttp;
  	
		xhttp = new XMLHttpRequest();
    
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var results=xhttp.responseText;
			
			item_num = parseInt(results);
			
			}
		};

		xhttp.open("GET","num.php",true);
		
		xhttp.send();
  }
  
  
	function showLogin(){
		document.getElementById("logInfo").innerHTML="";
		document.getElementById("plUN").innerHTML="";
		document.getElementById("plPWD").innerHTML="";
		document.getElementById("loginUN").value="";
		document.getElementById("loginPWD").value="";
		document.getElementById("cen_btn").removeAttribute("data-dismiss");
		$("#logModal").modal("show");
	}
  
  
  function log(){
		var e1 =document.getElementById("loginUN").value;
		var e2 =document.getElementById("loginPWD").value;
		var count=0;
		
		
		if(document.getElementById("loginUN").value=="admin"&&document.getElementById("loginPWD").value=="admin"){
			document.getElementById("accountLi").innerHTML="<a href=\"#\"> <span class=\"glyphicon glyphicon-user\"></span>Admin</a>";
			document.getElementById("cartLi").innerHTML="";
			document.getElementById("signoutLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#signoutModal\">Sign Out</a>";
			document.getElementById("cen_btn").setAttribute("data-dismiss","modal");
			document.getElementById("left-nav").innerHTML="<li><a id=\"homeLink\" data-toggle=\"modal\" data-target=\"#insertModal\" onclick=\"javascript:showInsert()\" href=\"#\">Create New</a></li>";
			
			$("#logModal").modal("hide");
			setAdminMode();
		}else{
			if(e1.length==0){
				document.getElementById("plUN").innerHTML="This blank can't be empty!";
				count=1;
			}
		
			if(e2.length==0){
				document.getElementById("plPWD").innerHTML="This blank can't be empty!";
				count=1;
			}
		
			if(count==0){
				var xhttp;
  			
				xhttp = new XMLHttpRequest();
    
				xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var results=xhttp.responseText;
						document.getElementById("logInfo").innerHTML = this.responseText;
						var a=this.responseText;
						if(results=="Log in Successfully"){
							document.getElementById("accountLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#historyModal\" onclick=\"javascript:showHistory()\"> <span class=\"glyphicon glyphicon-user\"></span>"+e1+"</a>";
							//document.getElementById("cartLi").innerHTML="";
							document.getElementById("signoutLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#signoutModal\">Sign Out</a>";
							document.getElementById("cen_btn1").setAttribute("data-dismiss","modal");
							
							/* document.getElementById("loginInfo").innerHTML="Log in successfully!";
							document.getElementById("cen_btn3").innerHTML="OK"; */
							setTimeout(hideLoginModal, 600);
						}else{
							/* document.getElementById("loginInfo").innerHTML="Log in failure!";
							document.getElementById("cen_btn3").setAttribute('data-target','#logSuccessModal'); */
						}
					}
				};
			 
				xhttp.open("GET","log.php?un="+e1+"&pwd="+e2,true);
				xhttp.send();
			}
		}	
  }
  
  function hideLoginModal(){
	  $("#logModal").modal("hide");
  }
  

  function showSU(){
	  document.getElementById("suUN").value="";
	  document.getElementById("suPWD").value="";
	  document.getElementById("suRP").value="";
	  document.getElementById("suE").value="";
	  document.getElementById("suP").value="";
	  document.getElementById("suA").value="";
	  document.getElementById("pUN").innerHTML="";
	  document.getElementById("pPW").innerHTML="";
	  document.getElementById("pRP").innerHTML="";
	  document.getElementById("pE").innerHTML="";
	  document.getElementById("pP").innerHTML="";
	  document.getElementById("suInfo").innerHTML="";
	  
	  $("#signupModal").modal("show");
  }
  
  function signup(){
		var e1 =document.getElementById("suUN").value;
		var e2 =document.getElementById("suPWD").value;
		var e3 =document.getElementById("suRP").value;
		var e4 =document.getElementById("suE").value;
		var e5 =document.getElementById("suP").value;
		var e6 =document.getElementById("suA").value;
		
		var count=0;
		
		/*if(e1.length==0){
			document.getElementById("pUN").innerHTML="This blank can't be empty!";
		}else if(e1.length<5){
			document.getElementById("pUN").innerHTML="Username can't be shorter than 5";
		}else if(String(e1)=="admin"){
			document.getElementById("pUN").innerHTML="Username can't be 'admin'";
		}
		else{
			document.getElementById("pUN").innerHTML="";
			count++;
		}*/
		
		if($("#suUN").val().length==0){
			$("#pUN").text("This blank can't be empty!");
		}else if($("#suUN").val().length<5){
			$("#pUN").text("Username can't be shorter than 5");
		}else if($("#suUN").val()=="admin"){
			$("#pUN").text("Username can't be 'admin'");
		}else{
			$("#pUN").text("");
			count++;
		}
		
		
		/*if(e2.length==0){
			document.getElementById("pPW").innerHTML="This blank can't be empty!";
		}else if(e2.length<8){
			document.getElementById("pPW").innerHTML="Password can't be shorter than 8";
		}else{
			if(String(e2).match(strongRegex)){
				document.getElementById("pPW").innerHTML="";
				count++;
			}else{
				document.getElementById("pPW").innerHTML="Password must contain lowercase uppercase number & special characters";
			}
		}*/
		
		var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
		if($("#suPWD").val().length==0){
			$("#pPW").text("This blank can't be empty!");
		}else if($("#suPWD").val().length<8){
			$("#pPW").text("Password can't be shorter than 8!");
		}else{
			if($("#suPWD").val().match(strongRegex)){
				$("#pPW").text("");
				count++;
			}else{
				$("#pPW").text("Password must contain lowercase uppercase number & special characters!");
			}
		}
		
		/*if(e3.length==0){
			document.getElementById("pRP").innerHTML="This blank can't be empty!";
		}else{
			if(String(e3)!=String(e2)){
				document.getElementById("pRP").innerHTML="Two passwords don't match!";
			}else{
				document.getElementById("pRP").innerHTML=" ";
				count++;
			}
		}*/
		
		if($("#suRP").val().length==0){
			$("#pRP").text("This blank can't be empty!");
		}else{
			if($("#suRP").val()!=$("#suPWD").val()){
				$("#pRP").text("Two passwords are not the same!");
			}else{
				$("#pRP").text("");
				count++;
			}
		}
		
        if($("#suE").val().length>0){
			atpos = $("#suE").val().indexOf("@");
			dotpos = $("#suE").val().lastIndexOf(".");
			if (atpos < 1 || ( dotpos - atpos < 2 )) 
			{
				//document.getElementById("pE").innerHTML="It's not an email address!";
				$("#pE").text("It's not an email address!");
				count--;
			}else{
				//document.getElementById("pE").innerHTML="";
				$("#pE").text("");
			}
		} 
         
		
		
		/*if(e5.length>0){
			if(String(e5).match(tRegex)){
				document.getElementById("pP").innerHTML="Phone must be number!";
				count--;
			}else{
				if(String(e5).length!=10){
					document.getElementById("pP").innerHTML="Length of phone need to be 10!";
					count--;
				}else{
					document.getElementById("pP").innerHTML="";
				}
			}
		}*/
		
		var tRegex = new RegExp("^(?=.*[a-z])");
		if($("#suP").val().length>0){
			if ($("#suP").val().match(tRegex)) 
			{
				$("#pP").text("Phone must be number!");
				count--;
			}else{
				if($("#suP").val().length!=10){
					$("#pP").text("Phone must be 10 digits!");
					count--;
				}else{
					$("#pP").text("");
				}
				
			}
		} 
		
		if(count==3){
			var xhttp;
  			
			xhttp = new XMLHttpRequest();
    
			xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var results=xhttp.responseText;
					document.getElementById("suInfo").innerHTML = this.responseText;
					if(results=="User Created!"){
						loadAll();
						setTimeout(hideSuModal, 600);
					}
					
				}
			};
			 
			xhttp.open("GET","signup.php?un="+e1+"&pwd="+e2+"&email="+e4+"&phone="+e5+"&addr="+e6,true);
			xhttp.send();
			 
		}
		
  }
  
  function hideSuModal(){
	 $("#signupModal").modal("hide");
	 
  }
  
  function NextPage(){
		var xhttp;
  
		page ++;
		
		xhttp = new XMLHttpRequest();
    
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			    var results=xhttp.responseText;
				var rst=this.responseText.split("~~~~~");
				if(rst[0]!="nouser"){
					document.getElementById("accountLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#historyModal\" onclick=\"javascript:showHistory()\"> <span class=\"glyphicon glyphicon-user\"></span>"+rst[0]+"</a>";
					document.getElementById("signoutLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#signoutModal\">Sign Out</a>";
				}
				document.getElementById("food_list").innerHTML = rst[1];
			}
		};

		xhttp.open("GET",query+page,true);
		xhttp.send();
  }
  
  function LastPage(){
		var xhttp;
  
		page--;
				
		xhttp = new XMLHttpRequest();
    
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var results=xhttp.responseText;
				var rst=this.responseText.split("~~~~~");
				if(rst[0]!="nouser"){
					document.getElementById("accountLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#historyModal\" onclick=\"javascript:showHistory()\"> <span class=\"glyphicon glyphicon-user\"></span>"+rst[0]+"</a>";
					document.getElementById("signoutLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#signoutModal\">Sign Out</a>";
				}
				document.getElementById("food_list").innerHTML = rst[1];
			}
		};

		xhttp.open("GET",query+page,true);
		xhttp.send();
  }
  
  
  
			
  
  function loadEntree(){
		var xhttp;
		
		page = 1;
  
		xhttp = new XMLHttpRequest();
    
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var results=xhttp.responseText;
				var rst=this.responseText.split("~~~~~");
				if(rst[0]!="nouser"){
					document.getElementById("accountLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#historyModal\" onclick=\"javascript:showHistory()\"> <span class=\"glyphicon glyphicon-user\"></span>"+rst[0]+"</a>";
					document.getElementById("signoutLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#signoutModal\">Sign Out</a>";
				}
				document.getElementById("food_list").innerHTML = rst[1];
				}
		};
		query="home.php?cat='entree'&mode=1&page=";
		xhttp.open("GET","home.php?cat='entree'&mode=1&page="+page,true);
		xhttp.send();
  }
  
	function loadSide(){
		var xhttp;
		
		page = 1;
		
		xhttp = new XMLHttpRequest();
    
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var results=xhttp.responseText;
				var rst=this.responseText.split("~~~~~");
				if(rst[0]!="nouser"){
					document.getElementById("accountLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#historyModal\" onclick=\"javascript:showHistory()\"> <span class=\"glyphicon glyphicon-user\"></span>"+rst[0]+"</a>";
					document.getElementById("signoutLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#signoutModal\">Sign Out</a>";
				}
				document.getElementById("food_list").innerHTML = rst[1];
			}
		};
		query="home.php?cat='side'&mode=1&page=";
		xhttp.open("GET","home.php?cat='side'&mode=1&page="+page,true);
		xhttp.send();
	}
  
    function loadSnack(){
		var xhttp;
		
		page = 1;
		
		xhttp = new XMLHttpRequest();
    
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var results=xhttp.responseText;
				var rst=this.responseText.split("~~~~~");
				if(rst[0]!="nouser"){
					document.getElementById("accountLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#historyModal\" onclick=\"javascript:showHistory()\"> <span class=\"glyphicon glyphicon-user\"></span>"+rst[0]+"</a>";
					document.getElementById("signoutLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#signoutModal\">Sign Out</a>";
				}
				document.getElementById("food_list").innerHTML = rst[1];
				}
		};
		query="home.php?cat='snack'&mode=1&page=";
		xhttp.open("GET","home.php?cat='snack'&mode=1&page="+page,true);
		xhttp.send();
	}
 
	function searchItem(){
		var e =document.getElementById("txtinput").value;
	
		var xhttp;
		
		page = 1;
		  
		xhttp = new XMLHttpRequest();
    
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var results=xhttp.responseText;
				var rst=this.responseText.split("~~~~~");
				if(rst[0]!="nouser"){
					document.getElementById("accountLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#historyModal\" onclick=\"javascript:showHistory()\"> <span class=\"glyphicon glyphicon-user\"></span>"+rst[0]+"</a>";
					document.getElementById("signoutLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#signoutModal\">Sign Out</a>";
				}
				document.getElementById("food_list").innerHTML = rst[1];
				}
		};

		query="home.php?cat='all'&mode=2"+"&keyword="+String("'%"+e+"%'")+"&page=";
		
		xhttp.open("GET","home.php?cat='all'&mode=2"+"&keyword="+String("'%"+e+"%'")+"&page="+page,true);
		//xhttp.open("GET","home.php?cat='all'&mode=2"+"&keyword="+e+"&page="+page,true);
		xhttp.send();
	}
	
	function addToCart(p){
		items.push(p);
	}
	
	function showCart(){
		document.getElementById("cartInfo").innerHTML="";
		$("#cartModal").modal("show");
		var str="";
		if(items.length==0){
			document.getElementById("cartItem").innerHTML='&nbsp;&nbsp;&nbsp;Cart is empty!';
		}else{
			var total=0;
			str+="<table style=\"width:100%\">";
			for(var i=0;i<items.length;i++){
				var rst=items[i].split("~~");
				str+="<tr>";
				str+="<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				str+=rst[1];
				str+="</td><td>"
				str+=rst[2];
				str+="</td>";
				str+="</tr>";
				total+=Number(rst[2]);
			}
			total=total.toFixed(2);
			str+="<tr><td><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total</strong></td><td><strong>"+total+"</strong></td></tr>";
			str+="</table>";			
			document.getElementById("cartItem").innerHTML=str;
		}
		
	}
	
	function checkOut(){
	    var str="";
		for(var i=0;i<items.length;i++){
			var rst=items[i].split("~~");
			str+=rst[0];
			str+="~~";
		}
		
		document.getElementById("cartInfo").innerHTML = "checking...";	

		var xhttp;
  			
		xhttp = new XMLHttpRequest();
    
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
					var results=xhttp.responseText;
					document.getElementById("cartInfo").innerHTML = this.responseText;	
					
					if(results=="Check Out Successfully!"){
						items=[];
						setTimeout(hideCart,600);
					}else{
						setTimeout(hideCart,600);
					}
				}
		};
			 
		xhttp.open("GET","checkout.php?items="+str,true);
		xhttp.send();		
	}
	
	function hideCart(){
		$("#cartModal").modal("hide");
		loadAll();	}
		
	function setAdminMode(){
		var xhttp;
  
		page = 1;
						
		xhttp = new XMLHttpRequest();
    
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			    var results=xhttp.responseText;
				var rst=this.responseText.split("~~~~~");
				if(rst[0]!="nouser"){
					document.getElementById("accountLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#historyModal\" onclick=\"javascript:showHistory()\"> <span class=\"glyphicon glyphicon-user\"></span>"+rst[0]+"</a>";
					document.getElementById("signoutLi").innerHTML="<a href=\"#\" data-toggle=\"modal\" data-target=\"#signoutModal\">Sign Out</a>";
				}
				document.getElementById("food_list").innerHTML = rst[1];
			}
		};
		query="admin.php?page=";
		xhttp.open("GET","admin.php?page="+page,true);
		xhttp.send();
	}
	
	
	 function showHistory(){
			var xhttp;
  			
			xhttp = new XMLHttpRequest();
    
			xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var results=xhttp.responseText;
					document.getElementById("history").innerHTML = this.responseText;	
				}
			};
			 
			xhttp.open("GET","history.php",true);
			xhttp.send();
	}
	
	function updateAdmin(){
		var xhttp2;
			
		xhttp2 = new XMLHttpRequest();
    
		xhttp2.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var results=xhttp.responseText;
			document.getElementById("food_list").innerHTML = this.responseText;
			}
		};
		query="admin.php?page=";
		xhttp2.open("GET","admin.php?page="+page,true);
		xhttp2.send();
	}
	
	function openEdit(p){
		item_to_edit = p;
		
		var xhttp;
  			
		xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var results=xhttp.responseText.split("~~~");
			document.getElementById("edIN").value = results[0];
			document.getElementById("edPL").value = results[1];
			document.getElementById("edIP").value = results[2];
			document.getElementById("edCV").value = results[3];
			document.getElementById("edV").value = results[4];
			}
		};
    		
		xhttp.open("GET","openedit.php?id="+item_to_edit,true);
		xhttp.send();
		
	}
	
	function editItem(){
		var e1 =document.getElementById("edIN").value;
		var e2 =document.getElementById("edPL").value;
		var e3 =document.getElementById("edIP").value;
		var e4 =document.getElementById("edCV").value;
		var e5 =document.getElementById("edV").value;
		
		var xhttp;
  			
		xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var results=xhttp.responseText;
			document.getElementById("food_list").innerHTML = this.responseText;
			}
		};
    		
		xhttp.open("GET","edit.php?id="+item_to_edit+"&name="+e1+"&link="+e2+"&price="+e3+"&cat="+e4+"&inv="+e5+"&page="+page,true);
		xhttp.send();

	}
	
	function openDelete(p){
		item_to_del=p;
	}
	function deleteItem(){
		if(item_num==((page-1)*8+1)){
			page--;
		}
		
		var xhttp;
  			
		xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var results=xhttp.responseText;
			document.getElementById("food_list").innerHTML = this.responseText;
			item_num--;
			}
		};
		
		xhttp.open("GET","del.php?id="+item_to_del+"&page="+page,true);
		xhttp.send();

	}
	function showInsert(){
		document.getElementById("inIN").value="";
		document.getElementById("inPL").value="";
		document.getElementById("inIP").value="";
		document.getElementById("inV").value="";
		document.getElementById("imIN").innerHTML="";
		document.getElementById("imPL").innerHTML="";
		document.getElementById("imV").innerHTML="";
		
		document.getElementById("insertInfo").innerHTML="";
	}
	function insertItem(){
		var e1 =document.getElementById("inIN").value;
		var e2 =document.getElementById("inPL").value;
		var e3 =document.getElementById("inIP").value;
		var e4 =document.getElementById("cateValue").value;
		var e5 =document.getElementById("inV").value;
		
		if(e1.length==0){
			document.getElementById("imIN").innerHTML="This blank can't be empty!";
		}
		
		if(e2.length==0){
			document.getElementById("imPL").innerHTML="This blank can't be empty!";
		}
		
		if(e3.length==0){
			document.getElementById("imIP").innerHTML="This blank can't be empty!";
		}
		
		if(e5.length==0){
			document.getElementById("imV").innerHTML="This blank can't be empty!";
		}
		
		if(e1.length!=0&&e2.length!=0&&e3.length!=0&&e5.length!=0){
			document.getElementById("insertInfo").innerHTML="Insert successfully!";
			var xhttp;
  			
			xhttp = new XMLHttpRequest();
		
			xhttp.onreadystatechange = function() {
				var results=xhttp.responseText;
				document.getElementById("food_list").innerHTML = this.responseText;
				item_num++;
				setTimeout(hideInsert,600);
			};
    		
			xhttp.open("GET","insert.php?name="+e1+"&link="+e2+"&price="+e3+"&cat="+e4+"&inv="+e5+"&page="+page,true);
			xhttp.send();
		}

	}
	
	function hideInsert(){
		$("#insertModal").modal("hide");
	}
	
	function clearSession(){
		var xhttp;
  			
		xhttp = new XMLHttpRequest();
		
		xhttp.open("GET","ses.php",true);
		
		xhttp.send();
	} 
	
	function init(){
		
		document.getElementById("left-nav").innerHTML="<li><a onclick=\"javascript:loadAll()\" id=\"homeLink\" href=\"#\">Home</a></li><li><a onclick=\"javascript:loadEntree()\"  id=\"entreeLink\" href=\"#\">Entree</a></li><li><a onclick=\"javascript:loadSide()\"  id=\"sideLink\" href=\"#\">Sides</a></li><li><a onclick=\"javascript:loadSnack()\"  id=\"snackLink\" href=\"#\">Snack</a></li><li><input type=\"text\" name=\"username\" id=\"txtinput\"/></li><li><a onclick=\"javascript:searchItem()\" href=\"#\" id=\"searchLink\">Search</a></li>";
		//document.getElementById("right-nav").innerHTML="<li id=\"accountLi\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#myModal\"  id=\"accountLink\" onclick=\"javascript:showLogin()\"> <span class=\"glyphicon glyphicon-user\"></span>Your Account</a></li><li id=\"cartLi\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#cartModal\" id=\"cartLink\" onclick=\"javascript:showCart()\"><span class=\"glyphicon glyphicon-shopping-cart\"></span> Cart</a></li>";
		document.getElementById("accountLi").innerHTML="<a href=\"#\" id=\"accountLink\" onclick=\"javascript:showLogin()\"> <span class=\"glyphicon glyphicon-user\"></span>Your Account</a>";
		document.getElementById("cartLi").innerHTML="<a href=\"#\" id=\"cartLink\" onclick=\"javascript:showCart()\"><span class=\"glyphicon glyphicon-shopping-cart\"></span> Cart</a>";
		document.getElementById("signoutLi").innerHTML="";
		clearSession();
		loadAll();
	}