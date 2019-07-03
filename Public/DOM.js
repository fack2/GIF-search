function request(url, cb) {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return cb(data);
    });
}

var author = document.getElementById("author").value;
author = "Rowling";
request(`http://www.omdbapi.com/?s=${author}&apikey=676ce83b`, result => {
  var poster = result.Search.filter(x => x.Poster != "N/A");
  var title = poster.map(x => {
    return x.Title;
  });
  console.log(poster);
  console.log(title);

  var movieTitle = title.map(x => {
    var v = x.split(":");
    return v[0].includes(author) ? v[1] : v[0];
  });
  console.log(movieTitle);
  var moviesImg = document.getElementById("moviesImg");

  movieTitle.forEach(element => {
    request(
      `http://api.giphy.com/v1/gifs/search?api_key=554maMbTU0LCsQzgPSI6yCGhSvRSZ0CE&q=${element}-movie-clips&limit=1`,
      resultTwo => {
        var imgs = document.createElement("img");
        // imgs.src = resultTwo.images.fixed_height_small_still.url;
        // console.log(resultTwo.data[0].images.fixed_height_small_still.url);
        //media.giphy.com/media/jDp2RBrGO6DD2/giphy.gif
        https: imgs.src = `https://media.giphy.com/media/${
          resultTwo.data[0].id
        }/giphy.gif`;
        moviesImg.appendChild(imgs);
      }
    );
  });
});
