$(function() {
  $("#submit").click(()=>{
  var firstname = $("#firstname").val();
  var lastname = $("#lastname").val();
  var email  = $("#emailId").val();
  var password= $("#mypassword").val();

  $.ajax({
    type: "GET",
    url: "http://localhost:3000/users",
    dataType: "json"
  }).done((data)=>{
    console.log(data);
    let check = 0;
    for (let i of data){
      if (i.email == email) {
        alert(`Sorry, User already exists`);
        check = 1;
      }
    }
    if (check == 0) {
      if (firstname == null || firstname == "", email == null || email== "", password == null || password == "") {
        alert("fields cannot be blank");
        return false;
      }
        $.ajax({
          type: "POST",
          url: "http://localhost:3000/users",
          data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            balance: 0,
            transactions: "[]"
          }
        }).done((data)=>{
          console.log(data);
          alert('welcome');
          // window.location.href = "user-dashboard.html";
          $(location).attr("href", "user-login.html");
        });
      }
  });
});
});