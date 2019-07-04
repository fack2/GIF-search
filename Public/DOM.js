function request(url, cb) {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return cb(data);
    });
}
let search = document.getElementById("search");
let divForAll = document.createElement("div");

search.addEventListener("click", function() {
  divForAll.setAttribute("class", "divAll");
  divForAll.innerHTML = " ";
  let author = document.getElementById("author").value;
  if(author==""){
    divForAll.innerHTML ="Enter/Change author Name";
    // break;
    document.body.appendChild(divForAll);

  }
  else
  request(
    `http://www.omdbapi.com/?s=${author}&apikey=676ce83b`,
    authorMovies => {
      let header = document.createElement("h1");
      header.innerHTML = author + " movies";
      header.setAttribute("class", "authorName");
      divForAll.appendChild(header);

      let moviesData = authorMovies.Search.filter(
        x => x.Poster != "N/A" && x.Poster.includes("https:")
      );
      moviesData.forEach(e => {
        let v = e.Title.split(":");
        e.Title = v[0].includes(author) && v.length == 2 ? v[1] : v[0];
      });

      moviesData.forEach(element => {
        request(
          `http://api.giphy.com/v1/gifs/search?api_key=554maMbTU0LCsQzgPSI6yCGhSvRSZ0CE&q=${
            element.Title
          }-movie-clips&limit=4`,
          returnGIF => {
            request(
              `http://www.omdbapi.com/?i=${element.imdbID}&apikey=676ce83b`,
              returnMovieInfo => {
                let p = document.createElement("p");
                p.innerText = `Title: ${element.Title}\nReleased: ${
                  returnMovieInfo.Released
                }\nRun time: ${returnMovieInfo.Runtime}\nRating: ${
                  returnMovieInfo.imdbRating
                }`;

                let section = document.createElement("section");
                section.setAttribute("class", "allInformation");

                // document.body.appendChild(section);
                divForAll.appendChild(section);

                let posterInfo = document.createElement("div");
                posterInfo.setAttribute("class", "posterInfo");
                let posterImg = document.createElement("img");
                posterImg.setAttribute("class", "posterImg");
                posterImg.setAttribute("src", element.Poster);
                posterInfo.appendChild(posterImg);
                posterInfo.appendChild(p);
                let moviesGIF = document.createElement("div");
                returnGIF.data.forEach(e=>{
                  let imgs = document.createElement("img");
                  imgs.src = `https://media.giphy.com/media/${
                  e.id
                  }/giphy.gif`;
                  moviesGIF.appendChild(imgs);

                })
                

                moviesGIF.setAttribute("class", "moviesGIF");

                section.appendChild(posterInfo);

                section.appendChild(moviesGIF);
              }
            );
          }
        );
      });
      document.body.appendChild(divForAll);
    }
  );
});
