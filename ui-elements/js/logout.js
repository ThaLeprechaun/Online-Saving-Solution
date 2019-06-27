$(function(){
  $("#log").click(function(){
        
    localStorage.removeItem("email");
    //localStorage.clear();
    $(location).attr("href", "./index.html");
});
})
