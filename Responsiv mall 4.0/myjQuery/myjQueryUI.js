$(document).ready(function() {
    $("#rating-slider").slider({
      range: "min",
      min: 0,
      max: 10,
      value: 0,
      slide: function(event, ui) {
        $("#slider-value").text(ui.value);
      }
    });

    $("#submit-rating").click(function() {
      var rating = $("#slider-value").text();

      // Perform AJAX request to send the rating to the server and email
      $.ajax({
        url: "your_email_sending_script.php", // Replace with the actual script URL
        type: "POST",
        data: { rating: rating },
        success: function(response) {
          alert("Rating submitted successfully!");
        },
        error: function(error) {
          alert("Error submitting rating. Please try again.");
        }
      });
    });
  });

  