$(document).ready(function () {

    $(".save").on("click", function () {
      const id = $(this).data("id")
      $ajax ({
        url: `/article/save/${id}`,
        type: 'PUT',
        success: function (result) {
          location.reload();
        }
      });
    });

  $(".unsave").on("click", function () {
    const id = $(this).data("id")
    $.ajax({
      url: `article/unsave/${id}`,
      type: 'PUT',
      success: function (result) {
        location.reload();
      }
    });
  });

  $(".scrape").on("click", function() {
    $.get("/scrape", (data, status) => {
      if (data.numofnewItems >0) {
        $(".report").text(`${data.numOfnewItems} more articles added`)
      }
      $(".articleCounter").modal("show");
      $(".articleCounter").on("hidden.bs.modal", function () {
        location.reload();
      });
    });
  });

  $(".addComment").on("click", function () {
      $("#commentModal").on("show.bs.modal", function (event) {
          const commentButton = $(event.relatedTarget)
          const id = commentButton.data("id")
          $(this).find(".modal-title").text(`Comments for article: ${id}`);
          $(this).find("comment-save").data("id", id);
          $.get(`/comments/read/${id}`, (data, status) => {
              $(".comment-container").empty();
              const comments = data.notes;
              comments.forEach((comment) => {
                  const commentContent = $("<li class='list-group-item'>").text(comment.content);
                  const deleteBtn = $(`<button class="btn btn-primary disabled btn-sm comment-delete" data-noteid=${comment._id}>`)
                    .text(deleteBtn.css({
                      "position": "absolute",
                      "right": "1%" 
                    }),
                    commentContent.append(deleteBtn),
                    $(".comment-container").append(commentContent))
              })
                })
              })
      })
      
      $(".comment-save").on("click", function (event) {
      event.preventDefault()
      const content = $(".commentText").val().trim();
      const id = $(this).data("id")
      if (content) {
        $.post('/comments/save/${id}', {
          content
        }, function (data, status) {
          $(".commentText").val("");
        })
      }
    })
    
    $(".comment-container").on("click", ".comment-delete", function (event) {
      const id = $(this).data("noteid")
      $ajax({
        url: '/comments/delete/${id}',
        type: 'Delete',
        success: function (result) {
          location.reload();
        }
      });
    })
  })

// // Grab the articles as a json
// $.getJSON("/articles", function(data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//   }
// });


// // Whenever someone clicks a p tag
// $(document).on("click", "p", function() {
//   // Empty the notes from the note section
//   $("#notes").empty();
//   // Save the id from the p tag
//   var thisId = $(this).attr("data-id");

//   // Now make an ajax call for the Article
//   $.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   })
//     // With that done, add the note information to the page
//     .then(function(data) {
//       console.log(data);
//       // The title of the article
//       $("#notes").append("<h2>" + data.title + "</h2>");
//       // An input to enter a new title
//       $("#notes").append("<input id='titleinput' name='title' >");
//       // A textarea to add a new note body
//       $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//       // A button to submit a new note, with the id of the article saved to it
//       $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//       // If there's a note in the article
//       if (data.note) {
//         // Place the title of the note in the title input
//         $("#titleinput").val(data.note.title);
//         // Place the body of the note in the body textarea
//         $("#bodyinput").val(data.note.body);
//       }
//     });
// });

// // When you click the savenote button
// $(document).on("click", "#savenote", function() {
//   // Grab the id associated with the article from the submit button
//   var thisId = $(this).attr("data-id");

//   // Run a POST request to change the note, using what's entered in the inputs
//   $.ajax({
//     method: "POST",
//     url: "/articles/" + thisId,
//     data: {
//       // Value taken from title input
//       title: $("#titleinput").val(),
//       // Value taken from note textarea
//       body: $("#bodyinput").val()
//     }
//   })
//     // With that done
//     .then(function(data) {
//       // Log the response
//       console.log(data);
//       // Empty the notes section
//       $("#notes").empty();
//     });

//   // Also, remove the values entered in the input and textarea for note entry
//   $("#titleinput").val("");
//   $("#bodyinput").val("");
// });