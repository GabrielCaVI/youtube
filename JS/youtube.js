// SearchBar and button

$(function () {
    var textField = $("#searchVideo");
    var searchB = $(".submit");

    $(textField).on("focus", function () {
        $(this).animate({
            width: '50%'
        }, 400);

        $(searchB).animate({
            right: '80px'
        }, 400);

    });

    $(textField).on("blur", function () {
        if (textField.val() == "") {
            $(textField).animate({
                width: '45%'
            }, 400, function () { });
            $(searchB).animate({
                up: '360px'
            }, 400, function () { });
        }
    });

    $(".search").submit(function (e) {
        e.preventDefault();
        console.log(textField.val());
        search();
       
    });
})





function search(){
$("#results").html("");
// get value from text

text = $("#searchVideo").val();
// using request

$.get(
    "https://www.googleapis.com/youtube/v3/search",{
        part: "snippet, id",
        q: text,
        type: "video",
        maxResults: 10,
        key: "AIzaSyDXeRG3dg4ILUseFOFb62vlBiS2qOWnNsk"},
        function(data){
          console.log(data);
         $.each(data.items, function(i, item){
             var output = getOutput(item);
             $("#results").append(output);
         });
    }   

);


}





// Get output data 
function getOutput(item) {
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.default.url;
    var videoDate = item.snippet.publishedAt;
    var description = item.snippet.description;
    var videoId = item.id.videoId;

    // create string with output 

    var output = `<article>  
<img src= ${thumb} class = "thumb">
<div class= "details">
<h4> ${title} </h4>
<p> ${description}</p>
<p> ${videoDate}</p>
<a href="https://www.youtube.com/watch?v= ${videoId}">Link </a>
</div
</article>`;
console.log(videoId);
    return output;

}

