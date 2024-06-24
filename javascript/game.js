var counter = 0
var j = 3

var buttonColors = [
    "color: whitesmoke; background-color: #4e14ff",
    "color: black; background-color: #3dc901",
    "color: black; background-color: red",
    "color: black; background-color: #ff8400",
    "color: whitesmoke; background-color: blueviolet",
    "color: black; background-color: #f5d800",

] 

$(".make-new-button").submit("click", function (event) {
  event.preventDefault();
  // alert("submitted")
  if ($("#new-tag").val().trim() === "") {
    $("#new-tag").attr("placeholder", "Please enter text!")
    setTimeout(setsearchText, 1500);
  } else {
    var TagText = $("#new-tag").val().trim()
    console.log("New button will read: " + TagText)
    tagButtons.push(TagText)
    console.log(tagButtons);
  }
  j = 3
  counter = 0
  renderButtons();
});

function setsearchText() {
  $("#new-tag").attr("placeholder", "Tag Search")
}

var tagButtons = ["Kitten", "Puppy",
  "Hamster", "Cockatiel", "Baby Rats", "Chipmunk"];

function renderButtons() {

  // Deleting the other buttons prior to adding new  buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#search-buttons").empty();

  // Looping through the array of tag searches
  for (var i = 0; i < tagButtons.length; i++) {
    // Then dynamicaly generating buttons for each tag in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var buttonBack = $("<div class = backer>");

    var a = $("<button>");
    // Adding a class
    a.attr("class", "tagSearch ");
    // Adding an-inline style to vary text & background color
    a.attr("style", buttonColors[counter])
    // Adding a data-attribute with a value of the tag at index i
    a.attr("data-name", tagButtons[i]);
    // Providing the button's text with a value of the tag at index i
    a.text(tagButtons[i]);
    // Adding the button to the HTML
    buttonBack.append(a)
    $("#search-buttons").append(buttonBack);
    if (i === j) {
      j = j +3;
      counter++
    } 

    if (j === (buttonColors.length*3) +3 ){
      counter = 0
    }
  }
}



$(document).on("click", ".tagSearch", function (event) {
  event.preventDefault();

  if ($("#new-gif-toggle").is(":checked")){
    console.log("It was checked!")
    $("#gif-display").empty();
  }
  // alert("click");
  let searchTerm = $(this).attr("data-name")
  var tagInput = "q=" + searchTerm;
  console.log(tagInput);
  var rating = "&rating=" + "g" + "&rating=" + "pg"
    + "&rating=" + "pg-13"
  // This sets up the api query
  var apiURL = "https://api.giphy.com/v1/gifs/random?"
    + "api_key=7c98ec4fbf91466d8f0ac9dcbd1200a9"
  var apiURL2 = "https://api.giphy.com/v1/gifs/search?"

  var myapiKey = "&api_key=7c98ec4fbf91466d8f0ac9dcbd1200a9"

  var limit = $("#limit-value").text()
  console.log(limit)

  var limitSet = "&limit=" + limit

  var queryURL = apiURL2 + tagInput + myapiKey + limitSet;

  // this makes the AJAX call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function (response) {
    console.log(response);
    var results = response.data;

    // creates a wrapper to seperate the gif results
    var gifWrap = $("<div class=gifWrap>");
    // creates a title for each gif wrapper based on the button clicked
    var title = $("<h1 class= sectionTitle>")
    title.text(searchTerm)
    gifWrap.prepend(title);

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='item'>");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var gifImage = $("<img>");
      gifImage.attr("src", results[i].images.fixed_height_still.url);
      gifImage.attr("data-still", results[i].images.fixed_height_still.url);
      gifImage.attr("data-animate", results[i].images.fixed_height.url);
      gifImage.attr("data-state", "still");
      gifImage.attr("class", "gif");
      gifDiv.prepend(p);
      gifDiv.prepend(gifImage);

      gifWrap.append(gifDiv);
    }


    // finally, add the gif wrapper to the main display box
    $("#gif-display").prepend(gifWrap);


  });
});

$(document).on("click", ".gif", function () {

  var state = $(this).attr("data-state")

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"))
    $(this).attr("data-state", "animate")
  } else {
    $(this).attr("src", $(this).attr("data-still"))
    $(this).attr("data-state", "still")
  }

});

$(document).on("click", ".limit", function () {
  var newLimit = $(this).attr("value");
  console.log(newLimit);
  $("#limit-value").html(newLimit);

});



renderButtons();

