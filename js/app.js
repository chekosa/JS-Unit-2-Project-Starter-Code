
// Start by adding all the DOM functionality first.
// When the user clicks on the news source, change the innerhtml of the top link
// console.log( the innerhtml of the top link)
// empty out the existing articles
// Map out all of the needed fields/properties from each respective feed.

//https://www.reddit.com/top.json
//http://feedr-api.wdidc.org/mashable.json
//http://feedr-api.wdidc.org/digg.json

/*
Reddit
Article: data.article
Title: data.title
Thumbnail: data.thumbnail
Impressions: data.ups
Category: data.subreddit

Mashable
Article: new.content
Title: new.title
Thumbnail: new.feature_image
Impressions: new.shares.total
Category: new.channel

Digg
Article:
Title:
Thumbnail:
Impressions:
Category:

*/
// Start by doing a console.log of the incoming feeds to confirm you have a successful transaction before you start mapping anything out.
// Make sure you have the JSON View chrome extension to get a clean view of the JSON dump in your browser.
// Think about ways to best standardize all of your incoming data.
// Test small pieces of functionality frequently, to make sure everything is working.
// Use tools such as Stack Overflow, Google and documentation resources to solve problems.

/*
  Please add all Javascript code to this file.
*/

// $.ajax({
//   url: 'https://www.reddit.com/top.json',
//   success: function(res) {
//     console.log(res);
//   }
// })

	var redditURL = "https://www.reddit.com/top.json";
	// var mashableURL = "http://feedr-api.wdidc.org/mashable.json";
	// var diggURL = "http://feedr-api.wdidc.org/digg.json";

	$(document).on( "click", ".articleContent", function() {
 		$('#popUp').removeClass('hidden');
 		$('#popUp').removeClass('loader');
		var title = $(this).find('h3').html();
		var url = $(this).find('#url').html();
		var domain = $(this).find('#domain').html();
		console.log(title);
		console.log(url);
		$('#popUp .container h1').replaceWith('<h1>' + title + '</h1>');
		$('#popUp .container .popUpAction').attr('href', url);
		$('#popUp .container p').replaceWith('<p>' + domain + '</p>');

	});

	$('.closePopUp').on( "click", function() {
 		$('#popUp').addClass('hidden');
	});

//Make API request
  	$.ajax({
		url: redditURL,
		data: {
			format: 'json'
		},
		success: function(response) {
			// console.log(response);
			var source = $("#article-template").html();
			var template = Handlebars.compile(source);

			$(response.data.children).each(function() {
				var articleData = {
	  				title: this.data.title,
	  				thumbnail: this.data.thumbnail,
	  				impressions: this.data.ups,
	  				category: this.data.subreddit,
	  				url: 'https://www.reddit.com' + this.data.permalink,
	  				domain: this.data.domain
				};
				var compiledTemplate = template(articleData);
				$('#main').append(compiledTemplate);
				$('#popUp').addClass('hidden');
				// console.log(response.data.children[0].data);
			});
		}
	});
