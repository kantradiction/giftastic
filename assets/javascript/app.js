		var topics = ["dog", "cat", "rabit", "hamster", "goldfish", "bird", "ferret", "turtle", "sugar glider", "hedgehog"];

		//Add to list of topics array
		$("#submit-button").on("click", function() {
			event.preventDefault();
			topics.push($("#form-searchBox").val().trim());
			//clear search box
			$("#form-searchBox").val("");

			//load buttons
			loadButtons();
		})

		//Load Buttons List
		function loadButtons() {
			//empty button list
			$("#buttonsContainer").empty();

			//reload all buttons
			for (var i = 0; i < topics.length; i++) {
				$("#buttonsContainer").append($("<button class=\"btn btn-primary gifButton\">" + topics[i] + "</button>"));
			}
		}

		//load Gifs
		function loadGifs() {

			//clear previous gifs
			$("#gifContainer").empty();

			var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + $(this).text() + "&limit=10";

			//ajax call
			$.ajax({
	          url: queryURL,
	          method: "GET"
	        }).done(function(response) {
	        	console.log(response);

	        var isClicked = false;

	        	//add each gif to the page
	        	for (var i = 0; i < response.data.length; i++) {
	        		var gifContainer = $("#gifContainer");
	        		var newDiv = $("<div class=\"col-md-3 gifObject\" id=\"gifObject-" + i + "\">");
	        		gifContainer.append(newDiv);
	        		var rating = $("<p>").html("Rating: " + response.data[i].rating);
	        		newDiv.append(rating);
	        		//set image url to static by default
	        		var gif = $("<img>").attr("data-still", response.data[i].images.fixed_width_still.url).attr("data-animate", response.data[i].images.fixed_width.url).attr("src", response.data[i].images.fixed_width_still.url).attr("width", "100%");
	        		newDiv.append(gif);
	        	}

	        //start giphy loop onlclick
	        $("img").on("click", function() {
	        	if (!isClicked) {
	        		$(this).attr("src", $(this).attr("data-animate"));
	        		isClicked = true;
	        	} else {
	        		$(this).attr("src", $(this).attr("data-still"));
	        		isClicked = false;
	        	}
	        });
	        //stop giphy loop onclick
			});
		}

		//load default buttons
		loadButtons();

		//load Gifs onClick
		$(document).on("click", ".gifButton", loadGifs);
		/*$(document).on("click", ".gifButton", function() {
			console.log($(this).text());
		});*/