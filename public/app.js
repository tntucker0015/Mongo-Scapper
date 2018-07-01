$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});

$(document).on("click", "p", function() {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
  method: "get",
  url: "/articles/" + thisId
})
.then(function(data) {
  console.log(data);
  $("#notes").append("<h3>" + data.title + "</h3>");
  $("#notes").append("<input id='titleinput' name='title' >");
  $("notes").append("<textarea id='bodyinput' name='body'></textarea>");
  $("#notes").append("<button data-id='" + data_id + "'id='savenote'>Save Note</button>");
  if (data.not){
    $("#titleinput").val(data.note.title);
    $("#bodyinput").val(data.note.body);
  }
});
});

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data:{
      title: $("#titlesinput").val(),
      body: $("#bodyinput").val()
    }
  })
  .then(function(data) {
    console.log(data);
    $("#notes").empty();
  });
  $("#titleinput").val("");
  $("#bodyinput").val("");
});