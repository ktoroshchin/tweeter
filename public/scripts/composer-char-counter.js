//Character counter//
$(document).ready(function(){
  document.getElementById("tweet-box").addEventListener("keyup", function(event){
    var inputLength = 140 - event.target.value.length
    $("#counter")[0].innerHTML = inputLength;
      if(inputLength < 0){
        $("#counter").css({"color": "red"})
      }
      if(inputLength > 0){
        $("#counter").css({"color": "black"})
      }
  })
});
