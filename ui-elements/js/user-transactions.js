$(function() {
  let currentUser = localStorage.getItem("email");
  let url =  `http://localhost:3000/users/?email=${currentUser}`;
$.ajax({
  method: "GET",
  url: url,
  dataType: "json"
}).done((data)=>{
  console.log(JSON.parse(data[0].transactions));
  let parsedTransactions = JSON.parse(data[0].transactions);
  $("#show-balance").append("<p><h4>Balance:</h4>"+data[0].balance+"</p>");
    for(let i of parsedTransactions){
      if(i.withdrawal == undefined || i.withdrawal == null || i.withdrawal == ""){
        i.withdrawal = 0;
      }
      if(i.deposit == undefined || i.deposit == null || i.deposit == ""){
        i.deposit = 0;
      }
      $("#contents").append(
        "<tr>"+
             "<td>"+i.id+"</td>"+
             "<td>"+i.deposit+"</td>"+
             "<td>"+i.withdrawal+"</td>"+
             "<td>"+i.transaction_date+"</td>"+
          "</tr>"
        )
    }
})
});