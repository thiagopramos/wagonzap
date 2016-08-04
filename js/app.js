
  var promo = 900001; // change to your own promo id
  var baseUrl = "https://wagon-chat.herokuapp.com/";
  var author = "anonymous"

function refresh(){
  console.log("refreshing");
  $.ajax({
      type: "GET",
      url: baseUrl + promo + "/comments/",
      success: function(data) {
        $(".spinning").addClass('hidden');
        $("#messages ul").html("");
        data.forEach(function(msg){
          addBubble(msg.content,msg.author,msg.created_at);
        })
      },
      error: function(jqXHR) {
        console.error(jqXHR.responseText);
      }
    });
}



// function addComment(message,from,time){
//   var timeago = $('<time class="timeago">').attr('datetime',time);
//   var fromSpan = $('<span class="date">').text(' by '+from);
//   fromSpan.prepend(timeago);
//   var row = $('<li class="list-group-item">').text(message+ ' ');

//   row.append(fromSpan);
//   $('#messages ul').prepend(row);
//   jQuery("time.timeago").timeago();
// }


function addBubble(message,from,time){
  var timeago = $('<time class="timeago">').attr('datetime',time);
  var fromSpan = $('<span class="date">').text(' by '+from);
  fromSpan.prepend(timeago);
  var paragraph = $('<p>').text(message + ' ').append(fromSpan);

  if (from == author) {
    var row = $('<li class="list-group-item row">')
    row.html('<div class="talk-bubble tri-right right-top" style="background-color: #DCF8C6;"><div class="talktext">'+paragraph.html()+'</div></div>');
  }else{
    var row = $('<li class="list-group-item row">')
    row.html('<div class="talk-bubble tri-right left-top"><div class="talktext">'+paragraph.html()+'</div></div>');
  }



  // <div class="talk-bubble tri-right left-top">
//   <div class="talktext">
//     <p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
//   </div>
// </div>

  $('#messages ul').prepend(row);
  jQuery("time.timeago").timeago();
}


//<li>A sample message (posted
//<span class="date">10 minutes ago</span>) by John</li>
$(function(){
  jQuery("time.timeago").timeago();
  refresh();

  $("#comment-form").submit(function(e){
    e.preventDefault();
    var content = $('#your-message').val();
     $('#your-message').val("");
    var chat = JSON.stringify({
      "author":author,
      "content":content
    });
    $.ajax({
      type: "POST",
      url: baseUrl + promo + "/comments/",
      data: chat,
      success: function(data) {
        console.log(data);
        var dt = new Date();
        addBubble(content,author,dt.toISOString());
      },
      error: function(jqXHR) {
        console.error(jqXHR.responseText);
      }
    });
  });

  $("#config-form").submit(function(e){
    e.preventDefault();
    author = $('#author').val();
    promo = $('#batch').val();
    $("#messages ul").html("");
    $(".spinning").removeClass('hidden');
    refresh();
  });


  $("#refresh").click(function(e){
    e.preventDefault();
    refresh();
  });

  setInterval(function () {
        refresh();
  },10000);

  // Your turn to code!

});
