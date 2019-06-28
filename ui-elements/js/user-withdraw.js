$(function () {
  var transArr = [];
  let currentUser = localStorage.getItem("email");
  console.log(currentUser);
  
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth();
  var year = today.getFullYear();
  
  if (day < 10) {
    day = "0" + day;
  }
  if(month <10){
    month = "0" + month;
  }
  today = day + "-" + month + "-" + year;
  console.log(today);
  $("#submit-amount").click(()=>{
    var obj = {};
    let amount = Number($("#withdraw").val());
    let url = `http://localhost:3000/users/?email=${currentUser}`;
    let result = $("#result");
    let transaction_date = today;
    let id = transArr.length + 1;
    if (amount == null || amount == "" || !(amount > 0)) {
      alert("Invalid amount");
      return false;
    }
    else {
      $.ajax({
        method: "GET",
        url: url
      }).done((data)=>{
      if (data[0].balance < amount) {
        return alert("Insufficient funds");
      }
      var transactionsArray = data[0]["transactions"];
      var newObj = JSON.parse(transactionsArray);
      var id = newObj.length + 1;
      $("#withdraw").each(function(){obj['id'] = id; obj['withdraw'] = amount; obj['transaction_date'] = transaction_date});
      newObj.push(obj);
      transactionsArray = JSON.stringify(newObj);
      if (data[0].hasOwnProperty("balance")) {
        var newWithdrawal = Number(data[0].balance) - amount;
        newBalance = newWithdrawal;
      }
      else{
        alert("Error");
      }
      $.ajax({
        //method: "PATCH",
        method: "PUT",
        url: `http://localhost:3000/users/${data[0].id}`,
        data: {
          firstname: data[0].firstname,
          lastname: data[0].lastname,
          email: data[0].email,
          password: data[0].password,
          balance: newBalance,
          transactions: transactionsArray
        }
      }).done(()=>{
        console.log(data);
        //$(".submit-amount").hide(500, function(){
          console.log("Successful withdrawal");
          //result.append("Your Balance is: " + newBalance);
          document.getElementById('result').innerHTML = "Your Balance is: " + newBalance
       // });
      })
    });
  }
});
});
