$(function () {
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
  
  $("#submit-amount").click(function addTransactions(deposit) {
    var obj = {};
    let amount = Number($("#deposit").val());
    let url =  `http://localhost:3000/users/?email=${currentUser}`;
    let result = $("#result");
    let transaction_date = today;
    if (amount == null || amount == "" || !(amount > 0)) {
      alert("Invalid amount");
      return false;
    }
    else {
      $.ajax({
        method: "GET",
        url: url,
      }).done((data)=>{
      console.log(data);
      var transactionsArray = data[0]["transactions"];
      var newObj = JSON.parse(transactionsArray);
      var id = newObj.length + 1;
      $("#deposit").each(function(){obj['id'] = id,obj['deposit'] = amount,obj['transaction_date'] = transaction_date;});
      newObj.push(obj);
      transactionsArray = JSON.stringify(newObj);

      if (data[0].hasOwnProperty("balance")) {
        var newBalance = 0;
        var newDeposit = Number(data[0].balance) + amount;
        newBalance += newDeposit;
      }
      else{
        alert("Error");
      }
      $.ajax({
      method: "PUT",
      //method: "PATCH",
      url: `http://localhost:3000/users/${data[0].id}`,
      data: {
      firstname: data[0].firstname,
      lastname: data[0].lastname,
      email: data[0].email,
      password: data[0].password,
      balance: newBalance,
      transactions: transactionsArray
      }
      }).done((data)=>{
          console.log(data);
        //   $(".submit-amount").hide(500, function(){
        console.log("Successful Deposit");
        //result.append("Your Balance is: " + newBalance);
        document.getElementById('result').innerHTML = "Your Balance is: " + newBalance;
      });
      });
    }
  });
});
