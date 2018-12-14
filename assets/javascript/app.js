/* buttons populated by javascript. This buttons
 hold values to use on the AJAX queryURL (endpoint + parametername+ value from buttons +appkey)
 is there 2 functions inside the AJAX call: one for populating the different animal category that
 Giphy holds and another one to dump the gifs. This functions happen on click.*/

 /*generate the AJAX call*/

 var heroes = ["Batman", "Wonder-Woman", "SpiderMan", "X-Men", "Thor","Captain-America","Wolverine","Daredevil", "Hulk", "IronMan","Aquaman","Professor-X","HawkEye"];
 


function displayGif (){

    $(".gifs-dump").empty();
    
    var hero = $(this).attr("data-name");
   

    console.log(hero);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero +"&limit=10&raiting=g&api_key=hsW6wkHYxeY99hSXwPf4x1Nj8yOwyI1W"

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
       console.log(response);   
       var results = response.data;


       for (var i = 0; i < results.length; i++) {

       var animatedGif = results[i].images.fixed_height_small.url;
       var staticGif = results[i].images.fixed_height_small_still.url;
       var ratingGif = results[i].rating;
       
        var div = $("<div>");
        div.addClass("inline");
        var image = $("<img>");
        var textRating = $("<p>").text("Rating: " + ratingGif);

        image.attr("src", staticGif);
        image.attr("data-still", staticGif);
        image.attr("data-animate", animatedGif);
        image.attr("data-state", "still");
        image.addClass("gif");

        

      //   $(".gifs-dump").append(textRating);
      //   $(".gifs-dump").append(image);

        div.append(textRating);
        div.append(image);
        $(".gifs-dump").append(div);

        


           
       }
       
       
        });

 };



 function buttons(){

    $(".buttons-dump").empty();

    for (var i = 0; i < heroes.length; i++) {

        $(".buttons-dump").append("<button class='hero' data-name="+ heroes[i] +  ">" + heroes[i] + "</button>");
    }

 };


 $("#find-topic").on("click", function(event){
    event.preventDefault();
    var hero = $(".form-control").val().trim();
    heroes.push(hero);
    buttons();
 });

$(".gifs-dump").on("click", ".gif", function(){

   var state = $(this).attr("data-state");

   if (state === "still"){

    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");

   }

   else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
   }


});


 $(document).on("click", ".hero", displayGif);

 buttons();
 


    

