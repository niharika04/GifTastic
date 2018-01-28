$(document).ready(function() {

		// Initial array of topics
		var topics = ["minions", "kung fu panda", "frozen", "toy story", "finding nemo", "moana", "big hero 6", "aladdin", "bambi", "the little mermaid", "tangled", "up", "angry birds", "monsters inc"]

		// displayGif function re-renders the HTML to display the appropriate content
		function displayGif() {

			$("#gifs").empty();	


			var topic = $(this).attr("data-name");
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=aRhRog3C513qX0Hp16d4dJvm1XRTrQvG&limit=10";

			//// Creating an AJAX call for the specific animal button being clicked

			$.ajax({
				url: queryURL,
				method: "GET"
			}).done(function(response) {
				console.log(response);
				
				for (var i = 0; i < response.data.length; i++) {

					var newImg = $("<img>")
					newImg.addClass('gif')
					var still = response.data[i].images.fixed_height_still.url
					var moving = response.data[i].images.fixed_height.url
					newImg.attr('src', still)
					newImg.attr('data-state', 'still')
					newImg.attr('data-still', still)
					newImg.attr('data-moving', moving)
					newImg.text(response.data[i].rating);
					$('#gifs').append(newImg);

				}

				
			});

		}

			$(document).on('click', '.gif', function() {

				console.log("clicked");
				console.log(this)

				if ($(this).attr('data-state') === 'still') {
					$(this).attr('src', $(this).attr('data-moving'));
					$(this).attr('data-state', 'moving')	
				} else if ($(this).attr('data-state') === 'moving') { 
					$(this).attr('src', $(this).attr('data-still'));
					$(this).attr('data-state', 'still')

				}
			});

		

		//Function for displaying gif data
		function renderButtons() {
			// Deleting the topics prior to adding new topics
	        // (this is necessary otherwise you will have repeat buttons)
	        $("#buttons-view").empty();

	         // Looping through the array of topics
        	for (var i = 0; i < topics.length; i++) {

        		// Then dynamicaly generating buttons for each topic in the array
	          	// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
	         	var newButton = $("<button>");
	          	// Adding a class of topic to 	our button
	          	newButton.addClass("topic btn btn-outline-secondary");
	          	// Adding a data-attribute
	          	newButton.attr("data-name", topics[i]);
	         	 // Providing the initial button text
	          	newButton.text(topics[i]);
	          	// Adding the button to the buttons-view div
	          	$("#buttons-view").append(newButton);
	        }
      	}
	      	// This function handles events where one button is clicked
	      	$("#add-animal").on("click", function(event) {
	        // event.preventDefault() prevents the form from trying to submit itself.
	        // We're using a form so that the user can hit enter instead of clicking the button if they want
	        event.preventDefault();

	        // This line will grab the text from the input box
	        var topic = $("#topic-input").val().trim();
	        // The topic from the textbox is then added to our array
	        topics.push(topic);
	        $("#topic-input").val('');

	        // calling renderButtons which handles the processing of our topic array
	        renderButtons();
	        
	     	});
      
      // Adding a click event listener to all elements with a class of "topic"
      $(document).on("click", ".topic", displayGif);	
      // Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();	


	});	
