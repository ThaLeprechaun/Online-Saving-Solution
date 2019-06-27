$(function () {
  let currentUser = localStorage.getItem("email");
  console.log(currentUser);
	$("#submit").click(()=>{
		var firstname = $("#firstname").val();
		var lastname = $("#lastname").val();
    var url = `http://localhost:3000/users/?email=${currentUser}`

		$.ajax({
      method: "GET",
			url: url,
			dataType: "json"
		}).done((data)=>{
      console.log(data);
    let check = 0;
    if (check == 0) {
      if (firstname == null || firstname == "" || lastname == null || lastname == "" ) {
        alert("fields cannot be blank");
        return false;
      }
        $.ajax({
          type: "PATCH",
          url: `http://localhost:3000/users/${data[0].id}`,
          data: {
            firstname: firstname,
            lastname: lastname
          }
        }).done((data)=>{
          console.log(data);
          alert("Profile updated successfully");
          // window.location.href = "user-dashboard.html";
          $(location).attr("href", "user-login.html");
        });
      }
		})
	})
})