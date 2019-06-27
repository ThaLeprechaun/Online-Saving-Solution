$(function() {
	$("#submit").click(()=> {
  var emailLogin = $("#emailId").val();
  var passwordLogin = $("#mypassword").val();
  
  if (emailLogin == null || emailLogin== "", passwordLogin == null || passwordLogin == "") {
    alert("Email or password field cannot be blank");
    return false;
	}
	else {
		$.ajax({
			type: "GET",
			url: "http://localhost:3000/users",
			dataType: "json"
		}).done((data)=>{
			var check = true;
			for(let i of data){
				if (i.email == emailLogin && i.password == passwordLogin) {
					//alert(`welcome ${i.firstname}`);
          check = false;
          var firstname = i.firstname;
          var lastname = i.lastname;
          var email = i.email;
          var password = i.password;
          var balance = i.balance;
          var transaction = i.transaction;

          localStorage.setItem("email", email);

					$(location).attr("href", "user-dashboard.html");
				}
			}	
			if (check == true) {
				alert("Email or password incorrect");
			}
		});
	}
});
});
