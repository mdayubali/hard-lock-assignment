const url = "https://api.lyrics.ovh/suggest";


const inputSongname = document.getElementById("inputSongname");
const search = document.getElementById("search");
const result = document.getElementById("result");
const songBody = document.getElementById("songBody");


// get lyrics data
search.addEventListener("click", () => {
  const inputSongnameValue = inputSongname.value;
  fetch(`${url}/${inputSongnameValue}`)
    .then((res) => res.json())
    .then((lyrics) =>
      lyrics.data.slice(0, 10).map((lyric) => lyricsBody(lyric))
    );
  //clear input field
  inputSongname.value = "";
});
 

function lyricsBody(lyric) {
  const Div = document.createElement("div");
  Div.classList = "single-result row align-items-center my-3 p-3";

  Div.innerHTML = `
    <div class="col-md-8">
      <h3 class="lyrics-name">${lyric.title}</h3>
      <p class="author lead">Album by <span>${lyric.album.title}</span></p>
    </div>
    <div class="col-md-4 text-md-right text-center d-flex">      
      <button onclick="displayLyrics('${lyric.artist.name}', '${lyric.title}')" class="btn btn-sm btn-success">Get Lyrics</button>
    </div>
  `;

  result.appendChild(Div);
}

// display lyrics
function displayLyrics(artistName, artistTitle) {
  fetch(`https://api.lyrics.ovh/v1/${artistName}/${artistTitle}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.lyrics == undefined) {
        songBody.innerText = "No Lyrics Found !!!";
      } else {
        songBody.innerText = data.lyrics;
      }
    });
  document.getElementById("songTitle").innerText = artistTitle;
}


