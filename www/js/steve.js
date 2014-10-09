var photoURI;
		var twitterName = "";
		var tweetText;
		var eventId = 4;

		messagesNamed = new Array();
		messagesNamed[0] = "Here is %% soaking up the atmosphere at #event";
		messagesNamed[1] = "Checkout %% at #event";
		messagesNamed[2] = "#event is in full swing, looks like %% is loving it";
		messagesNamed[3] = "#event and %% is clearly in the mood";

		messagesUnnamed = new Array();
		messagesUnnamed[0] = "Having an amazing time at #event";
		messagesUnnamed[1] = "Check us out at #event";
		messagesUnnamed[2] = "#event is in full swing, here is some of the crowd";
		messagesUnnamed[3] = "#event and the crowd is clearly in the mood";

		optionsNow = new Array();

		$( "#launch" ).click(function() {
			capturePhoto();
		});

		function capturePhoto() {
			// Call camera function
			// If success then go to next step...
			photoURI = "photo.jpg";
			getUserDetails();
		}

		function getUserDetails() {
			$("#launch").hide();
			$("#handle").show();
		}

		$("#tweet_name").keypress(function() {
			$("#handle_next").html("NEXT >");
		});

		$( "#handle_next" ).click(function() {
			if ($("#tweet_name").val() != "") twitterName = $("#tweet_name").val();
			getUserMessage();
		});

		function getUserMessage() {
			if (twitterName == "") {
				twitterName = "Unknown";
				optionsNow = messagesUnnamed;
			} else {
				optionsNow = messagesNamed;
				i = 0;
				optionsNow.forEach(function(entry) {
					optionsNow[i] = entry.replace(/%%/g, twitterName);
					i++;
				});
			}

			optionsHtml = "<select name='tweet_text' id='tweet_text'>";
			optionsNow.forEach(function(entry) {
				optionsHtml = optionsHtml + "<option value='" + entry + "'>" + entry + "</option>";
			});
			optionsHtml = optionsHtml + "</select>";
			$("#options").html(optionsHtml);

			$("#handle").hide();
			$("#message").show();
		}

		$( "#text_next" ).click(function() {
			tweetText = $("#tweet_text").val();
			$("#message").hide();
			$("#done").show();
			sendPhoto();
		});

		function sendPhoto() {
			dataSend = "<p>Photo URI: " + photoURI + "</p>";
			dataSend = dataSend + "<p>Event ID: " + eventId + "</p>";
			dataSend = dataSend +  "<p>Username: " + twitterName + "</p>";
			dataSend = dataSend +  "<p>Tweet: " + tweetText + "</p>";
			// Call file transfer function
			$("#data").html(dataSend);
		}

		$( "#done_next" ).click(function() {
			// Reset all
			photoURI = "";
			twitterName = "";
			tweetText = "";
			$("#tweet_name").val("");
			$("#handle_next").html("SKIP >");
			$("#done").hide();
			$("#launch").show();
		});



