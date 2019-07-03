function request(url, cb) {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return cb(data);
    });
}
var search = document.getElementById("search");
search.addEventListener("click", function() {
  var author = document.getElementById("author").value;
  // author = "Rowling";
  request(`http://www.omdbapi.com/?s=${author}&apikey=676ce83b`, result => {
    // var moviesData = result.search;
    // console.log(result.Search);
    var moviesData = result.Search.filter(x => x.Poster != "N/A");
    // var moviesData = result.search.filter(x => x.Poster != "N/A");
    // var title = poster.map(x => {
    //   return x.Title;
    // });
    moviesData.forEach(e => {
      var v = e.Title.split(":");
      //   var a=author.toLowerCase();
      e.Title = v[0].includes(author) ? v[1] : v[0];
    });
    // var imdbID = poster.map(x => {
    //     return x.imdbID;
    //   });

    // console.log(poster);
    // console.log(title);

    var section = document.createElement("section");
    section.setAttribute("class", "allInformation");

    var header = document.createElement("h1");
    header.innerHTML = author;
    header.setAttribute("class", "authorName");

    section.appendChild(header);

    document.body.appendChild(section);

    var posterInfo = document.createElement("div");
    posterInfo.setAttribute("class", "posterInfo");

    // var movieTitle = title.map(x => {
    //   var v = x.split(":");
    //   return v[0].includes(author) ? v[1] : v[0];
    // });
    // console.log(movieTitle);

    moviesData.forEach(element => {
      request(
        `http://api.giphy.com/v1/gifs/search?api_key=554maMbTU0LCsQzgPSI6yCGhSvRSZ0CE&q=${
          element.Title
        }-movie-clips&limit=4`,
        resultTwo => {
          request(
            `http://www.omdbapi.com/?i=${element.imdbID}&apikey=676ce83b`,
            resultThree => {
              var p = document.createElement("p");
              p.innerText = `Title: ${element.Title}\nReleased: ${
                resultThree.Released
              }\nRun time: ${resultThree.Runtime}\nRating: ${
                resultThree.imdbRating
              }`;

              var posterImg = document.createElement("img");
              posterImg.setAttribute("class", "posterImg");
              posterImg.setAttribute("src", element.Poster);
              posterInfo.appendChild(posterImg);
              posterInfo.appendChild(p);

              var imgs = document.createElement("img");
              // imgs.src = resultTwo.images.fixed_height_small_still.url;
              // console.log(resultTwo.data[0].images.fixed_height_small_still.url);
              //media.giphy.com/media/jDp2RBrGO6DD2/giphy.gif
              imgs.src = `https://media.giphy.com/media/${
                resultTwo.data[0].id
              }/giphy.gif`;
              var moviesGIF = document.createElement("div");

              moviesGIF.appendChild(imgs);
              posterInfo.appendChild(moviesGIF);
              section.appendChild(posterInfo);
            }
          );
        }
      );
    });
  });
});
